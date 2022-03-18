<template>
    <v-dialog max-width="900" v-model="$store.state.users.forms.set_customers">
     <v-card>
         <v-card-title class="pink">
             <v-btn icon dark  @click="$store.state.users.forms.set_customers=false">
                 <v-icon>mdi-close</v-icon>
             </v-btn>
         </v-card-title>
         <v-divider/>
         <v-card-text>
             <v-container>
                 <v-row justify="center">
                     <v-col cols="12">
                         <v-select label="اليوزر" v-model="user_id" :items="$store.state.users.users" item-text="Fullname" item-value="user_id" outlined></v-select>
                     </v-col>
                     <v-col cols="12">
                         <v-simple-table style="direction: rtl">
                             <template v-slot:default>
                                 <thead>
                                 <tr>
                                     <th class="text-center f16">
                                         #
                                     </th>
                                     <th class="text-center f16">
                                         اسم الزبون
                                     </th>
                                     <th class="text-center f16">
                                         يوزر الزبون
                                     </th>
                                     <th class="text-center f16">
                                         المشرف الحالي
                                     </th>

                                 </tr>
                                 <tr>
                                     <th class="text-center f16">
                                         <v-checkbox v-model="select_all_btn" @click="select_all"/>
                                     </th>
                                     <th class="text-center f16">
                                         <v-text-field outlined/>
                                     </th>
                                     <th class="text-center f16">
                                         <v-text-field outlined/>
                                     </th>
                                     <th class="text-center f16">
                                         <v-text-field outlined/>
                                     </th>

                                 </tr>

                                 </thead>
                                 <tbody>
                                 <tr v-for="item in pageOfItems" :key="item.cost_id">
                                     <td class="text-center f16"><v-checkbox  :value="item.cost_id"  @click="add_customer_to_list(item.cost_id)"/></td>
                                     <td class="text-center f16">{{item.cost_name}}</td>
                                     <td class="text-center f16">{{item.cost_user}}</td>
                                     <td class="text-center f16">{{item.cost_GroupFk | get_user_fullname}}</td>
                                 </tr>
                                 </tbody>
                             </template>
                         </v-simple-table>
                     </v-col>
                 </v-row>
             </v-container>

         </v-card-text>
         <v-divider/>
         <v-card elevation="1" class="f14 text-center pa-4">
             <jw-pagination :pageSize="15" :maxPages="$vuetify.breakpoint.xs?1:10"  :items="customers" :labels="customLabels" :styles="customStyles" @changePage="onChangePage"></jw-pagination>
         </v-card>
     </v-card>
    </v-dialog>

</template>

<script>
    import store from '@/store'
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
        name: "SetCustomers",
        components:{
            JwPagination
        },
        filters:{
            get_user_fullname:function(value)
            {
                var admins = [];
                var admins_name = "";
                value = value.split(',');

                value.map(x=>{
                    var admin = store.state.users.users.filter(item=>item.user_id == x)[0]["Fullname"];

                    admins.push(admin);
                });
                admins = admins.map(y=>{
                    if(admins_name == "")
                    {
                        admins_name = y;
                    }
                    if(admins_name != "")
                    {
                        if(admins_name != y)
                        {
                            admins_name = admins_name + "," + y
                        }

                    }

                });
                return admins_name;
            }
        },
        data(){
            return{

                customLabels,
                customStyles,
                user_id:56,
                users:this.$store.state.users.users,
                customers:this.$store.state.customers.customers,
                pageOfItems: [],
                customers_selected:[],
                select_all_btn:false
            }
        },
        methods:{
            onChangePage(pageOfItems) {
                // update page of items
                this.pageOfItems = pageOfItems;
            },
            check_user_in_list(item)
            {
                var ids = item.cost_GroupFk.split(',');
                if(ids.includes(this.user_id.toString()))
                {
                    return true;
                }
                return  false;
            },
            add_customer_to_list(cost_id)
            {
               // this.customers_selected.push(cost_id);
                console.log(this.customers_selected)
            },
            select_all()
            {
                if(this.select_all_btn)
                {
                    this.customers.map(x=>{
                        this.customers_selected.push(x.cost_id);
                    })
                }else{
                    this.customers_selected = [];
                }

            }
        }
    }
</script>

<style scoped>

</style>