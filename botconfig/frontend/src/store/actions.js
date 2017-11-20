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
  }
}
