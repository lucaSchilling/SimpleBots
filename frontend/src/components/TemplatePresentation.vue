<template>
<div>
  <div  class="md-card md-theme-default">
  <!-- here you can normaly put in media like images but it is currently not used -->
  <!--<div class="md-card-media"><img  src="assets/card-image-1.jpg" alt="People"></div> -->
  <div class="md-card-header"><div  class="md-title">{{title}}</div> 
    <div class="md-subhead">{{subtitle}}</div></div>
     <div class="md-card-content"> {{content}} </div> 
     <div class="md-card-content" v-show="more"> {{moreContent}} </div> 
  <div class="md-card-actions">
    <button type="button" class="md-button md-theme-default" v-on:click='show'> show/hide
      <div class="md-ink-ripple">
        <div class="md-ripple" style="width: 88px; height: 88px;"></div></div></button></div>
</div>
</div>
</template>

<script>
export default {
  name: 'Template',
  data () {
    return {
      more: false
    }
  },
  methods: {
    show: function () {
      this.more = !this.more
    }
  },
  props: ['title', 'subtitle', 'content', 'moreContent']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card-holder .md-card {
  width: 100%;
  max-width: 320px;
  margin: 0 4px 16px;
  vertical-align: top;
}
</style>
