var axios = require('axios')
var url = 'http://localhost:3000'

export default {
  // Deploys the Bot with the gathered information
  deploy: (context) => {
    if (context.state.bot.template === 'Welcome Bot') {
      axios.post(url + '/deploy/' + localStorage.getItem('username'), {
        'template': context.state.bot.template,
        'name': context.state.bot.name,
        'welcomeMessage': context.state.bot.welcomeMessage,
        'options': context.state.welcomeBot.treeData.options,
        'redirectMessage': context.state.welcomeBot.redirectMessage
      }).then(function (response) {
        context.dispatch('getBots')
      })
    } else if (context.state.bot.template === 'FAQ Bot') {
      axios.post(url + '/deploy/' + localStorage.getItem('username'), {
        'template': context.state.bot.template,
        'name': context.state.bot.name,
        'initialVersionId': '1.0',
        'welcomeMessage': context.state.bot.welcomeMessage,
        'intents': context.state.faqBot.intents,
        'entities': context.state.faqBot.entities,
        'examples': context.state.faqBot.examples
      }).then(function (response) {
        context.dispatch('getBots')
      })
    }
  },
  // Get Bots from the Bot collection
  getBots: (context) => {
    axios.get(url + '/getBots/' + localStorage.getItem('username')).then((response) => {
      context.commit('clearBotsFromArray')
      context.commit('getBots', response)
    })
  },
  // Get configs from the history collection
  getConfigs: (context) => {
    axios.get(url + '/getConfigs/' + localStorage.getItem('username')).then((response) => {
      context.commit('clearBotsFromArray')
      context.commit('getConfigs', response)
    })
  },
  // Removes the bot from bot status
  undeploy: (context, id) => {
    axios.delete(url + '/undeploy/' + localStorage.getItem('username') + '/' + id
    ).then(function (response) {
      context.dispatch('getBots')
    })
  },
  // Removes the bot from the history
  deleteConfig: (context, id) => {
    axios.delete(url + '/delete/' + localStorage.getItem('username') + '/' + id
    ).then(function () {
      context.dispatch('getConfigs')
    })
  },
  // Posts the status of the Bot
  postStatus (context, object) {
    axios.post(url + '/setStatus/' + localStorage.getItem('username'), {
      '_id': object.id,
      'status': object.status
    }).then(function (response) {
    })
  }
}
