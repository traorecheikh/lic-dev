// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
  ],
  tailwindcss: {
    config: {
      theme: {
        extend: {
          fontFamily: {
            montserrat: ['Montserrat', 'sans-serif'],
          },
          colors: {
            'lic-blue': '#0052CC',
            'lic-orange': '#FF5722',
            'lic-dark': '#1A1A1A',
            'lic-light': '#F8F9FA',
          },
        },
      },
    },
  },
  app: {
    head: {
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap',
        },
      ],
    },
  },
})
