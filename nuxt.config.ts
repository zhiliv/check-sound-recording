// import whitelist from './modules/whitelist/result-whitelist.json'
const path = require('path')


export default defineNuxtConfig({
  
  devServer: {
    port: 3200
  },
  buildModules: ['@nuxt-modules/compression', {
    algorithm: 'brotliCompress'
  }],
  devtools: { enabled: false },
  render: {
    resourceHints: false
  },
  env: {
    tokenLeads: 'c8e2d508767bd48d929b8d63641eaf80',
  },
  spaLoadingTemplate: false ,
  ssr: false,

  runtimeConfig: {
    database: {
      username: 'postgres',
      password: '1',
      host: '127.0.0.1',
      port: 5432,
      database: 'analyzer',
    },
    sessionOptions: {
      maxAge: 60 * 60 * 12, // время жизни(12 часов)
      httpOnly: false, // 
      path: '/',
      sameSite: true,
      secure: false, // Позволяет получать куки не только через https
    },
    notAuth: true // Проверять ли авторизацию
  },

  css: ['@/assets/css/main.css'],
  postcss: {
    plugins: {
      
      'postcss-import': {},
      tailwindcss: path.resolve(__dirname, './tailwind.config.js'),
      autoprefixer: {},
    },
  },

  nitro: {
    compressPublicAssets: true,
    serverAssets: [{
      baseName: 'img',
      dir: './public/img'
    }]
  },

  modules: ['@pinia/nuxt', 'nuxt-icons', '@nuxt/devtools', '@nuxt/image', [
    'nuxt-purgecss',
    
    {
      enabled: true,
      safelist: [/^h-/, /^w-/, /^lg:h-/, /^min-h-/, /^min-w-/, /^max-h-/, /^maw-w-/, /^xl:w-/, /^alert-/],
      whitelist: ['alert-warning', 'alert-info', 'alert-success', 'alert-error']
    },
  ], "@nuxt/image"],

  typescript: {
    tsConfig: {
      compilerOptions: {
        verbatimModuleSyntax: false
      }
    }
  }

})