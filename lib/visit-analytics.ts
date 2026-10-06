import { createHash } from 'node:crypto'
import type { NextRequest } from 'next/server'
import { redisCommand } from './redis'

export const allowedPages = new Set(['home', 'portfolio', 'about'])

const analyticsEventsKey = 'person-site:analytics:events'
const botEventsKey = 'person-site:analytics:bot-events'
const analyticsRetentionSeconds = 60 * 60 * 24 * 90
const maxStoredEvents = 2000

type VisitKind = 'human' | 'bot'
type DeviceType = 'mobile' | 'tablet' | 'desktop'

export type VisitClientPayload = {
  page?: unknown
  referrer?: unknown
  utmSource?: unknown
  utmMedium?: unknown
  utmCampaign?: unknown
  language?: unknown
  screen?: unknown
  timezone?: unknown
  automated?: unknown
}

export type VisitEvent = {
  id: string
  kind: VisitKind
  botReason?: string
  visitedAt: string
  page: string
  visitorId: string
  country: string
  city: string
  timezone: string
  device: DeviceType
  browser: string
  operatingSystem: string
  screen: string
  language: string
  referrer: string
  source: string
  utmMedium: string
  utmCampaign: string
}

type CreateVisitEventOptions = {
  request: NextRequest
  body: VisitClientPayload | null
  page: string
  visitorId: string
  userAgent: string | null
  kind: VisitKind
  botReason?: string
}

function limitedValue(value: unknown, maxLength: number) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

function decodeHeader(value: string | null) {
  if (!value) {
    return ''
  }

  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

function getHeaderValue(request: NextRequest, ...names: string[]) {
  for (const name of names) {
    const value = request.headers.get(name)

    if (value) {
      return value
    }
  }

  return ''
}

function getReferrerHost(referrer: string) {
  if (!referrer) {
    return ''
  }

  try {
    return new URL(referrer).hostname.toLowerCase().replace(/^www\./, '')
  } catch {
    return ''
  }
}

function getSource(referrerHost: string, utmSource: string) {
  if (utmSource) {
    return utmSource.toLowerCase()
  }

  if (!referrerHost) {
    return 'direct'
  }

  if (referrerHost.includes('google.')) {
    return 'google'
  }

  if (referrerHost.includes('instagram.com')) {
    return 'instagram'
  }

  if (referrerHost.includes('t.me') || referrerHost.includes('telegram.')) {
    return 'telegram'
  }

  return referrerHost
}

function getDevice(userAgent: string): DeviceType {
  if (/ipad|tablet|android(?!.*mobile)/i.test(userAgent)) {
    return 'tablet'
  }

  if (/mobi|iphone|ipod|android/i.test(userAgent)) {
    return 'mobile'
  }

  return 'desktop'
}

function getBrowser(userAgent: string) {
  if (/edg\//i.test(userAgent)) return 'Edge'
  if (/opr\//i.test(userAgent)) return 'Opera'
  if (/firefox\//i.test(userAgent)) return 'Firefox'
  if (/chrome\//i.test(userAgent)) return 'Chrome'
  if (/safari\//i.test(userAgent) && !/chrome\//i.test(userAgent)) return 'Safari'
  if (/curl\//i.test(userAgent)) return 'curl'
  return 'Other'
}

function getOperatingSystem(userAgent: string) {
  if (/iphone|ipad|ipod/i.test(userAgent)) return 'iOS'
  if (/android/i.test(userAgent)) return 'Android'
  if (/windows/i.test(userAgent)) return 'Windows'
  if (/mac os x/i.test(userAgent)) return 'macOS'
  if (/linux/i.test(userAgent)) return 'Linux'
  return 'Other'
}

export function isLikelyBot(userAgent: string | null, automated: boolean) {
  if (automated) {
    return 'browser automation detected'
  }

  if (!userAgent) {
    return 'missing user agent'
  }

  const value = userAgent

  if (
    /bot|crawler|spider|slurp|headless|phantom|lighthouse|facebookexternalhit|telegrambot|whatsapp|slackbot|discordbot|preview|wget|curl|python-requests|axios|go-http-client/i.test(
      value,
    )
  ) {
    return 'known automated user agent'
  }

  return null
}

function getClientIp(request: NextRequest) {
  return getHeaderValue(
    request,
    'x-vercel-forwarded-for',
    'x-forwarded-for',
    'x-real-ip',
  )
    .split(',')[0]
    .trim()
}

export async function isRateLimited(request: NextRequest) {
  const ip = getClientIp(request)

  if (!ip) {
    return false
  }

  const bucket = Math.floor(Date.now() / (60 * 60 * 1000))
  const key = `person-site:analytics:rate:${createHash('sha256').update(ip).digest('hex')}:${bucket}`
  const count = Number(await redisCommand(['INCR', key]))

  if (count === 1) {
    await redisCommand(['EXPIRE', key, '3600'])
  }

  return count > 40
}

export function createVisitEvent({
  request,
  body,
  page,
  visitorId,
  userAgent,
  kind,
  botReason,
}: CreateVisitEventOptions): VisitEvent {
  const currentUserAgent = userAgent ?? ''
  const referrer = limitedValue(body?.referrer, 300)
  const referrerHost = getReferrerHost(referrer)
  const utmSource = limitedValue(body?.utmSource, 80)
  const city = decodeHeader(getHeaderValue(request, 'x-vercel-ip-city'))

  return {
    id: crypto.randomUUID(),
    kind,
    ...(botReason ? { botReason } : {}),
    visitedAt: new Date().toISOString(),
    page,
    visitorId,
    country: getHeaderValue(request, 'x-vercel-ip-country') || 'unknown',
    city: city || 'unknown',
    timezone:
      getHeaderValue(request, 'x-vercel-ip-timezone') || limitedValue(body?.timezone, 80) || 'unknown',
    device: getDevice(currentUserAgent),
    browser: getBrowser(currentUserAgent),
    operatingSystem: getOperatingSystem(currentUserAgent),
    screen: limitedValue(body?.screen, 32) || 'unknown',
    language: limitedValue(body?.language, 32) || 'unknown',
    referrer: referrerHost || 'direct',
    source: getSource(referrerHost, utmSource),
    utmMedium: limitedValue(body?.utmMedium, 80),
    utmCampaign: limitedValue(body?.utmCampaign, 120),
  }
}

export async function recordVisitEvent(event: VisitEvent, kind: VisitKind) {
  const key = kind === 'bot' ? botEventsKey : analyticsEventsKey
  await redisCommand(['LPUSH', key, JSON.stringify(event)])
  await redisCommand(['LTRIM', key, '0', String(maxStoredEvents - 1)])
  await redisCommand(['EXPIRE', key, String(analyticsRetentionSeconds)])
}

function parseEvents(value: unknown) {
  if (!Array.isArray(value)) {
    return []
  }

  return value.flatMap(item => {
    if (typeof item !== 'string') {
      return []
    }

    try {
      return [JSON.parse(item) as VisitEvent]
    } catch {
      return []
    }
  })
}

export async function getAnalyticsSnapshot() {
  const [rawHumanEvents, rawBotEvents, homeCount, portfolioCount, aboutCount] = await Promise.all([
    redisCommand(['LRANGE', analyticsEventsKey, '0', '199']),
    redisCommand(['LRANGE', botEventsKey, '0', '49']),
    redisCommand(['GET', 'person-site:count:home']),
    redisCommand(['GET', 'person-site:count:portfolio']),
    redisCommand(['GET', 'person-site:count:about']),
  ])

  return {
    pageCounts: {
      home: Number(homeCount) || 0,
      portfolio: Number(portfolioCount) || 0,
      about: Number(aboutCount) || 0,
    },
    humanEvents: parseEvents(rawHumanEvents),
    botEvents: parseEvents(rawBotEvents),
  }
}
