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
import Reports from "@/views/Reports";
import Settings from "@/views/Settings";
import Backups from "@/views/Backups";
import StoreProducts from "@/views/StoreProducts";
import NewProductBill from "@/components/Products/NewProductBill";
import Foater from "@/components/Fatora/Foater";
import FatoraDebtsUs from "@/components/Fatora/FatoraDebtsUs/FatoraDebtsUs";
import FatoraDebtsThem from "@/components/Fatora/FatoraDebtsThem/FatoraDebtsThem";
Vue.use(VueRouter)

const routes = [
  {
    path: '/reports',
    name: 'Reports',
    component: Reports
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },{
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
    path: '/store',
    name: 'StoreProducts',
    component: StoreProducts
  },
  {
    path: '/new-product-bill',
    name: 'NewProductBill',
    component: NewProductBill
  },

  {
    path: '/users',
    name: 'Users',
    component: Users
  },
  {
    path: '/backups',
    name: 'Backups',
    component: Backups
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
  {
    path: '/all-fatora',
    name: 'Foater',
    component: Foater
  },
  {
    path: '/fatora-debts-to-us',
    name: 'FatoraDebtsUs',
    component: FatoraDebtsUs
  },
  {
    path: '/fatora-debts-to-them',
    name: 'FatoraDebtsThem',
    component: FatoraDebtsThem
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
