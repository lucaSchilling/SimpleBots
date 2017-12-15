const { Agent } = require('node-agent-sdk');
// Used to transform the existing callback based functions into promise based functions.
const { promisify } = require('util');

class Bot {
    /**
     * Creates a new bot that can join conversations via the specified agent.
     * 
     * @param {string} accountId account ID of the LivePerson account
     * @param {string} username username of the LivePerson account
     * @param {string} password password of the LivePerson account
     * @param {JSON} config config of the bot
     */
    constructor(accountId, username, password, config) {
        this.accountId = accountId;
        this.username = username;
        this.password = password;
        this.config = config;
        this.retries = 3;
        this.isConnected = false;
        this.openConversations = {};
        this.init();
    }

    /**
     * Creates an agent and initializes its event handlers.
     */
    init() {
        this.agent = new Agent({ accountId: this.accountId, username: this.username, password: this.password });
        this.agent.on('connected', () => {
            this.isConnected = true;
        });

        this.agent.on('error', err => {
            this.isConnected = false;
            console.error('/bot.js 35 - Bot ' + this.config._id + ': Connection to UMS closed with err', err.message); 
        });

        // If losing connection to LiveEngage, retry to connect.
        this.agent.on('closed', reason => {
            this.isConnected = false;

            console.error('/bot.js 42 - Bot ' + this.config._id + ': Connection to UMS closed with reason', reason); 
          
            if (this.retries > 0) {
                this.retries--;
                
                setTimeout(() => {
                    this.agent.reconnect(reason !== 4401 || reason !== 4407);
                }, 5000);
            }
            else {
                console.error('/bot.js 52 - Bot ' + this.config._id + ': Unable to connect')
            }
        });
    }

    /**
     * Starts the bot.
     */
    async start() {
        if (!this.agent) {
            this.init();
        }

        while (!this.isConnected) {
            await this.timeout(3000);
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
     * 
     * @param {string} convState the conversation state for which should be subscribed
     * @param {boolean} agentOnly if true, the bot only subscribes to conversations in which the agent is or which are suitable for his skills
     */
    async subscribeToConversations(convState = 'OPEN', agentOnly = false) { 
        if (!this.isConnected) {
            return;
        }

        return await this.agent.subscribeExConversations({ 'convState': [convState] });
    }

    /**
     * Sets the state of the agent. This is important for the routing of incomming messages.
     * It wraps the original SDK function to make it easier to use.
     * 
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
     * 
     * @param {string} conversationId id of the conversation that should be joined
     * @param {string} role role of the agent (ASSIGNED_AGENT, MANAGER)
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
     * 
     * @param {string} conversationId id of the conversation that the message is sent to
     * @param {string} message text message that is sent to the client
     */
    async sendMessage(conversationId, message) {
        if (!this.isConnected) {
            return;
        }

        await this.agent.publishEvent({
            dialogId: conversationId,
            event: {
                type: 'ContentEvent',
                contentType: 'text/plain',
                message: message
            }
        });

        console.log(this.config.template + ' ' + this.config._id + ' sent a message in conversation ' + conversationId + ': ' + message);
        return;
    }

    /**
     * Deletes all temporary data of the specified conversation and leaves it.
     * 
     * @param {string} conversationId The id of the conversation
     */
    async leaveConversation(conversationId) {
        console.log('/bot.js 161 - Bot ' + this.config._id + ' has left conversation ' + conversationId)
        delete this.openConversations[conversationId];

        return await this.agent.updateConversationField({
            'conversationId': conversationId,
            'conversationField': [{
                field: 'ParticipantsChange',
                type: 'REMOVE',
                role: 'MANAGER'
            }]
        });
    }
    
    timeout(ms = 3000) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

module.exports = Bot;