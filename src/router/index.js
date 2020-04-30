import Vue from 'vue'
import Router from 'vue-router'
import Charge from '@/views/Charge'
import Qr from '@/views/Qr'
import Confirmed from '@/views/Confirmed'
import Donate from '@/views/Donate'
import Settings from '@/views/Settings'
import Connection from '@/views/Connection'
import swal from 'sweetalert'
import translations from '../assets/lang.json'
let bitcoin = require('bitcoinjs-lib')

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Charge',
      component: Charge
    },
    {
      path: '/sale/confirmed/:status',
      name: 'Confirmed',
      component: Confirmed
    },
    {
      path: '/sale/:amount',
      name: 'Qr',
      component: Qr
    },
    {
      path: '/donate',
      name: 'Donate',
      component: Donate
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
      beforeEnter: async (to, from, next) => {
        await Vue.nextTick()
        const language = translations[router.app.$root.$data.settings.language]
        // for backwards compatibility (for now), we only ask for password if password exists
        if (localStorage.getItem('password') !== null) {
          let pw = await swal({
            title: language.errors.enter,
            buttons: [true, 'Ok'],
            content: {
              element: 'input',
              attributes: {
                type: 'password'
              }
            }
          })
          pw = bitcoin.crypto.sha256(pw).join('')
          // if password matches, show settings
          if (pw === localStorage.getItem('password')) {
            next()
            return
          }
          // if password doesn't match and one was typed, it's wrong - show user
          if (pw !== null) {
            await swal('Error!', language.errors.wrong, 'error')
            next('/')
          }
        } else {
          next()
        }
      }
    },
    {
      path: '/connection',
      name: 'Connection',
      component: Connection
    }
  ]
})

export default router
