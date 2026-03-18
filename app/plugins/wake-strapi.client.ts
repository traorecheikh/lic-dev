export default defineNuxtPlugin(() => {
  if (!import.meta.client || import.meta.dev) {
    return
  }

  const wakeUpStrapi = async () => {
    try {
      const { url } = useStrapi().strapi
      await fetch(url, { method: 'HEAD', mode: 'no-cors' })
    } catch {
      // Intentionally swallow errors to avoid impacting UX.
    }
  }

  wakeUpStrapi()
})
