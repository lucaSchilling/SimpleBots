<template>
    <div>
     <md-list class="custom-list md-triple-line">
      <botpresentation botname='F.A.Q. Bot'></botpresentation>
      <botpresentation botname='Welcome Bot'></botpresentation>
       <botpresentation botname='F.A.Q. Bot'></botpresentation>
      <botpresentation botname='Welcome Bot'></botpresentation>
      </md-list></div>
    </div>
</template>

<script>
import botpresentation from './BotPresentation.vue'

export default {
  name: 'history',
  data () {
    return {}
  },
  components: {
    botpresentation
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.custom-list{
    max-width: 300px;
    width: 300px;
  }
</style>
