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
  }
}
