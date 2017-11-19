import Vue from 'vue'
import Router from 'vue-router'
import launch from '@/components/launch.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/launch',
      name: 'launch',
      component: launch
    }
  ]
})