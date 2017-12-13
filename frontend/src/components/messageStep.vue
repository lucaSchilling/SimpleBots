<template>
  <div>
    <h2 id="welcomeMsg">{{$t('messageStep.message')}}</h2>
    <div id="textcontainer">
      <md-field>
        <md-textarea :placeholder="this.$t('welcomeStep.placeholder')" id="textA" v-model="welcomeMessage"></md-textarea>
      </md-field>
  </div>
  <md-button class="md-primary md-raised buttonRight" @click="setDone({id: 'forth', index: 'fifth'})">{{$t('messageStep.next')}}</md-button>
</div>
</template>

<script>
export default {
  name: 'messageStep',
  computed: {
    welcomeMessage: {
      get () {
        return this.$store.state.welcomeMessage
      },
      set (val) {
        this.$store.commit('setWelcomeMessage', val)
      }
    }
  },
  methods: {
    setDone (object) {
      this.$store.commit('setDone', object)
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
