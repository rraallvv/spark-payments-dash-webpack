<template>
  <div id="connection">
    <h1 id='red'>{{ language.connected }}</h1>
    <h1 id='dark'>{{ language.internet }}</h1>
  </div>
</template>

<script>
import router from '../router'
import translations from './../assets/lang.json'

export default {
  name: 'Connection',

  data () {
    return {
      language: ''
    }
  },

  sockets: {
    connect: function () {
      if (localStorage.getItem('account')) {
        router.replace('/')
      } else {
        router.replace('/settings')
      }
    }
  },

  mounted () {
    this.language = translations[this.$root.$data.settings.language]
  }

}
</script>

<style scoped>
  h1 {
    font-size: 2.45em;
    text-align: center;
  }

  #red {
    color: var(--red);
  }

  #dark {
    color: var(--dark);
  }
</style>
