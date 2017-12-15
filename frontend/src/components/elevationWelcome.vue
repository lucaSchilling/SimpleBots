<template>
  <div id="carddiv">
    <div>
      <h4 id="head">{{$t('elevationBots.greeting')}} {{$t('elevationBots.wb')}}</h4>

      <img src="../../assets/bot_gelb_k.png" v-show="theme === false" alt="Welcome Bot" height="150" width="150" class="botimg">
      <img src="../../assets/welcome-night.png" v-show="theme === true" alt="Welcome Bot" height="150" width="150" class="botimg">
    <div id="buttondiv">
        <md-button @click="showDialog = true" class="md-raised md-primary">{{$t('elevationBots.more')}}</md-button>
    </div>
    </div>
     <md-dialog :md-active.sync="showDialog" id="dialog">
      <md-dialog-title>{{$t('elevationBots.wb')}}</md-dialog-title>
      <div id="wrap">
        <div id="left">
          <img src="../../assets/bot_gelb_k.png" v-show="theme === false" alt="Welcome Bot" height="150" width="150" class="botimg">
          <img src="../../assets/welcome-night.png" v-show="theme === true" alt="Welcome Bot" height="150" width="150" class="botimg">
          <div id="textdiv">{{$t('elevationBots.wbText')}}</div>
            <md-button class="md-raised md-primary" @click="create">
             {{$t('elevationBots.create')}}
            </md-button> 
        </div>
        <div id="right">
          <video width="700" controls>
          <source src="../../assets/welcome-bot.mp4" type="video/mp4">
          </video>
        </div> 
        <div id="below">
        </div>
        <hr id="line">
      <div id="features">
        <p class="feat"><md-icon class="md-primary">message</md-icon> {{$t('elevationBots.feature1')}}</p>
        <p class="feat"><md-icon class="md-primary">call_made</md-icon> {{$t('elevationBots.feature2')}}</p>
        <p class="feat"><md-icon class="md-primary">mouse</md-icon> {{$t('elevationBots.feature3')}}</p>
      </div>
      </div>
     </md-dialog>
  </div>
</template>

<script>
export default {
  name: 'elevationWelcome',
  data: () => ({
    showDialog: false
  }),
  computed: {
    template: {
      get () {
        return this.$store.state.template
      },
      set (val) {
        this.$store.commit('setTemplate', val)
      }
    },
    theme: {
      get () {
        return this.$store.state.theme
      },
      set (val) {
        this.$store.commit('setTheme', val)
      }
    }
  },
  methods: {
    create () {
      this.template = 'Welcome Bot'
      this.$router.push('/simplebots')
      this.setDone({id: 'first', index: 'second'})
    },
    setDone (object) {
      this.$store.commit('setDone', object)
    }
  }
}
</script>

<style lang="scss" scoped>
  #head {
    color: #f68b1f;
  }
  #dialog {
    width: 80vw;
    height: 70vh;
  }
  #wrap {
    width: auto;
    position: relative;
    margin: auto;
  }
  #below {
    padding-left: 120px;
    clear: left;
  }

  #right {
    width: 40vw; 
    float: left;
    padding-right: 30px;
  }
  #left {
    width: 38vw; 
    float: left;
    padding-left: 30px;
    padding-right: 30px;   
  }
#buttondiv {
    clear: left;
}
#carddiv {
    margin: auto;
}
#textdiv {
    padding-bottom: 30px;
}
#botimg, #dialogbtn, .botimg {
    display: block;
    margin-left: auto;
    margin-right: auto;
}
#line {
    display: block;
    height: 1px;
    border: 0;
    border-top: 1px solid #f68b1f;
    margin: 1em 0;
    padding: 0;
}
#features {
  color: #f68b1f;
  padding-top: 5vh;
  padding-left: 6.5vw;
}
.feat {
  padding-right: 8vw;
  display: inline;
}
.botimg {
  padding-bottom: 25px;
}
</style>
