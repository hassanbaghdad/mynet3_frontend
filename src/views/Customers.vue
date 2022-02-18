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
               <v-spacer/>
               <v-tooltip bottom>
                   <template v-slot:activator="{ on, attrs }">
                       <v-btn fab small color="orange"  v-bind="attrs" v-on="on">
                           <v-icon color="white">mdi-table</v-icon>
                       </v-btn>
                   </template>
                   <span>ضبط الجدول</span>
               </v-tooltip>

           </v-toolbar>
       </v-card-title>
       <v-divider/>
       <v-card-text>
           <v-simple-table style="direction: rtl">
               <template v-slot:default>
                   <thead>
                   <tr>
                       <th class="text-center f16b">ت</th>
                       <th class="text-center f16b">الاسم</th>
                       <th class="text-center f16b">اسم الاشتراك</th>
                       <th class="text-center f16b">باسورد الاشتراك</th>
                       <th class="text-center f16b">حالة الاشتراك</th>
                       <th class="text-center f16b">الايام المتبقية</th>
                       <th class="text-center f16b">العنوان</th>
                       <th class="text-center f16b">هاتف</th>
                       <th class="text-center f16b">البرج</th>
                       <th class="text-center f16b">السكتر</th>
                       <th class="text-center f16b">يوزر النانو</th>
                       <th class="text-center f16b">باسورد النانو</th>
                       <th class="text-center f16b">IP</th>
                       <th class="text-center f16b">المشرف</th>

                   </tr>
                   <tr>
                       <th></th>
                       <th class="text-center f16b">
                           <v-text-field  @focus="ui_change_width_th($event,true)" @focusout="ui_change_width_th($event,false)"  outlined dense prepend-inner-icon="mdi-magnify"/>

                       </th>
                       <th class="text-center f16b ">
                           <v-text-field  @focus="ui_change_width_th($event,true)" @focusout="ui_change_width_th($event,false)" outlined dense prepend-inner-icon="mdi-magnify"/>
                       </th>
                       <th class="text-center f16b">
                           <v-text-field  @focus="ui_change_width_th($event,true)" @focusout="ui_change_width_th($event,false)" outlined dense prepend-inner-icon="mdi-magnify"/>
                       </th>
                       <th class="text-center f16b">
                           <v-text-field  @focus="ui_change_width_th($event,true)" @focusout="ui_change_width_th($event,false)" outlined dense prepend-inner-icon="mdi-magnify"/>
                       </th>

                       <th class="text-center f16b">
                           <v-text-field  @focus="ui_change_width_th($event,true)" @focusout="ui_change_width_th($event,false)" outlined dense prepend-inner-icon="mdi-magnify"/>
                       </th>
                       <th class="text-center f16b">
                           <v-text-field  @focus="ui_change_width_th($event,true)" @focusout="ui_change_width_th($event,false)" outlined dense prepend-inner-icon="mdi-magnify"/>
                       </th>
                       <th class="text-center f16b">
                           <v-text-field @focus="ui_change_width_th($event,true)" @focusout="ui_change_width_th($event,false)" outlined dense prepend-inner-icon="mdi-magnify"/>
                       </th>
                       <th class="text-center f16b">
                           <v-text-field  @focus="ui_change_width_th($event,true)" @focusout="ui_change_width_th($event,false)" outlined dense prepend-inner-icon="mdi-magnify"/>
                       </th>
                       <th class="text-center f16b">
                           <v-text-field  @focus="ui_change_width_th($event,true)" @focusout="ui_change_width_th($event,false)" outlined dense prepend-inner-icon="mdi-magnify"/>
                       </th>
                       <th class="text-center f16b">
                           <v-text-field  @focus="ui_change_width_th($event,true)" @focusout="ui_change_width_th($event,false)" outlined dense prepend-inner-icon="mdi-magnify"/>
                       </th>
                       <th class="text-center f16b">
                           <v-text-field  @focus="ui_change_width_th($event,true)" @focusout="ui_change_width_th($event,false)" outlined dense prepend-inner-icon="mdi-magnify"/>
                       </th>
                       <th class="text-center f16b">
                           <v-text-field  @focus="ui_change_width_th($event,true)" @focusout="ui_change_width_th($event,false)" outlined dense prepend-inner-icon="mdi-magnify"/>
                       </th>
                       <th class="text-center f16b">
                           <v-text-field  @focus="ui_change_width_th($event,true)" @focusout="ui_change_width_th($event,false)" outlined dense prepend-inner-icon="mdi-magnify"/>
                       </th>

                   </tr>

                   </thead>
                   <tbody>
                   <tr v-for="item in pageOfItems" :key="item.cost_id" >
                       <td class="text-center f16">{{customers.indexOf(item)+1}}</td>
                       <td  class="text-center f16">{{item.cost_name}}</td>
                       <td style="cursor: pointer" @click="set_customer_to_details(item)" class="text-center f16 font-italic"><b>
                           {{item.cost_user}}
                       </b></td>
                       <td class="text-center f16">
                           {{item.cost_pass}}
                       </td>
                       <td class="text-center f16">
                           <v-chip v-if="parseInt(item.remaining_days) > 0" small color="success">
                               <v-icon small>mdi-wifi</v-icon>
                               <span class="mr-2">فعال</span>
                           </v-chip>
                           <v-chip v-if="parseInt(item.remaining_days) < 1" small color="error">
                               <v-icon small>mdi-wifi-off</v-icon>
                               <span class="mr-2">منتهي</span>
                           </v-chip>
                       </td>
                       <td class="text-center f16">
                           {{parseInt(item.remaining_days) | remaining_days_zero}}
                       </td>
                       <td class="text-center f16">
                           {{item.cost_address}}
                       </td>
                       <td class="text-center f16">
                           {{item.cost_phone}}
                       </td>
                       <td class="text-center f16">
                           {{item.brig_name}}
                       </td>
                       <td class="text-center f16">
                           {{item.cost_secter}}
                       </td>
                       <td class="text-center f16">
                           {{item.cost_userNano}}
                       </td>
                       <td class="text-center f16">
                           {{item.cost_passNano}}
                       </td>
                       <td class="text-center f16">
                           {{item.cost_ipNano}}
                       </td>
                       <td class="text-center f16">admin</td>
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
                customStyles,
                customLabels,
                tr_width:'150px'
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

            }
        },
        created(){
            this.$store.commit("GET_CUSTOMERS")
        },
        computed:{
            get_customers:function () {
                return this.$store.state.customers.customers
            }
        },
        watch:{
            get_customers:function (new_customers) {
                this.customers = new_customers;
            }
        }
    }
</script>

<style scoped>


</style>