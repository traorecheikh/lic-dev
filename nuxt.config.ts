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
            'lic-orange-dark': '#C43E12', // Darker shade for text accessibility (4.5:1 on white)
            'lic-dark': '#1A1A1A',
            'lic-light': '#F8F9FA',
          },
        },
      },
    },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'fr',
      },
      title: 'LO IT CONSULTING - Expertise IT en Afrique',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'LO IT CONSULTING transforme les défis technologiques en opportunités. Formation, développement, cloud et conseil IT au Sénégal et en Afrique.' },
        { name: 'format-detection', content: 'telephone=no' },
        // Security Meta Tags
        { 'http-equiv': 'Content-Security-Policy', content: "default-src 'self' https:; img-src 'self' https: data:; style-src 'self' https: 'unsafe-inline'; script-src 'self' https: 'unsafe-inline' 'unsafe-eval';" },
      ],
      link: [
        {
          rel: 'preload',
          as: 'image',
          href: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
        },
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
  routeRules: {
    '/**': {
      headers: {
        'X-Frame-Options': 'SAMEORIGIN',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
      },
    },
  },
})
