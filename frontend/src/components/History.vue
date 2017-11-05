<template>
    <div>
      <md-list class="custom-list md-triple-line">
      <bot-presentation botname='F.A.Q. Bot'></bot-presentation>
      <bot-presentation botname='Welcome Bot'></bot-presentation>
       <bot-presentation botname='F.A.Q. Bot'></bot-presentation>
      <bot-presentation botname='Welcome Bot'></bot-presentation>
      </md-list></div>
</template>

<script>
import BotPresentation from './BotPresentation.vue'

export default {
  name: 'History',
  data () {
    return {}
  },
  components: {
    BotPresentation
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
