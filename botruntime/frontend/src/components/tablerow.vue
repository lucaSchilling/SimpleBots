<template>
    <md-table-row>
      <md-table-cell><toggle-button @change="bla"/></md-table-cell>
      <md-table-cell>{{status}}</md-table-cell>
      <md-table-cell>{{template}}</md-table-cell>
      <md-table-cell>{{name}}</md-table-cell>
      <md-table-cell>{{language}}</md-table-cell>
      <md-table-cell>{{client}}</md-table-cell>
      <md-table-cell>{{lastedit}}</md-table-cell>
    </md-table-row>
</template>

<script>

export default {
  name: 'tablerow',
  data () {
    return {
    }
  },
  props: ['status', 'template', 'name', 'language', 'client', 'lastedit']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>