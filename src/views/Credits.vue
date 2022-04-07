<template>
    <v-card class="pa-0" elevation="1" :loading="$store.state.loading">
        <v-card-title class="ma-0 pa-0">
            <v-toolbar elevation="0" class="ma-0 pa-0">
                <v-icon large>mdi-file-sign</v-icon>
                <span class="f20b mr-2">ارصدة الوكلاء </span>

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
                                <v-checkbox class="ma-0 pa-0" label="رقم الوصل" v-model="$store.state.ui_user.credits.col_Sand_id"/>
                            </v-list-item>
                            <v-list-item>
                                <v-checkbox class="ma-0 pa-0"  label="نوع الوصل" v-model="$store.state.ui_user.credits.col_tree_name"/>
                            </v-list-item>
                            <v-list-item>
                                <v-checkbox class="ma-0 pa-0"  label="اسم الوكيل" v-model="$store.state.ui_user.credits.col_brig_name"/>
                            </v-list-item>
                            <v-list-item>
                                <v-checkbox class="ma-0 pa-0"  label="يوزر الوكيل" v-model="$store.state.ui_user.credits.col_userAflet"/>
                            </v-list-item>
                            <v-list-item>
                                <v-checkbox class="ma-0 pa-0"  label="العملة" v-model="$store.state.ui_user.credits.col_currency"/>
                            </v-list-item>
                            <v-list-item>
                                <v-checkbox class="ma-0 pa-0"  label="المبلغ" v-model="$store.state.ui_user.credits.col_Sand_money"/>
                            </v-list-item>
                            <v-list-item>
                                <v-checkbox class="ma-0 pa-0"  label="المبلغ الواصل" v-model="$store.state.ui_user.credits.col_Sand_moneyin"/>
                            </v-list-item>
                            <v-list-item>
                                <v-checkbox class="ma-0 pa-0"  label="سعر التكلفة" v-model="$store.state.ui_user.credits.col_cost_price"/>
                            </v-list-item>
                            <v-list-item>
                                <v-checkbox class="ma-0 pa-0"  label="الربح" v-model="$store.state.ui_user.credits.col_gain"/>
                            </v-list-item>
                            <v-list-item>
                                <v-checkbox class="ma-0 pa-0"  label="التاريخ" v-model="$store.state.ui_user.credits.col_Sand_date"/>
                            </v-list-item>
                            <v-list-item>
                                <v-checkbox class="ma-0 pa-0"  label="الوصف" v-model="$store.state.ui_user.credits.col_sand_desc"/>
                            </v-list-item>
                            <v-list-item>
                                <v-checkbox class="ma-0 pa-0"  label="الملاحظات" v-model="$store.state.ui_user.credits.col_Sand_notes"/>
                            </v-list-item>
                            <v-list-item>
                                <v-checkbox class="ma-0 pa-0"  label="طريقة الاستلام" v-model="$store.state.ui_user.credits.col_Sand_operation"/>
                            </v-list-item>
                            <v-list-item>
                                <v-checkbox class="ma-0 pa-0"  label="مدخل البيانات" v-model="$store.state.ui_user.credits.col_sand_user"/>
                            </v-list-item>



                            <v-list-item>
                                <v-btn block @click="save_ui_credits" :loading="loading" color="primary">
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
                    <input v-model="search.from_date" @change="search_credit" type="date" style="border: 1px solid black;width: 75%"/>
                </v-col>
                <v-col cols="12" lg="3">
                    <span class="f16 ml-2">الى تاريخ:</span>
                    <input v-model="search.to_date"  @change="search_credit" type="date" style="border: 1px solid black;width: 75%"/>
                </v-col>
                <v-col cols="12" lg="3">
                    <div style="width: 96%;">
                        <v-select v-model="currency" @change="chang_currency" :items="money_types" item-text="value" item-value="value"  dense outlined label="نوع العملة"></v-select>
                    </div>

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
                        <th v-if="$store.state.ui_user.credits.col_Sand_id" class="text-center f16b">رقم الوصل</th>
                        <th v-if="$store.state.ui_user.credits.col_tree_name" class="text-center f16b">نوع الوصل</th>
                        <th v-if="$store.state.ui_user.credits.col_brig_name" class="text-center f16b">اسم الوكيل</th>
                        <th v-if="$store.state.ui_user.credits.col_userAflet" class="text-center f16b">يوزر الوكيل</th>
                        <th v-if="$store.state.ui_user.credits.col_currency" class="text-center f16b">العملة</th>
                        <th v-if="$store.state.ui_user.credits.col_Sand_money" class="text-center f16b">المبلغ</th>
                        <th v-if="$store.state.ui_user.credits.col_Sand_moneyin" class="text-center f16b">المبلغ الواصل</th>
                        <th v-if="$store.state.ui_user.credits.col_cost_price" class="text-center f16b">سعر التكلفة</th>
                        <th v-if="$store.state.ui_user.credits.col_gain" class="text-center f16b">الربح</th>
                        <th v-if="$store.state.ui_user.credits.col_Sand_date" class="text-center f16b">التاريخ</th>
                        <th v-if="$store.state.ui_user.credits.col_sand_desc" class="text-center f16b">الوصف</th>
                        <th v-if="$store.state.ui_user.credits.col_Sand_notes" class="text-center f16b">الملاحظات</th>
                        <th v-if="$store.state.ui_user.credits.col_Sand_operation" class="text-center f16b">طريقة الاستلام</th>
                        <th v-if="$store.state.ui_user.credits.col_sand_user" class="text-center f16b">مدخل البيانات</th>


                    </tr>
                    <tr>
                        <th></th>
                        <th v-if="$store.state.ui_user.credits.col_Sand_id" class="text-center f16b">
                            <v-text-field v-model="search.Sand_id" @keyup="search_credit" outlined dense prepend-inner-icon="mdi-magnify"/>
                        </th>
                        <th v-if="$store.state.ui_user.credits.col_tree_name" class="text-center f16b">
                            <v-select :items="trees" item-value="value" item-text="value" v-model="search.tree_name" @change="search_credit" outlined dense prepend-inner-icon="mdi-magnify"/>
                        </th>
                        <th v-if="$store.state.ui_user.credits.col_tree_name" class="text-center f16b">
                            <v-text-field v-model="search.brig_name" @keyup="search_credit" outlined dense prepend-inner-icon="mdi-magnify"/>
                        </th>
                        <th v-if="$store.state.ui_user.credits.col_userAflet" class="text-center f16b">
                            <v-text-field v-model="search.brig_userAflet" @keyup="search_credit" outlined dense prepend-inner-icon="mdi-magnify"/>
                        </th>
                        <th v-if="$store.state.ui_user.credits.col_currency"></th>
                        <th v-if="$store.state.ui_user.credits.col_Sand_money" class="text-center f16b">
                            <v-text-field v-model="search.Sand_money" @keyup="search_credit" outlined dense prepend-inner-icon="mdi-magnify"/>
                        </th>
                        <th v-if="$store.state.ui_user.credits.col_Sand_moneyin" class="text-center f16b">
                            <v-text-field v-model="search.Sand_moneyin" @keyup="search_credit" outlined dense prepend-inner-icon="mdi-magnify"/>
                        </th>
                        <th v-if="$store.state.ui_user.credits.col_cost_price" class="text-center f16b">
                            <v-text-field v-model="search.cost_price" @keyup="search_credit" outlined dense prepend-inner-icon="mdi-magnify"/>
                        </th>
                        <th v-if="$store.state.ui_user.credits.col_gain" class="text-center f16b">
                            <v-text-field v-model="search.gain" @keyup="search_credit" outlined dense prepend-inner-icon="mdi-magnify"/>
                        </th>
                        <th v-if="$store.state.ui_user.credits.col_Sand_date" class="text-center f16b">
                            <v-text-field v-model="search.Sand_date" @keyup="search_credit" outlined dense prepend-inner-icon="mdi-magnify"/>
                        </th>
                        <th v-if="$store.state.ui_user.credits.col_sand_desc" class="text-center f16b">
                            <v-text-field v-model="search.sand_desc" @keyup="search_credit" outlined dense prepend-inner-icon="mdi-magnify"/>
                        </th>
                        <th v-if="$store.state.ui_user.credits.col_Sand_notes" class="text-center f16b">
                            <v-text-field v-model="search.Sand_notes" @keyup="search_credit" outlined dense prepend-inner-icon="mdi-magnify"/>
                        </th>
                        <th v-if="$store.state.ui_user.credits.col_Sand_operation" class="text-center f16b">
                            <v-text-field v-model="search.Sand_operation" @keyup="search_credit" outlined dense prepend-inner-icon="mdi-magnify"/>
                        </th>
                        <th v-if="$store.state.ui_user.credits.col_sand_user" class="text-center f16b">
                            <v-text-field v-model="search.sand_user" @keyup="search_credit" outlined dense prepend-inner-icon="mdi-magnify"/>
                        </th>



                    </tr>

                    </thead>
                    <tbody>
                    <tr v-for="(item,i) in pageOfItems" :key="i" >
                        <td  class="text-center f16">{{credits.indexOf(item)+1}}</td>
                        <td v-if="$store.state.ui_user.credits.col_Sand_id" class="text-center f16">{{item.Sand_id}}</td>
                        <td v-if="$store.state.ui_user.credits.col_tree_name"  class="text-center f16 text-no-wrap">
                            <v-chip v-if="item.tree_name=='تسديد تحويل'" color="success">{{item.tree_name}}</v-chip>
                            <v-chip v-if="item.tree_name=='تحويل رصيد'" color="error">{{item.tree_name}}</v-chip>
                        </td>
                        <td v-if="$store.state.ui_user.credits.col_brig_name"  class="text-center f16">{{item.brig_name}}</td>
                        <td v-if="$store.state.ui_user.credits.col_userAflet" class="text-center f16">{{item.brig_userAflet}}</td>
                        <td v-if="$store.state.ui_user.credits.col_currency"  class="text-center f16">{{item.currency}}</td>
                        <td v-if="$store.state.ui_user.credits.col_Sand_money"  class="text-center f16">{{item.Sand_money | remove00}}</td>
                        <td v-if="$store.state.ui_user.credits.col_Sand_moneyin"  class="text-center f16">{{item.Sand_moneyin | remove00}}</td>
                        <td v-if="$store.state.ui_user.credits.col_cost_price"  class="text-center f16">{{item.cost_price | remove00}}</td>
                        <td v-if="$store.state.ui_user.credits.col_gain"  class="text-center f16">{{item.gain | remove00}}</td>
                        <td v-if="$store.state.ui_user.credits.col_Sand_date"  class="text-center f16"><div class="text-no-wrap">{{item.Sand_date | datesubfilter}}</div></td>
                        <td v-if="$store.state.ui_user.credits.col_sand_desc"  class="text-center f16">{{item.sand_desc}}</td>
                        <td v-if="$store.state.ui_user.credits.col_Sand_notes"  class="text-center f16">{{item.Sand_notes}}</td>
                        <td v-if="$store.state.ui_user.credits.col_Sand_operation"  class="text-center f16">{{item.Sand_operation}}</td>
                        <td v-if="$store.state.ui_user.credits.col_sand_user"  class="text-center f16">{{item.sand_user}}</td>



                    </tr>


                    </tbody>
                </template>
            </v-simple-table>
        </v-card-text>
        <v-divider/>
        <v-card elevation="1" class="f14 text-center pa-4">
            <jw-pagination :pageSize="15" :maxPages="$vuetify.breakpoint.xs?1:10"  :items="credits" :labels="customLabels" :styles="customStyles" @changePage="onChangePage"></jw-pagination>
        </v-card>
    </v-card>
</template>

<script>
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
        name: "Credits",
        components:{
            JwPagination
        },
        filters:{
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
        data()
        {
            return{
                credits:this.$store.state.credits.credits,
                loading:false,
                pageOfItems:[],
                customStyles,
                customLabels,
                currency:'دينار',
                search:{

                    Sand_id:'',
                    Sand_date:'',
                    Sand_money:'',
                    Sand_moneyin:'',
                    gain:'',
                    Sand_operation:'',
                    Sand_notes:'',
                    sand_user:'',
                    sand_desc:'',
                    cost_price:'',
                    brig_userAflet:'',
                    tree_name:'',
                    brig_name:'',
                    from_date:'',
                    to_date:''

                },
                money_types:[
                    {value:'دينار'},
                    {value:'دولار'},
                ],
                trees:[
                    {value:'الكل'},
                    {value:'تسديد تحويل'},
                    {value:'تحويل رصيد'},

                ]
            }
        },
        methods:{
            onChangePage(pageOfItems) {
                // update page of items
                this.pageOfItems = pageOfItems;
            },
            async save_ui_credits()
            {
                this.loading = true;
                await this.$axios.post('api/save-ui-credits',this.$store.state.ui_user.credits).then(res=>{

                    this.$fire({
                        title: "نجح",
                        text: res.data.msg,
                        type: "success",
                        timer: 2000
                    });

                    this.$store.commit("GET_UI_CREDITS");
                }).catch(err=>{
                    console.log(err)
                }).finally(fin=>{
                    this.loading = false
                })
            },
            chang_currency()
            {
                    this.$store.commit("GET_CREDITS",this.currency);

            },
            search_credit()
            {
                var filterd = this.$store.state.credits.credits;
                filterd = filterd.map(x=>{
                    x.Sand_date = moment(x.Sand_date).format('YYYY-MM-DD');
                    if(x.Sand_notes==null)
                    {
                        x.Sand_notes = "";
                    }
                    if(x.sand_desc==null)
                    {
                        x.sand_desc = "";
                    }

                    return x;
                });
                if(this.search.from_date != null && this.search.from_date != "" && this.search.from_date != undefined)
                {
                    filterd = filterd.filter(item=>item.Sand_date >= moment(this.search.from_date).format("YYYY-MM-DD"));
                }
                if(this.search.to_date != null && this.search.to_date != "" && this.search.to_date != undefined)
                {
                    filterd = filterd.filter(item=>item.Sand_date <= moment(this.search.to_date).format("YYYY-MM-DD"));
                }

                filterd = filterd.filter(item=>item.brig_name.match(this.search.brig_name));
                filterd = filterd.filter(item=>item.brig_userAflet.match(this.search.brig_userAflet));
                filterd = filterd.filter(item=>item.Sand_date.match(this.search.Sand_date));
                filterd = filterd.filter(item=>item.sand_desc.match(this.search.sand_desc));
                filterd = filterd.filter(item=>item.Sand_notes.match(this.search.Sand_notes));
                filterd = filterd.filter(item=>item.Sand_operation.match(this.search.Sand_operation));
                filterd = filterd.filter(item=>item.sand_user.match(this.search.sand_user));
                if(this.search.tree_name != "الكل")
                {
                    filterd = filterd.filter(item=>item.tree_name  == this.search.tree_name);
                }
                if(this.search.Sand_money != "" && this.search.Sand_money != null && this.search.Sand_money != undefined)
                {
                    filterd = filterd.filter(item=>item.Sand_money  == this.search.Sand_money);
                }
                if(this.search.Sand_moneyin != "" && this.search.Sand_moneyin != null && this.search.Sand_moneyin != undefined)
                {
                    filterd = filterd.filter(item=>item.Sand_moneyin  == this.search.Sand_moneyin);
                }
                if(this.search.cost_price != "" && this.search.cost_price != null && this.search.cost_price != undefined)
                {
                    filterd = filterd.filter(item=>item.cost_price  == this.search.cost_price);
                }
                if(this.search.gain != "" && this.search.gain != null && this.search.gain != undefined)
                {
                    filterd = filterd.filter(item=>item.gain  == this.search.gain);
                }

                this.credits = filterd;
            }
        },
        created(){
            this.$store.commit("GET_CREDITS","دينار");
        },
        computed:{
            get_credits:function () {
                return this.$store.state.credits.credits;
            }
        },
        watch:{
            get_credits:function (new_credits) {
                this.credits = new_credits;
            }
        },

    }
</script>

<style scoped>

</style>