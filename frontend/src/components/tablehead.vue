<template>
<div id="tablediv">
  <md-table>
      <md-table-row>
      <md-table-head></md-table-head>
      <md-table-head>{{$t('tableHead.status')}}</md-table-head>
      <md-table-head>{{$t('tableHead.id')}}</md-table-head>
      <md-table-head>{{$t('tableHead.template')}}</md-table-head>
      <md-table-head>{{$t('tableHead.name')}}</md-table-head>
      <md-table-head>{{$t('tableHead.lastEdit')}}</md-table-head>
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
    getBots: function () {
      this.$store.dispatch('getBots')
    },
    searchOnTable () {
      this.searched = searchByName(this.bots, this.search)
    }
  },
  beforeMount () {
    this.getBots()
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
#tablediv {
  position: fixed;
  z-index: 2;
  width: 100vw;
  top: 48px;
}
</style>
