<template>
  <div>

    <md-tabs md-sync-route md-alignment="fixed" id="tabs" @md-changed="setUndone">


      <md-tab id="tab-launch" class="tabs" :md-label="this.$t('tabs.launch')" to="/launch">
      </md-tab>

      <md-tab id="tab-history" class="tabs" :md-label="this.$t('tabs.history')" to="/history">
      </md-tab>
      
      <md-tab id="tab-botarmy" class="tabs" md-label="SIMPLEBOTS" to="/simplebots">
      </md-tab>

      <md-tab id="tab-status" class="tabs" :md-label="this.$t('tabs.botStatus')" to="/status">
      </md-tab>

    </md-tabs>

    <div id="themeswitch">
      <span class="clickable" v-if="theme === false" @click="changeTheme"><md-icon class="md-primary">wb_sunny</md-icon></span>
      <span class="clickable" v-else  @click="changeTheme"><md-icon>brightness_3</md-icon></span>
    </div>

    <div id="logout">
      <md-button class="md-primary" @click="logout">{{$t('tabs.logout')}}</md-button>
    </div>

  </div>
</template>

<script>
import Vue from 'vue'
import launch from '../launch/launch.vue'
import botarmy from '../simplebots/simplebots.vue'
import tablehead from '../botstatus/tablehead.vue'

export default {
  name: 'tabs',
  components: {
    launch,
    botarmy,
    tablehead
  },
  computed: {
    theme: {
      get () {
        return this.$store.state.general.theme
      },
      set (val) {
        this.$store.commit('setTheme', val)
      }
    }
  },
  methods: {
    logout: function () {
      localStorage.clear()
      this.$router.push('/')
      location.reload()
    },
    changeTheme () {
      this.theme = !this.theme
      if (this.theme) {
        Vue.material.theming.theme = 'night'
      } else {
        Vue.material.theming.theme = 'default'
      }
      localStorage.setItem('theme', this.theme)
    },
    setUndone (activeTab) {
      if (activeTab === 'tab-botarmy') {
        this.$store.commit('setUndone', 'first')
        this.clear()
      }
    },
    clear () {
      this.$store.commit('clear')
    }
  }
}
</script>

<style>
  #logout {
    position: fixed;
    top: 0px;
    right: 0px;
    z-index: 3;
  }

  #news {
    color: #e47e25;
  }
  .md-button.md-theme-default.md-raised:not([disabled]).md-primary {
    color: white;
  }
  #tabs {
    position: fixed;
    z-index: 3;
    width: 100vw;
    top: 0px;
  }
  #tabdiv {
    float: right;
  }
  #themeswitch {
    position: fixed;
    top: 13px;
    left: 13px;
    z-index: 3;
  }
  .clickable {
    cursor: pointer;
  }
</style>