<template>
  <div id="app">
     <tabs v-show="!('/' === this.$route.path)"></tabs>
    <router-view/>
  </div>
</template>

<script>
import tabs from './components/general/tabs.vue'

export default {
  components: {
    tabs
  },
  updated () {
    if (localStorage.getItem('lang') !== null) {
      this.$i18n.set(localStorage.getItem('lang'))
    }
  },
  name: 'app'
}
</script>

<style>

</style>
