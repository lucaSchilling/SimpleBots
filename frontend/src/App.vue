<template>
  <div id="app">
     <Navigation> </Navigation>
     <History></History>
    <router-view/>
  </div>
</template>

<script>
import Navigation from './components/Navigation.vue'
import History from './components/History.vue'

export default {
  components: {
    Navigation, History
  },
  name: 'app'
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
