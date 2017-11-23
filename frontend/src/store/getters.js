export default {
  getBotFromArray: (state, id) => {
    for (var i = 0; i < state.bots.length; i++) {
      if (id === state.bots[i]._id) {
        return state.bots[i]
      }
    }
  },
  getStatus: (state, id) => {
    for (var i = 0; i < state.bots.length; i++) {
      if (id === state.bots[i]._id) {
        return state.bots[i].status
      }
    }
  }
}
