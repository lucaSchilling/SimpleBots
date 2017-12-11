const { config } = require('dotenv');
var botClass = require('../templates/bot');
var welcomeBotClass = require('../templates/welcomebot');
var assert = require('chai').assert;


config();
var accountId = process.env.LP_ACCOUNT;
var username = process.env.LP_USER;
var password = process.env.LP_PASS;
var port = process.env.PORT;
var MONGOURL = 'mongodb:141.19.142.6:27017/testdb';

describe.skip('### WelcomeBot - Setting up a bot ###', function() {
    
    var bot = new welcomeBotClass(accountId, username, password, {name:'Lucas stinkt!', welcomeMessage:'Hey', options: [{message: 'Naa', redirect: '1'}]});

    it('create a bot', function() {
        assert.equal(bot.accountId, '25352227')
        assert.equal(bot.username, 'luca.schilling@bwedu.de')
        assert.equal(bot.password, '!Slytherin1g')
        assert.equal(bot.isConnected, false)
        //assert.equal(bot.options.name, 'Lucas stinkt!')

    });

    it('start a bot', function() {
       bot.start();
       assert.equal(bot.isConnected, false)
    });

    it('shutdown a bot', function() {
        bot.shutdown();
        assert.equal(bot.isConnected, false)
        assert.equal(welcomeBotClass.agent, null)
     });
});