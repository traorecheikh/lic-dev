export default defineNuxtPlugin((nuxtApp) => {
  // Only run on client-side
  const config = useRuntimeConfig()
  
  // We don't want to block hydration, so we run this without awaiting it
  // This fires a request to Strapi just to wake it up if it's sleeping (Render Free Tier)
  const wakeUpStrapi = async () => {
    try {
      const { url } = useStrapi().strapi
      // Simple fetch to the root or a health endpoint
      // We use native fetch to avoid Strapi-specific error handling cluttering the console
      await fetch(url, { method: 'HEAD', mode: 'no-cors' })
      console.log('Strapi wake-up signal sent.')
    } catch (e) {
      // Ignore errors, we just want to trigger the server boot
      console.log('Strapi wake-up signal sent (error ignored).')
    }
  }

  // Execute immediately on app mount
  wakeUpStrapi()
})
