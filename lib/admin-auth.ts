import { createHmac, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto'
import { cookies } from 'next/headers'

const adminSessionCookie = 'person_site_admin_session'
const sessionLifetimeSeconds = 60 * 60 * 12

function getRequiredEnvironmentValue(name: string) {
  const value = process.env[name]?.trim()
  return value || null
}

export function isAdminEmail(value: string) {
  const configuredEmail = getRequiredEnvironmentValue('ADMIN_EMAIL')
  return Boolean(configuredEmail && value.trim().toLowerCase() === configuredEmail.toLowerCase())
}

export function verifyAdminPassword(password: string) {
  const storedHash = getRequiredEnvironmentValue('ADMIN_PASSWORD_HASH')

  if (!storedHash || !password) {
    return false
  }

  const [algorithm, costValue, blockSizeValue, parallelizationValue, saltValue, hashValue] =
    storedHash.split('$')

  if (
    algorithm !== 'scrypt' ||
    !costValue ||
    !blockSizeValue ||
    !parallelizationValue ||
    !saltValue ||
    !hashValue
  ) {
    return false
  }

  try {
    const cost = Number(costValue)
    const blockSize = Number(blockSizeValue)
    const parallelization = Number(parallelizationValue)
    const salt = Buffer.from(saltValue, 'base64url')
    const expectedHash = Buffer.from(hashValue, 'base64url')
    const actualHash = scryptSync(password, salt, expectedHash.length, {
      N: cost,
      r: blockSize,
      p: parallelization,
      maxmem: 64 * 1024 * 1024,
    })

    return timingSafeEqual(actualHash, expectedHash)
  } catch {
    return false
  }
}

function getSessionSecret() {
  return getRequiredEnvironmentValue('ADMIN_SESSION_SECRET')
}

function createSessionToken() {
  const secret = getSessionSecret()

  if (!secret) {
    return null
  }

  const expiresAt = Math.floor(Date.now() / 1000) + sessionLifetimeSeconds
  const payload = `${expiresAt}.${randomBytes(32).toString('base64url')}`
  const signature = createHmac('sha256', secret).update(payload).digest('base64url')
  return `${payload}.${signature}`
}

function isValidSessionToken(token: string | undefined) {
  const secret = getSessionSecret()

  if (!secret || !token) {
    return false
  }

  const parts = token.split('.')

  if (parts.length !== 3) {
    return false
  }

  const [expiresAtValue, randomValue, signatureValue] = parts
  const expiresAt = Number(expiresAtValue)

  if (!randomValue || !Number.isFinite(expiresAt) || expiresAt <= Math.floor(Date.now() / 1000)) {
    return false
  }

  const expectedSignature = createHmac('sha256', secret)
    .update(`${expiresAtValue}.${randomValue}`)
    .digest()
  const actualSignature = Buffer.from(signatureValue, 'base64url')

  return (
    expectedSignature.length === actualSignature.length &&
    timingSafeEqual(expectedSignature, actualSignature)
  )
}

export async function createAdminSession() {
  const token = createSessionToken()

  if (!token) {
    return false
  }

  const cookieStore = await cookies()
  cookieStore.set(adminSessionCookie, token, {
    httpOnly: true,
    maxAge: sessionLifetimeSeconds,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  })

  return true
}

export async function getAdminSession() {
  const cookieStore = await cookies()
  return isValidSessionToken(cookieStore.get(adminSessionCookie)?.value)
}

export async function clearAdminSession() {
  const cookieStore = await cookies()
  cookieStore.delete(adminSessionCookie)
}
