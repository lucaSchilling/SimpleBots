var axios = require('axios')
var url = 'http://141.19.142.6:3000'

export default {
  deploy: (context) => {
    axios.post(url + '/deploy', {
      'template': context.state.template,
      'name': context.state.name,
      'welcomeMessage': context.state.welcomeMessage,
      'options': [{'message': context.state.options}]
    }).then(function (response) {
      context.dispatch('getAll')
    })
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
