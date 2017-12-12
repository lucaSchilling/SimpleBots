<template>
  <div>

    <div id="logo">
      <img src="../../assets/logo.png">
    </div>

    <md-tabs md-sync-route md-alignment="fixed" id="tabs" >

      <md-tab id="tab-launch" class="tabs" :md-label="this.$t('tabs.launch')" to="/launch">
      </md-tab>

      <md-tab id="tab-history" class="tabs" :md-label="this.$t('tabs.history')" to="/history">
      </md-tab>
      
      <md-tab id="tab-botarmy" class="tabs" :md-label="this.$t('tabs.botarmy')" to="/botarmy">
      </md-tab>

      <md-tab id="tab-status" class="tabs" :md-label="this.$t('tabs.botStatus')" to="/status">
      </md-tab>

    </md-tabs>

    <div id="logout">
      <md-button class="md-primary" @click="logout">logout</md-button>
    </div>

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
  },
  methods: {
    logout: function () {
      localStorage.clear()
      this.$router.push('/')
    }
  }
}
</script>

<style>

  #logo {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 200px;
    z-index: 3;
  }
  #logout {
    position: fixed;
    top: 0px;
    right: 0px;
    z-index: 2;
  }

  #news {
    color: #e47e25;
  }
  .md-button.md-theme-default.md-raised:not([disabled]).md-primary {
    color: white;
  }
  #tabs {
    position: fixed;
    z-index: 2;
    width: 100vw;
    top: 0px;
  }
  #tabdiv {
    float: right;
  }
</style>