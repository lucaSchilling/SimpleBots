<template>
<div id="tab">
  <div id="launch">
          <h4 id="news">{{$t('launch.news')}}</h4>
  <video width="800" controls>
    <source src="../../assets/intro.mp4" type="video/mp4">
  </video>
  <h4 id="text">Bots</h4>
  <div class="elevation-demo" align="center">
    <md-content class="md-elevation-5"><elevationWelcome></elevationWelcome></md-content>
    <md-content class="md-elevation-5"><elevationFAQ></elevationFAQ></md-content>
  </div>
  </div>
</div>
</template>

<script>
import elevationWelcome from './elevationWelcome.vue'
import elevationFAQ from './elevationFAQ.vue'

export default {
  name: 'launch',
  components: {
    elevationWelcome,
    elevationFAQ
  }
}
</script>
  <style lang="scss" scoped>
  .elevation-demo {
    display: flex;
  }

.md-content{   
    width: 390px;
    height: 300px;
    margin: 10px;
    display: flex;
}

#text {
  color: #e47e25;
}
#launch {
  background: transparent;
  width: 800px;
  margin: 0 auto;
  clear:both;
  padding-block-end: 50px;
}
</style>