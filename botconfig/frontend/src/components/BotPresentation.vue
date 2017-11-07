<template>
    <div>
      <md-list-item>
      <md-avatar>
        <img src="https://placeimg.com/40/40/people/1" alt="People">
      </md-avatar>

      <div class="md-list-text-container">
        <span>{{botname}}</span>
        <span>{{description}}</span>
        <p>I'll be in your neighborhood doing errands...</p>
      </div>

      <md-button class="md-icon-button md-list-action" @click="edit">
        <md-icon class="md-primary">edit</md-icon>
      </md-button>

      <md-divider class="md-inset"></md-divider>
    </md-list-item>
    </div>
</template>

<script>
export default {
  props: ['botname', 'description'],
  name: 'botpresentation',
  data () {
    return {}
  },
  methods: {
    edit () {
      alert('edit')
    }
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
