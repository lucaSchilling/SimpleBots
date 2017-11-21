var axios = require('axios')

export default {
  deploy: (context) => {
    axios.post('http://141.19.142.6:3000/deploy', {
      '_id': context.state._id,
      'template': context.state.template,
      'name': context.state.name,
      'lastEdit': context.state.lastedit,
      'welcomeMessage': context.state.welcomeMessage,
      'options': [{'message': context.state.options}]
    }).then(function (response) {
      alert(response.status)
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
