// load vue and vuex instance
import Vue from 'vue'
import Vuex from 'vuex'
import de from './resources/de.json'
import en from './resources/en.json'

// load vuex i18n module
import vuexI18n from 'vuex-i18n'

Vue.use(Vuex)
// initialize the vuex store using the vuex module. note that you can change the
//  name of the module if you wish
const store = new Vuex.Store()

// initialize the internationalization plugin on the vue instance. note that
// the store must be passed to the plugin. the plugin will then generate some
// helper functions for components (i.e. this.$i18n.set, this.$t) and on the vue
// instance (i.e. Vue.i18n.set)
Vue.use(vuexI18n.plugin, store)

// please note that you must specify the name of the vuex module if it is
// different from i18n. i.e. Vue.use(vuexI18n.plugin, store, 'myName')

// add some translations (could also be loaded from a separate file)
// note that it is possible to use placeholders. translations can also be
// structured as object trees and will automatically be flattened by the the
// plugin
// translations can be kept in separate files for each language
// i.e. resources/i18n/de.json.
export default {
  de,
  en
}

// add translations directly to the application
Vue.i18n.add('en', en)
Vue.i18n.add('de', de)

// set the start locale to use
Vue.i18n.set('en')
