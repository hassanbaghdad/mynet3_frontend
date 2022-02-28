<template>
    <v-card class="pa-0" elevation="1">
        <v-card-title class="ma-0 pa-0">
            <v-toolbar elevation="0" class="ma-0 pa-0">
                <v-icon large>mdi-file-sign</v-icon>
                <span class="f20b mr-2">الوصولات </span>

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
                                <v-checkbox class="ma-0 pa-0" label="رقم الوصل" v-model="$store.state.ui_user.bills.col_Sand_id"/>
                            </v-list-item>
                            <v-list-item>
                                <v-checkbox class="ma-0 pa-0" label="نوع الوصل" v-model="$store.state.ui_user.bills.col_Sand_moneyType"/>
                            </v-list-item>
                            <v-list-item>
                                <v-checkbox class="ma-0 pa-0" label="اسم الزبون" v-model="$store.state.ui_user.bills.col_cost_name"/>
                            </v-list-item>
                            <v-list-item>
                                <v-checkbox class="ma-0 pa-0" label="يوزر الزبون" v-model="$store.state.ui_user.bills.col_cost_user"/>
                            </v-list-item>
                            <v-list-item>
                                <v-checkbox class="ma-0 pa-0" label="مبلغ الوصل" v-model="$store.state.ui_user.bills.col_Sand_money"/>
                            </v-list-item>
                            <v-list-item>
                                <v-checkbox class="ma-0 pa-0" label="الواصل" v-model="$store.state.ui_user.bills.col_Sand_moneyin"/>
                            </v-list-item>
                            <v-list-item>
                                <v-checkbox class="ma-0 pa-0" label="نوع الاشتراك" v-model="$store.state.ui_user.bills.col_Sand_cardtype"/>
                            </v-list-item>
                            <v-list-item>
                                <v-checkbox class="ma-0 pa-0" label="تاريخ الوصل" v-model="$store.state.ui_user.bills.col_Sand_date"/>
                            </v-list-item>
                            <v-list-item>
                                <v-checkbox class="ma-0 pa-0" label="مسجل الوصل" v-model="$store.state.ui_user.bills.col_sand_user"/>
                            </v-list-item>




                            <v-list-item>
                                <v-btn block @click="save_ui_bills" :loading="loading" color="primary">
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
        <v-card-title>
            <v-row>
                <v-col cols="12" lg="3">
                    <span class="f16 ml-2">من تاريخ:</span>
                    <input v-model="search.from_date" @change="search_bill" type="date" style="border: 1px solid black;width: 75%"/>
                </v-col>
                <v-col cols="12" lg="3">
                    <span class="f16 ml-2">الى تاريخ:</span>
                    <input v-model="search.to_date" @change="search_bill" type="date" style="border: 1px solid black;width: 75%"/>
                </v-col>



            </v-row>

        </v-card-title>
        <v-divider/>
        <v-card-text>
            <v-simple-table style="direction: rtl">
                <template v-slot:default>
                    <thead>
                    <tr>
                        <th class="text-center f16b">ت</th>
                        <th v-if="$store.state.ui_user.bills.col_Sand_id" class="text-center f16b">رقم الوصل</th>
                        <th v-if="$store.state.ui_user.bills.col_Sand_moneyType" class="text-center f16b">نوع الوصل</th>
                        <th v-if="$store.state.ui_user.bills.col_cost_name" class="text-center f16b">اسم الزبون</th>
                        <th v-if="$store.state.ui_user.bills.col_cost_user" class="text-center f16b">يوزر الزبون</th>
                        <th v-if="$store.state.ui_user.bills.col_Sand_money" class="text-center f16b">مبلغ الوصل</th>
                        <th v-if="$store.state.ui_user.bills.col_Sand_moneyin" class="text-center f16b">الواصل</th>
                        <th v-if="$store.state.ui_user.bills.col_Sand_cardtype" class="text-center f16b">نوع الاشتراك</th>
                        <th v-if="$store.state.ui_user.bills.col_Sand_date" class="text-center f16b">تاريخ الوصل</th>
                        <th v-if="$store.state.ui_user.bills.col_sand_user" class="text-center f16b">مسجل الوصل</th>
                        <th class="text-center f16b">خيارات</th>


                    </tr>
                    <tr>
                        <th></th>
                        <th v-if="$store.state.ui_user.bills.col_Sand_id" class="text-center f16b">
                            <v-text-field v-model="search.Sand_id" @keyup="search_bill" outlined dense prepend-inner-icon="mdi-magnify"/>
                        </th>
                        <th v-if="$store.state.ui_user.bills.col_Sand_moneyType" class="text-center f16b">
                            <v-text-field outlined dense prepend-inner-icon="mdi-magnify"/>
                        </th>
                        <th v-if="$store.state.ui_user.bills.col_cost_name" class="text-center f16b">
                            <v-text-field v-model="search.cost_name" @keyup="search_bill" outlined dense prepend-inner-icon="mdi-magnify"/>
                        </th>
                        <th v-if="$store.state.ui_user.bills.col_cost_user" class="text-center f16b">
                            <v-text-field v-model="search.cost_user" @keyup="search_bill" outlined dense prepend-inner-icon="mdi-magnify"/>
                        </th>
                        <th v-if="$store.state.ui_user.bills.col_Sand_money" class="text-center f16b">
                            <v-text-field v-model="search.Sand_money" @keyup="search_bill" outlined dense prepend-inner-icon="mdi-magnify"/>
                        </th>
                        <th v-if="$store.state.ui_user.bills.col_Sand_moneyin" class="text-center f16b">
                            <v-text-field v-model="search.Sand_moneyin" @keyup="search_bill" outlined dense prepend-inner-icon="mdi-magnify"/>
                        </th>
                        <th v-if="$store.state.ui_user.bills.col_Sand_cardtype" class="text-center f16b">
                            <v-text-field v-model="search.Sand_cardtype" @keyup="search_bill" outlined dense prepend-inner-icon="mdi-magnify"/>
                        </th>
                        <th v-if="$store.state.ui_user.bills.col_Sand_date" class="text-center f16b">
                            <v-text-field v-model="search.Sand_date" @keyup="search_bill" outlined dense prepend-inner-icon="mdi-magnify"/>
                        </th>
                        <th v-if="$store.state.ui_user.bills.col_sand_user" class="text-center f16b">
                            <v-text-field v-model="search.sand_user" @keyup="search_bill" outlined dense prepend-inner-icon="mdi-magnify"/>
                        </th>

                        <th></th>

                    </tr>

                    </thead>
                    <tbody>
                    <tr v-for="item in pageOfItems" :key="item.Sand_id" >
                        <td class="text-center f16">{{bills.indexOf(item)+1}}</td>
                        <td v-if="$store.state.ui_user.bills.col_Sand_id"  class="text-center f16">{{item.Sand_id}}</td>
                        <td v-if="$store.state.ui_user.bills.col_Sand_moneyType"  class="text-center f16">{{item.Sand_moneyType | moneyType}}</td>
                        <td v-if="$store.state.ui_user.bills.col_cost_name"  class="text-center f16">{{item.cost_name}}</td>
                        <td v-if="$store.state.ui_user.bills.col_cost_user"  class="text-center f16">{{item.cost_user}}</td>
                        <td v-if="$store.state.ui_user.bills.col_Sand_money"  class="text-center f16">{{item.Sand_money | remove00}}</td>
                        <td v-if="$store.state.ui_user.bills.col_Sand_moneyin"  class="text-center f16">{{item.Sand_moneyin | remove00}}</td>
                        <td v-if="$store.state.ui_user.bills.col_Sand_cardtype" class="text-center f16">{{item.Sand_cardtype}}</td>
                        <td v-if="$store.state.ui_user.bills.col_Sand_date" class="text-center f16">{{item.Sand_date | datesubfilter}}</td>
                        <td v-if="$store.state.ui_user.bills.col_sand_user"  class="text-center f16">{{item.sand_user}}</td>

                        <td  class="text-center f16">
                            <v-row class="pa-0 ma-0">
                                <v-col cols="6" class="pa-0 ma-0">
                                    <v-btn @click="set_bill_to_print(item)" icon class="mr-2">
                                        <v-icon color="primary">mdi-printer</v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="6" class="pa-0 ma-0">
                                    <v-btn @click="set_bill_to_delete(item)" icon class="mr-4">
                                        <v-icon color="error">mdi-delete</v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </td>
                    </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-card-text>
        <v-divider/>
        <v-card elevation="1" class="f14 text-center pa-4">
            <jw-pagination :pageSize="15" :maxPages="$vuetify.breakpoint.xs?1:10"  :items="bills" :labels="customLabels" :styles="customStyles" @changePage="onChangePage"></jw-pagination>
        </v-card>
        <DeleteBill/>
        <PrintView/>
    </v-card>
</template>

<script>
    import PrintView from "@/components/Customers/PrintView";
    import JwPagination from 'jw-vue-pagination';
    import moment from "moment";
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
    import DeleteBill from "@/components/Bills/DeleteBill";
    export default {
        name: "Bills",
        components:{
            JwPagination,
            DeleteBill,
            PrintView
        },
        filters:{
            remove00:function(value)
            {
                if(value != null && value != "" && value != undefined)
                {
                    return Math.trunc(value);
                }
            },
            datefilter:function (value) {
                if(value != null && value != '' && value != undefined && value !='NaN' && value !="-")
                {
                    return moment(value).format('YYYY-MM-DD hh:mm A')
                }
            },
            datesubfilter:function (value) {
                if(value != null && value != '' && value != undefined && value !='NaN' && value !="-")
                {
                    return moment(value).format('YYYY-MM-DD')
                }
            },

            moneyType:function (value) {
                if(value ==1)
                {
                    return "تفعيل";
                }
                if(value ==2)
                {
                    return "تسديد";
                }
                if(value ==6)
                {
                    return "دين";
                }

            }
        },
        data(){
            return{
                bills:this.$store.state.bills.bills,
                loading:false,
                customLabels,
                customStyles,
                pageOfItems: [],

                search:{
                    Sand_id:'',
                    Sand_moneyType:'',
                    cost_name:'',
                    cost_user:'',
                    Sand_money:'',
                    Sand_moneyin:'',
                    Sand_cardtype:'',
                    Sand_date:'',
                    sand_user:'',
                    from_date:'',
                    to_date:moment(new Date()).format('YYYY-MM-DD')
                }
            }
        },
        methods:{
            onChangePage(pageOfItems) {
                // update page of items
                this.pageOfItems = pageOfItems;
            },
            set_bill_to_delete(bill)
            {
                this.$store.state.bills.target = bill;
                this.$store.state.bills.forms.delete_bill = true;
            },

            set_bill_to_print(sand)
            {
                this.$store.state.customers.target_sand = sand;
                this.$store.state.customers.forms.print_view=true
            },

            search_bill()
            {
                var filterd = this.$store.state.bills.bills;
                filterd = filterd.map(x=>{
                    if(x.sand_user == null)
                    {
                        x.sand_user = "-";
                    }
                    if(x.Sand_date == null)
                    {
                        x.Sand_date = "-";
                    }
                    return x;
                });

                if(this.search.Sand_id != '' && this.search.Sand_id != null)
                {
                    filterd = filterd.filter(item=>item.Sand_id==this.search.Sand_id);
                }
                if(this.search.Sand_money != '' && this.search.Sand_money != null)
                {
                    filterd = filterd.filter(item=>item.Sand_money==this.search.Sand_money);
                }
                if(this.search.Sand_moneyin != '' && this.search.Sand_moneyin != null)
                {
                    filterd = filterd.filter(item=>item.Sand_moneyin==this.search.Sand_moneyin);
                }

                if(this.search.from_date != null && this.search.from_date != "" && this.search.from_date != undefined)
                {
                    filterd = filterd.filter(item=>item.Sand_date > this.search.from_date);
                }
                if(this.search.to_date != null && this.search.to_date != "" && this.search.to_date != undefined)
                {
                    filterd = filterd.filter(item=>item.Sand_date <= moment(this.search.to_date).add(1,"days").format("YYYY-MM-DD"));
                }


                filterd = filterd.filter(item=>item.cost_name.match(this.search.cost_name));
                filterd = filterd.filter(item=>item.cost_user.match(this.search.cost_user));
                filterd = filterd.filter(item=>item.Sand_cardtype.match(this.search.Sand_cardtype));
                filterd = filterd.filter(item=>item.Sand_date.match(this.search.Sand_date));
                filterd = filterd.filter(item=>item.sand_user.match(this.search.sand_user));


                this.bills = filterd;
            },
            async save_ui_bills()
            {
                this.loading = true;
                await this.$axios.post('api/save-ui-bills',this.$store.state.ui_user.bills).then(res=>{

                    this.$fire({
                        title: "نجح",
                        text: res.data.msg,
                        type: "success",
                        timer: 2000
                    });

                    this.$store.commit("GET_UI_BILLS");
                }).catch(err=>{
                    console.log(err)
                }).finally(fin=>{
                    this.loading = false
                })
            }
        },
        computed:{
            get_bills:function () {
                return this.$store.state.bills.bills
            }
        },
        watch:{
            get_bills:function (new_bills) {
                this.bills = new_bills;
            }
        },

        created(){
            this.$store.commit("GET_BILLS");
        }
    }
</script>

<style scoped>

</style>