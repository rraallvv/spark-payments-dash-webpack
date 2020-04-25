import Vue from 'vue'
import App from './App'
import router from './router'
import socketio from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'

const env = 'testnet'

// mainnet: https://safe.nimiq.com - testnet: https://safe.nimiq-testnet.com
Vue.prototype.$safeUrl = env === 'mainnet' ? 'https://safe.nimiq.com' : 'https://safe.nimiq-testnet.com'

// mainnet: https://hub.nimiq.com - testnet: https://hub.nimiq-testnet.com
Vue.prototype.$hubUrl = env === 'mainnet' ? 'https://hub.nimiq.com' : 'https://hub.nimiq-testnet.com'

// mainnet: https://insight.nimizuela.org:443 - testnet: https://testnet-insight.nimizuela.org:443
export const url = env === 'mainnet' ? socketio('https://insight.nimizuela.org:443') : socketio('https://testnet-insight.nimizuela.org:443')

Vue.use(VueSocketIO, url)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
    settings: {
      account: localStorage.getItem('account') || '',
      password: '',
      language: localStorage.getItem('language') || 'en',
      currency: localStorage.getItem('currency') || 'USD',
      format: localStorage.getItem('format') || 'nimiq'
    }
  },
  created () {
    // if device is offline, show connection page
    window.addEventListener('offline', function () {
      router.push('/connection')
    })
    // if device comes online, show connection page
    window.addEventListener('online', function () {
      router.push('/')
    })
  },
  router,
  components: { App },
  template: '<App/>'
})
