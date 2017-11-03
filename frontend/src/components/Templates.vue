<template>
<!-- Keeps all cards in one container to set style etc. -->
<div class="card-holder">
  <template-presentation 
  title='Hi I´m the Welcome Bot' 
  subtitle='I will Welcome your customers and present him his options'
  content='BLAÖFLAS fnsonglosdhl gnyg ni lgk inl gr BLAÖFLAS fnsonglosdhl gnyg ni lgk inl grBLAÖFLAS fnsonglosdhl gnyg ni lgk inl gr'
  moreContent='Hallo TEst'
  ></template-presentation>

  <template-presentation 
  title='Hi I´m the Welcome Bot' 
  subtitle='I will Welcome your customers and present him his options'
  content='BLAÖFLAS fnsonglosdhl gnyg ni lgk inl gr BLAÖFLAS fnsonglosdhl gnyg ni lgk inl grBLAÖFLAS fnsonglosdhl gnyg ni lgk inl gr'
  moreContent='Hallo TEst'
  ></template-presentation>

</div>
</template>

<script>
import TemplatePresentation from './TemplatePresentation.vue'

export default {
  name: 'Templates',
  methods: {},
  components: {
    TemplatePresentation
  },
  data () {
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card-holder,
.md-card {
  width: 100%;
  max-width: 320px;
  margin: 0 4px 16px;
  display: inline-block;
  vertical-align: top;
}
template-presentation {
  display: inline-block;
}
</style>
