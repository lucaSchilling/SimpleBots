export default {
  setId: (state, val) => {
    state.bot._id = val
  },
  setName: (state, val) => {
    state.bot.name = val
  },
  setTemplate: (state, val) => {
    state.bot.template = val
  },
  setOptions: (state, val) => {
    state.welcomeBot.options = val
  },
  setUterances: (state, val) => {
    state.faqBot.uterances = val
  },
  setIntents: (state, val) => {
    state.faqBot.intents = val
  },
  setEntities: (state, val) => {
    state.faqBot.entities = val
  },
  setExamples: (state, val) => {
    state.faqBot.examples = val
  },
  setWelcomeMessage: (state, val) => {
    state.bot.welcomeMessage = val
  },
  setLastEdit: (state, val) => {
    state.bot.lastedit = val
  },
  setitemID: (state, val) => {
    state.welcomeBot.itemID = val
  },
  setredirectMessage: (state, val) => {
    state.welcomeBot.redirectMessage = val
  },
  // Pushes the bots from the server into bot[].
  getBots: (state, response) => {
    for (let i = 0; i < response.data.length; i++) {
      state.general.bots.push({ID: response.data[i]._id,
        status: response.data[i].status,
        template: response.data[i].template,
        name: response.data[i].name,
        lastedit: response.data[i].lastEdit.slice(5, 7) + '.' + response.data[i].lastEdit.slice(8, 10) + '.' + response.data[i].lastEdit.slice(2, 4) + ', ' + response.data[i].lastEdit.slice(11, 16)
      })
    }
  },
  // Pushes the configs from the server into history[].
  getConfigs: (state, response) => {
    for (let i = 0; i < response.data.length; i++) {
      if (response.data[i].template === 'Welcome Bot') {
        state.general.history.push({ID: response.data[i]._id,
          welcomeMessage: response.data[i].welcomeMessage,
          template: response.data[i].template,
          name: response.data[i].name,
          lastedit: response.data[i].lastEdit.slice(5, 7) + '.' + response.data[i].lastEdit.slice(8, 10) + '.' + response.data[i].lastEdit.slice(2, 4) + ', ' + response.data[i].lastEdit.slice(11, 16),
          options: response.data[i].options,
          redirectMessage: response.data[i].redirectMessage})
      } else if (response.data[i].template === 'FAQ Bot') {
        state.general.history.push({ID: response.data[i]._id,
          welcomeMessage: response.data[i].welcomeMessage,
          template: response.data[i].template,
          name: response.data[i].name,
          lastedit: response.data[i].lastEdit.slice(5, 7) + '.' + response.data[i].lastEdit.slice(8, 10) + '.' + response.data[i].lastEdit.slice(2, 4) + ', ' + response.data[i].lastEdit.slice(11, 16),
          intents: response.data[i].intents,
          entities: response.data[i].entities,
          examples: response.data[i].examples
        })
      }
    }
  },
  // Clears both the bot and the history array in order to prevent redundant displays.
  clearBotsFromArray: (state) => {
    state.general.bots = []
    state.general.history = []
  },
  // Sets the steps in the component "simplebots".
  setDone: (state, object) => {
    state.general[object.id] = true

    if (object.index) {
      state.general.active = object.index
    }
  },
  // Clears the steps in the component "simplebots".
  setUndone: (state, index) => {
    state.general.first = false
    state.general.second = false
    state.general.third = false
    state.general.forth = false
    state.general.fifth = false

    if (index) {
      state.general.active = index
    }
  },
  setActive: (state, val) => {
    state.general.active = val
  },
  setFirst: (state, val) => {
    state.general.first = val
  },
  setSecond: (state, val) => {
    state.general.second = val
  },
  setThird: (state, val) => {
    state.general.third = val
  },
  setForth: (state, val) => {
    state.general.forth = val
  },
  setFifth: (state, val) => {
    state.general.fifth = val
  },
  setSixth: (state, val) => {
    state.general.sixth = val
  },
  setTreeData: (state, val) => {
    state.welcomeBot.treeData.message = val.message
    state.welcomeBot.treeData.options = val.options
  },
  // Clears all Bot information from the state.
  clear: (state) => {
    state.bot._id = null
    state.bot.name = null
    state.bot.template = null
    state.bot.welcomeMessage = null
    state.welcomeBot.options = []
    state.welcomeBot.treeData = {
      isRoot: true,
      options: [{
        message: '',
        isDeletable: false,
        redirect: null,
        options: null
      }]
    }
    state.faqBot.intents = []
    state.faqBot.entities = []
    state.bot.lastedit = null
    state.faqBot.examples = []
    state.faqBot.uterances = []
  },
  setTheme: (state, val) => {
    state.general.theme = val
  },
  // Clears the treeData structure to make a restart of the option step possible
  clearTreeData: (state) => {
    state.welcomeBot.treeData = {
      isRoot: true,
      options: [{
        message: '',
        isDeletable: false,
        redirect: null,
        options: null
      }]
    }
  }
}
