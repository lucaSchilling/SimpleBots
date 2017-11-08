<template>
<div>
  <md-table-card>
  <md-toolbar>
    <h1 class="md-title">All Bots</h1>
    <md-button href="/dist/config/frontend" class="md-raised md-primary">Config</md-button>
    <md-button class="md-icon-button">
      <md-icon>search</md-icon>
    </md-button>
    <md-button class="md-icon-button" v-on:click='getAll'>
      <md-icon>refresh</md-icon>
    </md-button>

  </md-toolbar>
<md-table md-sort="Status">
  <md-table-header>
    <md-table-row>
      <md-table-head></md-table-head>
      <md-table-head md-sort-by="Status">Status</md-table-head>
      <md-table-head md-sort-by="id" class="tablehead">ID</md-table-head>
      <md-table-head md-sort-by="Template" class="tablehead">Template</md-table-head>
      <md-table-head md-sort-by="Name" class="tablehead">Name</md-table-head>
      <md-table-head md-sort-by="Last Edit" class="tablehead">Last Edit</md-table-head>
    </md-table-row>
  </md-table-header>

  <md-table-body id="tablebody">
    <tablerow v-for="bot in bots" v-bind:key="5" :toggle = "bot.toggle"
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
var axios = require('axios')

export default {
  name: 'Table',
  methods: {
    addBot (id, template, name, lastedit) {
      this.bots.push({ID: id, template: template, name: name, lastedit: lastedit})
    },
    removeBots () {
      this.bots = []
    },
    removeBot (id) {
      this.bots.splice(this.bots.findIndex(function (bot) {
        return bot.ID === id
      }), 1)
    },
    getAll () {
      axios.get('http://141.19.142.6:3000/getAll').then((response) => {
        this.removeBots()
        for (var i = 0; i < response.data.length; i++) {
          this.addBot(response.data[i]._id, response.data[i].template, response.data[i].name, response.data[i].lastEdit)
        }
      })
    }
  },
  beforeMount () {
    this.getAll()
  },
  data () {
    return {
      bots: []
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
