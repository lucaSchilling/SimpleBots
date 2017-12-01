<template>
  <div id="wrapper">
      <div v-for="faq in faqs" v-bind:key="faq">
          <div id="question">
    <md-field>
        <md-textarea v-model="faq.question">
        </md-textarea>
    </md-field>
          </div>
          <div id="answer">
    <md-field>
        <md-textarea v-model="faq.answer">
        </md-textarea>
    </md-field>
          </div>
      </div>
          <md-button class="md-primary md-raised" @click="addFAQ">+</md-button>
  </div>
</template>

<script>
export default {
  name: 'faq',
  data: () => ({
    faqs: []
  }),
  methods: {
    addFAQ: function () {
      this.faqs.push({question: '', answer: ''})
    }
  }
}
</script>

<style>
  #question, #answer {
    width: 40%;
    margin-top: 3%;
  }
  #question {
    float: left;
    margin-right: 10%;
  }
  #answer {
    float: right;
  }
  #wrapper {
    height: 100%;
  }
</style>
