var welcomebot = require('./welcomebot');
var config = JSON.parse(process.argv[2]); 


for (let j = 0; j < process.argv.length; j++){
    console.log(j + ' -> ' + process.argv[j])
}

var bot = new welcomebot(
    "25352227", 
"christopher", 
"!Slytherin1g", 
config
)
bot.start();