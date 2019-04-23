import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios'
import './plugins/vuetify'
import VeeValidate from 'vee-validate'
import App from './App.vue'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'
import VueI18n from 'vue-i18n'
import lang from './lang'

// LANG
import veeEs from 'vee-validate/dist/locale/es'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

const i18n = new VueI18n({
  locale: 'es',
  fallbackLocale: 'en',
  messages: lang
})

Vue.use(VeeValidate, {
  i18n,
  dictionary: {
    es: veeEs
  }
})

sync(store, router)
