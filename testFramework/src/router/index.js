/**
 * The Vue Router.
 * Defines the application's routes.
 *
 * @author Marcel Herd
 * @module router/index
 */

import Vue from 'vue'
import Router from 'vue-router'

import Testing from '@/views/Testing'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Testing',
      component: Testing
    }
  ]
})

export default router
