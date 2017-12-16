<template>
  <div id="carddiv">
    <div>
      <h4 id="head">{{$t('elevationBots.greeting')}} {{$t('elevationBots.faq')}}</h4>
      <img src="../../../assets/bot_lila_k.png" v-show="theme === false" alt="Welcome Bot" height="150" width="150" class="botimg">
      <img src="../../../assets/faq-night.png" v-show="theme === true" alt="Welcome Bot" height="150" width="150" class="botimg">

      <div id="buttondiv">
        <md-button @click="showDialog = true" class="md-raised md-primary" id="more">{{$t('elevationBots.more')}}</md-button>
      </div> 
    </div>

    <md-dialog :md-active.sync="showDialog" id="dialog">
      <div id="wrap">
        <div id="left">
          <h2 id="headline">{{$t('elevationBots.faq')}}</h2>
          <img src="../../../assets/bot_lila_k.png" v-show="theme === false" alt="Welcome Bot" height="150" width="150" class="botimg">
          <img src="../../../assets/faq-night.png" v-show="theme === true" alt="Welcome Bot" height="150" width="150" class="botimg">
          <div id="textdiv">{{$t('elevationBots.faqText')}}</div>
            <div id="createBtn">
              <md-button class="md-raised md-primary" @click="create">
                {{$t('elevationBots.create')}}
              </md-button> 
            </div>
          </div>

        <video id="faqvideo" controls>
          <source src="../../../assets/intro.mp4" type="video/mp4">
        </video>
        
        <div id="below">
        </div>
        <hr id="line">

        <div id="features">
          <p class="feat"><md-icon class="md-primary">face</md-icon>  {{$t('elevationBots.feature4')}}</p>
          <p class="feat"><md-icon class="md-primary">call_made</md-icon>  {{$t('elevationBots.feature5')}}</p>
          <p class="feat"><md-icon class="md-primary">mouse</md-icon>  {{$t('elevationBots.feature3')}}</p>
        </div>
      </div>
    </md-dialog>
  </div>
</template>

<script>
export default {
  name: 'elevationFAQ',
  data: () => ({
    showDialog: false
  }),
  computed: {
    template: {
      get () {
        return this.$store.state.bot.template
      },
      set (val) {
        this.$store.commit('setTemplate', val)
      }
    },
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
    create () {
      this.template = 'FAQ Bot'
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
#faqvideo {
  width: 50%;
  position: absolute;
  top: 10%;
  left: 43%;
}
#wrap {
  width: auto;
  position: relative;
  margin: auto;
  overflow: auto;
}
#below {
  clear: left;
}
#left {
  width: 40%; 
  float: left;
  padding-left: 80px;
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
  padding-left: 80px;
  padding-top: 15px;
}
.botimg {
  padding-bottom: 25px;
}
#createBtn, #headline {
  text-align: center;
}
#headline {
  padding-bottom: 30px;
}
</style>
