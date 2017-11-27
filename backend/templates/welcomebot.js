// Bot module
Bot = require('./bot');

/**
 * A bot that can join conversations, greet the conversation partner and offer a range of options to find out what the conversation partner wants.
 */
class WelcomeBot extends Bot {

    constructor(accountId, username, password, csds, config) {
        super(accountId, username, password, csds, config);

        this.conversationStates = {};
        this.openConversations = {};
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
                .filter(change => change.type === 'UPSERT' && !this.openConversations[change.result.convId])
                .forEach(async change => {
                    this.openConversations[change.result.convId] = change.result.conversationDetails;
                    this.conversationStates[change.result.convId] = this.config.options;
                    
                    await this.joinConversation(change.result.convId, 'MANAGER');
                    await this.sendMessage(change.result.convId, this.config.welcomeMessage);
                    await this.sendMessage(change.result.convId, this.generateOptionsMessage(change.result.convId));
                });

            // On conversation termination, remove all temporary data about that conversation
            body.changes
            .filter(change => change.type === 'DELETE' && this.openConversations[change.result.convId])
            .forEach(async change => {
                await this.leaveConversation(change.result.convId);
            });
        });

        this.agent.on('ms.MessagingEventNotification', body => {
            // If the bot has already joined the conversation and the user sends a message, send the next set of options or redirect them to another agent
            body.changes
            .filter(change => this.openConversations[change.dialogId] && change.event.type === 'ContentEvent' && change.originatorId !== this.agent.agentId)
            .forEach(async change => {
                let userMessage = change.event.message;
                console.log('message:' + change.event.message);
                let index = parseInt(userMessage) - 1;

                // TODO: index == NAN => human agent

                let convState = this.conversationStates[change.dialogId];

                if (convState[index].options) {
                    this.conversationStates[change.dialogId] = convState[index].options;
                    await this.sendMessage(change.dialogId, this.generateOptionsMessage(change.dialogId));
                }
                else {
                    // Mark the conversation with the demanded skill
                    this.agent.updateConversationField({
                        'conversationId': conversationId,
                        'conversationField': [{
                            'field': 'ParticipantsChange',
                            'type': 'ADD',
                            'role': role
                        },
                        {
                            field: "Skill",
                            type: "UPDATE",
                            skill: convState[index].redirect
                        }]
                    });

                    await this.leaveConversation(change.dialogId);
                }
            });
        });
    }

    /**
     * Generates the next reply from the bot's options.
     * @param convId The Id of the conversation that the string should be generated for.
     */
    generateOptionsMessage(convId) {
        let state = this.conversationStates[convId];
        
        if (!state) {
            throw new Error('Conversation not found');
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
        return super.leaveConversation(conversationId);
    }
}

module.exports = WelcomeBot;