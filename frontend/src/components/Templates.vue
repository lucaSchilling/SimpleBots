<template>
  <div class="hello">
    <md-whiteframe md-elevation="2">Newsfeed</md-whiteframe>
<div data-v-2b6a83fc="" class="card-holder"><div data-v-2b6a83fc="" class="md-card md-theme-default">
  <div data-v-2b6a83fc="" class="md-card-media"><img data-v-2b6a83fc="" src="assets/card-image-1.jpg" alt="People"></div> 
  <div data-v-2b6a83fc="" class="md-card-header"><div data-v-2b6a83fc="" class="md-title">Hi I´m <br>the Welcome Bot</div> 
  <div data-v-2b6a83fc="" class="md-subhead">Subtitle here</div></div> <div data-v-2b6a83fc="" class="md-card-actions">
    <button data-v-2b6a83fc="" type="button" class="md-button md-theme-default"> Action<div class="md-ink-ripple">
      <div class="md-ripple" style="width: 88px; height: 88px;"></div></div></button> 
      <button data-v-2b6a83fc="" type="button" class="md-button md-theme-default"> Action<div class="md-ink-ripple">
        <div class="md-ripple" style="width: 88px; height: 88px;"></div></div></button></div>
         <div data-v-2b6a83fc="" class="md-card-content"> Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non, voluptas eius illo quas, saepe voluptate pariatur in deleniti minus sint. Excepturi.
            </div></div>
            
            
   <div data-v-2b6a83fc="" class="md-card md-theme-default">
            <div data-v-2b6a83fc="" class="md-card-header md-card-header-flex">
              <div data-v-2b6a83fc="" class="md-card-header-text"><div data-v-2b6a83fc="" class="md-title">Hi I´m <br>the Task Assistant Bot</div>
               <div data-v-2b6a83fc="" class="md-subhead">Subtitle here</div></div> <div data-v-2b6a83fc="" class="md-menu">
                 <button data-v-2b6a83fc="" type="button" class="md-button md-icon-button md-theme-default" md-menu-trigger="">
                    <i data-v-2b6a83fc="" aria-hidden="true" class="md-icon md-theme-default material-icons">more_vert</i>
                    <div class="md-ink-ripple"><div class="md-ripple" style="width: 40px; height: 40px;"></div></div></button> 
                     </div></div> <div data-v-2b6a83fc="" class="md-card-media"><img data-v-2b6a83fc="" src="assets/card-image-1.jpg" alt="People"></div> 
                     <div data-v-2b6a83fc="" class="md-card-content">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, 
              sed accusantium quasi non, voluptas eius illo quas, saepe voluptate pariatur in deleniti minus sint. Excepturi.
            </div></div>
            
            <div data-v-2b6a83fc="" class="md-card md-theme-default"><div data-v-2b6a83fc="" class="md-card-media">
              <img data-v-2b6a83fc="" src="assets/card-image-2.jpg" alt="People"></div> <div data-v-2b6a83fc="" class="md-card-header"><div data-v-2b6a83fc="" class="md-title">Hi I´m <br> the Consumer FAQ Bot</div> <div data-v-2b6a83fc="" class="md-subhead">Subtitle here</div></div> <div data-v-2b6a83fc="" class="md-card-actions"><button data-v-2b6a83fc="" type="button" id="1" class="md-button md-theme-default" @click="test()"> Test<div class="md-ink-ripple"><div class="md-ripple" style="width: 88px; height: 88px;"></div></div></button> <button data-v-2b6a83fc="" type="button" class="md-button md-theme-default"> Action<div class="md-ink-ripple"><div class="md-ripple" style="width: 88px; height: 88px;"></div></div></button></div></div></div>
  </div>
</template>

<script>
import Template from './Template.vue'

export default {
  name: 'Templates',
  components: {
    Template
  },
  methods: {
    test: function () {
      alert('Hallo Welt Dudumz')
    }
  },
  data () {
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.md-whiteframe {
    height: 100px;
    width: 1024px;
     display: -ms-inline-flexbox;
    display: inline-flex;
    margin-bottom: 20px;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-align: center;
    align-items: center;
}

.card-holder .md-card[data-v-2b6a83fc] {
  width: 100%;
  max-width: 320px;
  margin: 0 4px 16px;
  display: inline-block;
  vertical-align: top;
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
