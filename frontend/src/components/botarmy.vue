<template>
    <md-steppers :md-active-step.sync="active" md-linear>
      <md-step id="first" md-label="Template" :md-done.sync="first">
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
      </md-step>

      <md-step id="second" md-label="Name" :md-done.sync="second">
        <div v-if="template === 'Welcome Bot'" class="picDiv">
          <h2>Choose a Name for your {{template}}</h2>
          <img src="../../assets/bot_gelb.jpg" height="150" width="150" class="img">
          <md-field>
                <label for="name">Name</label>
                <md-input  v-model="name" v-on:keyup.enter="setDone('second', 'third' )">
                </md-input>
          </md-field>
        </div>
        <div v-else-if="template === 'FAQ Bot'" class="picDiv">
          <h2>Choose a Name for your {{template}}</h2>
          <img src="../../assets/bot_lila.jpg" height="150" width="150" class="img">
          <md-field>
                <label for="name">Name</label>
                <md-input  v-model="name" v-on:keyup.enter="setDone('second', 'third' )">
                </md-input>
          </md-field>
        </div>
      </md-step>

      <md-step id="third" md-label="Language" :md-done.sync="third">
        <div class="div">
        <h2 id="assign">Assign Chatbot</h2>
        <br>
        <br>
        <p id="lng">Choose a language</p>
        <div id="btndiv">
            <md-button class="md-raised md-primary" :disabled="disabledEnglish" @click="selectButton">English</md-button>
            <md-button class="md-raised md-primary" :disabled="disabledDeutsch" @click="selectButton">Deutsch</md-button>
        </div>
        <md-button class="md-primary md-raised" @click="setDone('third', 'forth')">Next</md-button>
        </div>
      </md-step>

      <md-step id="forth" md-label="Welcome Message" :md-done.sync="forth">
        <h2 id="welcomeMsg">Welcome Message</h2>
        <div id="textcontainer">
          <md-field>
            <md-textarea v-model="welcomeMessage"></md-textarea>
          </md-field>
          <md-button class="md-primary md-raised" @click="setDone('forth', 'fifth')">Next</md-button>
        </div>
      </md-step>

      <md-step id="fifth" md-label="Options" :md-done.sync="fifth">
        <div v-if="template==='Welcome Bot'">
          <h2>Set Selection Menu
            <md-avatar>
            <img src="../../assets/hilfe.png" alt="Avatar">
            <md-tooltip md-direction="right">Bla</md-tooltip>
          </md-avatar></h2>
        <div id="bla">
          <ul id="demo">
            <item
                  class="item"
                  :model="treeData">
            </item>
          </ul>
        </div>
        <md-button class="md-primary md-raised" @click="deploy">Deploy</md-button>
        </div>

        <div v-else-if="template === 'FAQ Bot'" id="faqdiv">
          <faq></faq>
        </div>
        </md-step>             
    </md-steppers>
  </div>
      </md-step>            
    </md-steppers>
  </div>
</template>

<script>
import item from './item.vue'
import faq from './faq.vue'

export default {
  name: 'botarmy',
  components: {
    item,
    faq
  },
  data: () => ({
    disabledEnglish: false,
    disabledDeutsch: true,
    active: 'first',
    first: false,
    second: false,
    third: false,
    forth: false,
    fifth: false,
    treeData: {
      isRoot: true,
      options: [{
        message: ''
      }]}
  }),
  computed: {
    _id: {
      get () {
        return this.$store.state._id
      },
      set (val) {
        this.$store.commit('setId', val)
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
    template: {
      get () {
        return this.$store.state.template
      },
      set (val) {
        this.$store.commit('setTemplate', val)
      }
    },
    lastedit: {
      get () {
        return this.$store.state.lastedit
      },
      set (val) {
        this.$store.commit('setLastEdit', val)
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
    options: {
      get () {
        return this.$store.state.options
      },
      set (val) {
        this.$store.commit('setOptions', val)
      }
    }
  },
  methods: {
    selectButton () {
      this.disabledEnglish = !this.disabledEnglish
      this.disabledDeutsch = !this.disabledDeutsch
    },
    setTemplateWelcome () {
      this.template = 'Welcome Bot'
      this.setDone('first', 'second')
    },
    setTemplateFAQBot () {
      this.template = 'FAQ Bot'
      this.setDone('first', 'second')
    },
    deploy: function () {
      this.options = this.treeData.options
      this.$store.dispatch('deploy')
    },
    add: function () {
      this.tree.push({message: null, options: []})
    },
    setDone (id, index) {
      this[id] = true

      this.secondStepError = null

      if (index) {
        this.active = index
      }
    }
  }
}
</script>


<style lang="scss" scoped>
#headline,
#assign,
#lng,
#choose,
#welcomeMsg,
#slct {
  color: gray;
}
#assign,
#lng,
#choose,
#welcomeText,
#faqText,
#welcomeMsg,
#slct {
  text-align: center;
}
#btndiv {
  display: flex;
  justify-content: center;
}
.div {
  height: 500px;
}
#left {
  width: 300px;
  float: left;
}
#right {
  width: 300px;
  float: right;
}
#wrapper {
  width: 700px;
  margin: 0 auto;
}
#wrapperM {
  width: 900px;
  margin: 0 auto;
}
#container {
  height: 500px;
}
#welcomeText,
#faqText {
  color: #e47e25;
}
#textcontainer , .picDiv {
  width: 400px;
  margin: 0 auto;
}
#leftM {
  float: left;
}
#rightM {
  float: right;
}
h2 {
  text-align: center;
  color: gray;
}
#bla {
  display: block;
}
#box {
  height: 500;
}
.img {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
md-card {
  height: 320px;
}
#wlcmdiv,
#faqdiv,
.picDiv {
  height: 250px;
}
#box {
  height: 500px;
}
input {
  width: 280px;
  height: 40px;
  padding: 5px;
  margin: 20px 0 10px;
  border-radius: 5px;
  border: 4px solid #e47e25;
}
#bla {
  height: 500px;
}
ul {
  list-style-type: none;
}
#nextButton {
  position: absolute;
  right: 0;
}
#text {
  text-align: center
}
.md-avatar img {
    width: 50%;
    height: 50%;
    display: block;
}
.md-avatar {
    width: 40px;
    min-width: 40px;
    height: 40px;
    margin: auto;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    user-select: none;
    position: relative;
    border-radius: 40px;
    transition: .4s cubic-bezier(0.4, 0, 0.2, 1);
    transition-property: color, background-color;
    will-change: color, background-color;
    font-size: 24px;
    letter-spacing: -.05em;
    vertical-align: bottom;
}
#wrapFAQ {
  width: 1000px
}
#leftFAQ, #rightFAQ {
  width: 500px;
  float: left;
}
#faqdiv {
  width: 100%;
}
</style>