/**
 * Composable for generating responsive image srcsets for Unsplash URLs
 * Converts standard Unsplash URLs to responsive variants with multiple sizes
 */
export function useResponsiveImage() {
  /**
   * Generate a srcset string for Unsplash images with multiple sizes
   * @param baseUrl - Base Unsplash image URL
   * @param sizes - Array of width sizes to generate (default: [556, 682, 1000, 1200])
   * @returns srcset string for img tag
   */
  const generateUnsplashSrcset = (baseUrl: string, sizes: number[] = [556, 682, 1000, 1200]) => {
    // Extract base URL without query parameters
    const urlParts = baseUrl.split('?')
    const baseImageUrl = urlParts[0]
    const queryParams = urlParts[1] || ''

    return sizes
      .map(size => {
        // Add or update width parameter
        const params = new URLSearchParams(queryParams)
        params.set('w', size.toString())
        return `${baseImageUrl}?${params.toString()} ${size}w`
      })
      .join(', ')
  }

  /**
   * Generate optimized sizes attribute for responsive images
   * @returns sizes attribute string
   */
  const generateSizes = () => {
    return '(max-width: 640px) 100vw, (max-width: 1024px) 90vw, (max-width: 1280px) 80vw, 70vw'
  }

  /**
   * Generate both srcset and sizes for easier use
   */
  const generateResponsiveAttrs = (imageUrl: string, displaySizes?: string) => {
    return {
      srcset: generateUnsplashSrcset(imageUrl),
      sizes: displaySizes || generateSizes(),
    }
  }

  return {
    generateUnsplashSrcset,
    generateSizes,
    generateResponsiveAttrs,
  }
}
