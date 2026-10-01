import { NextResponse } from 'next/server'

const contactChannels = ['email', 'telegram', 'whatsapp'] as const
type ContactChannel = (typeof contactChannels)[number]

type ContactPayload = {
  channel: ContactChannel
  name: string
  email: string
  message: string
}

const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isContactChannel(value: unknown): value is ContactChannel {
  return typeof value === 'string' && contactChannels.includes(value as ContactChannel)
}

function validatePayload(value: unknown): ContactPayload | null {
  if (!isRecord(value)) return null

  const name = typeof value.name === 'string' ? value.name.trim() : ''
  const email = typeof value.email === 'string' ? value.email.trim() : ''
  const message = typeof value.message === 'string' ? value.message.trim() : ''

  if (!isContactChannel(value.channel) || name.length < 2 || name.length > 80) return null
  if (!emailPattern.test(email) || email.length > 254) return null
  if (message.length < 3 || message.length > 3000) return null

  return { channel: value.channel, name, email, message }
}

async function deliverContact(payload: ContactPayload) {
  if (payload.channel === 'telegram') {
    const token = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    if (!token || !chatId) {
      throw new Error('Telegram delivery is not configured.')
    }

    const text = [
      'Новая заявка с сайта',
      '',
      `Имя: ${payload.name}`,
      `Email: ${payload.email}`,
      '',
      'Проект:',
      payload.message,
    ].join('\n')

    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text }),
    })

    let result: { ok?: boolean } = {}
    try {
      result = await response.json() as { ok?: boolean }
    } catch {
      result = {}
    }

    if (!response.ok || result.ok !== true) {
      throw new Error('Telegram delivery failed.')
    }

    return {
      channel: payload.channel,
      status: 'sent' as const,
    }
  }

  return {
    channel: payload.channel,
    status: 'stub' as const,
  }
}

export async function POST(request: Request) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON payload.' }, { status: 400 })
  }

  const payload = validatePayload(body)

  if (!payload) {
    return NextResponse.json({ ok: false, error: 'Invalid contact payload.' }, { status: 400 })
  }

  try {
    const delivery = await deliverContact(payload)
    return NextResponse.json({ ok: true, ...delivery })
  } catch {
    return NextResponse.json({ ok: false, error: 'Contact delivery failed.' }, { status: 502 })
  }
}
