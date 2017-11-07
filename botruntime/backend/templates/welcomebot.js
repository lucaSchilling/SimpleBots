// Bot module
Bot = require('./bot');

class WelcomeBot extends Bot {

    constructor(accountId, username, password, csds, config) {
        super(accountId, username, password, csds);
        this.config = config;
        this.initDialogFunctions();
        this.conversationStates = [];
    }

    /**
     * Initializes the bot's dialogs. Child classes must override this function to implement case specific responses.
     */
    initDialogFunctions() {
        // 'UPSERT' apparently means that the chat user has sent a new message
        this.agent.on('cqm.ExConversationChangeNotification', body => {
            body.changes
                //hier kann man erreichen das nur ein agent drin ist indem man das hinten erweitert
                .filter(change => change.type === 'UPSERT' && !this.openConversations[change.result.convId])
                .forEach(async change => {
                    this.openConversations[change.result.convId] = change.result.conversationDetails;
                    this.conversationStates[change.result.convId] = {
                        message: '',
                        options: [],
                        redirect
                    };
                    await this.joinConversation(change.result.convId, 'MANAGER');
                    await this.sendMessage(change.result.convId, config.welcomeMessage);
                    await this.sendMessage(change.result.convId, generateOptionsMessage(change.result.convId));
                });

            body.changes
                .filter(change => change.type === 'DELETE' && this.openConversations[change.result.convId])
                .forEach(change => {
                    delete this.openConversations[change.result.convId];
                });

            body.changes
                .filter(change => change.type === 'UPSERT' && this.openConversations[change.result.convId])
                .forEach(change => {
                    let userMessage = change.result.body;
                    await this.sendMessage(change.result.convId, )
                });
        });
    }

    /**
     * Generates the next reply from the bot's options.
     * @param convId The Id of the conversation that the string should be generated for.
     */
    generateOptionsMessage(convId) {
        let state = this.conversationStates[convId].options;

        if (!state) {
            throw 'Conversation not found';
        }
        else {
            return getCurrentOptions(this.config.options, state);
        }
    }

    /**
     * Recursively resolves the current options message and returns it.
     * @param options The options array that should be used
     * @param state An array of the indexes of the chosen options
     */
    getCurrentOptions(options, state) {
        if (state.length == 0) {
            let message = '';

            for (option in options) {
                message += option.message + '\n';
            }

            return message;
        }
        else {
            let newState = state.slice();
            newState.splice(0, 1);
            getCurrentOptions(options[state[0]], newState);
        }
    }
}

module.exports = WelcomeBot;