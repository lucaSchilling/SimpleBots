<template>
  <div>
    <div v-if="template === 'Welcome Bot'" class="picDiv">
      <h2>{{$t('nameStep.chooseName')}} {{template}}</h2>
      <img src="../../../assets/bot_gelb_k.png" v-show="theme === false" height="150" width="150" class="img">
      <img src="../../../assets/welcome-night.png" v-show="theme === true" height="150" width="150" alt="Welcome Bot" class="img">

      <md-field>
        <label for="name">Name</label>
        <md-input  id="wName" :placeholder="this.$t('nameStep.placeholder')" v-model="name" v-on:keyup.enter="setDone({id: 'second', index: 'forth'})"></md-input>
      </md-field>

    </div>
  <div v-else-if="template === 'FAQ Bot'" class="picDiv">
    <h2>{{$t('nameStep.chooseName')}} {{template}}</h2>
    <img src="../../../assets/bot_lila_k.png" v-show="theme === false" height="150" width="150" class="img">
    <img src="../../../assets/faq-night.png" v-show="theme === true" height="150" width="150" alt="Welcome Bot" class="img">

    <md-field>
      <label for="name">Name</label>
      <md-input id="faqName" v-model="name" v-on:keyup.enter="setDone({id: 'second', index: 'third'})"></md-input>
    </md-field>

  </div>
  <md-button class="md-primary md-raised buttonRight" @click="setDone({id: 'second', index: 'third'})">{{$t('nameStep.next')}}</md-button>
  </div>
</template>

<script>
export default {
  name: 'nameStep',
  computed: {
    template: {
      get () {
        return this.$store.state.bot.template
      },
      set (val) {
        this.$store.commit('setTemplate', val)
      }
    },
    name: {
      get () {
        return this.$store.state.bot.name
      },
      set (val) {
        this.$store.commit('setName', val)
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
    setDone (object) {
      this.$store.commit('setDone', object)
    }
  }
}
</script>

<style>
.picDiv {
  height: 250px;
  width: 400px;
  margin: 0 auto;
}
.img {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
