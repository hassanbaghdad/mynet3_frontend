import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
import createPersistedState from "vuex-persistedstate";

export default new Vuex.Store({
  state: {
    drawer:true,
    loading:false,
    customers:{
      customers:[],
      target:[],
      target_active:[],
      target_sand:[],
      sand_dateto_from_db:'',
      forms:{
        add_customer:false,
        edit_customer:false,
        details:false,
        active:false,
        payoff:false,
        debt:false,
        history:false,
        print_view:false
      }
    },
    towers:{
      towers:[],
      target:[],
      forms:{
        add_tower:false,
        delete_tower:false,
        edit_tower:false
      }
    },
    cards:{
      cards:[],
      target:[],
      forms:{
        add_card:false,
        edit_card:false,
        delete_card:false
      }
    },
    users:{
      users:[],
      target:[],
      forms:{
        add_user:false,
        edit_user:false,
        delete_user:false
      }
    },
  },
  mutations: {
    async GET_CUSTOMERS(state)
    {
      state.loading = true;
      state.customers.forms.details = false;
      state.customers.forms.active = false;
      state.customers.forms.add_customer = false;
      state.customers.forms.edit_customer = false;
      state.customers.forms.debt = false;
      state.customers.forms.payoff = false;

      axios.get('api/get-customers').then(res=>{
        state.loading = true;
        state.customers.customers = res.data;
      }).catch(err=>{
        console.log(err)
      }).finally(fin=>{
        state.loading = false;
      })
    },
    async GET_TOWERS(state)
    {
      state.loading = true;
      axios.get('api/get-towers').then(res=>{
        state.towers.towers = res.data;
      }).catch(err=>{
        console.log(err)
      }).finally(fin=>{
        state.loading = false;
      })
    },
    async GET_CARDS(state)
    {
      state.loading = true;
      axios.get('api/get-cards').then(res=>{
        state.cards.cards = res.data;
      }).catch(err=>{
        console.log(err)
      }).finally(fin=>{
        state.loading = false;
      })
    },


  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()],
})
