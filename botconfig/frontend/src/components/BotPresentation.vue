<template>
    <div>
      <md-whiteframe>
        {{botname}}</md-whiteframe>
    </div>
</template>

<script>
export default {
  props: ['botname'],
  name: 'botpresentation',
  data () {
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.md-whiteframe {
  width: 200px;
  height: 200px;
  margin: 24px 12px 12px 24px;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-align: center;
  align-items: center;
}
</style>
