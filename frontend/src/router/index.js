import Vue from 'vue'
import Router from 'vue-router'
import launch from '@/components/launch/launch.vue'
import botarmy from '@/components/simplebots/simplebots.vue'
import tablehead from '@/components/botstatus/tablehead.vue'
import history from '@/components/history/history.vue'
import login from '@/components/general/login.vue'

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
      path: '/simplebots',
      name: 'Simplebots',
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
    }
  ]
})
