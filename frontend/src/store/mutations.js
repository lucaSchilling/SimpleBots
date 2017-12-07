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
  setIntents: (state, val) => {
    state.intents = val
  },
  setEntities: (state, val) => {
    state.entities = val
  },
  setExamples: (state, val) => {
    state.examples = val
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
  },
  setDone: (state, object) => {
    state[object.id] = true

    if (object.index) {
      state.active = object.index
    }
  },
  setActive: (state, val) => {
    state.active = val
  },
  setFirst: (state, val) => {
    state.first = val
  },
  setSecond: (state, val) => {
    state.second = val
  },
  setThird: (state, val) => {
    state.third = val
  },
  setForth: (state, val) => {
    state.forth = val
  },
  setFifth: (state, val) => {
    state.fifth = val
  },
  setSixth: (state, val) => {
    state.sixth = val
  },
  setTreeData: (state, val) => {
    state.treeData.message = val.message
    state.treeData.options = val.options
  }
}
