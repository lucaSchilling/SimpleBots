// Bot module
const Bot = require('./bot');
// Request module
const axios = require('axios');

axios.defaults.headers.common['Ocp-Apim-Subscription-Key'] = 'value'; // TODO: get subscription key

function timeout(ms = 3000) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * ****** NOTE ******
 * FAQ Bot for test purposes only.
 * ****** NOTE ******
 */
class FAQBot extends Bot {

    constructor(accountId, username, password, csds, config) {
        super(accountId, username, password, csds, config);
        
        this.luisUrl = 'https://westus.api.cognitive.microsoft.com/luis/api/v2.0/apps/';
        this.openConversations = {};
        createLuisApp(config);
    }

    /**
     * Initializes the bot's dialogs. Child classes must override this function to implement case specific responses.
     * @override
     */
    init() {
        super.init();

        // 'UPSERT' apparently means that the chat user has sent a new message
        this.agent.on('cqm.ExConversationChangeNotification', body => {
           // Bot joins any conversation as soon as the user sends the first message and answers with the welcome message and first set of options
           body.changes
                        //hier kann man erreichen das nur ein agent drin ist indem man das hinten erweitert (?)
                .filter(change => change.type === 'UPSERT' && !this.openConversations[change.result.convId] && change.result.conversationDetails.skillId === '999352232')
                .forEach(async change => {
                    this.openConversations[change.result.convId] = change.result.conversationDetails;
                    
                    await this.joinConversation(change.result.convId, 'MANAGER');
                    await this.sendMessage(change.result.convId, 'Hello, I am the FAQ Bot dummy');
                });

            // On conversation termination, remove all temporary data about that conversation
            body.changes
            .filter(change => change.type === 'DELETE' && this.openConversations[change.result.convId])
            .forEach(async change => {
                await this.leaveConversation(change.result.convId);
            });
        });
    }

    /**
     * Starts the bot if LUIS is ready.
     * @override
     */
    async start() {
        while (!this.isTrainingComplete) {
            await timeout(5000);
        }

        super.start();
    }

    /**
     * Creates a LUIS application and submits the required training data, then starts it.
     * @param {*} config 
     */
    async createLuisApp(config) {
        // Create app
        await axios.post(this.luisUrl, {
            name: config.name,
            description: '',
            culture: 'de-de',
            usageScenario: 'IoT',
            domain: config.domain,
            initialVersionId: '1.0'
        }, function(err, res) {
            if (err) {
                console.error(err);
                return;
            }

            if (res.status === 201) {
                this.luisAppId = res.data;
                console.log('Created LUIS app');
            }
            else if (res.status === 429) {
                console.log('LUIS rate limit exceeded');
                return;
            }
            else {
                console.error('Failed to create LUIS app');
                console.log(res);
                return;
            }
        });

        // Create intents
        for (let intent of config.intents) {
            await axios.post(this.luisUrl + this.luisAppId + '/versions/' + this.config.initialVersionId + '/intents', intent, function(err, res) {
                if (err) {
                    console.error(err);
                    return;
                }

                if (res.status === 201) {
                    console.log('Created intent: ' + intent);
                }
                else if (res.status === 429) {
                    console.log('LUIS rate limit exceeded');
                    return;
                }
                else {
                    console.error('Failed to create intent: ' + intent);
                    console.log(res);
                    return;
                }
            });
        }

        // Create entities
        for (let entity of config.entities) {
            await axios.post(this.luisUrl + this.luisAppId + '/versions/' + this.config.initialVersionId + '/entities', entity, function(err, res) {
                if (err) {
                    console.error(err);
                    return;
                }

                if (res.status === 201) {
                    console.log('Created entity: ' + entity);
                }
                else if (res.status === 429) {
                    console.log('LUIS rate limit exceeded');
                    return;
                }
                else {
                    console.error('Failed to create entity: ' + entity);
                    console.log(res);
                    return;
                }
            });
        }

        // Create examples
        for (let example of config.examples) {
            await axios.post(this.luisUrl + this.luisAppId + '/versions/' + this.config.initialVersionId + '/example', example, function(err, res) {
                if (err) {
                    console.error(err);
                    return;
                }

                if (res.status === 201) {
                    console.log('Created example: ' + example);
                }
                else if (res.status === 429) {
                    console.log('LUIS rate limit exceeded');
                    return;
                }
                else {
                    console.error('Failed to create example: ' + example);
                    console.log(res);
                    return;
                }
            });
        }

        // Train LUIS
        await axios.post(this.luisUrl + this.luisAppId + '/versions/' + this.config.initialVersionId + '/train', function(err, res) {
            if (err) {
                console.error(err);
                return;
            }

            if (res.status === 202) {
                console.log('Started LUIS training');
            }
            else if (res.status === 429) {
                console.log('LUIS rate limit exceeded');
                return;
            }
            else {
                console.error('Failed to start LUIS training');
                console.log(res);
                return;
            }
        });

        // Await training completion
        while (true) {
            await timeout(5000);
            await axios.get(this.luisUrl + this.luisAppId + '/versions/' + this.config.initialVersionId + '/train', function(err, res) {
                if (res.status === 200) {
                    this.isTrainingComplete = true;
                    break;
                }
                else if (res.status === 429) {
                    console.log('LUIS rate limit exceeded');
                    return;
                }
                else {
                    console.error('Failed to get LUIS training status');
                    console.log(res);
                    return;
                }
            });
        }
    }
}

module.exports = FAQBot;