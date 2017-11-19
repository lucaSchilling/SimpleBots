<template>
  <div>
    <md-tabs md-sync-route md-alignment="fixed">
      <md-tab id="tab-launch" class="tabs" md-label="LAUNCH" to="/components/launch">
        <div id="launch">
          <p id="news">News</p>
          <launch></launch></div>
      </md-tab>

      <md-tab id="tab-botarmy" class="tabs" md-label="BOTARMY" to="/components/botarmy">
      
      </md-tab>

      <md-tab id="tab-status" class="tabs" md-label="BOT STATUS" to="/components/status">
       
      </md-tab>
    </md-tabs>
  </div>
</template>

<script>
import launch from './launch.vue'

export default {
  name: 'tabs',
  components: {
    launch
  }
}
</script>

<style>
  #news {
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