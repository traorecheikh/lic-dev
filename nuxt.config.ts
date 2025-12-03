// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
  ],
  image: {
    quality: 80,
    formats: ['webp', 'jpeg'],
    sizes: [320, 640, 1024, 1280, 1920],
    presets: {
      avatar: {
        modifiers: {
          width: 400,
          height: 400,
          fit: 'cover',
        },
      },
      small: {
        modifiers: {
          width: 320,
          height: 320,
          fit: 'cover',
        },
      },
      medium: {
        modifiers: {
          width: 640,
          height: 640,
          fit: 'cover',
        },
      },
    },
  },
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
        { 'http-equiv': 'Content-Security-Policy', content: "default-src 'self' https:; img-src 'self' https: data: https://images.unsplash.com; style-src 'self' https: 'unsafe-inline'; script-src 'self' https: 'unsafe-inline' 'unsafe-eval';" },
      ],
      link: [
        {
          rel: 'preload',
          as: 'image',
          href: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
          fetchpriority: 'high',
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
          rel: 'dns-prefetch',
          href: 'https://images.unsplash.com',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap',
          media: 'print',
          onload: "this.media='all'",
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
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-icons': ['lucide-vue-next'],
          'vendor-gsap': ['gsap'],
        },
      },
    },
  },
  nitro: {
    compressPublicAssets: true,
    minify: true,
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          chunkFileNames: 'chunks/[name]-[hash].js',
          entryFileNames: '[name]-[hash].js',
        },
      },
      chunkSizeWarningLimit: 500,
      cssCodeSplit: true,
    },
  },
})
