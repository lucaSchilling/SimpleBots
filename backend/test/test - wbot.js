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

describe.skip('### WelcomeBot - Setting up a bot ###', function () {

    var bot = new welcomeBotClass(accountId, username, password,
        {
            template: 'Welcome Bot', name: 'Lucas stinkt!', welcomeMessage: 'Hey, ich kann dir helfen',
            options:
                [
                    { message: 'Naa', options: [{ message: 'Naa2', redirect: '12' }] }]
        });

    var bot1 = new welcomeBotClass(accountId, username, password,
        {
            template: 'Welcome Bot', name: 'James der Bottler', welcomeMessage: 'Hey, ich kann dir helfen',
            options:
                [
                    { message: 'Login Probleme', options: [{ message: 'Benutzername vergessen', redirect: '12' }, { message: 'Passwort vergessen', redirect: '13' }] }]
        });

    var bot2 = new welcomeBotClass(accountId, username, password,
        {
            template: 'Welcome Bot', name: 'Naruto der Bot', welcomeMessage: 'Hey, ich kann dir helfen',
            options:
                [
                    { message: 'Login Probleme', options: [{ message: 'Benutzername vergessen', redirect: '12' }, { message: 'Passwort vergessen', redirect: '13' }] },
                    { message: 'Weiterleitung zum FAQ Bot', options: [{ message: 'Weiterleitung erfolgt ...', redirect: '27' }] }
                ]
        });

    it('create a bot', function () {
        assert.equal(bot.accountId, '25352227')
        assert.equal(bot.username, 'luca.schilling@bwedu.de')
        assert.equal(bot.password, '!Slytherin1g')
        assert.equal(bot.isConnected, false)
        assert.equal(bot.config.name, 'Lucas stinkt!')
        assert.equal(bot.config.template, 'Welcome Bot')
        assert.equal(bot.config.welcomeMessage, 'Hey, ich kann dir helfen')

        assert.equal(bot.config.options[0].message, 'Naa')
        assert.equal(bot.config.options[0].options[0].message, 'Naa2')
        assert.equal(bot.config.options[0].options[0].redirect, '12')
    });

    it('create a bot1', function () {
        assert.equal(bot1.accountId, '25352227')
        assert.equal(bot1.username, 'luca.schilling@bwedu.de')
        assert.equal(bot1.password, '!Slytherin1g')
        assert.equal(bot1.isConnected, false)
        assert.equal(bot1.config.name, 'James der Bottler')
        assert.equal(bot1.config.template, 'Welcome Bot')
        assert.equal(bot1.config.welcomeMessage, 'Hey, ich kann dir helfen')

        assert.equal(bot1.config.options[0].message, 'Login Probleme')
        assert.equal(bot1.config.options[0].options[0].message, 'Benutzername vergessen')
        assert.equal(bot1.config.options[0].options[0].redirect, '12')
        assert.equal(bot1.config.options[0].options[1].message, 'Passwort vergessen')
        assert.equal(bot1.config.options[0].options[1].redirect, '13')
    });

    it('create a bot2', function () {
        assert.equal(bot2.accountId, '25352227')
        assert.equal(bot2.username, 'luca.schilling@bwedu.de')
        assert.equal(bot2.password, '!Slytherin1g')
        assert.equal(bot2.isConnected, false)
        assert.equal(bot2.config.name, 'Naruto der Bot')
        assert.equal(bot2.config.template, 'Welcome Bot')
        assert.equal(bot2.config.welcomeMessage, 'Hey, ich kann dir helfen')

        assert.equal(bot2.config.options[0].message, 'Login Probleme')
        assert.equal(bot2.config.options[0].options[0].message, 'Benutzername vergessen')
        assert.equal(bot2.config.options[0].options[0].redirect, '12')
        assert.equal(bot2.config.options[0].options[1].message, 'Passwort vergessen')
        assert.equal(bot2.config.options[0].options[1].redirect, '13')

        assert.equal(bot2.config.options[1].message, 'Weiterleitung zum FAQ Bot')
        assert.equal(bot2.config.options[1].options[0].message, 'Weiterleitung erfolgt ...')
        assert.equal(bot2.config.options[1].options[0].redirect, '27')
    });

    it('start a bot', function () {
        // bot.start();
        assert.equal(bot.isConnected, false)
    });

    it('shutdown a bot', function () {
        bot.shutdown();
        assert.equal(bot.isConnected, false)
        assert.equal(welcomeBotClass.agent, null)
    });

    it('shutdown a bot', function () {
        bot1.shutdown();
        assert.equal(bot1.isConnected, false)
        assert.equal(welcomeBotClass.agent, null)
    });

    it('shutdown a bot', function () {
        bot2.shutdown();
        assert.equal(bot2.isConnected, false)
        assert.equal(welcomeBotClass.agent, null)
    });
});