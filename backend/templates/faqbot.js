// Bot module
Bot = require('./bot');

/**
 * ****** NOTE ******
 * FAQ Bot for test purposes only.
 * ****** NOTE ******
 */
class FAQBot extends Bot {

    constructor(accountId, username, password, csds, config) {
        super(accountId, username, password, csds, config);
        
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
}

module.exports = FAQBot;