import Vue from 'vue'
import Router from 'vue-router'
import launch from '@/components/launch.vue'
import botarmy from '@/components/botarmy.vue'
import tablehead from '@/components/tablehead.vue'
import templateStep from '@/components/templateStep.vue'
import history from '@/components/history.vue'
import login from '@/components/login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: login
    },
    {
      path: '/launch',
      name: 'Launch',
      component: launch
    },
    {
      path: '/botarmy',
      name: 'Steppers',
      component: botarmy
    },
    {
      path: '/history',
      name: 'History',
      component: history
    },
    {
      path: '/status',
      name: 'Status',
      component: tablehead
    },
    {
      path: '/botarmy/template',
      name: 'Template',
      component: templateStep
    }
  ]
})
