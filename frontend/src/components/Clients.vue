<template>
 <div>
<md-whiteframe md-elevation="2">Lieferheld</md-whiteframe>
<md-whiteframe md-elevation="3">Bank</md-whiteframe>
<md-whiteframe md-elevation="4">XY AMI</md-whiteframe>
<md-whiteframe md-elevation="5">Add a Client</md-whiteframe>
    </div>
</template>

<script>
export default {
  name: 'Clients',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.md-whiteframe {
    width: 100px;
    height: 100px;
    margin: 24px 12px 12px 24px;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-align: center;
    align-items: center;
}
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
