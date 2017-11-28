var welcomebot = require('./welcomebot');
var config = process.argv[2]; 

console.log(config)
for (let j = 0; j < process.argv.length; j++){
    console.log(j + ' -> ' + process.argv[j])
}

var bot = new welcomebot(
    "25352227", 
"christopher", 
"!Slytherin1g", 
JSON.parse(config)
)
bot.start();