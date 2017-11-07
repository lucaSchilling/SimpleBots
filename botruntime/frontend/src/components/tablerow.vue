<template>
    <md-table-row>
      <md-table-cell><md-switch v-model="checked0" id="my-test0" name="my-test0" @change="postStatus"></md-switch></md-table-cell>
      <md-table-cell><div id="circle"></div></md-table-cell>
      <md-table-cell>{{ID}}</md-table-cell>
      <md-table-cell>{{template}}</md-table-cell>
      <md-table-cell>{{name}}</md-table-cell>
      <!--<md-table-cell>{{language}}</md-table-cell>-->
      <!--<md-table-cell>{{client}}</md-table-cell>-->
      <md-table-cell>{{lastedit}}</md-table-cell>
      <md-table-cell> 
        <md-button class="md-icon-button" v-on:click='this.delete'>
        <md-icon>delete</md-icon>
    </md-button>
      </md-table-cell>
    </md-table-row>
</template>

<script>
var axios = require('axios')

export default {
  name: 'tablerow',
  methods: {
    postStatus (boolean) {
      axios.post('http://141.19.142.6:3000/setStatus', {
        _id: this.ID,
        status: boolean
      }).then(function (response) {
        alert(response.status)
      })
    },
    delete () {
      axios.delete('http://141.19.142.6:3000/delete', {
        _id: this.ID
      }).then(function (response) {
        if (response.status === 200) {

        }
      })
    }
  },
  data () {
    return {
    }
  },
  props: ['ID', 'status', 'template', 'name', 'lastedit']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#circle {
    background: #008000;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    
}
</style>