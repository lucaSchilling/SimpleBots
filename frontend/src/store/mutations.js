export default {
  setId: (state, val) => {
    state._id = val
  },
  setName: (state, val) => {
    state.name = val
  },
  setTemplate: (state, val) => {
    state.template = val
  },
  setOptions: (state, val) => {
    state.options = val
  },
  setWelcomeMessage: (state, val) => {
    state.welcomeMessage = val
  },
  setLastEdit: (state, val) => {
    state.lastedit = val
  },
  setI: (state, val) => {
    state.i = val
  },
  getAll: (state, response) => {
    for (var i = 0; i < response.data.length; i++) {
      state.bots.push({ID: response.data[i]._id,
        status: response.data[i].status,
        template: response.data[i].template,
        name: response.data[i].name,
        lastedit: response.data[i].lastEdit
      })
    }
  },
  clearBotsFromArray: (state) => {
    state.bots = []
  }
}
