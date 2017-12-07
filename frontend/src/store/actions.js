var axios = require('axios')
var url = 'http://141.19.142.6:3000'

export default {
  deploy: (context) => {
    if (context.state.template === 'Welcome Bot') {
      axios.post(url + '/deploy', {
        'template': context.state.template,
        'name': context.state.name,
        'welcomeMessage': context.state.welcomeMessage,
        'options': context.state.options
      }).then(function (response) {
        context.dispatch('getAll')
      })
    } else if (context.state.template === 'FAQ Bot') {
      axios.post(url + '/deploy', {
        'template': context.state.template,
        'name': context.state.name,
        'initialVersionId': '1.0',
        'welcomeMessage': context.state.welcomeMessage,
        'intents': context.state.intents,
        'entities': context.state.entities,
        'examples': context.state.examples
      })
    }
  },
  getAll: (context) => {
    axios.get(url + '/getAll').then((response) => {
      context.commit('clearBotsFromArray')
      context.commit('getAll', response)
    })
  },
  delete: (context, id) => {
    axios.delete(url + '/delete/' + id
    ).then(function (response) {
      context.dispatch('getAll')
    })
  },
  postStatus (context, object) {
    axios.post(url + '/setStatus', {
      '_id': object.id,
      'status': object.status
    }).then(function (response) {
    })
  }
}
