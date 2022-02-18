<template>
    <v-dialog max-width="800" class="pa-0 ma-9" v-model="$store.state.customers.forms.payoff">
        <v-form lazy-validation v-model="valid" ref="form">
            <v-card :loading="loading" elevation="6"  max-width="800" class="ma-auto">
                <v-card-title class="primary"  style="direction: rtl;color: white">
                    <v-btn icon @click="$store.state.customers.forms.payoff=false">
                        <v-icon large color="white">mdi-close</v-icon>
                    </v-btn>
                    <span class="mr-2 f18">تسديد ديون</span>

                </v-card-title>
                <v-divider />
                <v-card-text style="position: relative">
                    <div v-if="loading" class="d-flex" style="width: 100%;height: 100%;position: absolute;background-color: white;z-index: 9999">
                        <v-progress-circular
                                class="align-self-center ma-auto"
                                indeterminate
                                size="64"
                                color="primary"
                        ></v-progress-circular>

                    </div>
                    <v-row  class="ma-0">
                        <v-col cols="12">
                            <p class="f16b">
                                {{customer.cost_name}} / {{customer.cost_user}}
                            </p>
                            <v-divider/>
                        </v-col>
                        <v-col cols="12" md="6">
                        <v-sheet class="pa-1" outlined  label="تاريخ الانتهاء" prepend-inner-icon="mdi-calendar-month-outline">
                            <p class="f16">تاريخ الاستلام</p>
                            <v-divider/>
                            <input  v-model="customer.sand_date" style="border: 0px;width: 100%" type="date">
                        </v-sheet>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field-money  @keyup="calc" @input="calc"  :properties="{outlined:true,readonly:true}" :options="{precision:0}" v-model="customer.debts" outlined label="الديون السابقة" prepend-inner-icon="mdi-cash"/>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field-money  @keyup="calc" @input="calc"   :properties="{outlined:true}" :options="{precision:0}" v-model="customer.sand_moneyin" outlined label="الواصل" prepend-inner-icon="mdi-cash"/>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field-money  @keyup="calc" @input="calc"  :properties="{outlined:true,readonly:true}" :options="{precision:0}" v-model="customer.remaining_money" outlined label="المتبقي" prepend-inner-icon="mdi-cash"/>
                        </v-col>

                        <v-col cols="12">
                            <v-textarea v-model="customer.sand_notes" height="80" outlined label="الملاحظات" prepend-inner-icon="mdi-information"/>
                        </v-col>

                    </v-row>

                </v-card-text>
                <v-divider/>
                <v-card-actions style="direction: rtl">
                    <v-btn @click="pay_off" color="primary" large>
                        <v-icon>mdi-check</v-icon>
                        <span class="f16 pa-2">حفظ</span>
                    </v-btn>

                </v-card-actions>

            </v-card>
        </v-form>

    </v-dialog>
</template>

<script>
    import moment from "moment";

    export default {
        name: "PayOff",
        data(){
            return{
                valid:true,
                loading:false,
                customer:{
                    cost_id:this.$store.state.customers.target.cost_id,
                    cost_name:'',
                    cost_user:'',
                    debts:0,
                    sand_date:'',
                    sand_money:0,
                    sand_moneyin:0,
                    sand_notes:'',
                    remaining_money:0
                },
                req_no:[v=>!!v || "يرجى ادخال المبلغ   "],
            }
        },
        methods:{
            calc(){
                if(this.customer.sand_money=='' || this.customer.sand_money==null)
                {
                    this.customer.sand_money=0;
                }
                if(this.customer.sand_moneyin==''|| this.customer.sand_moneyin==null)
                {
                    this.customer.sand_moneyin=0;
                }

                this.customer.remaining_money = parseFloat(this.customer.sand_money)-parseFloat(this.customer.sand_moneyin) + parseFloat(this.customer.debts)
                console.log( this.customer.remaining_money)
            },
            async get_customer_debts()
            {
                this.loading = true;
                await  this.$axios.post('api/get-customer-debts',{cost_id:this.customer.cost_id}).then(res=>{
                    this.customer.cost_name = res.data[0].cost_name;
                    this.customer.cost_user = res.data[0].cost_user;
                    if(res.data[0].debts != null && res.data[0].debts !="" && res.data[0].debts !=undefined)
                    {
                        this.customer.debts =parseFloat(res.data[0].debts);
                    }
                    if(res.data[0].debts != null && res.data[0].debts !="" && res.data[0].debts !=undefined)
                    {
                        this.customer.remaining_money = parseFloat(res.data[0].debts);
                    }
                }).catch(err=>{
                    console.log(err)
                }).finally(fin=>{
                    this.loading = false;
                })
            },
            async pay_off()
            {
                if(this.$refs.form.validate())
                {
                    this.loading = true;
                    if(this.customer.sand_date =='')
                    {
                        this.customer.sand_date = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
                    }else{
                        this.customer.sand_date = moment(this.customer.sand_date).format('YYYY-MM-DD hh:mm:ss');
                    }

                    await  this.$axios.post('api/pay-off',this.customer).then(res=>{
                        this.$fire({
                            title: "نجح",
                            text: res.data.msg,
                            type: "success",
                            timer: 2000
                        });
                        this.$store.state.customers.forms.payoff = false;
                        this.$store.state.customers.forms.details = false;
                        this.$refs.form.reset();
                    }).catch(err=>{
                        console.log(err)
                    }).finally(fin=>{
                        this.loading = false;
                    })
                }
            }
        },
        computed:{
            customer2:function () {
                return this.$store.state.customers.target;
            },
            customer_form:function () {
                return this.$store.state.customers.forms.payoff;
            },

        },
        watch:{
            customer2:function (new_customer) {

                this.customer.cost_id = new_customer.cost_id;

            },
            customer_form:function (new_form) {
                if(new_form)
                {
                    this.get_customer_debts()
                }
            },

        },
    }
</script>

<style scoped>

</style>