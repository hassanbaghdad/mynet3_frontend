<template>
    <v-card class="pa-0" elevation="1" :loading="$store.state.loading">

        <v-divider/>
        <v-card-title class="ma-0 pa-0">
            <v-toolbar elevation="0" class="ma-0 pa-0">
                <v-icon large>mdi-file-sign</v-icon>
                <span class="f20b mr-2">ديون لنا </span>
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
                                <v-checkbox class="ma-0 pa-0" label="اسم المشترك" v-model="$store.state.ui_user.debts_to_us.col_cost_name"/>
                            </v-list-item>
                            <v-list-item>
                                <v-checkbox class="ma-0 pa-0"  label="يوزر المشترك" v-model="$store.state.ui_user.debts_to_us.col_cost_user"/>
                            </v-list-item>
                            <v-list-item>
                                <v-checkbox class="ma-0 pa-0"  label="المبلغ المتبقي" v-model="$store.state.ui_user.debts_to_us.col_Sand_carry"/>
                            </v-list-item>
                            <v-list-item>
                                <v-checkbox class="ma-0 pa-0"  label="الموبايل" v-model="$store.state.ui_user.debts_to_us.col_cost_phone"/>
                            </v-list-item>
                            <v-list-item>
                                <v-checkbox class="ma-0 pa-0"  label="البرج" v-model="$store.state.ui_user.debts_to_us.col_brig_name"/>
                            </v-list-item>
                            <v-list-item>
                                <v-checkbox class="ma-0 pa-0"  label="تاريخ الانتهاء" v-model="$store.state.ui_user.debts_to_us.col_Sand_dateto"/>
                            </v-list-item>
                            <v-list-item>
                                <v-checkbox class="ma-0 pa-0"  label="تاريخ التسديد" v-model="$store.state.ui_user.debts_to_us.col_Sand_nextdate"/>
                            </v-list-item>



                            <v-list-item>
                                <v-btn block @click="save_ui_debts_to_us" :loading="loading" color="primary">
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
        <v-simple-table style="direction: rtl">
            <template v-slot:default>
                <thead>
                <tr>
                    <th class="f16b text-center" colspan="1">عدد الوصولات</th>
                    <th class="f16b text-center"  colspan="1">{{count_debts}}</th>
                    <th class="f16b text-center" colspan="1">المجموع</th>
                    <th class="f16b text-center"  colspan="1">{{sum_money | money_iq}}</th>

                </tr>
                </thead>
            </template>
        </v-simple-table>
        <v-card-text>
            <v-simple-table style="direction: rtl">
                <template v-slot:default>
                    <thead>
                    <tr>
                        <th class="text-center f16b">ت</th>
                        <th class="text-center f16b">تسديد</th>
                        <th v-if="$store.state.ui_user.debts_to_us.col_cost_name" class="text-center f16b">اسم المشترك</th>
                        <th v-if="$store.state.ui_user.debts_to_us.col_cost_user" class="text-center f16b">يوزر المشترك</th>
                        <th v-if="$store.state.ui_user.debts_to_us.col_Sand_carry" class="text-center f16b">المبلغ المتبقي</th>
                        <th v-if="$store.state.ui_user.debts_to_us.col_cost_phone" class="text-center f16b">موبايل</th>
                        <th v-if="$store.state.ui_user.debts_to_us.col_brig_name" class="text-center f16b">البرج</th>
                        <th v-if="$store.state.ui_user.debts_to_us.col_Sand_dateto" class="text-center f16b">تاريخ الانتهاء</th>
                        <th v-if="$store.state.ui_user.debts_to_us.col_Sand_nextdate" class="text-center f16b">تاريخ التسديد</th>


                    </tr>
                    <tr>
                        <th></th>
                        <th></th>
                        <th v-if="$store.state.ui_user.debts_to_us.col_cost_name" class="text-center f16b">
                            <v-text-field v-model="search.cost_name" @keyup="search_debts" outlined dense prepend-inner-icon="mdi-magnify"/>
                        </th>
                        <th v-if="$store.state.ui_user.debts_to_us.col_cost_user" class="text-center f16b">
                            <v-text-field v-model="search.cost_user" @keyup="search_debts" outlined dense prepend-inner-icon="mdi-magnify"/>
                        </th>
                        <th v-if="$store.state.ui_user.debts_to_us.col_Sand_carry" class="text-center f16b">
                            <v-text-field v-model="search.Sand_carry" @keyup="search_debts" outlined dense prepend-inner-icon="mdi-magnify"/>
                        </th>
                        <th v-if="$store.state.ui_user.debts_to_us.col_cost_phone" class="text-center f16b">
                            <v-text-field v-model="search.cost_phone" @keyup="search_debts" outlined dense prepend-inner-icon="mdi-magnify"/>
                        </th>
                        <th v-if="$store.state.ui_user.debts_to_us.col_brig_name" class="text-center f16b">
                            <v-text-field v-model="search.brig_name" @keyup="search_debts" outlined dense prepend-inner-icon="mdi-magnify"/>
                        </th>
                        <th v-if="$store.state.ui_user.debts_to_us.col_Sand_dateto" class="text-center f16b">
                            <v-text-field  v-model="search.Sand_dateto" @keyup="search_debts" outlined dense prepend-inner-icon="mdi-magnify"/>
                        </th>
                        <th v-if="$store.state.ui_user.debts_to_us.col_Sand_nextdate" class="text-center f16b">
                            <v-text-field  v-model="search.Sand_nextdate" @keyup="search_debts" outlined dense prepend-inner-icon="mdi-magnify"/>
                        </th>


                    </tr>

                    </thead>
                    <tbody>
                    <tr v-for="(item,i) in pageOfItems" :key="'debt_to_us_'+i" >
                        <td class="text-center f16">{{debts_to_us.indexOf(item)+1}}</td>
                        <td class="text-center f16">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn @click="set_debt_to_payoff(item)" v-bind="attrs" v-on="on" max-height="30" max-width="30" fab small color="primary">
                                        <v-icon>mdi-plus</v-icon>
                                    </v-btn>
                                </template>
                                <span>تسديد</span>
                            </v-tooltip>

                        </td>

                        <td v-if="$store.state.ui_user.debts_to_us.col_cost_name"  class="text-center f16">{{item.cost_name}}+</td>
                        <td v-if="$store.state.ui_user.debts_to_us.col_cost_user"  class="text-center f16">{{item.cost_user}}</td>
                        <td v-if="$store.state.ui_user.debts_to_us.col_Sand_carry"  class="text-center f16">{{item.Sand_carry | remove00}}</td>
                        <td v-if="$store.state.ui_user.debts_to_us.col_cost_phone"  class="text-center f16">{{item.cost_phone}}</td>
                        <td v-if="$store.state.ui_user.debts_to_us.col_brig_name"  class="text-center f16">{{item.brig_name}}</td>
                        <td v-if="$store.state.ui_user.debts_to_us.col_Sand_dateto"  class="text-center f16">{{item.Sand_dateto | datesubfilter}}</td>
                        <td v-if="$store.state.ui_user.debts_to_us.col_Sand_nextdate"  class="text-center f16">{{item.Sand_nextdate | datesubfilter}}</td>


                    </tr>


                    </tbody>
                </template>
            </v-simple-table>
        </v-card-text>
        <v-divider/>
        <v-card elevation="1" class="f14 text-center pa-4">
            <jw-pagination :pageSize="15" :maxPages="$vuetify.breakpoint.xs?1:10"  :items="debts_to_us" :labels="customLabels" :styles="customStyles" @changePage="onChangePage"></jw-pagination>
        </v-card>
        <PayOff/>
    </v-card>
</template>

<script>
    import PayOff from "@/components/Customers/PayOff";
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
    export default {
        name: "DebtsToUs",
        filters:{
            money_iq:function(value){
                if(value != null || value != 0 || value !=undefined)
                {
                    value = Math.trunc(value);
                    return value.toLocaleString('en-IQ')
                }
            },
            remove00:function(value)
            {
                if(value != null && value != "" && value != undefined)
                {
                    return Math.trunc(value);
                }
            },
            datesubfilter:function (value) {
                if(value != null && value != '' && value != undefined && value !='NaN' && value !="-")
                {
                    return moment(value).format('YYYY-MM-DD')
                }
            },
        },
        components:{
            JwPagination,
            PayOff
        },
        data(){
            return{
                debts_to_us:this.$store.state.debts.debts_to_us,
                loading:false,
                customLabels,
                customStyles,
                pageOfItems: [],
                search:{
                    cost_name:'',
                    cost_user:'',
                    brig_name:'',
                    Sand_dateto:'',
                    Sand_nextdate:'',
                    Sand_carry:'',
                    cost_phone:''
                },
                sum_money:0,
                count_debts:0
            }
        },
        methods:{
            set_debt_to_payoff(item)
            {
                this.$store.state.customers.target = item;
                this.$store.state.customers.forms.payoff = true;
            },
            onChangePage(pageOfItems) {
                // update page of items
                this.pageOfItems = pageOfItems;
            },
            async save_ui_debts_to_us()
            {
                console.log(this.$store.state.ui_user)
                this.loading = true;
                await this.$axios.post('api/save-ui-debts-to-us',this.$store.state.ui_user.debts_to_us).then(res=>{

                    this.$fire({
                        title: "نجح",
                        text: res.data.msg,
                        type: "success",
                        timer: 2000
                    });

                    this.$store.commit("GET_UI_DEBTS_TO_US");
                }).catch(err=>{
                    console.log(err)
                }).finally(fin=>{
                    this.loading = false
                })
            },
            search_debts()
            {
                var filterd = this.$store.state.debts.debts_to_us;
                filterd = filterd.map(x=>{
                    if(x.Sand_dateto == null)
                    {
                        x.Sand_dateto = '';
                    }
                    if(x.Sand_nextdate == null)
                    {
                        x.Sand_nextdate = '';
                    }

                    if(x.Sand_carry == null)
                    {
                        x.Sand_carry = '';
                    }
                    return x;

                });
                filterd = filterd.filter(item=>item.cost_name.match(this.search.cost_name));
                filterd = filterd.filter(item=>item.cost_user.match(this.search.cost_user));
                filterd = filterd.filter(item=>item.cost_phone.match(this.search.cost_phone));
                filterd = filterd.filter(item=>item.brig_name.match(this.search.brig_name));
                filterd = filterd.filter(item=>item.Sand_dateto.match(this.search.Sand_dateto));
                filterd = filterd.filter(item=>item.Sand_nextdate.match(this.search.Sand_nextdate));

                if(this.search.Sand_carry != null && this.search.Sand_carry !="" && this.search.Sand_carry != undefined)
                {

                    filterd = filterd.filter(item=>item.Sand_carry==this.search.Sand_carry);
                }
                this.sum_money = 0 ;
                var debts = filterd.map(x=>{
                    this.sum_money += parseFloat(x.Sand_carry);
                });
                this.debts_to_us = filterd;
            }
        },
        computed:{
            get_debts_to_us:function () {
                return this.$store.state.debts.debts_to_us;
            }
        },
        watch:{
            get_debts_to_us:function (new_debts) {
                this.debts_to_us = new_debts;
                this.sum_money = 0 ;
                var debts = new_debts.map(x=>{
                    this.sum_money += parseFloat(x.Sand_carry);

                });
                this.count_debts = new_debts.length;
            }
        },
        created(){
            this.$store.commit("GET_DEBTS_TO_US");
        }

    }
</script>

<style scoped>

</style>