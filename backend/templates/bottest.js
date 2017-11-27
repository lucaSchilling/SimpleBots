var welcomebot = require('./welcomebot');

var bot = new welcomebot("25352227", 
"christopher", 
"!Slytherin1g", 
{_id: '1', name: 'Luca', options: [{message: 'opt1', redirect: ' '}, {message: 'opt2', redirect: ' '}, {message: 'opt3', redirect: ' '}], welcomeMessage: 'Hallo I Bims der Lucabot'})
bot.start();