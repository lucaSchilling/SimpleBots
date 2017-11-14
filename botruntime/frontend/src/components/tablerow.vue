<template>
    <md-table-row>
      <md-table-cell><md-switch v-bind="boolean" @change='postSwitch' class="md-primary"></md-switch></md-table-cell>
      <md-table-cell><div id="circle"></div></md-table-cell>
      <md-table-cell>{{ID}}</md-table-cell>
      <md-table-cell>{{template}}</md-table-cell>
      <md-table-cell>{{name}}</md-table-cell>
      <!--<md-table-cell>{{language}}</md-table-cell>-->
      <!--<md-table-cell>{{client}}</md-table-cell>-->
      <md-table-cell>{{lastedit}}</md-table-cell>
      <md-table-cell> 
        <md-button class="md-icon-button" v-on:click='deleteBot'>
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
      // this.$store.dispatch('getAll')
    },
    postStatus: function () {
      this.$store.dispatch('postStatus', this.ID)
    },
    postSwitch (boolean) {
      let object = {id: this.ID,
        status: boolean}
      this.$store.dispatch('postStatus', object)
    }
  },
  computed: {
    getStatus () {
      alert(this.boolean)
      return this.$store.getters.getStatus(this.ID)
    }
  },

  props: ['ID', 'status', 'template', 'name', 'lastedit']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#circle {
    background: yellow;
    width: 12px;
    height: 12px;
    border-radius: 50%;  
}
</style>