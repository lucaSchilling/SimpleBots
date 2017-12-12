<template>
  <div id="app">
     <tabs v-show="!('/' === this.$route.path)"></tabs>
    <router-view/>

  </div>
</template>

<script>
import tabs from './components/tabs.vue'

export default {
  components: {
    tabs
  },
  name: 'app'
}
</script>

<style>

</style>
