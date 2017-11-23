<template>
<div>
  <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="Search by Botname..." v-model="search" @input="searchOnTable" />
        </md-field>
  <md-table>
      <md-table-row>
      <md-table-head></md-table-head>
      <md-table-head>Status</md-table-head>
      <md-table-head>ID</md-table-head>
      <md-table-head>Template</md-table-head>
      <md-table-head>Name</md-table-head>
      <md-table-head>Last Edit</md-table-head>
    </md-table-row>
    <tablerow v-for="bot in bots" v-bind:key='bot.ID'
              :ID = "bot.ID" 
              :status = "bot.status"
              :template = "bot.template"
              :name = "bot.name"  
              :lastedit = "bot.lastedit">
    </tablerow>
  </md-table>
</div>
</template>
  
<script>
import tablerow from './tablerow.vue'

const toLower = text => {
  return text.toString().toLowerCase()
}

const searchByName = (items, term) => {
  if (term) {
    return items.filter(item => toLower(item.name).includes(toLower(term)))
  }
  return items
}
export default {
  name: 'tablehead',
  data: () => ({
    search: null
  }),
  methods: {
    getAll: function () {
      this.$store.dispatch('getAll')
    },
    searchOnTable () {
      this.searched = searchByName(this.bots, this.search)
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

<style>

</style>
