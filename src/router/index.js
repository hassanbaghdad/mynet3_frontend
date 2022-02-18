import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/Login";
import Customers from "@/views/Customers";
import Towers from "@/views/Towers";
import Cards from "@/views/Cards";
import Bills from "@/views/Bills";
import Debts from "@/views/Debts";
import Credits from "@/views/Credits";
import Users from "@/views/Users";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/customers',
    name: 'Customers',
    component: Customers
  },
  {
    path: '/towers',
    name: 'Towers',
    component: Towers
  },
  {
    path: '/cards',
    name: 'Cards',
    component: Cards
  },
  {
    path: '/bills',
    name: 'Bills',
    component: Bills
  },
  {
    path: '/debts',
    name: 'Debts',
    component: Debts
  },
  {
    path: '/credits',
    name: 'Credits',
    component: Credits
  },
  {
    path: '/users',
    name: 'Users',
    component: Users
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router