var axios = require('axios')

export default {
  getAll: (context) => {
    axios.get('http://localhost:3000/getAll').then((response) => {
      context.commit('getAll', response)
    })
  },
  removeBot: (context, id) => {
    axios.delete('http://localhost:3000/delete/' + id
      ).then(function (response) {
        context.dispatch('getAll')
      })
  },
  postStatus: (context, object) => {
    axios.post('http://localhost:3000/setStatus', {
      '_id': object.id,
      'status': object.status
    }).then(function (response) {
    })
  }
}
