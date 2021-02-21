import Vue from 'vue'
import Router from 'vue-router'
import Login from '../page/login'
// import Manage from '../page/Manage'
// import Home from '../page/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    }
  ]
})
