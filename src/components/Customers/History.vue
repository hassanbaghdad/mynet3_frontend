<template>
    <v-dialog max-width="1300" class="pa-0 ma-9" v-model="$store.state.customers.forms.history">
            <v-card :loading="loading" elevation="6"  max-width="100%" class="ma-auto">
                <v-card-title class="indigo"  style="direction: rtl;color: white">
                    <v-btn icon @click="$store.state.customers.forms.history=false">
                        <v-icon large color="white">mdi-close</v-icon>
                    </v-btn>
                    <span class="mr-2 f18">سجل الوصولات</span>

                </v-card-title>
                <v-card-title class="f16b">
                    {{cost_name}}/{{cost_user}}
                </v-card-title>
                <v-divider />
                <v-card-text>
                    <v-simple-table style="direction: rtl">
                        <template v-slot:default>
                            <thead>
                            <tr>
                                <th class="text-center f16b">ت</th>
                                <th class="text-center f16b">رقم الوصل</th>
                                <th class="text-center f16b">تاريخ الوصل</th>
                                <th class="text-center f16b">نوع الوصل</th>
                                <th class="text-center f16b">مبلغ الوصل</th>
                                <th class="text-center f16b">الواصل</th>
                                <th class="text-center f16b">نوع الاشتراك</th>
                                <th class="text-center f16b">تاريخ الانتهاء</th>
                                <th class="text-center f16b">مسجل الوصل</th>
                                <th class="text-center f16b">طباعة</th>

                            </tr>
                            <tr>
                                <th></th>
                                <th class="text-center f16b">
                                    <v-text-field v-model="search.Sand_id" @keyup="search_sand" prepend-inner-icon="mdi-magnify"/>
                                </th>
                                <th class="text-center f16b">
                                    <v-text-field v-model="search.Sand_date" @keyup="search_sand" prepend-inner-icon="mdi-magnify"/>
                                </th>
                                <th class="text-center f16b">
                                    <v-select :items="SandTypes" item-value="value" item-text="label" v-model="search.Sand_moneyType" @change="search_sand" prepend-inner-icon="mdi-magnify"/>
                                </th>
                                <th class="text-center f16b">
                                    <v-text-field v-model="search.Sand_money" @keyup="search_sand" prepend-inner-icon="mdi-magnify"/>
                                </th>
                                <th class="text-center f16b">
                                    <v-text-field v-model="search.Sand_moneyin" @keyup="search_sand" prepend-inner-icon="mdi-magnify"/>
                                </th>
                                <th class="text-center f16b">
                                    <v-text-field v-model="search.Sand_cardtype" @keyup="search_sand" prepend-inner-icon="mdi-magnify"/>
                                </th>
                                <th class="text-center f16b">
                                    <v-text-field v-model="search.Sand_dateto" @keyup="search_sand" prepend-inner-icon="mdi-magnify"/>
                                </th>
                                <th class="text-center f16b">
                                    <v-text-field v-model="search.sand_user" @keyup="search_sand" prepend-inner-icon="mdi-magnify"/>
                                </th>
                                <th class="text-center f16b"></th>


                            </tr>

                            </thead>
                            <tbody>
                            <tr v-for="sand in pageOfItems" :key="sand.Sand_id" >
                                <td class="text-center f16">{{sands.indexOf(sand)+1}}</td>
                                <td class="text-center f16">{{sand.Sand_id}}</td>
                                <td style="width: 200px" class="text-center f16">{{sand.Sand_date | datefilter}}</td>
                                <td class="text-center f16">{{sand.Sand_moneyType | moneyType}}</td>
                                <td class="text-center f16">{{sand.Sand_money | money_iq}}</td>
                                <td class="text-center f16">{{sand.Sand_moneyin | money_iq}}</td>
                                <td class="text-center f16">{{sand.Sand_cardtype}}</td>
                                <td class="text-center f16">{{sand.Sand_dateto | datefilter}}</td>
                                <td class="text-center f16">{{sand.sand_user}}</td>
                                <td class="text-center f16">
                                    <v-btn @click="set_sand_to_print_view(sand)" icon>
                                        <v-icon large color="primary">mdi-printer</v-icon>
                                    </v-btn>
                                </td>

                            </tr>


                            </tbody>
                        </template>
                    </v-simple-table>
                </v-card-text>


            </v-card>
        <v-divider/>
        <v-card elevation="1" class="f14 text-center pa-4">
            <jw-pagination :pageSize="15" :maxPages="$vuetify.breakpoint.xs?1:10"  :items="sands" :labels="customLabels" :styles="customStyles" @changePage="onChangePage"></jw-pagination>
        </v-card>
        <PrintView/>
    </v-dialog>
</template>

<script>
    import moment from "moment";
    import JwPagination from 'jw-vue-pagination';
   import PrintView from "@/components/Customers/PrintView";
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
        name: "History",
        components:{
            JwPagination,
            PrintView

        },
        filters:{
            datefilter:function (value) {
                if(value != null && value != '' && value != undefined && value !='NaN')
                {
                    return moment(value).format('YYYY-MM-DD hh:mm A')
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

            },
            money_iq:function(value){
                if(value != null || value != 0 || value !=undefined)
                {
                    value = Math.trunc(value);
                    return value.toLocaleString('en-IQ')
                }
            },
        },
        data(){
            return{
                loading:false,
                cost_id:0,
                cost_name:'',
                cost_user:'',
                pageOfItems: [],
                customStyles,
                customLabels,
                sands:this.$store.state.customers.customer_sands,
                sands2:[],
                search:{
                    Sand_cardtype: '',
                    Sand_date:'',
                    Sand_dateto: '',
                    Sand_id:'',
                    Sand_money:'',
                    Sand_moneyType: '',
                    Sand_moneyin: '',
                    cost_name: '',
                    cost_user:'',
                    sand_user: '',
                },
                SandTypes:[
                    {label:'الكل',value:"الكل"},
                    {label:'تفعيل',value:1},
                    {label:'تسديد',value:2},
                    {label:'دين',value:6},
                ],
            }
        },
        methods:{
            async get_sands_customer()
            {

                    this.loading = true;

                    await  this.$axios.post('api/get-sands-customer',{cost_id:this.cost_id}).then(res=>{
                        this.$store.state.customers.customer_sands = res.data;
                    }).catch(err=>{
                        console.log(err)
                    }).finally(fin=>{
                        this.loading = false;
                    })

            },
            onChangePage(pageOfItems) {
                // update page of items
                this.pageOfItems = pageOfItems;
            },
            set_sand_to_print_view(sand)
            {
                this.$store.state.customers.target_sand = sand;
                this.$store.state.customers.forms.print_view = true;
            },
            search_sand(){
                var filtered = this.$store.state.customers.customer_sands;
                filtered = filtered.map(x=>{
                    if(x.Sand_moneyType != null && x.Sand_moneyType != "" && x.Sand_moneyType != undefined)
                    {
                        x.Sand_moneyType = x.Sand_moneyType.toString();
                    }
                    if(x.Sand_money != null && x.Sand_money != "" && x.Sand_money != undefined)
                    {
                        x.Sand_money = x.Sand_money.toString();
                    }
                    if(x.Sand_moneyin != null && x.Sand_moneyin != "" && x.Sand_moneyin != undefined)
                    {
                        x.Sand_moneyin = x.Sand_moneyin.toString();
                    }
                    if(x.Sand_cardtype == null || x.Sand_cardtype == undefined || x.Sand_cardtype == "")
                    {
                        x.Sand_cardtype = "";
                    }
                    return x;


                });
                if(this.search.Sand_id != "" && this.search.Sand_id != null && this.search.Sand_id != undefined )
                {
                    filtered = filtered.filter(item=>item.Sand_id==this.search.Sand_id);
                }
                if(this.search.Sand_date != null && this.search.Sand_date != "" && this.search.Sand_date != undefined)
                {
                    filtered = filtered.filter(item=>item.Sand_date.match(this.search.Sand_date));
                }
                if(this.search.Sand_money != null && this.search.Sand_money != "" && this.search.Sand_money != undefined)
                {
                    filtered = filtered.filter(item=>item.Sand_money.match(this.search.Sand_money));
                }
                if(this.search.Sand_moneyin != null && this.search.Sand_moneyin != "" && this.search.Sand_moneyin != undefined)
                {
                    filtered = filtered.filter(item=>item.Sand_moneyin.match(this.search.Sand_moneyin));
                }
                if(this.search.Sand_dateto != null && this.search.Sand_dateto != "" && this.search.Sand_dateto != undefined)
                {
                    filtered = filtered.filter(item=>item.Sand_dateto.match(this.search.Sand_dateto));
                }
                if(this.search.Sand_cardtype != null && this.search.Sand_cardtype != "" && this.search.Sand_cardtype != undefined)
                {
                    filtered = filtered.filter(item=>item.Sand_cardtype.match(this.search.Sand_cardtype));
                }
                if(this.search.sand_user != null && this.search.sand_user != "" && this.search.sand_user != undefined)
                {
                    filtered = filtered.filter(item=>item.sand_user.match(this.search.sand_user));
                }

                if(this.search.Sand_moneyType !="الكل" && this.search.Sand_moneyType != "" && this.search.Sand_moneyType !=null)
                {
                    filtered = filtered.filter(item=>item.Sand_moneyType ==this.search.Sand_moneyType);
                }


                this.sands = filtered;


            }
        },
        computed:{
            customer3:function () {
                return this.$store.state.customers.target;
            },
            customer_form3:function () {
                return this.$store.state.customers.forms.history;
            },
            get_sands:function () {
                return this.$store.state.customers.customer_sands
            },

        },
        watch:{
            customer3:function (new_customer) {



            },
            customer_form3:function (new_form) {
                if(new_form)
                {
                    var new_customer = this.$store.state.customers.target;
                    this.cost_id = new_customer.cost_id;
                    this.cost_name = new_customer.cost_name;
                    this.cost_user = new_customer.cost_user;
                    this.get_sands_customer()

                }
            },
            get_sands:function (new_sands) {
                this.sands = new_sands;
            },

        },
    }
</script>

<style scoped>

</style>