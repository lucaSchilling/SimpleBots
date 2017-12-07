
const { config } = require('dotenv');
var botClass = require('../templates/bot');
var assert = require('chai').assert;
var db = require('../db')

config();
var accountId = process.env.LP_ACCOUNT;
var username = process.env.LP_USER;
var password = process.env.LP_PASS;
var port = process.env.PORT;
var MONGOURL = 'mongodb:141.19.142.6:27017/testdb';

describe('### Bot - Setting up a bot ###', function() {

    // console.log("Hey I bims: " + config)
    // console.log("Hey I bims2: " + config.options)

    var bot = new botClass(accountId, username, password, {name:'Lucas stinkt2!', welcomeMessage:'Hey', options: [{message: 'Naa', redirect: '1'}]});
   
    it('create a bot', function() {
        assert.equal(bot.accountId, '25352227')
        assert.equal(bot.username, 'luca.schilling@bwedu.de')
        assert.equal(bot.password, '!Slytherin1g')
        assert.equal(bot.isConnected, false)
    });

    it('start a bot', function() {
       bot.start();
       assert.equal(bot.isConnected, false)
    });

    it('shutdown a bot', function() {
        bot.shutdown();
        assert.equal(bot.isConnected, false)
        assert.equal(botClass.agent, null)
     });
});
