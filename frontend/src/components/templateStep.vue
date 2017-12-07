<template>
  <div id="box">
    <h2 id="choose">Choose a Template</h2>
    <div id="wrapper">
      <div id="left">
        <md-card md-with-hover>
          <div @click="setTemplateWelcome" id="wlcmdiv">
            <h3 id="welcomeText">Welcome Bot</h3>
            <img src="../../assets/bot_gelb.jpg" alt="Welcome Bot" height="150" width="150" class="img">
          </div>
        </md-card>
      </div>
      <div id="right">
        <md-card md-with-hover>
          <div @click="setTemplateFAQBot" id="faqdiv">
            <h3 id="faqText">FAQ Bot</h3>
            <img src="../../assets/bot_lila.jpg" alt="Welcome Bot" height="150" width="150" class="img">
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
      this.setDone({id: 'first', index: 'second'})
    },
    setTemplateFAQBot () {
      this.template = 'FAQ Bot'
      this.setDone({id: 'first', index: 'second'})
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
    }
  }
}
</script>

<style>
#box {
  height: 500px;
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
