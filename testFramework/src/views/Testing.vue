<template>
    <div id="main" class="bt-chat">
           <div class="bt-chat-header">
             <div class="bt-chat-details">
          <span>Connected to: 25352227</span>
        </div>
        <div class="bt-chat-logout" @click="close">reload</div>
            </div>
      <div class="bt-chat-body" id="bt-chat-body">
        <div class="bt-chat-message" :class="message.type" v-for="(message, index) in messages" :key="index">
          <div class="bt-chat-speechbubble" :class="message.type">
            <span>{{ message.content }}</span>
          </div>
        </div>
      </div>
      <div class="bt-chat-footer">
        <input class="bt-chat-input" v-model="newMessage" placeholder="Type your content here..." @keyup.enter="sendMessage" ref="input" />
        <button class="bt-chat-submit" @click="sendMessage">
          <md-icon>send</md-icon>
        </button>
      </div>
    </div>
</template>

<script>
export default {
  name: 'testing',
  data () {
    return {
      bot: {},
      timestamp: '',
      newMessage: '',
      messages: [],
      socket: null,
      openConvs: {},
      mounted: null,
      convID: null
    }
  },
  created () {
    this.initTimestamp()
  },
  mounted () {
    this.$refs.input.focus()
    this.prepareToConnect()
    this.mounted = Date.now()
  },
  methods: {
    initTimestamp () {
      const now = new Date()
      const hours = ('0' + now.getHours()).slice(-2)
      const minutes = ('0' + now.getMinutes()).slice(-2)

      this.timestamp = `${hours}:${minutes}`
    },

    prepareToConnect () {
      const account = '25352227'

      window.LPUtils.getJWT(account).then(
        jwt => {
          window.LPUtils
            .getDomain(account, 'asyncMessagingEnt')
            .then(umsDomain => {
              console.log(umsDomain)
              window.LPWs
                .connect(
                  `wss://${umsDomain}/ws_api/account/${account}/messaging/consumer?v=3`
                )
                .then(
                  openedSocket => {
                    this.socket = openedSocket
                    return this.handleOpenedSocket(openedSocket, jwt)
                  },
                  errorOpening => {
                    console.log('error opening connection ' + errorOpening)
                    this.prepareToConnect()
                  }
                )
            })
        },
        errorGettingJwt => {
          console.log(
            'error ' + errorGettingJwt + ' getting jwt for account ' + account
          )
        }
      )
    },

    handleOpenedSocket (socket, jwt) {
      console.log('connection is opened.')

      const apiRequestTypes = [
        'cqm.SubscribeExConversations',
        'ms.PublishEvent',
        'cm.ConsumerRequestConversation',
        'ms.SubscribeMessagingEvents',
        'InitConnection',
        'cm.UpdateConversationField'
      ]

      socket.registerRequests(apiRequestTypes)

      const me = this.myId(jwt)

      socket.initConnection({}, [
        { type: '.ams.headers.ConsumerAuthentication', jwt: jwt }
      ])
      socket.onNotification(this.withType('MessagingEvent'), body => {
        return body.changes.forEach(change => {
          // Do not display chat history
          this.convID = change.conversationId
          if (this.mounted - change.serverTimestamp > 100) {
            return
          }

          switch (change.event.type) {
            case 'ContentEvent':
              this.messages.push({
                type: change.originatorId === me ? 'sent' : 'received',
                content: change.event.message
              })
          }
        })
      })

      // subscribe to open conversations metadata
      socket
        .subscribeExConversations({
          convState: ['OPEN']
        })
        .then(res => {
          socket.onNotification(
            this.withSubscriptionID(res.body.subscriptionId),
            notificationBody => {
              return this.handleConversationNotification(
                socket,
                notificationBody,
                this.openConvs
              )
            }
          )
        })

      socket.ws.onclose = e => this.onCloseSocket(socket, e)
    },

    handleConversationNotification (socket, notificationBody, openConvs) {
      notificationBody.changes.forEach(change => {
        if (change.type === 'UPSERT') {
          if (!openConvs[change.result.convId]) {
            openConvs[change.result.convId] = change.result
            socket.subscribeMessagingEvents({
              fromSeq: 0,
              dialogId: change.result.convId
            })
          }
        }
      })
    },

    onCloseSocket (socket, e) {
      socket.ws = null
      this.prepareToConnect()
    },

    close () {
      for (let conv in this.openConvs) {
        this.socket.updateConversationField(
          {
            conversationId: conv,
            conversationField: [
              {
                field: 'ConversationStateField',
                conversationState: 'CLOSE'
              }
            ]
          }
        )
      }
      location.reload()
    },

    withSubscriptionID (subscriptionID) {
      return notif => {
        return notif.body.subscriptionId === subscriptionID
      }
    },

    withType (type) {
      return notif => {
        return notif.type.includes(type)
      }
    },

    myId (jwt) {
      return JSON.parse(atob(jwt.split('.')[1])).sub
    },

    sendMessage () {
      if (Object.keys(this.openConvs)[0]) {
        this.publishTo(this.socket, Object.keys(this.openConvs)[0])
      } else {
        this.socket.consumerRequestConversation().then(res => {
          return this.publishTo(this.socket, res.body.conversationId)
        })
      }
    },

    publishTo (socket, convID) {
      socket
        .publishEvent({
          dialogId: convID,
          event: {
            type: 'ContentEvent',
            contentType: 'text/plain',
            message: this.newMessage
          }
        })
        .then(res => {
          this.newMessage = ''
        })
    },

    showName (index) {
      const message = this.messages[index]

      if (message.type === 'sent') {
        return false
      }

      if (index === this.messages.length - 1) {
        return true
      }

      if (this.messages[index + 1].type === 'received') {
        return false
      }

      return true
    },

    showIcon (index) {
      if (index === 0 && this.messages[index].type !== 'received') {
        return false
      }

      if (
        this.messages[index - 1].type === 'sent' &&
        this.messages[index].type !== 'sent'
      ) {
        return true
      }

      return false
    }
  },
  updated () {
    document.getElementById('bt-chat-body').scrollTop = document.getElementById('bt-chat-body').scrollHeight
  }
}
</script>

<style>
#main {
  width: 100vw;
  height: 100vh;
}
.bt-chat {
  width: 350px;
  height: 75vh;
  position: relative;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.24);
  overflow-x: hidden;
  overflow-y: auto;
}

.bt-chat-header {
  position: fixed;
  height: 12%;
  width: 100vw;
  background-color: #3DADD0;
  padding: 15px 10px 10px 10px;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.24);
  box-sizing: border-box;
}

.bt-chat-icon {
  width: 20vw;
  height: 6vh;
  overflow: hidden;
  position: absolute;
}

.bt-chat-details,
.bt-chat-status {
  margin-left: 50px;
}

.bt-chat-details {
  display: inline-block;
  font-size: 16px;
}

.bt-chat-status {
  font-size: 10px;
}

.bt-chat-logout {
  position: absolute;
  top: 15px;
  right: 15px;
  float: right;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 10px;
  padding: 1px 7px 1px 7px;
  color: #555;
  cursor: pointer;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.5);
}

.bt-chat-logout:hover {
  background-color: rgba(255, 255, 255, 0.7);
}

.bt-chat-body {
  padding: 15px 10px 10px 10px;
  box-sizing: border-box;
  position: absolute;
  width: 100vw;
  top: 12%;
  bottom: 12%;
  overflow: auto;
}

.bt-chat-timestamp {
  text-transform: uppercase;
  font-size: 20px;
  letter-spacing: 1px;
  font-weight: bold;
  color: black;
  text-align: center;
  width: 100%;
  margin-bottom: 10px;
}

.bt-chat-message {
  display: block;
  width: 100%;
  clear: both;
}

.bt-chat-message.received {
  margin-bottom: 15px;
}

.bt-chat-speechbubble {
  padding: 10px;
  border-radius: 15px;
  display: inline-block;
  max-width: 200px;
}

.bt-chat-speechbubble.sent {
  background-color: #3DADD0;
  color: white;
  float: right;
  display: block;
  margin-bottom: 25px;
}

.bt-chat-speechbubble.received {
  border: 1px solid #3DADD0;
  margin-left: 50px;
}

.bt-chat-bot-name {
  width: 100%;
  font-size: 10px;
  display: block;
  margin-left: 55px;
}

.bt-chat-footer {
  background-color: #3DADD0;
  height: 12%;
  width: 100%;
  bottom: 0;
  position: fixed;
  padding: 15px 10px 10px 10px;
  box-sizing: border-box;
}

.bt-chat-input {
  width: 90vw;
  height: 38px;
  padding: 10px;
  border-radius: 15px;
  float: left;
  border: 0;
  font-size: 16px;
}

.bt-chat-input:focus {
  outline: 0;
}

.bt-chat-submit {
  border: 0;
  background: transparent;
  width: 38px;
  height: 38px;
  border-radius: 20px;
  text-align: center;
  background-color: white;
  color: #3DADD0;
  float: right;
}

.bt-chat-submit:hover {
  cursor: pointer;
  background-color: #555;
}
</style>
