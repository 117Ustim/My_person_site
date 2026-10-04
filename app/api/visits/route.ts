import { NextRequest, NextResponse } from 'next/server'

const visitorCookieName = 'person_site_visitor'
const visitorLifetimeSeconds = 60 * 60 * 24

const redisUrl =
  process.env.UPSTASH_REDIS_REST_URL ??
  process.env.UPSTASH_REDIS_REST_KV_REST_API_URL ??
  process.env.KV_REST_API_URL
const redisToken =
  process.env.UPSTASH_REDIS_REST_TOKEN ??
  process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN ??
  process.env.KV_REST_API_TOKEN

const allowedPages = new Set(['home', 'portfolio', 'about'])

type RedisResponse = {
  result?: unknown
  error?: string
}

async function redisCommand(command: string[]) {
  if (!redisUrl || !redisToken) {
    throw new Error('Redis environment variables are not configured')
  }

  const response = await fetch(redisUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${redisToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(command),
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error('Redis request failed')
  }

  const payload = (await response.json()) as RedisResponse

  if (payload.error) {
    throw new Error('Redis command failed')
  }

  return payload.result
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as { page?: unknown } | null
  const page = typeof body?.page === 'string' ? body.page : ''

  if (!allowedPages.has(page)) {
    return NextResponse.json({ error: 'Invalid page' }, { status: 400 })
  }

  try {
    const existingVisitorId = request.cookies.get(visitorCookieName)?.value
    const visitorId = existingVisitorId ?? crypto.randomUUID()
    const visitKey = `person-site:visit:${page}:${visitorId}`
    const countKey = `person-site:count:${page}`
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
    }

    const count = await redisCommand(['GET', countKey])
    const response = NextResponse.json(
      { count: Number(count) || 0 },
      { headers: { 'Cache-Control': 'no-store' } },
    )

    if (!existingVisitorId) {
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
