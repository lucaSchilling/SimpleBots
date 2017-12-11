<template>
  <div class="container-fluid">
    <md-tabs md-sync-route md-alignment="fixed">

      <md-tab id="tab-launch" class="tabs" md-label="LAUNCH" to="/launch">
      </md-tab>

      <md-tab id="tab-history" class="tabs" md-label="HISTORY" to="/history">
      </md-tab>
      
      <md-tab id="tab-botarmy" class="tabs" md-label="BOTARMY" to="/botarmy">
      </md-tab>

      <md-tab id="tab-status" class="tabs" md-label="BOT STATUS" to="/status">
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
  .md-button.md-theme-default.md-raised:not([disabled]).md-primary {
    color: white;
  }
</style>