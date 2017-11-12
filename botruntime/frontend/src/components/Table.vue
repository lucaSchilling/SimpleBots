<template>
<div>
  <md-table-card>
  <md-toolbar>
    <h1 class="md-title">All Bots</h1>
    <md-button href="/dist/config/frontend" class="md-raised md-primary">Config</md-button>
    <md-button class="md-icon-button">
      <md-icon>search</md-icon>
    </md-button>
    <md-button class="md-icon-button" v-on:click='getBots'>
      <md-icon>refresh</md-icon>
    </md-button>

  </md-toolbar>
<md-table md-sort="Status">
  <md-table-header>
    <md-table-row>
      <md-table-head></md-table-head>
      <md-table-head>Status</md-table-head>
      <md-table-head class="tablehead">ID</md-table-head>
      <md-table-head class="tablehead">Template</md-table-head>
      <md-table-head class="tablehead">Name</md-table-head>
      <md-table-head class="tablehead">Last Edit</md-table-head>
    </md-table-row>
  </md-table-header>

  <md-table-body id="tablebody">
    <tablerow v-for="bot in bots" v-bind:key="5"
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
  computed: {
    bots () {
      return this.$store.state.bots
    }
  },
  name: 'Table',
  methods: {
    removeBot (id) {
      this.bots.splice(this.bots.findIndex(function (bot) {
        return bot.ID === id
      }), 1)
    }

  },
  data () {
    return {
    }
  },
  components: {
    tablerow
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tablehead {
  text-align: center
}


</style>
