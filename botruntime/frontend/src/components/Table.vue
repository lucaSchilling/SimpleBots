<template>
<div>
  <md-table-card>
  <md-toolbar>
    <h1 class="md-title">All Bots</h1>
    <md-button href="/dist/config/frontend" class="md-raised md-primary">Config</md-button>
    <md-button class="md-icon-button">
      <md-icon>search</md-icon>
    </md-button>
    <md-button id="refreshButton" class="md-icon-button" v-on:click='getAll'>
      <md-icon>refresh</md-icon>
    </md-button>

  </md-toolbar>
<md-table>
  <md-table-header>
    <md-table-row>
      <md-table-head></md-table-head>
      <md-table-head>Status</md-table-head>
      <md-table-head>ID</md-table-head>
      <md-table-head>Template</md-table-head>
      <md-table-head>Name</md-table-head>
      <md-table-head>Last Edit</md-table-head>
    </md-table-row>
  </md-table-header>

  <md-table-body id="tablebody">
    <tablerow v-for="bot in bots" v-bind:key='bot.ID'
              :ID = "bot.ID" 
              :status = "bot.status"
              :template = "bot.template"
              :name = "bot.name"  
              :lastedit = "bot.lastedit">
    </tablerow>
  </md-table-body>
</md-table>
  </md-table-card>
</div>
</template>

<script>
import tablerow from './tablerow'

export default {
  name: 'Table',
  methods: {
    getAll: function () {
      this.$store.dispatch('getAll')
    }
  },
  beforeMount () {
    this.getAll()
  },
  computed: {
    bots () {
      return this.$store.state.bots
    },
    getStatus () {
      return this.$store.getters.getStatus
    }
  },
  components: {
    tablerow
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
