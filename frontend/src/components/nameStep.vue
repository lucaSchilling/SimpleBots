<template>
<div>
  <div v-if="template === 'Welcome Bot'" class="picDiv">
    <h2>{{$t('nameStep.chooseName')}} {{template}}</h2>
    <img src="../../assets/bot_gelb.jpg" height="150" width="150" class="img">
    <md-field>
      <label for="name">Name</label>
        <md-input  id="wName" :placeholder="this.$t('nameStep.placeholder')" v-model="name" v-on:keyup.enter="setDone({id: 'second', index: 'forth'})"></md-input>
    </md-field>
  </div>
  <div v-else-if="template === 'FAQ Bot'" class="picDiv">
    <h2>{{$t('nameStep.chooseName')}} {{template}}</h2>
    <img src="../../assets/bot_lila.jpg" height="150" width="150" class="img">
    <md-field>
      <label for="name">Name</label>
        <md-input v-model="name" v-on:keyup.enter="setDone({id: 'second', index: 'forth'})"></md-input>
    </md-field>
  </div>
  <md-button class="md-primary md-raised buttonRight" @click="setDone({id: 'second', index: 'forth'})">Next</md-button>
  </div>
</template>

<script>
export default {
  name: 'nameStep',
  computed: {
    template: {
      get () {
        return this.$store.state.template
      },
      set (val) {
        this.$store.commit('setTemplate', val)
      }
    },
    name: {
      get () {
        return this.$store.state.name
      },
      set (val) {
        this.$store.commit('setName', val)
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
