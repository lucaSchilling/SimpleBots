const { Agent } = require('node-agent-sdk');
// Used to transform the existing callback based functions into promise based functions
const { promisify } = require('util');

function timeout(ms = 3000) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class Bot {
    /**
     * Creates a new bot that can join conversations via the specified agent.
     * @param {Agent} agent the agent object that underlies this bot
     */
    constructor(accountId, username, password, csds, config) {
        this.accountId = accountId;
        this.username = username;
        this.password = password;
        this.csds = csds;
        this.config = config;
        this.retries = 3;
        this.init();
    }

    /**
     * Initializes the event handler.
     */
    init() {
        this.isConnected = false;
        this.agent = new Agent({ accountId: this.accountId, username: this.username, password: this.password, csdsDomain: this.csds });
        
        this.agent.on('connected', () => { 
            this.isConnected = true; 
        });

        this.agent.on('error', err => {
            this.isConnected = false;
            console.error('Connection to UMS closed with err', err.message); // TODO: mail to admin
        });

        this.agent.on('closed', this.onClose);

        this.promisifyFunctions();
    }

    onClose (reason) {
            this.isConnected = false;
            console.error('Connection to UMS closed with reason', reason); // TODO: mail to admin
            console.log(this.agent.config)
            if(this.retries > 0){
                this.retries--;
                console.log(this.retries)
                setTimeout(() => {
                    this.agent.reconnect(reason !== 4401 || reason !== 4407);
                }, 1000);

            }else{
                console.error('Reconnected')
            }
    }

    /**
     * Utility function which transforms the used SDK functions into promise-based ones, which later get consumed by other functions.
     */
    promisifyFunctions() {
        this.subscribeExConversations = promisify(this.agent.subscribeExConversations);
        this.publishEvent = promisify(this.agent.publishEvent);
        this.setAgentState = promisify(this.agent.setAgentState);
        this.updateConversationField = promisify(this.agent.updateConversationField);
    }

    /**
     * Starts the bot.
     */
    async start() {
        if (!this.agent) {
            this.init();
        }

        while (!this.isConnected) {
            await timeout(3000);
        }

        let response;
        response = await this.setStateOfAgent('AWAY');
        response = await this.subscribeToConversations();
    }

    /**
     * Shuts the bot down.
     */
    shutdown() {
        this.isConnected = false;
        this.agent.dispose();
        this.agent.removeAllListeners();
        this.agent = null;
    }

    /**
     * This functions allows the agent to subscribe to conversations.
     * It wraps the original SDK function to make it easier to use.
     * @param {string} convState the conversation state for which should be subscribed
     * @param {boolean} agentOnly if true, the bot only subscribes to conversations in which the agent is or which are suitable for his skills
     */
    async subscribeToConversations(convState = 'OPEN', agentOnly = false) { // TODO: agentOnly not needed?
        if (!this.isConnected) {
            return;
        }

        return await this.agent.subscribeExConversations({ 'convState': [convState] });
    }

    /**
     * Sets the state of the agent. This is important for the routing of incomming messages.
     * It wraps the original SDK function to make it easier to use.
     * @param {string} state state of the agent (ONLINE, OFFLINE, AWAY)
     */
    async setStateOfAgent(state = 'ONLINE') {
        if (!this.isConnected) {
            return;
        }

        return await this.agent.setAgentState({ availability: state });
    }

    /**
     * Makes the bot join a conversation.
     * It wraps the original SDK function to make it easier to use.
     * @param {string} conversationId id of the conversation that should be joined
     * @param {string} role role of the agent (AGENT, MANAGER)
     */
    async joinConversation(conversationId, role = 'MANAGER') {
        if (!this.isConnected) {
            return;
        }

        return await this.agent.updateConversationField({
            'conversationId': conversationId,
            'conversationField': [{
                field: 'ParticipantsChange',
                type: 'ADD',
                role: role
            }]
        });
    }

    /**
     * Sends a message to the specified conversation.
     * It wraps the original SDK function to make it easier to use.
     * @param {string} conversationId id of the conversation that the message is sent to
     * @param {string} message text message that is sent to the client
     */
    async sendMessage(conversationId, message) {
        console.log(this.config.name + ' has joined...')
        if (!this.isConnected) return;
        return await this.agent.publishEvent({
            dialogId: conversationId,
            event: {
                type: 'ContentEvent',
                contentType: 'text/plain',
                message: message
            }
        });
    }

    /**
     * Deletes all temporary data of the specified conversation and leaves it.
     * @param {string} conversationId 
     */
    async leaveConversation(conversationId) {
        console.log(this.config.name + ' has left...')
        delete this.openConversations[conversationId];

        // TODO: leave conversation via agent function
        
        return;
    }
}

module.exports = Bot;