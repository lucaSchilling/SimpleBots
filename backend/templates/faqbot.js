// Bot module.
const Bot = require('./bot');
// Request module.
const axios = require('axios');

axios.defaults.headers.common['Ocp-Apim-Subscription-Key'] = '4d44af468562465b828ff3ecfb651475';

function timeout(ms = 3000) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * A bot that uses Microsoft LUIS to get the user's intent and answers frequently asked questions.
 */
class FAQBot extends Bot {
    constructor(accountId, username, password, config) {
        super(accountId, username, password, config);

        axios.defaults.headers.common['Ocp-Apim-Subscription-Key'] = config.luisKey;
        this.createLuisApp();
    }

    /**
     * Initializes the bot's dialogs. Child classes must override this function to implement case specific responses.
     * 
     * @override
     */
    init() {
        super.init();
        // 'UPSERT' apparently means that the chat user has sent a new message.
        this.agent.on('cqm.ExConversationChangeNotification', body => {
            // Bot joins any conversation as soon as the user sends the first message and answers with the welcome message and first set of options.
            body.changes
                .filter(change => change.type === 'UPSERT' && !this.openConversations[change.result.convId] && change.result.conversationDetails.skillId === '999352232')
                .forEach(async change => {
                    this.openConversations[change.result.convId] = change.result.conversationDetails;
                    await this.joinConversation(change.result.convId, 'MANAGER');
                    await this.sendMessage(change.result.convId, 'Hello, I am the FAQ Bot. What is your question?');
                });
            // On conversation termination, remove all temporary data about that conversation.
            body.changes
                .filter(change => change.type === 'DELETE' && this.openConversations[change.result.convId])
                .forEach(async change => {
                    await this.leaveConversation(change.result.convId);
                });
        });
        this.agent.on('ms.MessagingEventNotification', body => {
            body.changes
                .filter(change => this.openConversations[change.dialogId] && change.event.type === 'ContentEvent' && change.originatorId !== this.agent.agentId)
                .forEach(async change => {
                    let userMessage = change.event.message;
                    let getPredictionsRes = await axios.get(this.config.luisReqUrl + this.luisAppId + '?q=' + userMessage);
                    if (getPredictionsRes.status === 200) {
                        for (let intent of this.config.intents) {
                            if (intent.name === getPredictionsRes.data.topScoringIntent.intent) {
                                await this.sendMessage(change.dialogId, intent.message);
                                await this.agent.updateConversationField({
                                    'conversationId': change.dialogId,
                                    'conversationField': [{
                                        field: "ConversationStateField",
                                        conversationState: "CLOSE"
                                    }]
                                });
                                return;
                            }
                            await this.sendMessage(change.dialogId, 'I\'m sorry, but I couldn\'t understand your question');
                        }
                    }
                    else if (getPredictionsRes.status === 429) {
                        console.log('/faqbot.js 71 - LUIS rate limit exceeded');
                        await this.sendMessage('This service is currently not available due to technical difficulties');
                        return;
                    }
                    else {
                        await this.sendMessage('This service is currently not available due to technical difficulties');
                        return;
                    }
                });
        });
    }

    /**
     * Starts the bot if LUIS is ready.
     * 
     * @override
     */
    async start() {
        while (!this.isTrainingComplete) {
            await this.timeout(5000);
        }
        super.start();
    }

    /**
     * Creates a LUIS application and submits the required training data, then starts it.
     * 
     * @param {JSON} config 
     */
    async createLuisApp() {
        // Check for existing app.
        let getApplicationsRes = await axios.get(this.config.luisApiUrl);
        if (getApplicationsRes.status === 200) {
            for (let app of getApplicationsRes.data) {
                if (app.name === this.config.username + this.config._id) {
                    this.luisAppId = app.id;
                    this.init();
                    this.isTrainingComplete = true;
                    return;
                }
            }
        }
        else if (getApplicationsRes.status === 429) {
            console.log('/faqbot.js 113 - LUIS rate limit exceeded');
            return;
        }
        else {
            return;
        }

        // Create app.
        let createAppRes = await axios.post(this.config.luisApiUrl, {
            name: this.config.username + this.config._id,
            description: '',
            culture: 'de-de',
            usageScenario: 'IoT',
            initialVersionId: this.config.initialVersionId
        });
        if (createAppRes.status === 201) {
            this.luisAppId = createAppRes.data;
            console.log('/faqbot.js 131 - Created LUIS app');
        }
        else if (createAppRes.status === 429) {
            console.log('/faqbot.js 134 - LUIS rate limit exceeded');
            return;
        }
        else {
            console.error('/faqbot.js 138 - Failed to create LUIS app');
            return;
        }

        // Create intents.
        for (let intent of this.config.intents) {
            let createIntentRes = await axios.post(this.config.luisApiUrl + this.luisAppId + '/versions/' + this.config.initialVersionId + '/intents', intent);
            if (createIntentRes.status === 201) {
                console.log('/faqbot.js 147 - Created intent: ' + JSON.stringify(intent));
            }
            else if (createIntentRes.status === 429) {
                console.log('/faqbot.js 150 - LUIS rate limit exceeded');
                return;
            }
            else {
                console.error('/faqbot.js 154 - Failed to create intent: ' + JSON.stringify(intent));
                return;
            }
        }

        // Create entities.
        for (let entity of this.config.entities) {
            let createEntityRes = await axios.post(this.config.luisApiUrl + this.luisAppId + '/versions/' + this.config.initialVersionId + '/entities', entity);
            if (createEntityRes.status === 201) {
                console.log('/faqbot.js 164 - Created entity: ' + JSON.stringify(entity));
            }
            else if (createEntityRes.status === 429) {
                console.log('/faqbot.js 167 - LUIS rate limit exceeded');
                return;
            }
            else {
                console.error('/faqbot.js 171 - Failed to create entity: ' + JSON.stringify(entity));
                return;
            }
        }

        // Create examples.
        for (let example of this.config.examples) {
            let createExampleRes = await axios.post(this.config.luisApiUrl + this.luisAppId + '/versions/' + this.config.initialVersionId + '/example', example);
            if (createExampleRes.status === 201) {
                console.log('/faqbot.js 181 - Created example: ' + JSON.stringify(example));
            }
            else if (createExampleRes.status === 429) {
                console.log('/faqbot.js 184 - LUIS rate limit exceeded');
                return;
            }
            else {
                console.error('/faqbot.js 188 - Failed to create example: ' + JSON.stringify(example));
                return;
            }
        }

        // Train LUIS.
        let trainRes = await axios.post(this.config.luisApiUrl + this.luisAppId + '/versions/' + this.config.initialVersionId + '/train');
        if (trainRes.status === 202) {
            console.log('/faqbot.js 197 - Started LUIS training');
        }
        else if (trainRes.status === 429) {
            console.log('/faqbot.js 200 - LUIS rate limit exceeded');
            return;
        }
        else {
            console.error('/faqbot.js 204 - Failed to start LUIS training');
            return;
        }

        // Await training completion.
        while (true) {
            await this.timeout(5000);
            let trainCompleteRes = await axios.get(this.config.luisApiUrl + this.luisAppId + '/versions/' + this.config.initialVersionId + '/train');
            if (trainCompleteRes.status === 200) {
                let publishRes = await axios.post(this.config.luisApiUrl + this.luisAppId + '/publish', {
                    versionId: '1.0',
                    isStaging: false,
                    region: 'westus'
                });
                if (publishRes.status === 201) {
                    console.log('/faqbot.js 220 - LUIS app published');
                }
                else if (publishRes.status === 429) {
                    console.log('/faqbot.js 223 - LUIS rate limit exceeded');
                    return;
                }
                else {
                    console.error('/faqbot.js 227 - Failed to publish LUIS app');
                    console.log(publishRes);
                    return;
                }
                this.init();
                this.isTrainingComplete = true;
                break;
            }
            else if (trainCompleteRes.status === 429) {
                console.log('/faqbot.js 237 - LUIS rate limit exceeded');
                break;
            }
            else {
                console.error('/faqbot.js 241 - Failed to get LUIS training status');
                break;
            }
        }
    }
}

module.exports = FAQBot;