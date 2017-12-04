<template>
  <div id="app">
    <md-speed-dial :class="md-top-left" md-direction="bottom">
      <md-speed-dial-target>
        <md-icon>flag</md-icon>
      </md-speed-dial-target>

      <md-speed-dial-content>
        <md-button class="md-icon-button" v-on:click="german">
          <md-icon>note</md-icon>
        </md-button>

        <md-button class="md-icon-button" v-on:click="english">
          <md-icon>event</md-icon>
        </md-button>
      </md-speed-dial-content>
    </md-speed-dial>
     <tabs></tabs>
    <router-view/>
  </div>
</template>

<script>
import tabs from './components/tabs.vue'

export default {
  components: {
    tabs
  },
  methods: {
    german () {
      this.$i18n.set('de')
    },
    english () {
      this.$i18n.set('en')
    }
  },
  name: 'app'
}
</script>

<style>

</style>
