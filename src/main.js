import Vue from 'vue'
import App from './App.vue'
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'
import VueRouter from 'vue-router'
import Home from './home.vue'
import World from './world.vue'

Vue.use(VueRouter)
Vue.use(Chartkick.use(Chart))

const routes = [
  {path: '/', component: Home},
  {path: '/world', component: World},
]

const router = new VueRouter({
  mode: 'history',
  routes
})

 
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
