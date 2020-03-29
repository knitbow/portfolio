import colors from 'vuetify/es5/util/colors'
import {createClient} from './plugins/contentful.js'

const pkg = require('./package')
const {getConfigForKeys} = require('./lib/config.js')
const ctfConfig = getConfigForKeys([
  'CTF_SPACE_ID',
  'CTF_CDA_ACCESS_TOKEN'
])

const {createClient} = require('./plugins/contentful')
const cdaClient = createClient(ctfConfig)

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: 'Morimoriのポートフォリオ',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: process.env.npm_package_description || ''}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#fff'},
  /*
  ** Global CSS
  */
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    '@mdi/font/css/materialdesignicons.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {src: '~plugins/font-awesome', ssr: false}, // ここを追加
    {src: '@/plugins/vue-apexcharts', ssr: false},
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // '@nuxtjs/pwa',
    '@nuxtjs/markdownit',
    'nuxt-fontawesome'
  ],
  // ここから追加
  markdownit: {
    html: true,
    injected: true,
    linkify: true,
    breaks: false
  },
  // ここまで追加
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        /*以下追加*/
        light: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  generate: {
    routes() {
      return Promise.all([
        cdaClient.getEntries({
          'content_type': 'work'
        }),
        cdaClient.getEntries({
          'content_type': 'category'
        }),
        cdaClient.getEntries({
          'content_type': 'tag'
        })
      ]).then(([works, categories, tags]) => {
        return [
          ...works.items.map(work => `work/${work.fields.slug}`),
          ...categories.items.map(category => `category/${category.sys.id}`),
          ...tags.items.map(tag => `tag/${tag.sys.id}`)
        ]
      })
    }
  },
  env: {
    CTF_SPACE_ID: ctfConfig.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: ctfConfig.CTF_CDA_ACCESS_TOKEN,
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
