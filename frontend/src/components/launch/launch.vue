<template>
<div id="tab">
  <div id="launch">
    <h4 id="news">{{$t('launch.news')}}</h4>
  <video controls id="launchvideo">
    <source src="../../../assets/simplebots.mp4" type="video/mp4">
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
  data: () => ({
    bool: false
  }),
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

  #launchvideo {
    width: 63vw;
  }

.md-content {   
    width: 30vw;
    height: 35vh;
    margin: 10px;
    display: flex;
}

#text, #news {
  color: #f68b1f;
}
#launch {
  background: transparent;
  margin: 0 auto;
  clear:both;
  padding-block-end: 50px;
  position: absolute;
  width: 80vw;
  top: 48px;
  left: 18vw;
}
</style>