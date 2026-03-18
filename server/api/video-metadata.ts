export default defineEventHandler(async (event) => {
  const { videoId } = getQuery(event)

  if (!videoId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing videoId parameter',
    })
  }

  try {
    const fetchWithTimeout = async (url: string, options: RequestInit, timeoutMs: number) => {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), timeoutMs)

      try {
        return await fetch(url, {
          ...options,
          signal: controller.signal,
        })
      } finally {
        clearTimeout(timeout)
      }
    }

    const fetchTextWithRetries = async (url: string, options: RequestInit, timeoutMs: number, maxRetries: number) => {
      let lastError: unknown = null

      for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
          const response = await fetchWithTimeout(url, options, timeoutMs)
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}`)
          }
          return await response.text()
        } catch (error) {
          lastError = error
          if (attempt < maxRetries) {
            await new Promise((resolve) => setTimeout(resolve, 400 * (attempt + 1)))
          }
        }
      }

      throw lastError
    }

    const [oembedResult, pageResult] = await Promise.allSettled([
      fetchWithTimeout(
        `https://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=${videoId}&format=json`,
        {},
        5000,
      ).then((res) => (res.ok ? res.json() : null)),
      (async () => {
        const requestOptions = {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept-Language': 'en-US,en;q=0.9',
          },
        }

        const candidates = [
          `https://www.youtube.com/watch?v=${videoId}`,
          `https://m.youtube.com/watch?v=${videoId}`,
          `https://www.youtube.com/embed/${videoId}`,
        ]

        for (const url of candidates) {
          try {
            const html = await fetchTextWithRetries(url, requestOptions, 12000, 1)
            if (html.includes('lengthSeconds') || html.includes('approxDurationMs') || html.includes('length_seconds')) {
              return html
            }
          } catch {
            // Try next candidate URL.
          }
        }

        return null
      })(),
    ])

    const oembedResponse = oembedResult.status === 'fulfilled' ? oembedResult.value : null
    const pageResponse = pageResult.status === 'fulfilled' ? pageResult.value : null

    const parseDurationFromHtml = (html: string) => {
      const lengthSecondsMatch = html.match(/"lengthSeconds":"?(\d+)"?/) || html.match(/"lengthSeconds":(\d+)/)
      if (lengthSecondsMatch?.[1]) {
        return parseInt(lengthSecondsMatch[1], 10)
      }

      const approxDurationMatch = html.match(/"approxDurationMs":"?(\d+)"?/) || html.match(/"approxDurationMs":(\d+)/)
      if (approxDurationMatch?.[1]) {
        return Math.floor(parseInt(approxDurationMatch[1], 10) / 1000)
      }

      const legacyLengthMatch = html.match(/"length_seconds":"(\d+)"/)
      if (legacyLengthMatch?.[1]) {
        return parseInt(legacyLengthMatch[1], 10)
      }

      return null
    }

    const formatDuration = (seconds: number) => {
      const h = Math.floor(seconds / 3600)
      const m = Math.floor((seconds % 3600) / 60)
      const s = seconds % 60

      if (h > 0) {
        return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
      }

      return `${m}:${s.toString().padStart(2, '0')}`
    }

    // Process Duration from HTML
    let duration = 'N/A'
    if (pageResponse) {
      const seconds = parseDurationFromHtml(pageResponse)
      if (seconds !== null) {
        duration = formatDuration(seconds)
      }
    }

    return {
      title: oembedResponse?.title || 'Titre inconnu',
      author: oembedResponse?.author_name || 'Auteur inconnu',
      // Use the scraped duration
      duration: duration,
      // oEmbed thumbnail is generally more reliable than maxresdefault fallback
      thumbnail: oembedResponse?.thumbnail_url || `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    }

  } catch (error) {
    return {
      title: 'Erreur de chargement',
      author: 'Unknown',
      duration: 'N/A',
      thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    }
  }
})
