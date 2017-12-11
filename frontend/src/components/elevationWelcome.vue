<template>
<div id="carddiv">
    <div>
    <h4 id="head">Hi i'm Welcome Bot</h4>
    <img src="../../assets/bot_gelb.jpg" alt="Welcome Bot" height="150" width="150">
    <div id="buttondiv">
        <md-button @click="showDialog = true" class="md-raised md-primary">More</md-button>
    </div>
    </div>
     <md-dialog :md-active.sync="showDialog" id="dialog">
      <md-dialog-title>Welcome Bot</md-dialog-title>
      <div id="wrap">
        <div id="left">
          <img src="../../assets/bot_gelb.jpg" alt="Welcome Bot" height="150" width="150" id="botimg">
          <div id="textdiv">I am here to greet your customers when they need help. If i can identify the problem, i will redirect them to the right service. Otherwise i will ask a human agent for help.</div>
            <md-button class="md-raised md-primary" to="/botarmy">
              Create Bot
            </md-button> 
        </div>
        <div id="right">
          <video width="700" controls>
          <source src="../../assets/welcome-bot.mp4" type="video/mp4">
          </video>
        </div> 
        <div id="below">
        </div>
        <hr id="line">
      <div id="features">
        <h4>Features</h4>
        <p class="feat"><md-icon class="md-primary">verified_user</md-icon>  High Security Standard</p>
        <p class="feat"><md-icon class="md-primary">verified_user</md-icon>  High Security Standard</p>
        <p class="feat"><md-icon class="md-primary">verified_user</md-icon>  High Security Standard</p>
      </div>
      </div>
     </md-dialog>
</div>
</template>

<script>
export default {
  name: 'elevationWelcome',
  data: () => ({
    showDialog: false
  }),
  computed: {
    template: {
      get () {
        return this.$store.state.template
      },
      set (val) {
        this.$store.commit('setTemplate', val)
      }
    }
  },
  methods: {
    setTemp: () => {
      this.template = 'Welcome Bot'
    }
  }
}
</script>

<style lang="scss" scoped>
  #head {
    color: gray;
  }
  #dialog {
    width: 80%;
    height: 70%;
  }
  #wrap {
    width: auto;
    position: relative;
    margin: auto;
  }
  #below {
    padding-left: 120px;
    clear: left;
  }

  #right {
    width: 600px; 
    float: left;
    padding-right: 30px;
  }
  #left {
    width: 400px; 
    float: left;
    padding-left: 30px;
    padding-right: 30px;   
  }
#buttondiv {
    clear: left;
}
#carddiv {
    margin: auto;
}
#textdiv {
    padding-bottom: 30px;
}
#botimg, #dialogbtn {
    display: block;
    margin-left: auto;
    margin-right: auto;
}
#line {
    display: block;
    height: 1px;
    border: 0;
    border-top: 1px solid #e47e25;
    margin: 1em 0;
    padding: 0;
}
#features {
  color: #e47e25;
  padding-left: 30px;
}
.feat {
  padding-bottom: 10px;
}
</style>
