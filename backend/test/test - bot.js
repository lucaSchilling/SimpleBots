const { config } = require('dotenv');
var botClass = require('../templates/bot');
var assert = require('chai').assert;

config();
var accountId = process.env.LP_ACCOUNT;
var username = process.env.LP_USER;
var password = process.env.LP_PASS;
var port = process.env.PORT;
var csds = process.env.LP_CSDS;

describe.skip('### Bot - Setting up a bot ###', function() {
    
    var bot = new botClass(accountId, username, password, csds, config);
    
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