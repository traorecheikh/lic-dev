export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const strapiUrl = config.public.strapi?.url || process.env.STRAPI_URL

  if (!strapiUrl) {
    throw createError({
      statusCode: 500,
      statusMessage: 'STRAPI_URL is not configured',
    })
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 8000)

  try {
    const response = await fetch(strapiUrl, {
      method: 'HEAD',
      signal: controller.signal,
    })

    return {
      ok: response.ok,
      status: response.status,
      checkedAt: new Date().toISOString(),
    }
  } catch {
    throw createError({
      statusCode: 502,
      statusMessage: 'Failed to reach Strapi',
    })
  } finally {
    clearTimeout(timeout)
  }
})
