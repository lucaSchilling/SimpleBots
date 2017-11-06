<template>
    <md-table-row>
      <md-table-cell><md-switch v-model="checked0" id="my-test0" name="my-test0"></md-switch></md-table-cell>
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