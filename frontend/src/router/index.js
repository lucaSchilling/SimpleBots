import Vue from 'vue'
import Router from 'vue-router'
import launch from '@/components/launch.vue'
import botarmy from '@/components/botarmy.vue'
import tablehead from '@/components/tablehead.vue'
import templateStep from '@/components/templateStep.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
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
    },
    {
      path: '/botarmy/template',
      name: 'Template',
      component: templateStep
    }
  ]
})
