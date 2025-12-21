export default defineEventHandler(async (event) => {
  const { videoId } = getQuery(event)

  if (!videoId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing videoId parameter',
    })
  }

  try {
    const [oembedResponse, pageResponse] = await Promise.all([
      // 1. Fetch Metadata via oEmbed (Fast, Public, Reliable for Title/Author)
      fetch(`https://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=${videoId}&format=json`).then(res => res.json()).catch(() => null),
      
      // 2. Fetch Page HTML to scrape Duration (Hackier, but works without API Key)
      fetch(`https://www.youtube.com/watch?v=${videoId}`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      }).then(res => res.text()).catch(() => null)
    ])

    // Process Duration from HTML
    let duration = 'N/A'
    if (pageResponse) {
      // Look for "lengthSeconds":"123" pattern in the HTML
      const match = pageResponse.match(/"lengthSeconds":"(\d+)"/)
      if (match && match[1]) {
        const seconds = parseInt(match[1], 10)
        const h = Math.floor(seconds / 3600)
        const m = Math.floor((seconds % 3600) / 60)
        const s = seconds % 60
        
        // Format: H:MM:SS or MM:SS
        if (h > 0) {
          duration = `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
        } else {
          duration = `${m}:${s.toString().padStart(2, '0')}`
        }
      }
    }

    return {
      title: oembedResponse?.title || 'Titre inconnu',
      author: oembedResponse?.author_name || 'Auteur inconnu',
      // Use the scraped duration
      duration: duration,
      // Generate high-res thumbnail URL statically (predictable)
      thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    }

  } catch (error) {
    console.error('Server error fetching YouTube data:', error)
    return {
      title: 'Erreur de chargement',
      author: 'Unknown',
      duration: 'N/A',
      thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    }
  }
})
