<template>
<div>
  <md-table-card>
  <md-toolbar>
    <h1 class="md-title">All Bots</h1>
    <md-button href="/dist#/Test" class="md-raised md-primary">Config</md-button>
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
      <md-table-head md-sort-by="Status" class="tablehead">Status</md-table-head>
      <md-table-head md-sort-by="Template" class="tablehead">Template</md-table-head>
      <md-table-head md-sort-by="Name" class="tablehead">Name</md-table-head>
      <md-table-head md-sort-by="Language" class="tablehead">Language</md-table-head>
      <md-table-head md-sort-by="Client" class="tablehead">Client</md-table-head>
      <md-table-head md-sort-by="Last Edit" class="tablehead">Last Edit</md-table-head>
    </md-table-row>
  </md-table-header>

  <md-table-body>
    <tablerow 
    toggle='on'
    status='green'
    template='Welcome Bot'
    name='Botinator'
    language='english'
    client='Lieferheld'
    lastedit='a few seconds ago'>

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
    getAll () {
      axios.get('http://141.19.142.6:3000/getAll').then((response) => {
        alert('Status :' + response.status + 'Body: ' + response.body)
        console.log(response)
      })
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
