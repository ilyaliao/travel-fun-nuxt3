import { pwa } from './app/config/pwa'
import { appDescription } from './app/constants/index'

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@vite-pwa/nuxt',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxtjs/google-fonts',
    '@nuxtjs/sitemap',
    '@pinia/colada-nuxt',
    // '@vue-email/nuxt', // TODO: incompatible with Nuxt 4, re-enable when updated
    'nuxt-auth-utils',
    'nuxt-mcp-dev',
  ],

  imports: {
    dirs: ['composables/queries', 'stores'],
  },

  devtools: {
    enabled: true,
  },

  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', href: '/favicon_io/favicon.ico', sizes: 'any' },
        { rel: 'apple-touch-icon', href: '/favicon_io/apple-touch-icon.png', sizes: '180x180' },
        { rel: 'icon', type: 'image/png', href: '/favicon_io/favicon-32x32.png', sizes: '32x32' },
        { rel: 'icon', type: 'image/png', href: '/favicon_io/favicon-16x16.png', sizes: '16x16' },
      ],
      meta: [
        { name: 'description', content: appDescription },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'theme-color', media: '(prefers-color-scheme: light)', content: 'white' },
        { name: 'theme-color', media: '(prefers-color-scheme: dark)', content: '#222222' },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  colorMode: {
    classSuffix: '',
    preference: 'light',
    fallback: 'light',
  },

  runtimeConfig: {
    sessionPassword: '',
    apiBase: '',
    apiSecret: '',
    gmailAppPassword: '',
    gmailAppUserMail: '',
    gmailBaseUrl: '',
    public: {
      googleMapApiKey: '',
    },
  },

  // vueEmail config removed — module is disabled (incompatible with Nuxt 4)

  experimental: {
    payloadExtraction: false,
  },

  compatibilityDate: '2024-08-14',

  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    prerender: {
      crawlLinks: false,
      routes: ['/'],
      failOnError: false,
    },
  },

  eslint: {
    config: {
      standalone: false,
      nuxt: {
        sortConfigKeys: true,
      },
    },
  },

  googleFonts: {
    families: {
      'Noto Sans TC': [300, 500, 700],
      'Noto Serif TC': [300, 500, 700],
    },
  },

  image: {
    provider: 'none',
  },

  pwa,
})
