const baseUrl = (process.env.SEO_AUDIT_BASE_URL || 'https://117m.com.ua').replace(/\/$/, '')
const sitemapUrl = process.env.SEO_AUDIT_SITEMAP_URL || `${baseUrl}/sitemap.xml`

function decodeXml(value) {
  return value.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
}

function getAttribute(tag, name) {
  const match = tag.match(new RegExp(`(?:^|\\s)${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i'))
  return match?.[1] ?? match?.[2] ?? match?.[3] ?? null
}

function getTags(html, tagName) {
  return [...html.matchAll(new RegExp(`<${tagName}\\b[^>]*>`, 'gi'))].map((match) => match[0])
}

function getMetaContent(html, key) {
  const tag = getTags(html, 'meta').find((candidate) => {
    const name = getAttribute(candidate, 'name') || getAttribute(candidate, 'property')
    return name?.toLowerCase() === key.toLowerCase()
  })

  return tag ? getAttribute(tag, 'content') : null
}

function getTitle(html) {
  return html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1].trim() || null
}

function getCanonical(html) {
  const tag = getTags(html, 'link').find((candidate) => getAttribute(candidate, 'rel')?.toLowerCase().split(/\s+/).includes('canonical'))
  return tag ? getAttribute(tag, 'href') : null
}

function getHreflangs(html) {
  return getTags(html, 'link')
    .filter((candidate) => getAttribute(candidate, 'rel')?.toLowerCase().split(/\s+/).includes('alternate'))
    .map((candidate) => ({
      href: getAttribute(candidate, 'href'),
      hreflang: getAttribute(candidate, 'hreflang'),
    }))
    .filter((entry) => entry.href && entry.hreflang)
}

function normalizeUrl(value) {
  const url = new URL(value)
  url.hash = ''
  return url.toString().replace(/\/$/, '') || url.origin
}

async function fetchText(url) {
  const startedAt = performance.now()
  const response = await fetch(url, {
    headers: { accept: 'text/html,application/xml,text/xml,*/*' },
    signal: AbortSignal.timeout(20_000),
  })

  return {
    body: await response.text(),
    status: response.status,
    finalUrl: response.url,
    durationMs: Math.round(performance.now() - startedAt),
  }
}

function getSitemapUrls(xml) {
  return [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)]
    .map((match) => decodeXml(match[1]))
    .filter((url) => url.startsWith(baseUrl))
}

async function auditPage(url) {
  try {
    const result = await fetchText(url)
    const htmlTag = getTags(result.body, 'html')[0]
    const title = getTitle(result.body)
    const description = getMetaContent(result.body, 'description')
    const canonical = getCanonical(result.body)
    const hreflangs = getHreflangs(result.body)
    const h1Count = getTags(result.body, 'h1').length
    const jsonLdCount = getTags(result.body, 'script').filter((tag) => getAttribute(tag, 'type')?.toLowerCase() === 'application/ld+json').length
    const issues = []

    if (result.status !== 200) issues.push(`HTTP ${result.status}`)
    if (!title) issues.push('missing title')
    if (!description) issues.push('missing description')
    if (!canonical) issues.push('missing canonical')
    if (canonical && normalizeUrl(canonical) !== normalizeUrl(url)) issues.push('canonical mismatch')
    if (h1Count !== 1) issues.push(`H1 count ${h1Count}`)
    if (hreflangs.length < 4) issues.push(`hreflang count ${hreflangs.length}`)
    if (jsonLdCount === 0) issues.push('missing JSON-LD')
    if (!getAttribute(htmlTag || '', 'lang')) issues.push('missing html lang')

    return {
      url,
      status: result.status,
      durationMs: result.durationMs,
      htmlBytes: Buffer.byteLength(result.body),
      issues,
    }
  } catch (error) {
    return {
      url,
      status: 0,
      durationMs: 0,
      htmlBytes: 0,
      issues: [error instanceof Error ? error.message : String(error)],
    }
  }
}

const robots = await fetchText(`${baseUrl}/robots.txt`)
const sitemap = await fetchText(sitemapUrl)
const urls = getSitemapUrls(sitemap.body)
const results = await Promise.all(urls.map(auditPage))
const failedPages = results.filter((result) => result.issues.length > 0)
const robotsIssues = []

if (robots.status !== 200) robotsIssues.push(`robots HTTP ${robots.status}`)
if (!robots.body.includes(sitemapUrl)) robotsIssues.push('robots missing sitemap')
if (!/Disallow:\s*\/admin\//i.test(robots.body)) robotsIssues.push('robots missing /admin/ block')
if (!/Disallow:\s*\/api\//i.test(robots.body)) robotsIssues.push('robots missing /api/ block')

const summary = {
  baseUrl,
  sitemapUrl,
  urls: urls.length,
  failedPages: failedPages.length,
  robotsIssues,
  averageResponseMs: results.length ? Math.round(results.reduce((sum, result) => sum + result.durationMs, 0) / results.length) : 0,
  slowestPages: [...results].sort((a, b) => b.durationMs - a.durationMs).slice(0, 5),
  failures: failedPages,
}

process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`)

if (urls.length === 0 || failedPages.length > 0 || robotsIssues.length > 0) {
  process.exitCode = 1
}
