const { config } = require('dotenv');
var botClass = require('../templates/bot');
var faqBotClass = require('../templates/faqbot');
var assert = require('chai').assert;


config();
var accountId = process.env.LP_ACCOUNT;
var username = process.env.LP_USER;
var password = process.env.LP_PASS;
var port = process.env.PORT;
var MONGOURL = 'mongodb:141.19.142.6:27017/testdb';

describe.skip('### FaqBot - Setting up a bot ###', function () {

    var bot = new faqBotClass(accountId, username, password,
        {
            template: 'FAQ Bot', name: 'test faq bot1', initialVersionId: '1.0',
            intents:
                [
                    { name: 'getWeather', message: 'Heute ist es überwiegend bewölkt bei 0° bis 3° Celsius' },
                    { name: 'getAddress', message: 'Sie finden uns in der ABC-Str. 8a, 12345 Beispielstadt' }
                ],
            entities:
                [
                    { name: 'Weather' },
                    { name: 'Address' }
                ],
            examples:
                [

                    {
                        text: 'Ich möchte Ihre Adresse wissen', intentName: 'getAddress', entityLabels:
                            [
                                { entityName: 'Address', startCharIndex: 16, endCharIndex: 22 }
                            ]
                    },

                    {
                        text: 'Wie lautet Ihre Adresse?', intentName: 'getAddress', entityLabels:
                            [
                                { entityName: 'Address', startCharIndex: 16, endCharIndex: 22 }
                            ]
                    },

                    {
                        text: 'Wie ist das Wetter heute?', intentName: 'getWeather', entityLabels:
                            [
                                { entityName: 'Weather', startCharIndex: 12, endCharIndex: 17 }
                            ]
                    },

                    {
                        text: 'Wie ist die aktuelle Wetterlage?', intentName: 'getWeather', entityLabels:
                            [
                                { entityName: 'Weather', startCharIndex: 22, endCharIndex: 31 }
                            ]
                    }
                ]
        })

    it('create a bot', function () {
        assert.equal(bot.accountId, '25352227')
        assert.equal(bot.username, 'luca.schilling@bwedu.de')
        assert.equal(bot.password, '!Slytherin1g')
        assert.equal(bot.isConnected, false)
        assert.equal(bot.config.name, 'test faq bot1')
        assert.equal(bot.config.template, 'FAQ Bot')
        assert.equal(bot.config.initialVersionId, '1.0')

        assert.equal(bot.config.intents[0].name, 'getWeather')
        assert.equal(bot.config.intents[0].message, 'Heute ist es überwiegend bewölkt bei 0° bis 3° Celsius')

        assert.equal(bot.config.intents[1].name, 'getAddress')
        assert.equal(bot.config.intents[1].message, 'Sie finden uns in der ABC-Str. 8a, 12345 Beispielstadt')

        assert.equal(bot.config.entities[0].name, 'Weather')
        assert.equal(bot.config.entities[1].name, 'Address')

        assert.equal(bot.config.examples[0].text, 'Ich möchte Ihre Adresse wissen')
        assert.equal(bot.config.examples[0].intentName, 'getAddress')
        assert.equal(bot.config.examples[0].entityLabels[0].entityName, 'Address')
        assert.equal(bot.config.examples[0].entityLabels[0].startCharIndex, 16)
        assert.equal(bot.config.examples[0].entityLabels[0].endCharIndex, 22)

        assert.equal(bot.config.examples[1].text, 'Wie lautet Ihre Adresse?')
        assert.equal(bot.config.examples[1].intentName, 'getAddress')
        assert.equal(bot.config.examples[1].entityLabels[0].entityName, 'Address')
        assert.equal(bot.config.examples[1].entityLabels[0].startCharIndex, 16)
        assert.equal(bot.config.examples[1].entityLabels[0].endCharIndex, 22)

        assert.equal(bot.config.examples[2].text, 'Wie ist das Wetter heute?')
        assert.equal(bot.config.examples[2].intentName, 'getWeather')
        assert.equal(bot.config.examples[2].entityLabels[0].entityName, 'Weather')
        assert.equal(bot.config.examples[2].entityLabels[0].startCharIndex, 12)
        assert.equal(bot.config.examples[2].entityLabels[0].endCharIndex, 17)

        assert.equal(bot.config.examples[3].text, 'Wie ist die aktuelle Wetterlage?')
        assert.equal(bot.config.examples[3].intentName, 'getWeather')
        assert.equal(bot.config.examples[3].entityLabels[0].entityName, 'Weather')
        assert.equal(bot.config.examples[3].entityLabels[0].startCharIndex, 22)
        assert.equal(bot.config.examples[3].entityLabels[0].endCharIndex, 31)
    });

    it('start a bot', function () {
        // bot.start();
        assert.equal(bot.isConnected, false)
    });

    it('shutdown a bot', function () {
        bot.shutdown();
        assert.equal(bot.isConnected, false)
        assert.equal(faqBotClass.agent, null)
    });

});