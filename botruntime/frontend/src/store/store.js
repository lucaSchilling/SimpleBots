import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var axios = require('axios')

export const store = new Vuex.Store({
  state: {
    bots: []
  },
  getters: {
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
  },
  mutations: {
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
/*     delete: (state, id) => {
      state.bots.splice(this.bots.findIndex(function (bot) {
        return bot.ID === id
      }), 1)
    } */
  },
  actions: {
    getAll: (context) => {
      axios.get('http://141.19.142.6:3000/getAll').then((response) => {
        context.commit('clearBotsFromArray')
        context.commit('getAll', response)
      })
    },
    delete: (context, id) => {
      axios.delete('http://141.19.142.6:3000/delete/' + id
      ).then(function (response) {
        context.dispatch('getAll')
      })
    },
    postStatus (context, object) {
      axios.post('http://141.19.142.6:3000/setStatus', {
        '_id': object.id,
        'status': object.status
      }).then(function (response) {
      })
    }
  }
})
