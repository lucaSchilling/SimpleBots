<template>
  <div class="container-fluid">
    <md-tabs md-sync-route md-alignment="fixed">

      <md-tab id="tab-launch" class="tabs" :md-label="this.$t('tabs.launch')" to="/launch">
      </md-tab>

      <md-tab id="tab-history" class="tabs" :md-label="this.$t('tabs.history')" to="/history">
      </md-tab>
      
      <md-tab id="tab-botarmy" class="tabs" :md-label="this.$t('tabs.botarmy')" to="/botarmy">
      </md-tab>

      <md-tab id="tab-status" class="tabs" :md-label="this.$t('tabs.botStatus')" to="/status">
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