import ytdl from 'ytdl-core'

export default defineEventHandler(async (event) => {
  const { videoId } = getQuery(event)

  if (!videoId || typeof videoId !== 'string') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing videoId parameter',
    })
  }

  const id = videoId.trim()

  if (!/^[A-Za-z0-9_-]{11}$/.test(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid YouTube videoId',
    })
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

  const withTimeout = async <T>(promise: Promise<T>, timeoutMs: number) => {
    return await Promise.race<T>([
      promise,
      new Promise<T>((_, reject) => {
        setTimeout(() => reject(new Error('YouTube metadata timeout')), timeoutMs)
      }),
    ])
  }

  try {
    const info = await withTimeout(ytdl.getBasicInfo(id), 12000)

    const details = info.videoDetails
    const lengthSeconds = Number(details?.lengthSeconds || 0)

    return {
      title: details?.title || 'Titre inconnu',
      author: details?.author?.name || 'Auteur inconnu',
      duration: lengthSeconds > 0 ? formatDuration(lengthSeconds) : 'N/A',
      thumbnail: details?.thumbnails?.[details.thumbnails.length - 1]?.url || `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
    }
  } catch {
    try {
      const oembed = await withTimeout(
        fetch(`https://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=${id}&format=json`).then((res) => (res.ok ? res.json() : null)),
        8000,
      )

      return {
        title: oembed?.title || 'Titre inconnu',
        author: oembed?.author_name || 'Auteur inconnu',
        duration: 'N/A',
        thumbnail: oembed?.thumbnail_url || `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
      }
    } catch {
      return {
        title: 'Erreur de chargement',
        author: 'Unknown',
        duration: 'N/A',
        thumbnail: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
      }
    }
  }
})
