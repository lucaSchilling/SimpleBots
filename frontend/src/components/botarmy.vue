<template>
  <div id="box">
    <md-steppers md-alternative>
      <md-step id="first" md-label="First Step">
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

      <md-step id="second" md-label="Second Step">
        <h2 id="choose">Choose a Template</h2>
        <div id="wrapper">
          <div id="left">
            <md-card md-with-hover>
              <div @click="template ='Welcome Bot'" id="wlcmdiv">
              <h3 id="welcomeText">Welcome Bot</h3>
               <img src="../../assets/bot_gelb.jpg" alt="Welcome Bot" height="150" width="150" id="wlcmimg">
              </div>
              </md-card>
          </div>
          <div id="right">
            <md-card md-with-hover>
              <div @click="template = 'FAQ Bot'" id="faqdiv">
              <h3 id="faqText">FAQ Bot</h3>
               <img src="../../assets/bot_lila.jpg" alt="Welcome Bot" height="150" width="150" id="faqimg">
              </div>
            </md-card>
          </div>
        </div>
      </md-step>

      <md-step id="third" md-label="Third Step">
        <h2 id="welcomeMsg">Welcome Message</h2>
        <div id="textcontainer">
          <md-field>
            <md-textarea v-model="welcomeMessage"></md-textarea>
          </md-field>
        </div>
      </md-step>

      <md-step id="forth" md-label="Forth Step">
          <div id="wrapperM">
            <div id="leftM">
              <h2>Set Selection Menu</h2>
              
            </div>
            <div id="rightM">
              <h2>Set Bot Answer</h2>
            </div>
          </div>

      </md-step>

      <md-step id="fifth" md-label="Fifth Step">
        <div class="div">
          <md-field>
                <label for="_id">_id</label>
                <md-input id="id" name="_id" v-model="_id">
                </md-input>
          </md-field>
          <md-field>
                <label for="Name">Name</label>
                <md-input id="name" name="Name" v-model="name">
                </md-input>
          </md-field>
          <md-field>
                <label for="Welcome Message">Welcome Message</label>
                <md-input id="welcomeMessage" name="Welcome Message" v-model="welcomeMessage">
                </md-input>
          </md-field>
          <md-field>
                <label for="Options">Options</label>
                <md-input id="options" name="Options" v-model="options">
                </md-input>
          </md-field>
          <md-field id="field">
                <label for="Template">Template</label>
                <md-select name="Template" v-model='template'>
                    <md-option id = "wB" value="Welcome Bot">Welcome Bot</md-option>
                    <md-option id = "FAQ" value="FAQ Bot">FAQ Bot</md-option>
                    <md-option id = "taB" value="Task Assist Bot">Task Assist Bot</md-option>
                </md-select>
          </md-field>
          <md-field>
                <label for="lastedit">lastedit</label>
                <md-input id="lastEdit" name="lastedit" v-model="lastedit">
                </md-input>
          </md-field>
            
        <md-button id="deployButton" class="md-raised md-primary" @click="deploy">Done</md-button>
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
      disabledDeutsch: true
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
        this.$store.dispatch('deploy')
      }
    }
  }
</script>


<style lang="scss" scoped>
  #headline, #assign, #lng, #choose, #welcomeMsg, #slct {
      color: gray;
  }
  #assign, #lng, #choose, #welcomeText, #faqText, #welcomeMsg, #slct {
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
    margin:0 auto;
  }
  #wrapperM {
    width: 900px;
    margin:0 auto;
  }
  #container {
    height: 500px;
  }
  #welcomeText, #faqText {
    color: #e47e25;
  }
  #textcontainer {
    width: 400px;
    margin:0 auto;
  }
  #leftM {
    float: left
  }
  #rightM {
    float: right
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
  #wlcmimg, #faqimg {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  md-card {
    height: 320px;
  }
  #wlcmdiv, #faqdiv {
    height: 250px;
  }
  #box {
    height: 500px
  }
</style>