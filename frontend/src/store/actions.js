var axios = require('axios')
var url = 'http://141.19.142.6:3000'

export default {
  deploy: (context) => {
    if (context.state.template === 'Welcome Bot') {
      axios.post(url + '/deploy/' + context.state.username, {
        'template': context.state.template,
        'name': context.state.name,
        'welcomeMessage': context.state.welcomeMessage,
        'options': context.state.options
      }).then(function (response) {
        context.dispatch('getBots')
      })
    } else if (context.state.template === 'FAQ Bot') {
      axios.post(url + '/deploy/' + context.state.username, {
        'template': context.state.template,
        'name': context.state.name,
        'initialVersionId': '1.0',
        'welcomeMessage': context.state.welcomeMessage,
        'intents': context.state.intents,
        'entities': context.state.entities,
        'examples': context.state.examples
      }).then(function (response) {
        context.dispatch('getBots')
      })
    }
  },
  getBots: (context) => {
    axios.get(url + '/getBots/' + context.state.username).then((response) => {
      context.commit('clearBotsFromArray')
      context.commit('getBots', response)
    })
  },
  getConfigs: (context) => {
    axios.get(url + '/getConfigs/' + context.state.username).then((response) => {
      context.commit('clearBotsFromArray')
      context.commit('getConfigs', response)
    })
  },
  delete: (context, id) => {
    axios.delete(url + '/undeploy/' + context.state.username + '/' + id
    ).then(function (response) {
      context.dispatch('getBots')
    })
  },
  postStatus (context, object) {
    axios.post(url + '/setStatus/' + context.state.username, {
      '_id': object.id,
      'status': object.status
    }).then(function (response) {
    })
  }
}
