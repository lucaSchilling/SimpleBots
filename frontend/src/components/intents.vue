<template>
  <div>
    {{intents}}
    <input v-model="intent"></input>
    <md-button class="md-raised md-primary" @click="addIntent">+</md-button>
    {{entities}}
    <input v-model="entity"></input>
    <md-button class="md-raised md-primary" @click="addEntity">+</md-button>
  </div>
</template>

<script>
export default {
  name: 'intents',
  data: () => ({
    intent: null,
    entity: null,
    intents: [],
    entities: []
  }),
  methods: {
    addIntent: function () {
      this.intents.push({name: this.intent})
    },
    addEntity: function () {
      this.entities.push({name: this.entity})
    }
  }
}
</script>

<style>

</style>
