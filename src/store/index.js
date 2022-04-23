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
    drawer_show:false,
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
        col_cost_address:true ,
        col_cost_admin: true,
        col_cost_brig: true,
        col_cost_id: true,
        col_cost_ipNano: true,
        col_cost_name: true,
        col_cost_pass: true,
        col_cost_passNano: true,
        col_cost_phone: true,
        col_cost_secter: true,
        col_cost_user: true,
        col_cost_userNano: true,
        col_remaining_days: true,
        col_remaining_days2: true,
        created_at: "2022-02-19T00:24:33.000000Z",
        id: 9,
        route: "customers",
        updated_at: "2022-02-19T00:30:38.000000Z",
        user_id: 8,
      },
      towers:{
        col_brig_main: true,
        col_brig_name: true,
        col_brig_type: true,
        col_count_customers: true,
        id: true,
        route: "towers",
        user_id: 8,
      },
      cards:{
        col_card_name:true,
        col_card_priceDinar:true,
        col_card_priceDO:true
      },
      bills:{
        col_Sand_id:true,
        col_Sand_date:true,
        col_Sand_moneyType:true,
        col_Sand_money:true,
        col_Sand_moneyin:true,
        col_Sand_cardtype:true,
        col_cost_name:true,
        col_cost_user:true,
        col_sand_user:true,
        route:true
      },
      debts_to_us:{
        col_cost_id:true,
        col_cost_name:true,
        col_cost_user:true,
        col_cost_phone:true,
        col_brig_name:true,
        col_Sand_carry:true,
        col_Sand_dateto:true,
        col_Sand_nextdate:true,
      },
      debts_to_them:{
        col_cost_id:true,
        col_cost_name:true,
        col_cost_user:true,
        col_cost_phone:true,
        col_brig_name:true,
        col_Sand_carry:true,
        col_Sand_dateto:true,
        col_Sand_nextdate:true,
      },

      users:{
        col_Fullname:true,
        col_username:true,
        col_user_level:true,
        col_user_type:true
      },
      credits:{
        col_Sand_id:true,
        col_Sand_date:true,
        col_Sand_money:true,
        col_Sand_moneyin:true,
        col_Sand_notes:true,
        col_sand_user:true,
        col_sand_desc:true,
        col_Sand_operation:true,
        col_cost_price:true,
        col_gain:true,
        col_currency:true,
        col_userAflet:true,
        col_brig_name:true,
        col_tree_name:true
      }
    },
    ///////////// END UI USERS ///////////////
    customers:{
      customers:[],
      speed:true,
      target:[],
      target_active:[],
      target_sand:[],
      customer_sands:[],//history sands customer
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
    store_products:{
      products:[],
      target_item:[],
      forms:{
        add_product:false,
        edit_product:false,
        delete_product:false,
      }
    },
    foater:{
      foater_sell:[],
      target:[],
      forms:{
        delete_sell_fatora:false,
        print_sell_fatora:false
      }

    },
    fatora_debts_to_us:{
      debts:[]
    },
    fatora_debts_to_them:{
      debts:[]
    },
    users:{
      users:[],
      target:[],
      forms:{
        add_user:false,
        edit_user:false,
        delete_user:false,
        set_customers:false
      }
    },
    backups:{
      backups:[]
    },
    settings:{
      site_name:'',
      current_dollar:0,
      dark:false,
      address:'بلبلالبا',
      phone:'07714283610'
    }
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

          state.customers.customers = res.data;
        }).catch(err=>{
          if(err.response.status == 401)
        {
           router.push("/login")
        }
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
    async GET_SELL_FOATER(state)
    {
      state.loading = true;

      axios.get('api/get-sell-foater').then(res=>{
        state.foater.foater_sell = res.data;
      }).catch(err=>{
        if(err.response.status == 401)
        {
          router.push("/login")
        }

      }).finally(fin=>{
        state.loading = false;
      })
    },
    async GET_FATORA_DEBTS_TO_US(state)
    {
      state.loading = true;

      axios.get('api/get-fatora-debts-for-us').then(res=>{
        state.fatora_debts_to_us.debts = res.data;
      }).catch(err=>{
        if(err.response.status == 401)
        {
          router.push("/login")
        }

      }).finally(fin=>{
        state.loading = false;
      })
    },
    async GET_FATORA_DEBTS_TO_THEM(state)
    {
      state.loading = true;

      axios.get('api/get-fatora-debts-for-them').then(res=>{
        state.fatora_debts_to_them.debts = res.data;
      }).catch(err=>{
        if(err.response.status == 401)
        {
          router.push("/login")
        }

      }).finally(fin=>{
        state.loading = false;
      })
    },

    async GET_ITEMS(state)
    {
      state.loading = true;
      state.store_products.forms.add_product = false;
      state.store_products.forms.edit_product = false;
      state.store_products.forms.delete_product = false;

      axios.get('api/get-items').then(res=>{
        state.store_products.products = res.data;
      }).catch(err=>{
        if(err.response.status == 401)
        {
          router.push("/login")
        }

      }).finally(fin=>{
        state.loading = false;
      })
    },

    async GET_BACKUPS(state)
    {
      state.loading = true;

      axios.get('api/auth/get-backups').then(res=>{
        state.backups.backups = res.data;
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
            url = window.URL.createObjectURL(blob);

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
    async LOGOUT(state)
    {
      state.loading = true;
      axios.get('api/auth/logout').then(res=>{
        console.log(res)
        router.push('login')
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

})
