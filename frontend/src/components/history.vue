<template>
  <div to='/history'>
      <h1>Our Bots!</h1>
      <div class="cardDiv">
          <div class="left" v-for="bot in history" v-bind:key="bot">
        <md-card>
          <md-card-header>
            <div class="md-title">
                {{bot.name}}
                <md-menu md-direction="bottom-start" class="menu">
                  <md-button md-menu-trigger>
                    <md-icon>more_vert</md-icon>
                  </md-button>

                  <md-menu-content>
                    <md-menu-item><span>info</span></md-menu-item>
                    <md-menu-item><span>edit</span></md-menu-item>
                    <md-menu-item><span>clone</span></md-menu-item>
                  </md-menu-content>
                </md-menu>
            </div>
          </md-card-header>

          <md-card-content>
            <img src="../../assets/bot_lila.jpg" v-if="bot.template === 'FAQ Bot'"></img>
            <img src="../../assets/bot_gelb.jpg" v-else-if="bot.template === 'Welcome Bot'"></img>
          </md-card-content>

        </md-card>
        </div>
      </div>
      <md-speed-dial md-direction="bottom" id="dial">
      <md-speed-dial-target to="/botarmy">
        <md-icon>add</md-icon>
      </md-speed-dial-target>
      </md-speed-dial>
  </div>
</template>

<script>
export default {
  name: 'history',
  computed: {
    history: {
      get () {
        return this.$store.state.history
      }
    }
  },
  methods: {
    getAll: function () {
      this.$store.dispatch('getAll')
    }
  },
  beforeMount () {
    this.getAll()
  }
}
</script>

<style>
h1, .md-title, span:hover {
    color: #f68b1f
}
.menu {
    float: right;
}
.left {
    width: 20%;
    float: left;
    margin-right: 3%;
    margin-top: 3%;
}
.cardDiv {
    margin-left: 3%;
}
span {
    cursor: pointer;
}
#dial {
    position: absolute;
    bottom: 5%;
    right: 5%;
}
</style>
