type RedisResponse = {
  result?: unknown
  error?: string
}

const redisUrl =
  process.env.UPSTASH_REDIS_REST_URL ??
  process.env.UPSTASH_REDIS_REST_KV_REST_API_URL ??
  process.env.KV_REST_API_URL
const redisToken =
  process.env.UPSTASH_REDIS_REST_TOKEN ??
  process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN ??
  process.env.KV_REST_API_TOKEN

export async function redisCommand(command: string[]) {
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
