<template>
<div>
  <form novalidate @submit.stop.prevent="submit">
  <md-input-container>
    <label>__id</label>
    <md-input v-model="__id"></md-input>
  </md-input-container>


  <md-input-container>
    <label>template</label>
    <md-input v-model="template"></md-input>
  </md-input-container>

  <md-input-container>
    <label>name</label>
    <md-input v-model="name"></md-input>
  </md-input-container>

  <md-input-container>
    <label>lastEdit</label>
    <md-input v-model="lastEdit"></md-input>
  </md-input-container>
</form>

<button v-on:click="deploy">Deploy</button>
</div>
</template>

<<script>
var axios = require('axios')

export default {
  name: 'botconfig',
  data () {
    return {
      __id: '',
      template: '',
      name: '',
      lastEdit: ''
    }
  },
  methods: {
    deploy () {
      axios.post('http://141.19.142.6:3000/deploy', {
        '__id': this.__id,
        'template': this.template,
        'name': this.name,
        'lastEdit': this.lastEdit
      }).then(function (response) {
        alert(response.status)
      })
    }
  }
}
</script>

<style>

</style>
