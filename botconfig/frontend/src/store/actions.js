var axios = require('axios')

export default {
  deploy: (context) => {
    axios.post('http://141.19.142.6:3000/deploy', {
      'template': context.state.template,
      'name': context.state.name,
      'welcomeMessage': context.state.welcomeMessage,
      'options': [{'message': context.state.options}]
    }).then(function (response) {
      context.dispatch('getAll')
    })
  },
  getAll: (context) => {
    axios.get('http://141.19.142.6:3000/getAll').then((response) => {
      context.commit('clearBotsFromArray')
      context.commit('getAll', response)
    })
  },
  delete: (context, id) => {
    axios.delete('http://141.19.142.6:3000/delete/' + id
    ).then(function (response) {
      context.dispatch('getAll')
    })
  },
  postStatus (context, object) {
    axios.post('http://141.19.142.6:3000/setStatus', {
      '_id': object.id,
      'status': object.status
    }).then(function (response) {
    })
  }
}
