<template>
  <div>
    <br>
    <p>{{ language.payment_received }}&nbsp;
      <img v-if="locked === 'true'" id="lock" src="../assets/img/locked.png">
      <img v-else id="lock" src="../assets/img/unlocked.png">
    </p>
    <br>
    <img src='../assets/img/confirm.png'>
    <br>
    <p>{{ language.thanks }}</p>
    <br>
    <button v-if="!web" @click="done">{{ language.done }}</button>
  </div>
</template>

<script>
import router from '../router'
import translations from './../assets/lang.json'
import * as spark from './../assets/js/helpers'

export default {
  name: 'Confirmed',

  data () {
    return {
      locked: '0',
      language: '',
      address: ''
    }
  },

  methods: {
    done: function () {
      // navigate home
      router.replace('/')
    }
  },

  computed: {
    web: function () {
      if (this.$route.query.platform === 'web') {
        return true
      } else {
        return false
      }
    }
  },

  async created () {
    // set the status
    this.locked = this.$route.params.status
    // get address
    this.address = this.$route.query.address || await spark.getAddress(this.$root.$data.settings.account)
    // stop listening for tx events
    this.$socket.emit('unsubscribe', this.address.replace(/ /g, ''))
    console.log('not listening')
    // update xpub index on successful tx
    let index = localStorage.getItem('index')
    index = parseFloat(index) + 1
    localStorage.setItem('index', index)
  },

  mounted () {
    this.$parent.play()
    // set language
    this.language = translations[this.$root.$data.settings.language]
  }

}
</script>

<style scoped>
  p {
    color: var(--dark);
    margin: 1% auto;
    width: 92%;
    text-align: center;
    font-size: 1.85em;
  }
  #lock {
    width: 0.76em;
    display: inline;
  }
  /* charge button */
  button {
    font-size: 180%;
    color: #fff;
    margin: 0.75em;
    border-radius: 0.4em;
    width: 80%;
    height: 2.47em;
    border: 1px solid var(--primary);
    background: var(--primary);
  }

  button:active {
    transform: scale(0.9);
  }
</style>
