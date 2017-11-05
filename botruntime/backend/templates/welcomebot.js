// Bot module
Bot = require('./bot');

class WelcomeBot extends Bot {

    constructor(accountId, username, password, csds, config) {
        super(accountId, username, password, csds);
        this.config = config;
        this.initDialogFunctions();
    }

    /**
     * Initializes the bot's dialogs. Child classes must override this function to implement case specific responses.
     */
    initDialogFunctions() {
        this.agent.on('cqm.ExConversationChangeNotification', body => {
            body.changes
                //hier kann man erreichen das nur ein agent drin ist indem man das hinten erweitert
                .filter(change => change.type === 'UPSERT' && !this.openConversations[change.result.convId])
                .forEach(async change => {
                    this.openConversations[change.result.convId] = change.result.conversationDetails;
                    await this.joinConversation(change.result.convId, 'MANAGER');
                    await this.sendMessage(change.result.convId, config.welcomeMessage);
                });
            body.changes
                .filter(change => change.type === 'DELETE' && this.openConversations[change.result.convId])
                .forEach(change => delete this.openConversations[change.result.convId]);
        });
    }
}

module.exports = WelcomeBot;