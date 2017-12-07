import Vue from 'vue'
import Router from 'vue-router'
import launch from '@/components/launch.vue'
import botarmy from '@/components/botarmy.vue'
import tablehead from '@/components/tablehead.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/launch',
      name: 'Launch',
      component: launch
    },
    {
      path: '/botarmy',
      name: 'Botarmy',
      component: botarmy
    },
    {
      path: '/status',
      name: 'Status',
      component: tablehead
    }
  ]
})
