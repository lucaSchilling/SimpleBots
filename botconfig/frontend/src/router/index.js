import Vue from 'vue'
import Router from 'vue-router'
import templates from '@/components/templates'
import history from '@/components/history'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '',
      component: history
    },
    {
      path: '/templates',
      name: 'Templates',
      component: templates
    }
  ]
})
