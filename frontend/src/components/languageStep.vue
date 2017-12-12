<template>
  <div class="div">
    <h2 id="assign">Assign Chatbot</h2>
    <br>
    <br>
    <p id="lng">Choose a language</p>
    <div id="btndiv">
      <md-button class="md-raised md-primary" :disabled="disabledEnglish" @click="selectButton">English</md-button>
      <md-button class="md-raised md-primary" :disabled="disabledDeutsch" @click="selectButton">Deutsch</md-button>
    </div>
    <md-button class="md-primary md-raised buttonRight" @click="setDone({id: 'third', index: 'forth'})">Next</md-button>
  </div>
</template>

<script>
export default {
  name: 'languageSteps',
  data: () => ({
    disabledEnglish: false,
    disabledDeutsch: true
  }),
  methods: {
    setDone (object) {
      this.$store.commit('setDone', object)
    },
    selectButton () {
      this.disabledEnglish = !this.disabledEnglish
      this.disabledDeutsch = !this.disabledDeutsch
    }
  }
}
</script>

<style>
.div {
  height: 500px;
}
#assign, #lng {
  color: gray;
  text-align: center;
}
#btndiv {
  display: flex;
  justify-content: center;
}
.buttonRight {
  float: right;
}
</style>
