<template>
    <md-table-row>
      <md-table-cell><md-switch v-model="checked0" id="my-test0" name="my-test0"></md-switch></md-table-cell>
      <md-table-cell><div id="circle"></div></md-table-cell>
      <md-table-cell>{{ID}}</md-table-cell>
      <md-table-cell>{{template}}</md-table-cell>
      <md-table-cell>{{name}}</md-table-cell>
      <!--<md-table-cell>{{language}}</md-table-cell>-->
      <!--<md-table-cell>{{client}}</md-table-cell>-->
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
  props: ['ID', 'status', 'template', 'name', 'lastedit']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#circle {
    background: #008000;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    
}
</style>