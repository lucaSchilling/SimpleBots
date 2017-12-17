export default {
  // Bot informations which are generic for every Bot template.
  bot: {
    _id: null,
    name: null,
    template: 'Welcome Bot',
    lastedit: null,
    welcomeMessage: null
  },
  // Bot informations to only affect the Welcome Bot
  welcomeBot: {
    options: [],
    treeData: {
      isRoot: true,
      options: [{
        message: '',
        isDeletable: false,
        redirect: null,
        options: null
      }]},
    redirectMessage: null,
    itemID: 0
  },
  // Bot informations to only affect the FAQ Bot
  faqBot: {
    intents: [],
    entities: [],
    examples: [],
    uterances: []
  },
  // Information which affect the whole application
  general: {
    history: [],
    bots: [],
    active: 'first',
    first: false,
    second: false,
    third: false,
    forth: false,
    fifth: false,
    sixth: false,
    username: '',
    theme: false
  }
}
