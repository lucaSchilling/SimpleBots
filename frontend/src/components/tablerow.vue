<template>
    <md-table-row>
      <md-table-cell><md-switch v-model="status" @change='postSwitch' class="md-primary switchBar"></md-switch></md-table-cell>
      <md-table-cell><div v-bind:class="[status ? 'circleGreen' : 'circleYellow']"></div></md-table-cell>
      <md-table-cell>{{ID}}</md-table-cell>
      <md-table-cell>{{template}}</md-table-cell>
      <md-table-cell>{{name}}</md-table-cell>
      <md-table-cell>{{lastedit}}</md-table-cell>
      <md-table-cell> 
        <md-button id="delete" class="md-icon-button deleteButton" v-on:click='deleteBot'>
        <md-icon>delete</md-icon>
    </md-button>
      </md-table-cell>
    </md-table-row>
</template>

<script>
export default {
  name: 'tablerow',
  methods: {
    deleteBot: function () {
      this.$store.dispatch('delete', this.ID)
    },
    getAll: function () {
      this.getBots()
      this.getConfigs()
    },
    postStatus: function () {
      this.$store.dispatch('postStatus', this.ID)
    },
    postSwitch (boolean) {
      let object = {id: this.ID,
        status: boolean}
      this.$store.dispatch('postStatus', object)
    },
    getBots: function () {
      this.$store.dispatch('getBots')
    },
    getConfigs: function () {
      this.$store.dispatch('getConfigs')
    }
  },
  computed: {
    getStatus () {
      return this.$store.getters.getStatus(this.ID)
    }
  },
  props: ['ID', 'status', 'template', 'name', 'lastedit']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.circleYellow {
    background: yellow;
    width: 12px;
    height: 12px;
    border-radius: 50%;  
}
.circleGreen {
  background: green;
    width: 12px;
    height: 12px;
    border-radius: 50%;
}
</style>
