<template>
<div id="carddiv">
    <div>
    <h4 id="head">Hi i'm Welcome Bot</h4>
    <img src="../../assets/welcomebot.jpg" alt="Welcome Bot" height="150" width="150">
    <div id="buttondiv">
        <button @click="showDialog = true" class="button button1">More</button>
    </div>
    </div>
     <md-dialog :md-active.sync="showDialog" id="dialog">
      <md-dialog-title>Welcome Bot</md-dialog-title>
      <div id="wrap">
        <div id="left">
            <img src="../../assets/welcomebot.jpg" alt="Welcome Bot" height="150" width="150" id="botimg">
            <div id="textdiv">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</div>
            <button id="dialogbtn" class="button button1">Create Bot</button> 
        </div>
        <div id="right">
          <video width="700" controls>
          <source src="../../assets/intro.mp4" type="video/mp4">
          </video>
        </div> 
        <div id="below">
            hellu
        </div>
      </div>
     </md-dialog>
</div>
</template>

<script>
  export default {
    name: 'elevationcontent',
    data: () => ({
      showDialog: false
    })
  }
</script>

<style lang="scss" scoped>
  #head {
    color: gray;
  }
  #dialog {
    width: 1000px;
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
  .button {
    background-color: #e47e25; 
    border: none;
    color: white;
    padding: 16px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    transition-duration: 0.4s;
    cursor: pointer;
}

.button1 {
    background-color: white; 
    color: #e47e25; 
    border: 2px solid #e47e25;
}

.button1:hover {
    background-color: #e47e25;
    color: white;
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
    padding-top: 20px;
    border-color: #e47e25;
}
</style>
