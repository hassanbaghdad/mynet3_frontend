<template>
   <v-card class="pa-0" elevation="1">
       <v-card-title>
           <v-icon large>mdi-account-group</v-icon>
           <span class="f20b mr-2">المشتركين </span>
       </v-card-title>
       <v-divider/>
       <v-card-title class="ma-0 pa-0">
           <v-toolbar elevation="0" class="ma-0 pa-0">
               <v-tooltip bottom>
                   <template v-slot:activator="{ on, attrs }">
                       <v-btn fab small color="blue"  v-bind="attrs" v-on="on" @click="$store.state.customers.forms.add_customer=true">
                           <v-icon color="white">mdi-plus</v-icon>
                       </v-btn>
                   </template>
                   <span>اضافة مشترك</span>
               </v-tooltip>
               <v-toolbar-items>
                   <div class="ma-4">
                       <v-tooltip bottom>
                           <template v-slot:activator="{ on, attrs }">
                               <v-switch  label="عرض سريع" class="mr-2" color="red"  v-bind="attrs" v-on="on" v-model="$store.state.customers.speed" @click="$store.commit('GET_CUSTOMERS')"></v-switch>
                           </template>
                           <span>جدول سريع</span>
                       </v-tooltip>
                   </div>
               </v-toolbar-items>


               <v-spacer/>

               <div class="text-center">
                   <v-menu offset-y :close-on-content-click="false">
                       <template v-slot:activator="{ on, attrs }">
                           <v-btn fab small color="orange"  v-bind="attrs" v-on="on">
                               <v-icon color="white">mdi-table</v-icon>
                           </v-btn>
                       </template>
                       <v-list >
                           <v-list-item>
                               <v-checkbox class="ma-0 pa-0" label="اسم المشترك" v-model="$store.state.ui_user.customers.col_cost_name"/>
                           </v-list-item>
                           <v-list-item>
                               <v-checkbox class="ma-0 pa-0"  label="اسم الاشتراك" v-model="$store.state.ui_user.customers.col_cost_user"/>
                           </v-list-item>
                           <v-list-item>
                               <v-checkbox class="ma-0 pa-0"  label="باسوورد المشترك" v-model="$store.state.ui_user.customers.col_cost_pass"/>
                           </v-list-item>

                           <v-list-item>
                               <v-checkbox class="ma-0 pa-0"  label="حالة الاشتراك" v-model="$store.state.ui_user.customers.col_remaining_days2"/>
                           </v-list-item>
                           <v-list-item>
                               <v-checkbox class="ma-0 pa-0"  label="الايام المتبقية" v-model="$store.state.ui_user.customers.col_remaining_days"/>
                           </v-list-item>
                           <v-list-item>
                               <v-checkbox class="ma-0 pa-0"  label="العنوان" v-model="$store.state.ui_user.customers.col_cost_address"/>
                           </v-list-item>
                           <v-list-item>
                               <v-checkbox class="ma-0 pa-0"  label="الهاتف" v-model="$store.state.ui_user.customers.col_cost_phone"/>
                           </v-list-item>
                           <v-list-item>
                               <v-checkbox class="ma-0 pa-0"  label="البرج" v-model="$store.state.ui_user.customers.col_cost_brig"/>
                           </v-list-item>
                           <v-list-item>
                               <v-checkbox class="ma-0 pa-0"  label="السكتر" v-model="$store.state.ui_user.customers.col_cost_secter"/>
                           </v-list-item>
                           <v-list-item>
                               <v-checkbox class="ma-0 pa-0"  label="يوزر النانو" v-model="$store.state.ui_user.customers.col_cost_userNano"/>
                           </v-list-item>
                           <v-list-item>
                               <v-checkbox class="ma-0 pa-0"   label="باسوورد النانو" v-model="$store.state.ui_user.customers.col_cost_passNano"/>
                           </v-list-item>
                           <v-list-item>
                               <v-checkbox class="ma-0 pa-0"  label="IP" v-model="$store.state.ui_user.customers.col_cost_ipNano"/>
                           </v-list-item>
                           <v-list-item>
                               <v-checkbox class="ma-0 pa-0"  label="المشرف" v-model="$store.state.ui_user.customers.col_cost_admin"/>
                           </v-list-item>
                           <v-list-item>
                               <v-btn block @click="save_ui_customers" :loading="loading" color="primary">
                                   <v-icon>mdi-check</v-icon>
                                   <span class="mr-2 f16b">حفظ الشكل</span>
                               </v-btn>
                           </v-list-item>


                       </v-list>

                   </v-menu>
               </div>

           </v-toolbar>
       </v-card-title>
       <v-divider/>
       <v-card-text style="position: relative">
           <div v-if="$store.state.loading2" class="d-flex" style="width: 100%;height: 100%;position: absolute;background-color: white;z-index: 2">
               <v-progress-circular
                       class="align-self-center ma-auto"
                       indeterminate
                       size="64"
                       color="primary"
               ></v-progress-circular>

           </div>
           <v-simple-table style="direction: rtl">
               <template v-slot:default>
                   <thead>
                   <tr>
                       <th class="text-center f16b">ت</th>
                       <th class="text-center f16b" v-if="$store.state.ui_user.customers.col_cost_name">اسم المشترك</th>
                       <th class="text-center f16b" v-if="$store.state.ui_user.customers.col_cost_user">اسم الاشتراك</th>
                       <th class="text-center f16b" v-if="$store.state.ui_user.customers.col_cost_pass">باسورد الاشتراك</th>
                       <th class="text-center f16b" v-if="$store.state.ui_user.customers.col_remaining_days2 && !$store.state.customers.speed">حالة الاشتراك</th>
                       <th class="text-center f16b" v-if="$store.state.ui_user.customers.col_remaining_days && !$store.state.customers.speed">الايام المتبقية</th>
                       <th class="text-center f16b" v-if="$store.state.ui_user.customers.col_cost_address">العنوان</th>
                       <th class="text-center f16b" v-if="$store.state.ui_user.customers.col_cost_phone">هاتف</th>
                       <th class="text-center f16b" v-if="$store.state.ui_user.customers.col_cost_brig">البرج</th>
                       <th class="text-center f16b" v-if="$store.state.ui_user.customers.col_cost_secter">السكتر</th>
                       <th class="text-center f16b" v-if="$store.state.ui_user.customers.col_cost_userNano">يوزر النانو</th>
                       <th class="text-center f16b" v-if="$store.state.ui_user.customers.col_cost_passNano">باسورد النانو</th>
                       <th class="text-center f16b" v-if="$store.state.ui_user.customers.col_cost_ipNano">IP</th>
                       <th class="text-center f16b" v-if="$store.state.ui_user.customers.col_cost_admin">المشرف</th>

                   </tr>
                   <tr>
                       <th></th>
                       <th v-if="$store.state.ui_user.customers.col_cost_name" class="text-center f16b">
                              <v-text-field @keyup="search_customer" v-model="search.cost_name"  @focus="ui_change_width_th($event,true)" @focusout="ui_change_width_th($event,false)"  outlined dense prepend-inner-icon="mdi-magnify"/>
                       </th>
                       <th v-if="$store.state.ui_user.customers.col_cost_user" class="text-center f16b ">
                           <v-text-field @keyup="search_customer" v-model="search.cost_user" @focus="ui_change_width_th($event,true)" @focusout="ui_change_width_th($event,false)" outlined dense prepend-inner-icon="mdi-magnify"/>
                       </th>
                       <th  v-if="$store.state.ui_user.customers.col_cost_pass" class="text-center f16b">
                           <v-text-field @keyup="search_customer" v-model="search.cost_pass" @focus="ui_change_width_th($event,true)" @focusout="ui_change_width_th($event,false)" outlined dense prepend-inner-icon="mdi-magnify"/>
                       </th>
                       <th  v-if="$store.state.ui_user.customers.col_remaining_days2&& !$store.state.customers.speed" class="text-center f16b">
                           <v-select height="40" @change="search_customer" @keyup="search_customer" v-model="search.remaining_days2"  style="line-height: 60px" :items="active_state" item-value="value" item-text="label"  @focus="ui_change_width_th($event,true)" @focusout="ui_change_width_th($event,false)" outlined dense prepend-inner-icon="mdi-magnify"/>
                       </th>

                       <th  v-if="$store.state.ui_user.customers.col_remaining_days&& !$store.state.customers.speed" class="text-center f16b">
                           <v-text-field @keyup="search_customer" v-model="search.remaining_days" @focus="ui_change_width_th($event,true)" @focusout="ui_change_width_th($event,false)" outlined dense prepend-inner-icon="mdi-magnify"/>
                       </th>
                       <th v-if="$store.state.ui_user.customers.col_cost_address"  class="text-center f16b">
                           <v-text-field @keyup="search_customer" v-model="search.cost_address" @focus="ui_change_width_th($event,true)" @focusout="ui_change_width_th($event,false)" outlined dense prepend-inner-icon="mdi-magnify"/>
                       </th>
                       <th  v-if="$store.state.ui_user.customers.col_cost_phone" class="text-center f16b">
                           <v-text-field @keyup="search_customer" v-model="search.cost_phone" @focus="ui_change_width_th($event,true)" @focusout="ui_change_width_th($event,false)" outlined dense prepend-inner-icon="mdi-magnify"/>
                       </th>
                       <th  v-if="$store.state.ui_user.customers.col_cost_brig" class="text-center f16b">
                           <v-text-field @keyup="search_customer" v-model="search.brig_name" @focus="ui_change_width_th($event,true)" @focusout="ui_change_width_th($event,false)" outlined dense prepend-inner-icon="mdi-magnify"/>
                       </th>
                       <th  v-if="$store.state.ui_user.customers.col_cost_secter" class="text-center f16b">
                           <v-text-field @keyup="search_customer" v-model="search.cost_secter" @focus="ui_change_width_th($event,true)" @focusout="ui_change_width_th($event,false)" outlined dense prepend-inner-icon="mdi-magnify"/>
                       </th>
                       <th  v-if="$store.state.ui_user.customers.col_cost_userNano" class="text-center f16b">
                           <v-text-field @keyup="search_customer" v-model="search.cost_userNano" @focus="ui_change_width_th($event,true)" @focusout="ui_change_width_th($event,false)" outlined dense prepend-inner-icon="mdi-magnify"/>
                       </th>
                       <th  v-if="$store.state.ui_user.customers.col_cost_passNano" class="text-center f16b">
                           <v-text-field @keyup="search_customer" v-model="search.cost_passNano" @focus="ui_change_width_th($event,true)" @focusout="ui_change_width_th($event,false)" outlined dense prepend-inner-icon="mdi-magnify"/>
                       </th>
                       <th  v-if="$store.state.ui_user.customers.col_cost_ipNano" class="text-center f16b">
                           <v-text-field @keyup="search_customer" v-model="search.cost_ipNano" @focus="ui_change_width_th($event,true)" @focusout="ui_change_width_th($event,false)" outlined dense prepend-inner-icon="mdi-magnify"/>
                       </th>
                       <th  v-if="$store.state.ui_user.customers.col_cost_admin" class="text-center f16b">
                           <v-text-field  @focus="ui_change_width_th($event,true)" @focusout="ui_change_width_th($event,false)" outlined dense prepend-inner-icon="mdi-magnify"/>
                       </th>

                   </tr>

                   </thead>
                   <tbody>
                   <tr v-for="item in pageOfItems" :key="item.cost_id" style="cursor: pointer" @click="set_customer_to_details(item)">
                       <td class="text-center f16">{{customers.indexOf(item)+1}}</td>
                       <td  v-if="$store.state.ui_user.customers.col_cost_name" class="text-center f16">{{item.cost_name}}</td>
                       <td  v-if="$store.state.ui_user.customers.col_cost_user" class="text-center f16 font-italic"><b>
                           {{item.cost_user}}
                       </b></td>
                       <td  v-if="$store.state.ui_user.customers.col_cost_pass" class="text-center f16">
                           {{item.cost_pass}}
                       </td>
                       <td  v-if="$store.state.ui_user.customers.col_remaining_days2&& !$store.state.customers.speed" class="text-center f16">
                           <v-chip v-if="parseInt(item.remaining_days) > 0" small color="success">
                               <v-icon small>mdi-wifi</v-icon>
                               <span class="mr-2">فعال</span>
                           </v-chip>
                           <v-chip v-if="parseInt(item.remaining_days) < 1" small color="error">
                               <v-icon small>mdi-wifi-off</v-icon>
                               <span class="mr-2">منتهي</span>
                           </v-chip>
                           <v-chip v-if="item.remaining_days == null" small outlined>
                               <v-icon small>mdi-close</v-icon>
                               <span class="mr-2">غير مشترك</span>
                           </v-chip>

                       </td>
                       <td  v-if="$store.state.ui_user.customers.col_remaining_days&& !$store.state.customers.speed" class="text-center f16">
                           {{parseInt(item.remaining_days) | remaining_days_zero}}
                       </td>
                       <td  v-if="$store.state.ui_user.customers.col_cost_address" class="text-center f16">
                           {{item.cost_address}}
                       </td>
                       <td  v-if="$store.state.ui_user.customers.col_cost_phone" class="text-center f16">
                           {{item.cost_phone}}
                       </td>
                       <td  v-if="$store.state.ui_user.customers.col_cost_brig" class="text-center f16">
                           {{item.brig_name}}
                       </td>
                       <td  v-if="$store.state.ui_user.customers.col_cost_secter" class="text-center f16">
                           {{item.cost_secter}}
                       </td>
                       <td  v-if="$store.state.ui_user.customers.col_cost_userNano" class="text-center f16">
                           {{item.cost_userNano}}
                       </td>
                       <td  v-if="$store.state.ui_user.customers.col_cost_passNano" class="text-center f16">
                           {{item.cost_passNano}}
                       </td>
                       <td  v-if="$store.state.ui_user.customers.col_cost_ipNano" class="text-center f16">
                           {{item.cost_ipNano}}
                       </td>
                       <td  v-if="$store.state.ui_user.customers.col_cost_admin" class="text-center f16">admin</td>
                   </tr>


                   </tbody>
               </template>
           </v-simple-table>

       </v-card-text>
       <v-divider/>
       <v-card elevation="1" class="f14 text-center pa-4">
           <jw-pagination :pageSize="15" :maxPages="$vuetify.breakpoint.xs?1:10"  :items="customers" :labels="customLabels" :styles="customStyles" @changePage="onChangePage"></jw-pagination>
       </v-card>
       <AddCustomer/>
       <CustomerDetails/>

   </v-card>
</template>

<script>
    import AddCustomer from "@/components/Customers/AddCustomer";
    import CustomerDetails from "@/components/Customers/CustomerDetails";
    import JwPagination from 'jw-vue-pagination';
    const customLabels = {
        first: 'الاول',
        last: 'الاخير',
        previous: 'السابق',
        next: 'التالي'
    };
    const customStyles = {
        ul: {
            direction:'ltr'
        },
        li: {
            display: 'inline-block',
            border:'1px solid grey',
            margin:'2px',
            borderRadius:'5px'
        },
        a: {
            color: 'black'
        }
    };
    export default {
        name: "Customers",
        components:{
            AddCustomer,
            CustomerDetails,
            JwPagination,

        },
        filters:{
            remaining_days_zero:function (value) {
                if(value > 0)
                {
                    return  value;
                }else{
                    return 0;
                }


            }
        },
        data () {
            return {
                customers:this.$store.state.customers.customers,
                pageOfItems: [],
                loading:false,
                customStyles,
                customLabels,
                tr_width:'150px',
                active_state:[
                    {label:'الكل',value:'a'},
                    {label:'منتهي',value:0},
                    {label:'فعال',value:1},
                    {label:'غير مشترك',value:'n'},
                ],
                search:{
                    Sand_cardtype: "",
                    brig_month: 1,
                    brig_name: '',
                    brig_type: 1,
                    cost_address: '',
                    cost_bregFk: 0,
                    cost_id: 0,
                    cost_ipNano: '',
                    cost_name: '',
                    cost_pass: '',
                    cost_passNano:'',
                    cost_phone: '',
                    cost_secter: '',
                    cost_sms: '',
                    cost_user: '',
                    cost_userNano: '',
                    remaining_days: '',
                    remaining_days2: 'a',
                },
                ui:{

                }
            }
        },
        methods:{
            set_customer_to_details(item)
            {
                this.$store.state.customers.forms.active=false;
                this.$store.state.customers.forms.payoff=false;
                this.$store.state.customers.forms.debt=false;

                this.$store.state.customers.target = item;
                this.$store.state.customers.forms.details = true;
            },
            onChangePage(pageOfItems) {
                // update page of items
                this.pageOfItems = pageOfItems;
            },
            ui_change_width_th(event,full)
            {
                //document.getElementById(event.target.id).style.transition = ".5s linear !important;";
                if(full)
                {
                    document.getElementById(event.target.id).style.width = '200px';
                }else{
                    document.getElementById(event.target.id).style.width = '';
                }

            },
            search_customer()
            {

                var filterd = this.$store.state.customers.customers;
                filterd = filterd.map(x=>{
                    if(x.cost_address == null)
                    {
                        x.cost_address = '';
                    }
                    if(x.cost_userNano == null)
                    {
                        x.cost_userNano = '';
                    }
                    if(x.cost_passNano == null)
                    {
                        x.cost_passNano = '';
                    }
                    if(x.cost_ipNano == null)
                    {
                        x.cost_ipNano = '';
                    }
                    if(x.cost_secter == null)
                    {
                        x.cost_secter = '';
                    }

                    return x;

                });

                filterd = filterd.filter(item=>item.cost_name.match(this.search.cost_name));
                filterd = filterd.filter(item=>item.cost_user.match(this.search.cost_user));
                filterd = filterd.filter(item=>item.cost_pass.match(this.search.cost_pass));
                filterd = filterd.filter(item=>item.cost_address.match(this.search.cost_address));
                filterd = filterd.filter(item=>item.cost_phone.match(this.search.cost_phone));
                filterd = filterd.filter(item=>item.cost_userNano.match(this.search.cost_userNano));
                filterd = filterd.filter(item=>item.cost_passNano.match(this.search.cost_passNano));
                filterd = filterd.filter(item=>item.cost_ipNano.match(this.search.cost_ipNano));
                filterd = filterd.filter(item=>item.brig_name.match(this.search.brig_name));
                filterd = filterd.filter(item=>item.cost_secter.match(this.search.cost_secter));
                if(this.search.remaining_days != null && this.search.remaining_days != '' && this.search.remaining_days != 'a')
                {
                    if(this.search.remaining_days == 0 || this.search.remaining_days == '0')
                    {
                        filterd = filterd.filter(item=>item.remaining_days<=this.search.remaining_days);
                    }else{
                        filterd = filterd.filter(item=>item.remaining_days ==this.search.remaining_days);
                    }
                }
                if(this.search.remaining_days2 != 'a')
                {


                    if(this.search.remaining_days2 > 0)
                    {
                        filterd = filterd.filter(item=>item.remaining_days > 0);
                    }
                    if(this.search.remaining_days2 < 1)
                    {
                        filterd = filterd.filter(item=>item.remaining_days < 1 && item.remaining_days != null);
                    }
                    if(this.search.remaining_days2 == 'n')
                    {
                        filterd = filterd.filter(item=>item.remaining_days==null);
                    }
                }



                this.customers = filterd;
            },
            async save_ui_customers()
            {
                this.loading = true;
                await this.$axios.post('api/save-ui-customers',this.$store.state.ui_user.customers).then(res=>{

                    this.$fire({
                        title: "نجح",
                        text: res.data.msg,
                        type: "success",
                        timer: 2000
                    });

                    this.$store.commit("GET_UI_CUSTOMERS");
            }).catch(err=>{
                console.log(err)
                }).finally(fin=>{
                    this.loading = false
                })
            },

        },
        created(){
            this.$store.commit("GET_CUSTOMERS",true);
        },
        computed:{
            get_customers:function () {
                return this.$store.state.customers.customers
            },


        },
        watch:{
            get_customers:function (new_customers) {
                this.customers = new_customers;

            },

        }
    }
</script>

<style scoped>

thead , th ,tr {
    transition: 1s linear !important;
}
</style>