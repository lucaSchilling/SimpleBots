<template>
<div>
<template-header>
  </template-header>
<div class="card-holder">
  
  <template-presentation 
  title='Hi I´m the Welcome Bot' 
  subtitle='I will Welcome your customers and present him his options'
  content='Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam'
  moreContent='Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
  ></template-presentation>

  <templatepresentation 
  title='Hi I´m the F.A.Q. Bot' 
  subtitle='I will answer the frequently asked questions for you'
  content='Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam'
  moreContent='Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
  ></templatepresentation>
  <templatepresentation 
  title='Hi I´m the Task-Assist Bot'
  subtitle='I will execute a specific task for you'
  content='Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam'
    moreContent='Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
>
  
  </templatepresentation>

</div>
</div>
</template>

<script>
import templatepresentation from './templatepresentation.vue'
import templateheader from './templateheader.vue'

export default {
  name: 'templates',
  methods: {},
  components: {
    templatepresentation,
    templateheader
  },
  data () {
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card-holder {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
