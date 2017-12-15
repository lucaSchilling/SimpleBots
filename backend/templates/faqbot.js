// Bot module
const Bot = require('./bot');
// Request module
const axios = require('axios');

axios.defaults.headers.common['Ocp-Apim-Subscription-Key'] = '4d44af468562465b828ff3ecfb651475';

/**
 * A bot that uses Microsoft LUIS to get the user's intent and answers frequently asked questions.
 */
class FAQBot extends Bot {

    /**
     * @override 
     * @see bot.js
     */
    constructor(accountId, username, password, config) {
        super(accountId, username, password, config);

        axios.defaults.headers.common['Ocp-Apim-Subscription-Key'] = config.luisKey;

        this.initLuisApp();
    }

    /**
     * Initializes the bot's dialogs.
     * @override
     */
    init() {
        super.init();

        // React to conversation changes
        this.agent.on('cqm.ExConversationChangeNotification', body => {
            // Bot joins any conversation marked with its skill
            body.changes
                .filter(change => change.type === 'UPSERT' && !this.openConversations[change.result.convId] && change.result.conversationDetails.skillId === this.config.skillId)
                .forEach(async change => {
                    this.openConversations[change.result.convId] = change.result.conversationDetails;
                    await this.joinConversation(change.result.convId, 'MANAGER');

                    console.log('FAQ Bot ' + this.config._id + ' joined conversation ' + change.result.convId);

                    await this.sendMessage(change.result.convId, 'Hello, I am the FAQ Bot. What is your question?');
                });

            // On conversation termination, remove all temporary data of that conversation
            body.changes
                .filter(change => change.type === 'DELETE' && this.openConversations[change.result.convId])
                .forEach(async change => {
                    await this.leaveConversation(change.result.convId);
                });
        });

        // React to messages in already joined conversations
        this.agent.on('ms.MessagingEventNotification', body => {
            body.changes
                .filter(change => this.openConversations[change.dialogId] && change.event.type === 'ContentEvent' && change.originatorId !== this.agent.agentId)
                .forEach(async change => {
                    let userMessage = change.event.message;

                    // Get user intent via LUIS
                    let getPredictionsRes = await axios.get(this.config.luisReqUrl + this.luisAppId + '?q=' + userMessage);

                    if (getPredictionsRes.status === 200) {
                        // Compare top scoring intent to the predefined intents
                        for (let intent of this.config.intents) {
                            if (intent.name === getPredictionsRes.data.topScoringIntent.intent) {
                                // Answer the user's question
                                await this.sendMessage(change.dialogId, intent.message);

                                // Terminate the conversation
                                await this.agent.updateConversationField({
                                    'conversationId': change.dialogId,
                                    'conversationField': [{
                                        field: "ConversationStateField",
                                        conversationState: "CLOSE"
                                    }]
                                });

                                return;
                            }

                            // If the top scoring intent wasn't predefined, redirect the chat partner to a human agent
                            await this.sendMessage(change.dialogId, 'I\'m sorry, but I couldn\'t understand your question.\nA human agent will be with you momentarily...');

                            await this.agent.updateConversationField({
                                'conversationId': change.dialogId,
                                'conversationField': [{
                                    field: "Skill",
                                    type: "UPDATE",
                                    skill: this.config.humanSkillId
                                }]
                            });

                            await this.leaveConversation(change.result.convId);
                        }
                    }
                    else if (getPredictionsRes.status === 429) {
                        console.log('LUIS rate limit exceeded');
                        await this.sendMessage('This service is currently not available due to technical difficulties');
                        return;
                    }
                    else {
                        console.error('Failed to evaluate user message');
                        console.log(createAppRes);
                        await this.sendMessage('This service is currently not available due to technical difficulties');
                        return;
                    }
            });
        });
    }

    /**
     * Starts the bot if LUIS is ready.
     * @override
     */
    async start() {
        while (!this.isLuisReady) {
            console.log('Waiting for LUIS App to be ready...');
            await this.timeout(5000);
        }

        super.start();
    }

    /**
     * Checks if a LUIS app is already existing for this bot. If not, creates a LUIS application and submits the required training data, then starts it.
     */
    async initLuisApp() {
        // Check for existing app
        let getApplicationsRes = await axios.get(this.config.luisApiUrl);

        if (getApplicationsRes.status === 200) {
            for (let app of getApplicationsRes.data) {
                if (app.name === this.config._id) {
                    this.luisAppId = app.id;
                    this.init();
                    this.isLuisReady = true;
                    return;
                }
            }
        }
        else if (getApplicationsRes.status === 429) {
            console.log('LUIS rate limit exceeded');
            return;
        }
        else {
            console.error('Failed to retrieve existing LUIS apps');
            console.log(getApplicationsRes);
            return;
        }

        // Create app
        let createAppRes = await axios.post(this.config.luisApiUrl, {
            name: this.config._id,
            description: '',
            culture: 'de-de',
            usageScenario: 'IoT',
            initialVersionId: this.config.initialVersionId
        });

        if (createAppRes.status === 201) {
            this.luisAppId = createAppRes.data;
            console.log('Created LUIS app');
        }
        else if (createAppRes.status === 429) {
            console.log('LUIS rate limit exceeded');
            return;
        }
        else {
            console.error('Failed to create LUIS app');
            console.log(createAppRes);
            return;
        }

        // Create intents
        for (let intent of this.config.intents) {
            let createIntentRes = await axios.post(this.config.luisApiUrl + this.luisAppId + '/versions/' + this.config.initialVersionId + '/intents', intent);

            if (createIntentRes.status === 201) {
                console.log('Created intent: ' + JSON.stringify(intent));
            }
            else if (createIntentRes.status === 429) {
                console.log('LUIS rate limit exceeded');
                return;
            }
            else {
                console.error('Failed to create intent: ' + JSON.stringify(intent));
                console.log(createIntentRes);
                return;
            }
        }

        // Create entities
        for (let entity of this.config.entities) {
            let createEntityRes = await axios.post(this.config.luisApiUrl + this.luisAppId + '/versions/' + this.config.initialVersionId + '/entities', entity);

            if (createEntityRes.status === 201) {
                console.log('Created entity: ' + JSON.stringify(entity));
            }
            else if (createEntityRes.status === 429) {
                console.log('LUIS rate limit exceeded');
                return;
            }
            else {
                console.error('Failed to create entity: ' + JSON.stringify(entity));
                console.log(createEntityRes);
                return;
            }
        }

        // Create examples
        for (let example of this.config.examples) {
            let createExampleRes = await axios.post(this.config.luisApiUrl + this.luisAppId + '/versions/' + this.config.initialVersionId + '/example', example);

            if (createExampleRes.status === 201) {
                console.log('Created example: ' + JSON.stringify(example));
            }
            else if (createExampleRes.status === 429) {
                console.log('LUIS rate limit exceeded');
                return;
            }
            else {
                console.error('Failed to create example: ' + JSON.stringify(example));
                console.log(createExampleRes);
                return;
            }
        }

        // Train LUIS
        let trainRes = await axios.post(this.config.luisApiUrl + this.luisAppId + '/versions/' + this.config.initialVersionId + '/train');

        if (trainRes.status === 202) {
            console.log('Started LUIS training');
        }
        else if (trainRes.status === 429) {
            console.log('LUIS rate limit exceeded');
            return;
        }
        else {
            console.error('Failed to start LUIS training');
            console.log(trainRes);
            return;
        }

        // Await training completion and app release
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
                    console.log('LUIS app published');
                }
                else if (publishRes.status === 429) {
                    console.log('LUIS rate limit exceeded');
                    return;
                }
                else {
                    console.error('Failed to publish LUIS app');
                    console.log(publishRes);
                    return;
                }

                this.init();
                this.isLuisReady = true;
                break;
            }
            else if (trainCompleteRes.status === 429) {
                console.log('LUIS rate limit exceeded');
                break;
            }
            else {
                console.error('Failed to get LUIS training status');
                console.log(trainCompleteRes);
                break;
            }
        }
    }
}

module.exports = FAQBot;