<template>
  <div class="container-fluid">
    <md-tabs md-sync-route md-alignment="fixed">
      <md-tab id="tab-launch" class="tabs" md-label="LAUNCH" to="/components/launch">
        <div id="launch">
          <h4 id="news">News</h4>
          <launch></launch>
        </div>
      </md-tab>
      
      <md-tab id="tab-botarmy" class="tabs" md-label="BOTARMY" to="/components/botarmy">
        <botarmy id="tab-botarmy2"></botarmy>
      </md-tab>

      <md-tab id="tab-status" class="tabs" md-label="BOT STATUS" to="/components/status">
       <tablehead></tablehead>
      </md-tab>
    </md-tabs>
  </div>
</template>

<script>
import launch from './launch.vue'
import botarmy from './botarmy.vue'
import tablehead from './tablehead.vue'

export default {
  name: 'tabs',
  components: {
    launch,
    botarmy,
    tablehead
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
  .md-button.md-theme-default.md-raised:not([disabled]).md-primary {
    color: white;
  }
</style>