// Bot module.
const Bot = require('./bot');

/**
 * A bot that can join conversations, greet the conversation partner and offer a range of options to find out what the conversation partner wants.
 */
class WelcomeBot extends Bot {

    constructor(accountId, username, password, config) {
        super(accountId, username, password, config);

        this.conversationStates = {};
    }

    /**
     * Initializes the bot's dialogs.
     * 
     * @override
     */
    init() {
        super.init();
        // 'UPSERT' apparently means that the chat user has sent a new message.
        this.agent.on('cqm.ExConversationChangeNotification', body => {
            // Bot joins any conversation as soon as the user sends the first message and answers with the welcome message and first set of options.
            body.changes
                .filter(change => change.type === 'UPSERT' && !this.openConversations[change.result.convId] && change.result.conversationDetails.skillId === '-1')
                .forEach(async change => {
                    this.openConversations[change.result.convId] = change.result.conversationDetails;
                    this.conversationStates[change.result.convId] = this.config.options;
                    console.log('/welcomebot.js 30 - Welcome Bot joined; ID: ' + change.result.conversationDetails.skillId);
                    await this.joinConversation(change.result.convId, 'MANAGER');
                    await this.sendMessage(change.result.convId, this.config.welcomeMessage);
                    await this.sendMessage(change.result.convId, this.generateOptionsMessage(change.result.convId));
                });
            // On conversation termination, remove all temporary data about that conversation.
            body.changes
                .filter(change => change.type === 'DELETE' && this.openConversations[change.result.convId])
                .forEach(async change => {
                    await this.leaveConversation(change.result.convId);
                });
        });

        this.agent.on('ms.MessagingEventNotification', body => {
            // If the bot has already joined the conversation and the user sends a message, send the next set of options or redirect them to another agent.
            body.changes
                .filter(change => this.openConversations[change.dialogId] && change.event.type === 'ContentEvent' && change.originatorId !== this.agent.agentId && body.changes[0].__isMe === false)
                .forEach(async change => {
                    let userMessage = change.event.message;
                    // Fallback to human agent if answer could not be parsed.
                    if (parseInt(userMessage) === NaN) {
                        await this.agent.updateConversationField({
                            'conversationId': change.dialogId,
                            'conversationField': [{
                                field: "Skill",
                                type: "UPDATE",
                                skill: this.config.humanSkillId
                            }]
                        });
                        console.log('/welcomebot.js 62 - Updated skill field of conversation ' + change.dialogId + ' to: ' + this.config.humanSkillId);
                        await this.timeout(50);
                        await this.leaveConversation(change.dialogId);
                        return;
                    }
                    let index = parseInt(userMessage) - 1;
                    let convState = this.conversationStates[change.dialogId];

                    if (convState[index].options) {
                        this.conversationStates[change.dialogId] = convState[index].options;
                        await this.sendMessage(change.dialogId, this.generateOptionsMessage(change.dialogId));
                    }
                    else {
                        // Redirect the chat partner to another bot by marking the conversation with the demanded skill.
                        let message = this.config.redirectMessage;

                        if (!message) {
                            message = 'You will be redirected to the FAQ Bot'
                        }
                        await this.sendMessage(change.dialogId, message);

                        await this.agent.updateConversationField({
                            'conversationId': change.dialogId,
                            'conversationField': [{
                                field: "Skill",
                                type: "UPDATE",
                                skill: convState[index].redirect
                            }]
                        });
                        console.log('/welcomebot.js 95 - Updated skill field of conversation ' + change.dialogId + ' to: ' + convState[index].redirect);
                        await this.timeout(50);
                        await this.leaveConversation(change.dialogId);
                    }
            });
        });
    }

    /**
     * Generates the next reply from the bot's options.
     * 
     * @param convId The Id of the conversation that the string should be generated for
     */
    generateOptionsMessage(convId) {
        let state = this.conversationStates[convId];

        if (!state) {
            throw new Error('/welcomebot.js 104 - Conversation not found');
        }
        else {
            let message = '';

            for (let option of state) {
                message += '\n' + option.message;
            }
            return message;
        }
    }

    /**
     * @override
     * @param {string} conversationId 
     */
    async leaveConversation(conversationId) {
        delete this.conversationStates[conversationId];
        return await super.leaveConversation(conversationId);
    }
}

module.exports = WelcomeBot;