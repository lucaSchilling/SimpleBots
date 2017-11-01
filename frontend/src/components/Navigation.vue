<template>
 <div>
<md-tabs md-fixed>
  <md-tab id="movies" md-label="Launch">
   <Templates></Templates>
  </md-tab>

  <md-tab id="music" md-label="Clients">
    <Clients></Clients>
  </md-tab>

  <md-tab id="books" md-label="Bots Status">
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas.</p>
  </md-tab>
</md-tabs>
    </div>
</template>

<script>
import Templates from './Templates.vue'
import Clients from './Clients.vue'

export default {
  methods: {
    create: function () {
      this.$router.push('/templates')
    }
  },
  components: {
    Templates, Clients
  },
  name: 'Navigation',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
