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
  getAll: (state, response) => {
    for (let i = 0; i < response.data.length; i++) {
      state.bots.push({ID: response.data[i]._id,
        status: response.data[i].status,
        template: response.data[i].template,
        name: response.data[i].name,
        lastedit: response.data[i].lastEdit
      })
      if (response.data[i].template === 'Welcome Bot') {
        state.history.push({ID: response.data[i]._id,
          status: response.data[i].status,
          template: response.data[i].template,
          name: response.data[i].name,
          lastedit: response.data[i].lastEdit,
          options: response.data[i].options})
      } else if (response.data[i].template === 'FAQ Bot') {
        state.history.push({ID: response.data[i]._id,
          status: response.data[i].status,
          template: response.data[i].template,
          name: response.data[i].name,
          lastedit: response.data[i].lastEdit,
          intents: response.data[i].intents,
          entities: response.data[i].entities,
          examples: response.data[i].examples
        })
      }
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
  setUndone: (state, index) => {
    state.first = false
    state.second = false
    state.third = false
    state.forth = false
    state.fifth = false

    if (index) {
      state.active = index
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
  },
  clear: (state) => {
    state._id = null
    state.name = null
    state.template = null
    state.welcomeMessage = null
    state.options = []
    state.treeData = {
      message: '',
      options: []
    }
    state.intents = []
    state.entities = []
    state.lastedit = null
    state.examples = []
  }
}
