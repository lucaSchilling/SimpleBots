var welcomebot = require('./welcomebot');

var bot = new welcomebot("25352227", 
"luca.schilling@bwedu.de", 
"!Slytherin1g", 
{_id: '1', name: 'Luca', options: [{message: 'opt1', redirect: ' '}, {message: 'opt2', redirect: ' '}, {message: 'opt3', redirect: ' '}], welcomemessage: 'Hallo I Bims der Lucabot'})
bot.start();