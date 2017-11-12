import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var axios = require('axios')

export const store = new Vuex.Store({
  state: {
    bots: []
  },
  mutations: {
    getBots: (state, response) => {
      for (var i = 0; i < response.data.length; i++) {
        state.bots.push({id: response.data[i]._id,
          template: response.data[i].template,
          name: response.data[i].name,
          lastedit: response.data[i].lastEdit
        })
      }
    },
    clearBots: (state) => {
      state.bots = []
    }
  },
  actions: {
    getBots: (context) => {
      axios.get('http://141.19.142.6:3000/getAll').then((response) => {
        alert(response.status)
        context.commit('getBots', response)
      })
    }
  }
})
