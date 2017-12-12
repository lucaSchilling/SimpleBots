<template>
  <div to='/history'>
      <h1>{{$t('history.ourBots')}}</h1>
      <div class="cardDiv">
          <div class="left" v-for="bot in history" v-bind:key="bot">
        <md-card>
          <md-card-header>
            <div class="md-title">
                <md-menu md-direction="bottom-start" class="menu">
                  <md-button md-menu-trigger class="md-icon-button">
                    <md-icon>more_vert</md-icon>
                  </md-button>

                  <md-menu-content>
                    <md-menu-item><span class="span" @click="setBotInfo(bot)">{{$t('history.info')}}</span></md-menu-item>
                    <md-menu-item><span class="span" @click="edit(bot)">{{$t('history.edit')}}</span></md-menu-item>
                    <md-menu-item><span class="span" @click="clone(bot)">{{$t('history.clone')}}</span></md-menu-item>
                  </md-menu-content>
                </md-menu>
            </div>
          </md-card-header>

          <md-card-content>
            <img src="../../assets/bot_lila.jpg" v-if="bot.template === 'FAQ Bot'"></img>
            <img src="../../assets/bot_gelb.jpg" v-else-if="bot.template === 'Welcome Bot'"></img>
          </md-card-content>

          <h3 class = "name">{{bot.name}}</h3>

        </md-card>
        </div>
      </div>
      <md-speed-dial md-direction="bottom" id="dial">
      <md-speed-dial-target to="/botarmy">
        <md-icon>add</md-icon>
      </md-speed-dial-target>
      </md-speed-dial>

      <md-dialog :md-active.sync="showDialog">
        <md-dialog-title>Information</md-dialog-title>

        <p class="padding"><strong>Name:</strong> {{botInfo.name}}</p>
        <p class="padding"><strong>Template:</strong> {{botInfo.template}}</p>
        <p class="padding"><strong>Last edited:</strong> {{botInfo.lastedit}}</p>
        
        <md-dialog-actions>
          <md-button class="md-primary" @click="showDialog = false">Close</md-button>
        </md-dialog-actions>
      </md-dialog>

      <md-dialog :md-active.sync="showDialogClone">
        <md-dialog-title>Clone - Are you sure?</md-dialog-title>
        <md-dialog-actions>
          <md-button class="md-primary" @click="showDialogClone = false">Close</md-button>
          <md-button class="md-primary" @click="deploy">Clone</md-button>
        </md-dialog-actions>
      </md-dialog>
      
      
      
  </div>
</template>

<script>
export default {
  name: 'history',
  data: () => ({
    showDialog: false,
    showDialogClone: false,
    botInfo: {}
  }),
  computed: {
    history: {
      get () {
        return this.$store.state.history
      }
    },
    template: {
      get () {
        return this.$store.state.template
      },
      set (val) {
        this.$store.commit('setTemplate', val)
      }
    },
    name: {
      get () {
        return this.$store.state.name
      },
      set (val) {
        this.$store.commit('setName', val)
      }
    },
    welcomeMessage: {
      get () {
        return this.$store.state.welcomeMessage
      },
      set (val) {
        this.$store.commit('setWelcomeMessage', val)
      }
    },
    treeData: {
      get () {
        return this.$store.state.treeData
      },
      set (val) {
        this.$store.commit('setTreeData', val)
      }
    },
    entities: {
      get () {
        return this.$store.state.entities
      },
      set (val) {
        this.$store.commit('setEntities', val)
      }
    },
    intents: {
      get () {
        return this.$store.state.intents
      },
      set (val) {
        this.$store.commit('setIntents', val)
      }
    },
    examples: {
      get () {
        return this.$store.state.examples
      },
      set (val) {
        this.$store.commit('setExamples', val)
      }
    }
  },
  methods: {
    getAll: function () {
      this.$store.dispatch('getAll')
    },
    setBotInfo: function (bot) {
      this.showDialog = true
      this.botInfo = bot
    },
    clone: function (bot) {
      this.template = bot.template
      this.name = bot.name
      this.welcomeMessage = bot.welcomeMessage
      if (bot.template === 'Welcome Bot') {
        this.treeData.options = bot.options.options
      } else if (bot.template === 'FAQ Bot') {
        this.intents = bot.intents
        this.entities = bot.entities
        this.examples = bot.examples
      }
      this.showDialogClone = true
    },
    deploy: function () {
      this.$store.dispatch('deploy')
      this.clear()
      this.showDialogClone = false
      this.$router.push('/status')
    },
    edit: function (bot) {
      this.$router.push('/botarmy')
      this.setDone({id: 'first', index: 'second'})
      this.template = bot.template
      this.name = bot.name
      this.welcomeMessage = bot.welcomeMessage
      if (bot.template === 'Welcome Bot') {
        this.treeData.options = bot.options
      } else if (bot.template === 'FAQ Bot') {
        this.intents = bot.intents
        this.entities = bot.entities
        this.examples = bot.examples
      }
    },
    setDone (object) {
      this.$store.commit('setDone', object)
    },
    clear: function () {
      this.$store.commit('clear')
    }
  },
  beforeMount () {
    this.getAll()
  }
}
</script>

<style>
h1, .md-title, .span:hover {
    color: #f68b1f
}
.menu {
    float: right;
}
.left {
    width: 20%;
    float: left;
    margin-right: 3%;
    margin-top: 3%;
}
.cardDiv {
    margin-left: 3%;
}
span {
    cursor: pointer;
}
#dial {
    position: absolute;
    bottom: 5%;
    right: 5%;
}
.padding {
  padding-left: 5%;
}
.name {
  text-align: center;
  color: #f68b1f
}
</style>
