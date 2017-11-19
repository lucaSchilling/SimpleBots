<template>
<div>
  <video width="800" controls>
    <source src="../../assets/intro.mp4" type="video/mp4">
  </video>
  <div class="elevation-demo" align="center">
    <md-content class="md-elevation-2"><elevationcontent></elevationcontent></md-content>
    <md-content class="md-elevation-2"><elevationcontent></elevationcontent></md-content>
  </div>
</div>
</template>

<script>
import elevationcontent from './elevationcontent.vue'

export default {
  name: 'launch',
  components: {
    elevationcontent
  }
}
</script>
  <style lang="scss" scoped>
  .elevation-demo {
    display: flex;
  }

  .md-content {
.md-content{   
    width: 390px;
    height: 300px;
    margin: 10px;
    display: flex;
}
  }
</style>