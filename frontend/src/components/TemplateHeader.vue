<template>
    <div>
       <md-whiteframe md-elevation="2">Newsfeed</md-whiteframe>
    </div>
</template>

<script>
export default {
  name: 'TemplateHeader',
  data () {
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.md-whiteframe {
  height: 100px;
  width: 976px;
  display: -ms-inline-flexbox;
  display: inline-flex;
  margin-bottom: 20px;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-align: center;
  align-items: center;
}
</style>
