// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
  ],

  vite: {
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'gsap': ['gsap'],
            'lucide': ['lucide-vue-next'],
          },
        },
      },
    },
  },

  image: {
    formats: ['webp', 'jpeg'],
    quality: 80,
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
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
        { name: 'theme-color', content: '#0052CC' },
        { name: 'color-scheme', content: 'light' },
        { 'http-equiv': 'x-ua-compatible', content: 'IE=edge' },
      ],
      link: [
        // DNS Prefetch for external resources
        { rel: 'dns-prefetch', href: 'https://images.unsplash.com' },
        { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' },
        { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' },

        // Preconnect for critical resources
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },

        // Font loading - Non-blocking with font-display swap
        { rel: 'preload', as: 'style', href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap', onload: "this.onload=null;this.rel='stylesheet'" },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap', media: 'print', onload: "this.media='all'" },

        // Preload hero image (Largest Contentful Paint optimization)
        {
          rel: 'preload',
          as: 'image',
          href: 'https://images.unsplash.com/photo-1573164574572-cb89e39749b4?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0',
          type: 'image/jpeg',
          fetchpriority: 'high',
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
        'Cross-Origin-Opener-Policy': 'same-origin',
        'Content-Security-Policy': "default-src 'self' https:; img-src 'self' https: data:; style-src 'self' https: 'unsafe-inline'; font-src 'self' https://fonts.gstatic.com; script-src 'self' https:; object-src 'none'; base-uri 'self'; frame-ancestors 'self'; upgrade-insecure-requests;",
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    },
    '/_nuxt/**': {
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    },
    '/assets/**': {
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    },
    '/': { prerender: true },
    '/about': { prerender: true },
    '/services': { prerender: true },
    '/portfolio': { prerender: true },
    '/equipe': { prerender: true },
    '/contact': { prerender: true },
    '/formation-gratuite': { prerender: true },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/about', '/services', '/portfolio', '/equipe', '/contact', '/formation-gratuite'],
    },
    minify: true,
    compressPublicAssets: {
      gzip: true,
      brotli: true,
    },
  },

  experimental: {
    payloadExtraction: true,
    renderJsonPayloads: true,
    viewTransition: true,
  },
})
