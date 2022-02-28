import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '@/router/index'

Vue.use(Vuex)
import createPersistedState from "vuex-persistedstate";

export default new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })],
  state: {
    drawer:true,
    loading:false,
    loading2:false,
    user:{
      user_id:0,
      token:'',
      Fullname:'',
      username:'',
      user_level:'',
      user_type:'',

    },
    ///////////// UI USERS ///////////////
    ui_user:{
      customers:{
        col_cost_address:false ,
        col_cost_admin: false,
        col_cost_brig: false,
        col_cost_id: false,
        col_cost_ipNano: false,
        col_cost_name: false,
        col_cost_pass: false,
        col_cost_passNano: false,
        col_cost_phone: false,
        col_cost_secter: false,
        col_cost_user: false,
        col_cost_userNano: false,
        col_remaining_days: false,
        col_remaining_days2: false,
        created_at: "2022-02-19T00:24:33.000000Z",
        id: 9,
        route: "customers",
        updated_at: "2022-02-19T00:30:38.000000Z",
        user_id: 8,
      },
      towers:{
        col_brig_main: false,
        col_brig_name: false,
        col_brig_type: false,
        col_count_customers: false,
        id: false,
        route: "towers",
        user_id: 8,
      },
      cards:{
        col_card_name:false,
        col_card_priceDinar:false,
        col_card_priceDO:false
      },
      bills:{
        col_Sand_id:false,
        col_Sand_date:false,
        col_Sand_moneyType:false,
        col_Sand_money:false,
        col_Sand_moneyin:false,
        col_Sand_cardtype:false,
        col_cost_name:false,
        col_cost_user:false,
        col_sand_user:false,
        route:false
      },
      debts_to_us:{
        col_cost_id:false,
        col_cost_name:false,
        col_cost_user:false,
        col_cost_phone:false,
        col_brig_name:false,
        col_Sand_carry:false,
        col_Sand_dateto:false,
        col_Sand_nextdate:false,
      },
      debts_to_them:{
        col_cost_id:false,
        col_cost_name:false,
        col_cost_user:false,
        col_cost_phone:false,
        col_brig_name:false,
        col_Sand_carry:false,
        col_Sand_dateto:false,
        col_Sand_nextdate:false,
      },

      users:{
        col_Fullname:'',
        col_username:'',
        col_user_level:''
      },
      credits:{
        col_Sand_id:false,
        col_Sand_date:false,
        col_Sand_money:false,
        col_Sand_moneyin:false,
        col_Sand_notes:false,
        col_sand_user:false,
        col_sand_desc:false,
        col_Sand_operation:false,
        col_cost_price:false,
        col_gain:false,
        col_currency:false,
        col_userAflet:false,
        col_brig_name:false,
        col_tree_name:false
      }
    },
    ///////////// END UI USERS ///////////////
    customers:{
      customers:[],
      speed:true,
      target:[],
      target_active:[],
      target_sand:[],
      sand_dateto_from_db:'',
      forms:{
        add_customer:false,
        edit_customer:false,
        delete:false,
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
    bills:{
      bills:[],
      target:[],
      forms:{
        delete_bill:false
      }
    },
    debts:{
      debts_to_us:[],
      debts_to_them:[]
    },
    credits:{
      credits:[]
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
      state.loading2 = true;
      state.customers.forms.details = false;
      state.customers.forms.active = false;
      state.customers.forms.add_customer = false;
      state.customers.forms.edit_customer = false;
      state.customers.forms.debt = false;
      state.customers.forms.payoff = false;
      if(state.customers.speed)
      {
        axios.get('api/get-customers-speed').then(res=>{

          state.customers.customers = res.data;
        }).catch(err=>{
          if(err.response.status == 401)
        {
           router.push("/login")
        }
        }).finally(fin=>{
          state.loading2 = false;
        })
      }else{
        axios.get('api/get-customers').then(res=>{

          state.customers.customers = res.data;
        }).catch(err=>{
          if(err.response.status == 401)
        {
           router.push("/login")
        }
        }).finally(fin=>{
          state.loading2 = false;
        })
      }

    },
    async GET_TOWERS(state)
    {
      state.loading = true;
      axios.get('api/get-towers').then(res=>{
        state.towers.towers = res.data;
      }).catch(err=>{
        if(err.response.status == 401)
        {
           router.push("/login")
        }
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
        if(err.response.status == 401)
        {
           router.push("/login")
        }
      }).finally(fin=>{
        state.loading = false;
      })
    },
    async GET_BILLS(state)
    {
      state.loading = true;
      axios.get('api/get-bills').then(res=>{
        state.bills.bills = res.data;
      }).catch(err=>{
        if(err.response.status == 401)
        {
           router.push("/login")
        }
      }).finally(fin=>{
        state.loading = false;
      })
    },
    async GET_USERS(state)
    {
      state.loading = true;
      state.users.forms.add_user = false;
      state.users.forms.edit_user = false;
      state.users.forms.delete_user = false;

      axios.get('api/get-users').then(res=>{
        state.users.users = res.data;
      }).catch(err=>{
        if(err.response.status == 401)
        {
           router.push("/login")
        }

      }).finally(fin=>{
        state.loading = false;
      })
    },
    async GET_DEBTS_TO_US(state)
    {
      state.loading = true;
      axios.get('api/get-debts-to-us').then(res=>{
        state.debts.debts_to_us = res.data;
      }).catch(err=>{
        if(err.response.status == 401)
        {
           router.push("/login")
        }
      }).finally(fin=>{
        state.loading = false;
      })
    },
    async GET_DEBTS_TO_THEM(state)
    {
      state.loading = true;
      axios.get('api/get-debts-to-them').then(res=>{
        state.debts.debts_to_them = res.data;
      }).catch(err=>{
        if(err.response.status == 401)
        {
           router.push("/login")
        }
      }).finally(fin=>{
        state.loading = false;
      })
    },
    async GET_CREDITS(state,type)
    {
      if(type=="دينار")
      {
        state.loading = true;

        axios.get('api/get-credits-di').then(res=>{
          state.credits.credits = res.data;
        }).catch(err=>{
          if(err.response.status == 401)
        {
           router.push("/login")
        }
        }).finally(fin=>{
          state.loading = false;
        })
      }
      if(type=="دولار")
      {
        state.loading = true;

        axios.get('api/get-credits-do').then(res=>{
          state.credits.credits = res.data;
        }).catch(err=>{
          if(err.response.status == 401)
        {
           router.push("/login")
        }
        }).finally(fin=>{
          state.loading = false;
        })
      }

    },
    async GET_UI_CUSTOMERS(state)
    {
      state.loading = true;
      axios.get('api/get-ui-customers').then(res=>{
        state.ui_user.customers = res.data[0];
      }).catch(err=>{
        if(err.response.status == 401)
        {
           router.push("/login")
        }
      }).finally(fin=>{
        state.loading = false;
      })
    },
    async GET_UI_TOWERS(state)
    {
      state.loading = true;
      axios.get('api/get-ui-towers').then(res=>{
        state.ui_user.towers = res.data[0];
      }).catch(err=>{
        if(err.response.status == 401)
        {
           router.push("/login")
        }
      }).finally(fin=>{
        state.loading = false;
      })
    },
    async GET_UI_CARDS(state)
    {
      state.loading = true;
      axios.get('api/get-ui-cards').then(res=>{
        state.ui_user.cards = res.data[0];
      }).catch(err=>{
        if(err.response.status == 401)
        {
           router.push("/login")
        }
      }).finally(fin=>{
        state.loading = false;
      })
    },
    async GET_UI_BILLS(state)
    {
      state.loading = true;
      axios.get('api/get-ui-bills').then(res=>{
        state.ui_user.bills = res.data[0];
      }).catch(err=>{
        if(err.response.status == 401)
        {
           router.push("/login")
        }
      }).finally(fin=>{
        state.loading = false;
      })
    },
    async GET_UI_USERS(state)
    {
      state.loading = true;
      axios.get('api/get-ui-users').then(res=>{
        state.ui_user.users = res.data[0];
      }).catch(err=>{
        if(err.response.status == 401)
        {
           router.push("/login")
        }
      }).finally(fin=>{
        state.loading = false;
      })
    },
    async GET_UI_DEBTS_TO_US(state)
    {
      state.loading = true;
      axios.get('api/get-ui-debts-to-us').then(res=>{
        state.ui_user.debts_to_us = res.data[0];
      }).catch(err=>{
        if(err.response.status == 401)
        {
           router.push("/login")
        }
      }).finally(fin=>{
        state.loading = false;
      })
    },
    async GET_UI_DEBTS_TO_THEM(state)
    {
      state.loading = true;
      axios.get('api/get-ui-debts-to-them').then(res=>{
        state.ui_user.debts_to_them = res.data[0];
      }).catch(err=>{
        if(err.response.status == 401)
        {
           router.push("/login")
        }
      }).finally(fin=>{
        state.loading = false;
      })
    },
    async GET_UI_CREDITS(state)
    {
      state.loading = true;
      axios.get('api/get-ui-credits').then(res=>{
        state.ui_user.credits = res.data[0];
      }).catch(err=>{
        if(err.response.status == 401)
        {
           router.push("/login")
        }
      }).finally(fin=>{
        state.loading = false;
      })
    },
    async BACKUP_DATABASE(state)
    {
      state.loading = true;
      axios.get('api/backup-database').then(res=>{
        console.log(res)

        let blob = new Blob([res.data], { type: 'application/sql' } ),
            url = window.URL.createObjectURL(blob)

        window.open(url);
      }).catch(err=>{
        if(err.response.status == 401)
        {
          router.push("/login")
        }
      }).finally(fin=>{
        state.loading = false;
      })
    },




  },
  actions: {
  },
  modules: {
  },

})
