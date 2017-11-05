import Vue from 'vue'
import Router from 'vue-router'
import Templates from '@/components/Templates'
import Test from '@/components/Test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: ''
    },
    {
      path: '/templates',
      name: 'Templates',
      component: Templates
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    }
  ]
})
