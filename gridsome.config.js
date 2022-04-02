// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Andriu Garcia',
  plugins: [
    {
      use: "gridsome-plugin-i18n",
      options: {
        locales: [ // locales list
          'es-es',
          'en-en'
        ],
        pathAliases: {
          'es-es': 'es',
          'en-en': 'en'
        },
        fallbackLocale: 'es-es', // fallback language
        defaultLocale: 'en-en', // default language
        enablePathRewrite: true, // rewrite path with locale prefix, default: true
        rewriteDefaultLanguage: true, // rewrite default locale, default: true
        messages: {
          'en-en': require('./src/locales/en-en.json'),
          'es-es': require('./src/locales/es-es.json'),

        }
      }
    }
  ],
  templates: {
    threadsList: [
      {
        path: '/blog/:id',
      }
    ]
  }
}
