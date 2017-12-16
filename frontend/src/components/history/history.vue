<template>
  <div to='/history' id="historydiv">
    <h1 id="our">{{$t('history.ourBots')}}</h1>
    <div class="cardDiv">
      <div class="left" v-for="bot in history" v-bind:key="bot">

        <md-dialog :md-active.sync="active">
          <md-dialog-title>{{$t('history.title')}}</md-dialog-title>

          <p id="content">{{$t('history.content')}}</p>

          <md-dialog-actions>
            <md-button class="md-primary" @click="active = false">{{$t('tablerow.cancel')}}</md-button>
            <md-button class="md-primary" @click="deleteConfig(id)">{{$t('tablerow.confirm')}}</md-button>
          </md-dialog-actions>
        </md-dialog>

        <md-card>
          <md-card-header>
            <div>
              <md-menu md-direction="bottom-start" class="menu">
                <md-button md-menu-trigger class="md-icon-button">
                  <md-icon>more_vert</md-icon>
                </md-button>  

                <md-menu-content>
                  <md-menu-item><span class="span" @click="edit(bot)">{{$t('history.edit')}}</span></md-menu-item>
                  <md-menu-item><span class="span" @click="clone(bot)">{{$t('history.clone')}}</span></md-menu-item>
                  <md-menu-item><span class="span" @click="showDeletion(bot.ID)">{{$t('history.delete')}}</span></md-menu-item>
                </md-menu-content>
              </md-menu>
            </div>
          </md-card-header>

          <md-card-content>

            <div v-if="bot.template === 'FAQ Bot'">
              <img src="../../../assets/bot_lila_k.png" v-show="theme === false"></img>
              <img src="../../../assets/faq-night.png" v-show="theme === true">
            </div>

            <div v-else-if="bot.template === 'Welcome Bot'">
              <img src="../../../assets/bot_gelb_k.png" v-show="theme === false"></img>
              <img src="../../../assets/welcome-night.png" v-show="theme === true"></img>
            </div>

          </md-card-content>

          <h3 class = "name">{{bot.name}}</h3>
          <h3 class="name">{{bot.lastedit}}</h3>

        </md-card>
        </div>
      </div>
      <md-speed-dial md-direction="bottom" id="dial">
        <md-speed-dial-target to="/simplebots">
          <md-icon>add</md-icon>
        </md-speed-dial-target>
      </md-speed-dial>


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
    botInfo: {},
    active: false,
    id: null
  }),
  computed: {
    history: {
      get () {
        return this.$store.state.general.history
      }
    },
    template: {
      get () {
        return this.$store.state.bot.template
      },
      set (val) {
        this.$store.commit('setTemplate', val)
      }
    },
    name: {
      get () {
        return this.$store.state.bot.name
      },
      set (val) {
        this.$store.commit('setName', val)
      }
    },
    welcomeMessage: {
      get () {
        return this.$store.state.bot.welcomeMessage
      },
      set (val) {
        this.$store.commit('setWelcomeMessage', val)
      }
    },
    treeData: {
      get () {
        return this.$store.state.welcomeBot.treeData
      },
      set (val) {
        this.$store.commit('setTreeData', val)
      }
    },
    entities: {
      get () {
        return this.$store.state.faqBot.entities
      },
      set (val) {
        this.$store.commit('setEntities', val)
      }
    },
    intents: {
      get () {
        return this.$store.state.faqBot.intents
      },
      set (val) {
        this.$store.commit('setIntents', val)
      }
    },
    examples: {
      get () {
        return this.$store.state.faqBot.examples
      },
      set (val) {
        this.$store.commit('setExamples', val)
      }
    },
    uterances: {
      get () {
        return this.$store.state.faqBot.uterances
      },
      set (val) {
        this.$store.commit('setUterances', val)
      }
    },
    theme: {
      get () {
        return this.$store.state.general.theme
      },
      set (val) {
        this.$store.commit('setTheme', val)
      }
    },
    redirectMessage: {
      get () {
        return this.$store.state.welcomeBot.redirectMessage
      },
      set (val) {
        this.$store.commit('setredirectMessage', val)
      }
    }
  },
  methods: {
    getConfigs: function () {
      this.$store.dispatch('getConfigs')
    },
    // Sets the state variables with the values of the Bot the user wants to copy
    clone: function (bot) {
      this.template = bot.template
      this.name = bot.name
      this.welcomeMessage = bot.welcomeMessage
      if (bot.template === 'Welcome Bot') {
        this.treeData.options = bot.options
        this.redirectMessage = bot.redirectMessage
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
    // Sets the state variables with the values of the Bot the user wants to edit,
    // sets the template and routes to toe second step of Bot creation
    edit: function (bot) {
      this.$router.push('/simplebots')
      this.setDone({id: 'first', index: 'second'})
      this.template = bot.template
      this.name = bot.name
      this.welcomeMessage = bot.welcomeMessage
      if (bot.template === 'Welcome Bot') {
        this.treeData.options = bot.options
        this.redirectMessage = bot.redirectMessage
      } else if (bot.template === 'FAQ Bot') {
        this.intents = bot.intents
        this.entities = bot.entities
        this.examples = bot.examples
        this.uterances = []
        for (let i = 0; i < this.examples.length; i++) {
          this.uterances.push(this.examples[i].text.split(' '))
        }
      }
    },
    setDone (object) {
      this.$store.commit('setDone', object)
    },
    clear: function () {
      this.$store.commit('clear')
    },
    deleteConfig: function () {
      this.$store.dispatch('deleteConfig', this.id)
      this.active = false
    },
    showDeletion (id) {
      this.active = true
      this.id = id
    }
  },
  beforeMount () {
    this.getConfigs()
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
    position: fixed;
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
#historydiv {
  position: absolute;
  z-index: 2;
  width: 100vw;
  top: 48px;
}
.md-content {
  overflow: auto;
}
#content {
  padding-left: 20px;
  padding-right: 20px;
}
#our {
  text-align: center;
}
</style>
