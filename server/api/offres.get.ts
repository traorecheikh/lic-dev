export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const strapiUrl = config.public.strapi?.url || process.env.STRAPI_URL

  if (!strapiUrl) {
    throw createError({
      statusCode: 500,
      statusMessage: 'STRAPI_URL is not configured',
    })
  }

  const token = process.env.STRAPI_TOKEN || process.env.STRAPI_API_TOKEN
  const headers: Record<string, string> = {}

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const endpoint = new URL('/api/offres', strapiUrl)
  endpoint.searchParams.set('fields[0]', 'titre')
  endpoint.searchParams.set('fields[1]', 'slug')
  endpoint.searchParams.set('fields[2]', 'localisation')
  endpoint.searchParams.set('fields[3]', 'departement')
  endpoint.searchParams.set('fields[4]', 'type_emploi')
  endpoint.searchParams.set('fields[5]', 'statut')
  endpoint.searchParams.set('sort', 'publishedAt:desc')
  endpoint.searchParams.set('pagination[pageSize]', '50')

  try {
    return await $fetch(endpoint.toString(), {
      headers,
      timeout: 8000,
      retry: 0,
    })
  } catch (error: any) {
    const statusCode = error?.statusCode || error?.response?.status || 502

    if (statusCode === 401 || statusCode === 403) {
      throw createError({
        statusCode,
        statusMessage: 'Strapi access denied. Enable Public find permission for offres or configure STRAPI_TOKEN.',
      })
    }

    throw createError({
      statusCode,
      statusMessage: 'Unable to fetch offres from Strapi',
    })
  }
})
