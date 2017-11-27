<template>
  <div id="box">
    <md-steppers md-alternative>
      <md-step id="first" md-label="Template">
        <h2 id="choose">Choose a Template</h2>
        <div id="wrapper">
          <div id="left">
            <md-card md-with-hover>
              <div @click="template ='Welcome Bot'" id="wlcmdiv">
              <h3 id="welcomeText">Welcome Bot</h3>
               <img src="../../assets/bot_gelb.jpg" alt="Welcome Bot" height="150" width="150" class="img">
              </div>
              </md-card>
          </div>
          <div id="right">
            <md-card md-with-hover>
              <div @click="template = 'FAQ Bot'" id="faqdiv">
              <h3 id="faqText">FAQ Bot</h3>
               <img src="../../assets/bot_lila.jpg" alt="Welcome Bot" height="150" width="150" class="img">
              </div>
            </md-card>
          </div>
        </div>
      </md-step>

      <md-step id="second" md-label="Name">
        <div v-if="template === 'Welcome Bot'" class="picDiv">
          <h2>Choose a Name</h2>
          <img src="../../assets/bot_gelb.jpg" height="150" width="150" class="img">
          <md-field>
                <label for="name">Name</label>
                <md-input  v-model="name">
                </md-input>
          </md-field>
        </div>
        <div v-else-if="template === 'FAQ Bot'" class="picDiv">
          <h2>Choose a Name</h2>
          <img src="../../assets/bot_lila.jpg" height="150" width="150" class="img">
          <md-field>
                <label for="name">Name</label>
                <md-input  v-model="name">
                </md-input>
          </md-field>
        </div>
      </md-step>

      <md-step id="third" md-label="Language">
        <div class="div">
        <h2 id="assign">Assign Chatbot</h2>
        <br>
        <br>
        <p id="lng">Choose a language</p>
        <div id="btndiv">
            <md-button class="md-raised md-primary" :disabled="disabledEnglish" @click="selectButton">English</md-button>
            <md-button class="md-raised md-primary" :disabled="disabledDeutsch" @click="selectButton">Deutsch</md-button>
        </div>
        </div>
      </md-step>

      <md-step id="forth" md-label="Welcome Message">
        <h2 id="welcomeMsg">Welcome Message</h2>
        <div id="textcontainer">
          <md-field>
            <md-textarea v-model="welcomeMessage"></md-textarea>
          </md-field>
        </div>
      </md-step>

      <md-step id="fifth" md-label="Options">
          <div id="wrapperM">
            <div id="leftM">
              <h2>Set Selection Menu</h2>
              </form>
              <md-button class="md-primary md-raised" @click="add">
                +
              </md-button>
              <div v-for="comp in tree" v-bind:key="comp" class="inputDiv">
                <input v-model="comp.message">
                <md-button class="md-primary md-raised addInputBtn">+</md-button>
              </div>
              <pre>{{ $data | json }}</pre>
            </div>
            <div id="rightM">
              <h2>Set Bot Answer</h2>
              <md-button class="md-primary md-raised" @click="deploy" id="deployBtn">Deploy</md-button>
            </div>
          </div>
      </md-step>
    </md-steppers>
  </div>
</template>

<script>
export default {
  name: 'botarmy',
  data: () => ({
    disabledEnglish: false,
    disabledDeutsch: true,
    i: 0,
    tree: []
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
    deploy: function () {
      this.options = JSON.stringify(this.tree)
      this.$store.dispatch('deploy')
    },
    add: function () {
      this.tree.push({message: null, options: []})
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
</style>