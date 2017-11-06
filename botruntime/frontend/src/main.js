import Vue from 'vue';
import VueMaterial from 'vue-material';
import ToggleButton from 'vue-js-toggle-button';
import 'vue-material/dist/vue-material.css';
import App from './App';
import router from './router';

Vue.use(ToggleButton);
Vue.use(VueMaterial);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
