<template>
  <div>
    <md-steppers md-sync-route :md-active-step.sync="active" md-linear id="steppers">

      <md-step id="first" md-label="Template" :md-done.sync="first">
        <templateStep></templateStep>
      </md-step>

      <md-step id="second" md-label="Name" :md-done.sync="second">
        <nameStep></nameStep>
      </md-step>

      <md-step id="third" :md-label="this.$t('botarmy.welcomeMessage')" :md-done.sync="third">
        <messageStep></messageStep>
      </md-step>

      <md-step v-if="template === 'Welcome Bot'" id="forth" :md-label="this.$t('botarmy.options')" :md-done.sync="forth">
          <optionStep></optionStep>
          <div class="buttonRight">
            <md-button class="md-primary md-raised" @click="activeClear=true">Clear</md-button>
            <md-button class="md-primary md-raised" @click="setDone({id: 'forth', index: 'fifth'})">{{$t('messageStep.next')}}</md-button>
          </div>

          <md-dialog-confirm
      :md-active.sync="activeClear"
      md-title="Do you really want to restart your selection?"
      md-content="You wont be able to restart your previously added selections. Only click clear if you want to start over."
      md-confirm-text="Clear"
      md-cancel-text="Cancel"
      @md-cancel="activeClear = false"
      @md-confirm="clearTreeData" />
          
      </md-step>

      <md-step v-else id="forth" :md-label="this.$t('botarmy.options')" :md-done.sync="forth">
          <faq></faq>
          <md-button class="md-primary md-raised buttonRight" @click="setDone({id: 'forth', index: 'fifth'})">{{$t('messageStep.next')}}</md-button>
      </md-step>

      <md-step v-if="template === 'FAQ Bot'" id="fifth" :md-label="this.$t('botarmy.questions')" :md-done.sync="fifth">
        <uterances></uterances>
        <md-button id="fix" class="md-primary md-raised buttonRight" @click="deploy">Deploy</md-button>
      </md-step>

      <md-step v-else id="fifth" :md-label="this.$t('botarmy.redirect')" :md-done.sync="fifth">
        <redirectStep></redirectStep>
      </md-step>

    </md-steppers>
    
  </div>
</template>

<script>
import item from './item.vue'
import faq from './faq.vue'
import uterances from './uterances.vue'
import templateStep from './templateStep.vue'
import nameStep from './nameStep.vue'
import languageStep from './languageStep.vue'
import messageStep from './messageStep.vue'
import optionStep from './optionStep.vue'
import redirectStep from './redirectStep.vue'

export default {
  name: 'botarmy',
  data: () => ({
    activeClear: false
  }),
  components: {
    item,
    faq,
    uterances,
    templateStep,
    nameStep,
    languageStep,
    messageStep,
    optionStep,
    redirectStep
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
    options: {
      get () {
        return this.$store.state.options
      },
      set (val) {
        this.$store.commit('setOptions', val)
      }
    },
    active: {
      get () {
        return this.$store.state.active
      },
      set (val) {
        this.$store.commit('setActive', val)
      }
    },
    first: {
      get () {
        return this.$store.state.first
      },
      set (val) {
        this.$store.commit('setFirst', val)
      }
    },
    second: {
      get () {
        return this.$store.state.second
      },
      set (val) {
        this.$store.commit('setSecond', val)
      }
    },
    third: {
      get () {
        return this.$store.state.third
      },
      set (val) {
        this.$store.commit('setThird', val)
      }
    },
    forth: {
      get () {
        return this.$store.state.forth
      },
      set (val) {
        this.$store.commit('setForth', val)
      }
    },
    fifth: {
      get () {
        return this.$store.state.fifth
      },
      set (val) {
        this.$store.commit('setFifth', val)
      }
    },
    treeData: {
      get () {
        return this.$store.state.treeData
      },
      set (val) {
        this.$store.commit('setTreeData', val)
      }
    }
  },
  methods: {
    deploy: function () {
      this.options = this.treeData.options
      this.$store.dispatch('deploy')
      this.clear()
      this.$router.push('/status')
    },
    add: function () {
      this.tree.push({message: null, options: [], redirect: null})
    },
    setDone (object) {
      this.$store.commit('setDone', object)
    },
    clear: function () {
      this.$store.commit('clear')
    },
    setUndone (index) {
      this.$store.commit('setUndone', index)
    },
    clearTreeData () {
      this.$store.commit('clearTreeData')
    }
  }
}
</script>

<style lang="scss" scoped>
#headline,
#slct {
  color: gray;
}
#slct {
  text-align: center;
}
.div {
  height: 500px;
}
#wrapperM {
  width: 900px;
  margin: 0 auto;
}
#container {
  height: 500px;
}
#leftM {
  float: left;
}
#rightM {
  float: right;
}
input {
  width: 280px;
  height: 40px;
  padding: 5px;
  margin: 20px 0 10px;
  border-radius: 5px;
  border: 2px solid gray;
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
#welcomeMessageFAQ {
  width: 400px;
  float: left;
}
#intents {
  float: right;
}
.buttonRight {
  float: right;
}
#steppers {
  position: fixed;
  z-index: 2;
  width: 100vw;
  top: 48px;
}
</style>