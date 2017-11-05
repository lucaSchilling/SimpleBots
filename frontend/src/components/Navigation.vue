<template>
<div>
  <md-toolbar>
    <md-button class="md-icon-button" @click="toggleLeftSidenav">
      <md-icon>menu</md-icon>
    </md-button>

    <h2 class="md-title">Bot Configuration</h2>
  </md-toolbar>

  <md-sidenav class="md-left" ref="leftSidenav" @open="open('Left')" @close="close('Left')">
    <md-toolbar class="md-small">
      <div class="md-toolbar-container">
        <h3 class="md-title">Navigation</h3>
      </div>
    </md-toolbar>
    <md-list>
       <md-list-item id='HomeButton'>
    <router-link to="/" exact>Home</router-link>
      </md-list-item>
      <md-list-item id='TemplatesButton'>
    <router-link to="Templates">Templates</router-link>
      </md-list-item>
      <md-list-item id='TestButton'>
    <router-link to="Test">Test</router-link>
      </md-list-item>
    </md-list>
  </md-sidenav>
</div>
</template>

<script>
export default {
  methods: {
    toggleLeftSidenav () {
      this.$refs.leftSidenav.toggle()
    },
    open (ref) {
      console.log('Opened: ' + ref)
    },
    close (ref) {
      console.log('Closed: ' + ref)
    }
  },
  name: 'Navigation',
  data () {
    return {}
  }
}
</script>

<style scoped>

</style>
