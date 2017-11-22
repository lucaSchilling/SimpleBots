<template>
  <div>
    <h4 id="headline">Let's create your Botarmy!</h4>
    <md-steppers :md-active-step.sync="active" md-linear>
      <md-step id="first" :md-error="firstStepError" :md-done.sync="first">
        <div class="div">
        <h2 id="assign">Assign Chatbot</h2>
        <br>
        <br>
        <p id="lng">Choose a language</p>
        <div id="btndiv">
            <md-button class="md-raised md-primary" :disabled="disabledEnglish" @click="selectButton">English</md-button>
            <md-button class="md-raised md-primary" :disabled="disabledDeutsch" @click="selectButton">Deutsch</md-button>
        </div>
        <md-button id="next" class="md-raised md-primary" @click="setDone('first', 'second')">Next</md-button>
        </div>
      </md-step>

      <md-step id="second" :md-error="secondStepError" :md-done.sync="second">
        <md-button class="md-raised md-primary" @click="setDone('second', 'third')">Continue</md-button>
        <md-button class="md-raised md-primary" @click="setError()">Set error!</md-button>
      </md-step>

      <md-step id="third" :md-done.sync="third">
          <div class="div">
          <md-field>
                <label for="_id">_id</label>
                <md-input name="_id" v-model="_id">
                </md-input>
          </md-field>
          <md-field>
                <label for="Name">Name</label>
                <md-input name="Name" v-model="name">
                </md-input>
          </md-field>
          <md-field>
                <label for="Welcome Message">Welcome Message</label>
                <md-input name="Welcome Message" v-model="welcomeMessage">
                </md-input>
          </md-field>
          <md-field>
                <label for="Options">Options</label>
                <md-input name="Options" v-model="options">
                </md-input>
          </md-field>
          <md-field>
                <label for="Template">Template</label>
                <md-select name="Template" v-model='template'>
                    <md-option value="Welcome Bot">Welcome Bot</md-option>
                    <md-option value="FAQ Bot">FAQ Bot</md-option>
                    <md-option value="Task Assist Bot">Task Assist Bot</md-option>
                </md-select>
          </md-field>
          <md-field>
                <label for="lastedit">lastedit</label>
                <md-input name="lastedit" v-model="lastedit">
                </md-input>
          </md-field>
            
        <md-button class="md-raised md-primary" @click="deploy">Done</md-button>
          </div>
      </md-step>
    </md-steppers>
  </div>
</template>

<script>
  export default {
    name: 'botarmy',
    data: () => ({
      active: 'first',
      first: false,
      second: false,
      third: false,
      firstStepError: null,
      secondStepError: null,
      disabledEnglish: false,
      disabledDeutsch: true,
      selectedTemplate: null
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
      setDone (id, index) {
        this[id] = true

        this.secondStepError = null

        if (index) {
          this.active = index
        }
      },
      setError () {
        this.secondStepError = 'This is an error!'
      },
      selectButton () {
        this.disabledEnglish = !this.disabledEnglish
        this.disabledDeutsch = !this.disabledDeutsch
      },
      deploy: function () {
        this.$store.dispatch('deploy')
        this.setDone('third')
      }
    }
  }
</script>


<style lang="scss" scoped>
  #headline, #assign, #lng{
      color: gray;
  }
  #assign, #lng {
      text-align: center;
  }
  #next {
      position: absolute;
      right:    0;
      bottom:   0;
  }
  #btndiv {
      display: flex;
      justify-content: center;
  }
  .div {
      height: 500px;
  }
</style>