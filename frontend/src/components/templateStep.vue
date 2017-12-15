<template>
  <div id="box">
    <h2 id="choose">{{$t('templateStep.chooseTemplate')}}</h2>
    <div id="wrapper">
      <div id="left">
        <md-card md-with-hover>
          <div @click="setTemplateWelcome" id="wlcmdiv">
            <h3 id="welcomeText">{{$t('templateStep.wb')}}</h3>
            <img src="../../assets/bot_gelb_k.png" v-show="theme === false" alt="Welcome Bot" height="150" width="150" class="img">
            <img src="../../assets/welcome-night.png" v-show="theme === true" alt="Welcome Bot" height="150" width="150" class="img">
          </div>
        </md-card>
      </div>
      <div id="right">
        <md-card md-with-hover>
          <div @click="setTemplateFAQBot" id="faqdiv">
            <h3 id="faqText">{{$t('templateStep.faq')}}</h3>
            <img src="../../assets/bot_lila_k.png" v-show="theme === false" alt="Welcome Bot" height="150" width="150" class="img">
            <img src="../../assets/faq-night.png" v-show="theme === true" alt="Welcome Bot" height="150" width="150" class="img">
          </div>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'templateStep',
  methods: {
    setTemplateWelcome () {
      this.template = 'Welcome Bot'
      this.$router.push('/simplebots/steps')
    },
    setTemplateFAQBot () {
      this.template = 'FAQ Bot'
      this.$router.push('/simplebots/steps')
    },
    setDone (object) {
      this.$store.commit('setDone', object)
    }
  },
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
  }
}
</script>

<style>
#box {
  height: 500px;
  position: absolute;
  width: 100vw;
  top: 100px;
}
#choose {
  color: gray;
  text-align: center;
}
#welcomeText,
#faqText {
    text-align: center;
}
#wrapper {
  width: 700px;
  margin: 0 auto;
}
#left {
  width: 300px;
  float: left;
}
#right {
  width: 300px;
  float: right;
}
#wlcmdiv,
#faqdiv {
  height: 250px;
}
#welcomeText,
#faqText {
  color: #e47e25;
}
md-card {
  height: 320px;
}
.img {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
