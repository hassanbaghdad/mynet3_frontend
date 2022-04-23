<template>
    <v-container>
        <v-card :loading="$store.state.loading">
            <v-card-title>
                <v-icon color="error">mdi-cash</v-icon>
                <span class="mr-2 f18">ديون شراء - لهم</span>
            </v-card-title>
            <v-divider/>
            <v-card-text>
                <v-simple-table style="direction: rtl;">
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th class="text-center f16">ت</th>
                            <th class="text-center f16">اسم الزبون</th>
                            <th class="text-center f16">يوزر الزبون</th>
                            <th class="text-center f16">هاتف الزبون</th>
                            <th class="text-center f16">اجمالي المبلغ</th>
                            <th class="text-center f16">الواصل</th>
                            <th class="text-center f16">المتبقي</th>
                        </tr>
                        <tr>
                            <th class="text-center f16">
                            </th>
                            <th class="text-center f16">
                                <v-text-field v-model="search.cost_name" @keyup="search_debt" outlined dense prepend-inner-icon="mdi-magnify"/>
                            </th>
                            <th class="text-center f16">
                                <v-text-field v-model="search.cost_user" @keyup="search_debt" outlined dense prepend-inner-icon="mdi-magnify"/>
                            </th>
                            <th class="text-center f16">
                                <v-text-field v-model="search.cost_phone" @keyup="search_debt" outlined dense prepend-inner-icon="mdi-magnify"/>
                            </th>
                            <th class="text-center f16">
                                <v-text-field v-model="search.fatora_total_my" @keyup="search_debt" outlined dense prepend-inner-icon="mdi-magnify"/>
                            </th>
                            <th class="text-center f16">
                                <v-text-field v-model="search.fatora_wasel_him" @keyup="search_debt" outlined dense prepend-inner-icon="mdi-magnify"/>
                            </th>
                            <th class="text-center f16"></th>
                        </tr>

                        </thead>
                        <tbody>
                        <tr v-for="item in pageOfItems" :key="item.cost_id">
                            <td class="text-center f16">{{debts.indexOf(item)+1}}</td>
                            <td class="text-center f16">{{item.cost_name}}</td>
                            <td class="text-center f16">{{item.cost_user}}</td>
                            <td class="text-center f16">{{item.cost_phone}}</td>
                            <td class="text-center f16">{{item.fatora_total_my | money_iq}}</td>
                            <td class="text-center f16">{{item.fatora_wasel_him |money_iq}}</td>
                            <td class="text-center f16">{{item.carry | money_iq}}</td>


                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-card-text>
            <v-divider/>
            <v-card>
                <v-simple-table>
                    <template v-slot:default>
                        <tbody>
                        <tr>
                            <th class="f16b text-center font-weight-bold">مجموع المبالغ</th>
                            <td class="f16b text-center font-weight-bold">{{sum_total | money_iq}}</td>
                            <th class="f16b text-center font-weight-bold">مجموع الواصل</th>
                            <td class="f16b text-center font-weight-bold">{{sum_wasel | money_iq}}</td>
                            <th class="f16b text-center font-weight-bold">مجموع المتبقي</th>
                            <td class="f16b text-center font-weight-bold">{{sum_carry | money_iq}}</td>

                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-card>
            <v-divider/>
            <v-card elevation="1" class="f14 text-center pa-4">
                <jw-pagination :pageSize="15" :maxPages="$vuetify.breakpoint.xs?1:10"  :items="debts" :labels="customLabels" :styles="customStyles" @changePage="onChangePage"></jw-pagination>
            </v-card>

        </v-card>
    </v-container>
</template>

<script>
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
        name: "FatoraDebtsUs",
        components: {
            JwPagination,
        },
        filters:{
            money_iq:function(value){
                if(value != null || value != 0 || value !=undefined)
                {
                    value = Math.trunc(value);
                    return value.toLocaleString('en-IQ')
                }
            },
        },
        data() {
            return {
                debts: this.$store.state.fatora_debts_to_them.debts,
                customLabels,
                customStyles,
                pageOfItems: [],
                search:{
                    cost_name:'',
                    cost_user:'',
                    cost_phone:'',
                    fatora_total_my:'',
                    fatora_wasel_him:''
                },
                sum_carry:0,
                sum_total:0,
                sum_wasel:0,
            }
        },
        methods: {
            onChangePage(pageOfItems) {
                // update page of items
                this.pageOfItems = pageOfItems;
            },
            search_debt()
            {
                var filtered = this.$store.state.fatora_debts_to_them.debts;

                filtered = filtered.map(x=>{
                    x.cost_name = this.if_null(x.cost_name);
                    x.cost_user = this.if_null(x.cost_user);
                    x.cost_phone = this.if_null(x.cost_phone);
                    x.fatora_total_my = this.if_null(x.fatora_total_my);
                    x.fatora_wasel_him= this.if_null(x.fatora_wasel_him);
                    x.carry= this.if_null(x.carry);

                    return x;
                });

                filtered = filtered.filter(item=>item.cost_name.match(this.search.cost_name));
                filtered = filtered.filter(item=>item.cost_user.match(this.search.cost_user));
                filtered = filtered.filter(item=>item.cost_phone.match(this.search.cost_phone));
                filtered = filtered.filter(item=>item.fatora_total_my.match(this.search.fatora_total_my));
                filtered = filtered.filter(item=>item.fatora_wasel_him.match(this.search.fatora_wasel_him));
                filtered = filtered.filter(item=>item.carry.match(this.search.carry));

                this.debts = filtered;
                this.sum_total = 0;
                this.sum_wasel = 0;
                this.sum_carry = 0;
                filtered.map(x=>{
                    if(x.fatora_total_my != null && x.fatora_total_my != "" && x.fatora_total_my != undefined)
                    {
                        this.sum_total += parseFloat(x.fatora_total_my);
                    }
                    if(x.fatora_wasel_him != null && x.fatora_wasel_him != "" && x.fatora_wasel_him != undefined)
                    {
                        this.sum_wasel += parseFloat(x.fatora_wasel_him);
                    }
                    if(x.carry != null && x.carry != "" && x.carry != undefined)
                    {
                        this.sum_carry += parseFloat(x.carry);
                    }

                });
            },
            if_null(col)
            {
                if(col == null || col == "" ||col == undefined)
                {
                    col = "";
                    return col;
                }
                return  col.toString();
            },
        },
        computed: {
            get_debts: function () {
                return this.$store.state.fatora_debts_to_them.debts;
            },

        },
        watch: {
            get_debts: function (new_debts) {
                this.debts = new_debts;
                var debts = this.$store.state.fatora_debts_to_them.debts;
                this.sum_total = 0;
                this.sum_wasel = 0;
                this.sum_carry = 0;
                debts.map(x=>{
                    if(x.fatora_total_my != null && x.fatora_total_my != "" && x.fatora_total_my != undefined)
                    {
                        this.sum_total += parseFloat(x.fatora_total_my);
                    }
                    if(x.fatora_wasel_him != null && x.fatora_wasel_him != "" && x.fatora_wasel_him != undefined)
                    {
                        this.sum_wasel += parseFloat(x.fatora_wasel_him);
                    }
                    if(x.carry != null && x.carry != "" && x.carry != undefined)
                    {
                        this.sum_carry += parseFloat(x.carry);
                    }

                });
            }
        },
        created() {
            this.$store.commit("GET_FATORA_DEBTS_TO_THEM");
        }

    }
</script>

<style scoped>

</style>