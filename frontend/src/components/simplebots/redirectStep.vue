<template>
  <div>
    <h2 id="welcomeMsg">{{$t('botarmy.redirect')}}</h2>
    <div id="textcontainer">
      <md-field>
        <md-textarea :placeholder="this.$t('redirectStep.placeholder')" id="textA" v-model="redirectMessage"></md-textarea>
      </md-field>
  </div>
  <md-button class="md-primary md-raised buttonRight" @click="deploy">{{$t('redirectStep.deploy')}}</md-button>
  </div>
</template>

<script>
export default {
  name: 'redirectStep',
  computed: {
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
    setDone (object) {
      this.$store.commit('setDone', object)
    },
    deploy: function () {
      this.$store.dispatch('deploy')
      this.clear()
      this.setUndone('first')
      this.$router.push('/status')
    },
    clear: function () {
      this.$store.commit('clear')
    },
    setUndone (index) {
      this.$store.commit('setUndone', index)
    }
  }
}
</script>

<style>
#welcomeMsg {
  color: gray;
  text-align: center;
}
.buttonRight {
  float: right;
}
#textcontainer {
  width: 400px;
  margin: 0 auto;
}
</style>

