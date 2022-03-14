// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import DefaultLayout from '~/layouts/Default.vue'
import colors from 'vuetify/es5/util/colors';



export default function (Vue, { appOptions, router, head, isClient }) {

  head.link.push({
    rel: 'stylesheet',
    href: 'https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css',
  })

  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@100;300;400;500;600;700&display=swap',
  })

  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900',
  });

  Vue.use(Vuetify)

  appOptions.vuetify = new Vuetify({
    theme: {
      themes: {
        light: {
          primary: '#FFC764',
          secundary: '#F0134D',
          twitter: '#00acee',
          linkedin: '#0e76a8'
        }
      }
    }
  });

  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
}
