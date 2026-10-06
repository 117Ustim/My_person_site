import { NextRequest, NextResponse } from 'next/server'
import { redisCommand } from '../../../lib/redis'
import {
  allowedPages,
  createVisitEvent,
  isLikelyBot,
  isRateLimited,
  recordVisitEvent,
  type VisitClientPayload,
} from '../../../lib/visit-analytics'

const visitorCookieName = 'person_site_visitor'
const visitorLifetimeSeconds = 60 * 60 * 24

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as VisitClientPayload | null
  const page = typeof body?.page === 'string' ? body.page : ''

  if (!allowedPages.has(page)) {
    return NextResponse.json({ error: 'Invalid page' }, { status: 400 })
  }

  try {
    const userAgent = request.headers.get('user-agent')
    const botReason = isLikelyBot(userAgent, body?.automated === true)
    const existingVisitorId = request.cookies.get(visitorCookieName)?.value
    const visitorId = /^[A-Za-z0-9_-]{20,80}$/.test(existingVisitorId ?? '')
      ? existingVisitorId!
      : crypto.randomUUID()
    const countKey = `person-site:count:${page}`

    if (botReason) {
      const count = await redisCommand(['GET', countKey])
      await recordVisitEvent(
        createVisitEvent({
          request,
          body,
          page,
          visitorId,
          userAgent,
          kind: 'bot',
          botReason,
        }),
        'bot',
      )

      return NextResponse.json(
        { count: Number(count) || 0, counted: false, visitorType: 'bot' },
        { headers: { 'Cache-Control': 'no-store' } },
      )
    }

    if (await isRateLimited(request)) {
      const count = await redisCommand(['GET', countKey])
      return NextResponse.json(
        { count: Number(count) || 0, counted: false, visitorType: 'limited' },
        { headers: { 'Cache-Control': 'no-store' } },
      )
    }

    const visitKey = `person-site:visit:${page}:${visitorId}`
    const visitMarker = await redisCommand([
      'SET',
      visitKey,
      '1',
      'EX',
      String(visitorLifetimeSeconds),
      'NX',
    ])

    if (visitMarker === 'OK') {
      await redisCommand(['INCR', countKey])
      try {
        await recordVisitEvent(
          createVisitEvent({
            request,
            body,
            page,
            visitorId,
            userAgent,
            kind: 'human',
          }),
          'human',
        )
      } catch {
        // Счётчик продолжает работать, даже если журнал временно недоступен.
      }
    }

    const count = await redisCommand(['GET', countKey])
    const response = NextResponse.json(
      { count: Number(count) || 0, counted: visitMarker === 'OK', visitorType: 'human' },
      { headers: { 'Cache-Control': 'no-store' } },
    )

    if (!existingVisitorId || visitorId !== existingVisitorId) {
      response.cookies.set(visitorCookieName, visitorId, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 365,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
      })
    }

    return response
  } catch {
    return NextResponse.json({ error: 'Counter unavailable' }, { status: 503 })
  }
}
