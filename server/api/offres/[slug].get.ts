export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  const config = useRuntimeConfig()
  const strapiUrl = config.public.strapi?.url || process.env.STRAPI_URL

  if (!strapiUrl) {
    throw createError({
      statusCode: 500,
      statusMessage: 'STRAPI_URL is not configured',
    })
  }

  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Slug is required' })
  }

  const token = process.env.STRAPI_TOKEN || process.env.STRAPI_API_TOKEN
  const headers: Record<string, string> = {}

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const endpoint = new URL('/api/offres', strapiUrl)
  endpoint.searchParams.set('filters[slug][$eq]', slug)
  endpoint.searchParams.set('populate', '*')

  try {
    const res: any = await $fetch(endpoint.toString(), {
      headers,
      timeout: 8000,
      retry: 0,
    })

    const item = res?.data?.[0]

    if (!item) {
      throw createError({ statusCode: 404, statusMessage: 'Offre introuvable' })
    }

    return item
  } catch (error: any) {
    if (error?.statusCode === 404) throw error

    const statusCode = error?.statusCode || error?.response?.status || 502

    if (statusCode === 401 || statusCode === 403) {
      throw createError({
        statusCode,
        statusMessage: 'Strapi access denied. Enable Public find permission for offres.',
      })
    }

    throw createError({
      statusCode,
      statusMessage: 'Unable to fetch offre from Strapi',
    })
  }
})
