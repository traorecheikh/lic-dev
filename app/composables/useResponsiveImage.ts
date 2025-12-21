/**
 * Composable for generating responsive image srcsets for Unsplash URLs
 * Converts standard Unsplash URLs to responsive variants with multiple sizes
 * Optimized for both desktop and mobile viewports
 */
export function useResponsiveImage() {
  /**
   * Predefined breakpoint sets for different image types
   */
  const breakpoints = {
    // Mobile-first breakpoints for efficient delivery
    mobile: [320, 380, 512, 640, 768],
    // Desktop breakpoints
    desktop: [768, 1024, 1280, 1536],
    // Hero/large images (desktop + mobile optimized)
    hero: [320, 512, 768, 1024, 1280, 1536],
    // Card images (compact)
    card: [300, 400, 556, 682, 800],
  }

  /**
   * Generate a srcset string for Unsplash images with multiple sizes
   * @param baseUrl - Base Unsplash image URL
   * @param sizes - Array of width sizes to generate or preset name ('mobile', 'desktop', 'hero', 'card')
   * @returns srcset string for img tag
   */
  const generateUnsplashSrcset = (baseUrl: string, sizes?: number[] | string) => {
    // Extract base URL without query parameters
    const urlParts = baseUrl.split('?')
    const baseImageUrl = urlParts[0]
    const queryParams = urlParts[1] || ''

    // Determine which sizes to use
    let selectedSizes: number[]
    if (typeof sizes === 'string' && sizes in breakpoints) {
      selectedSizes = breakpoints[sizes as keyof typeof breakpoints]
    } else if (Array.isArray(sizes)) {
      selectedSizes = sizes
    } else {
      // Default to hero for maximum compatibility
      selectedSizes = breakpoints.hero
    }

    return selectedSizes
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
   * @param type - Type of image ('hero', 'card', or custom sizes string)
   * @returns sizes attribute string
   */
  const generateSizes = (type: string = 'hero') => {
    // Predefined sizes for common image types
    const sizePresets: Record<string, string> = {
      hero: '(max-width: 512px) 100vw, (max-width: 1024px) 90vw, (max-width: 1280px) 85vw, 80vw',
      card: '(max-width: 512px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw',
      compact: '(max-width: 512px) 100vw, (max-width: 1024px) 90vw, 70vw',
    }
    return sizePresets[type] || type
  }

  /**
   * Generate both srcset and sizes for easier use
   */
  const generateResponsiveAttrs = (imageUrl: string, type: string = 'hero') => {
    return {
      srcset: generateUnsplashSrcset(imageUrl, type),
      sizes: generateSizes(type),
    }
  }

  /**
   * Get breakpoints object for custom usage
   */
  const getBreakpoints = () => breakpoints

  return {
    generateUnsplashSrcset,
    generateSizes,
    generateResponsiveAttrs,
    getBreakpoints,
  }
}
