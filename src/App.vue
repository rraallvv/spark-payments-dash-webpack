<template>
<div id="app">
  <span v-if='this.$route.path === "/"' @click="settings()" id="menu"><div class="hamburger" /></span>
  <span v-if='this.$route.path === "/settings" && isStored()' @click="cancel()" id="menu"><div class="close" /></span>
  <img class='logo' src='./assets/img/logo.png'>
  <span v-if='connected === true' id="status" class="green">•</span>
  <span v-else id="status" class="red">•</span>
  <div id="content">
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</div>
</template>

<script>
import translations from './assets/lang.json'
import router from './router'

export default {
  name: 'App',

  data () {
    return {
      connected: null,
      language: ''
    }
  },

  sockets: {
    // on socket connection
    connect: function () {
      console.log('connected to insight')
      this.connected = true
    },
    // on socket disconnect
    disconnect: function () {
      console.log('disconnected from insight')
      router.push('/connection')
      this.connected = false
    }
  },

  methods: {
    // check if settings are stored
    isStored: function () {
      return localStorage.getItem('account') && localStorage.getItem('password')
    },
    // check password and take us to settings page
    settings: async function () {
      router.push('/settings')
    },

    cancel: function () {
      router.replace('/')
    },

    play: function () {
      // ka-fucking-ching!
      let audio = new Audio(require('./assets/kaching.mp3'))
      let audioPromise = audio.play()

      if (audioPromise !== undefined) {
        audioPromise.then(_ => {
          // autoplay started!
        }).catch(error => {
          // autoplay was prevented
          console.log(error)
        })
      }
    }

  },
  // when component is created
  created () {
    // try to detect and set language automatically
    const lang = navigator.language.split('-')[0]
    if (!localStorage.getItem('language')) {
      localStorage.setItem('language', lang)
      this.$root.$data.settings.language = lang
    }
  },

  mounted () {
    this.language = translations[this.$root.$data.settings.language]

    // double check that we are connected
    if (this.connected === false) {
      router.push('/connection')
    }
  }

}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Barlow:300');

#content {
  margin: 0 auto;
  text-align: center;
}

#menu {
  color: #b2b2b2;
  font-size: 200%;
  position: absolute;
  top: 10px;
  left: 20px;
}

.hamburger {
    -webkit-mask: url("./assets/img/menu.svg") no-repeat;
    mask: url("./assets/img/menu.svg") no-repeat;
    width: 1em;
    height: 1em;
    background: #b2b2b2;
}

.close {
    -webkit-mask: url("./assets/img/close.svg") no-repeat;
    mask: url("./assets/img/close.svg") no-repeat;
    width: 1em;
    height: 1em;
    background: #b2b2b2;
}

#status {
  font-size: 300%;
  position: absolute;
  top: -3px;
  right: 20px;
}

.red {
  color: var(--red);
}

.green {
  color: var(--green);
}

/* @font-face {
  font-family: Barlow;
  src: url('./assets/fonts/barlow.ttf');
} */

@media (min-aspect-ratio: 1/2) {
  #app {
    width: 50vh;
    margin: auto;
  }

  body {
    font-size: 2.25vh !important;
  }
}

:root {
  --primary: #0087E8;
  --secondary: #6B6570;
  --background: #ededed;
  --info: #757575;
  --dark: #282727;
  --light: #fff;
  --red: #f10032;
  --green: #47cf73;
}

* {
  font-family: 'Barlow Semi Condensed',-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
  font-weight: 300;
  outline: none;
}

body {
  background: var(--background);
  padding: 0;
  width: 100%;
  margin: 0 auto;
  font-size: 4.5vw;
}

img {
  display: block;
  margin: 0 auto;
  width: 69.5%;
  height: auto;
}

.fade-enter-active {
  transition: all .3s ease;
}

.fade-leave-active {
  transition: opacity 0s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
  transform: translateX(10px);
}
</style>
