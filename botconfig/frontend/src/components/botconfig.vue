<template>
<div>
  <form novalidate @submit.stop.prevent="submit">
  <md-input-container id="_id">
    <label>_id</label>
    <md-input v-model="_id"></md-input>
  </md-input-container>

 <md-input-container id="welcomeMessage">
    <label>WelcomeMessage</label>
    <md-input v-model="welcomeMessage"></md-input>
  </md-input-container>

   <md-input-container id="options">
    <label>options</label>
    <md-input v-model="options"></md-input>
  </md-input-container>


  <md-input-container id="template">
    <label>template</label>
    <md-input v-model="template"></md-input>
  </md-input-container>

  <md-input-container id="name">
    <label>name</label>
    <md-input v-model="name"></md-input>
  </md-input-container>

  <md-input-container id="lastEdit">
    <label>lastEdit</label>
    <md-input v-model="lastEdit"></md-input>
  </md-input-container>

</form>

<button v-on:click="deploy" v-on:keyup.13="deploy" id="deployButton">Deploy</button>
</div>
</template>

<<script>
var axios = require('axios')

export default {
  name: 'botconfig',
  data () {
    return {
      _id: '',
      template: '',
      welcomeMessage: '',
      options: '',
      name: '',
      lastEdit: ''
    }
  },
  methods: {
    deploy () {
      axios.post('http://localhost:3000/deploy', {
        '_id': this._id,
        'template': this.template,
        'name': this.name,
        'lastEdit': this.lastEdit,
        'welcomeMessage': this.welcomeMessage,
        'options': [{'message': this.options}]
      }).then(function (response) {
        alert(response.status)
        if (response.status === 200) {
          this._id = ''
          this.template = ''
          this.name = ''
          this.lastEdit = ''
          this.name = ''
          this.lastEdit = ''
        }
      })
    }
  }
}
</script>

<style>

</style>
