import Vue from 'vue'
import Router from 'vue-router'
import launch from '@/components/launch.vue'
import botarmy from '@/components/botarmy.vue'
import tablehead from '@/components/tablehead.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: 'components/launch',
      name: 'launch',
      component: launch
    },
    {
      path: 'components/botarmy',
      name: 'botarmy',
      component: botarmy
    },
    {
      path: 'components/status',
      name: 'status',
      component: tablehead
    }
  ]
})
