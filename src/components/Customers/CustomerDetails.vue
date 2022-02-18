<template>

    <v-dialog max-width="850" class="pa-0 ma-0 " v-model="$store.state.customers.forms.details">
            <v-form class="ma-0 pa-0 overflow-x-hidden" lazy-validation v-model="valid" ref="form">

                <v-card :loading="loading" elevation="6"  width="100%" class="ma-0 ma-md-auto pa-0">

                    <v-card-title :class="remaining_days>0?'cardtitle':'error'"  style="direction: rtl;color: white">
                        <v-btn icon @click="$store.state.customers.forms.details=false">
                            <v-icon large color="white">mdi-close</v-icon>
                        </v-btn>
                        <span class="mr-2 f16">تفاصيل مشترك</span>
                    </v-card-title>
                    <v-divider />
                    <v-card-text class="pa-0 ma-0" style="position: relative">
                        <div v-if="loading" class="d-flex" style="width: 100%;height: 100%;position: absolute;background-color: white;z-index: 9999">
                            <v-progress-circular
                                    class="align-self-center ma-auto"
                                    indeterminate
                                    size="64"
                                    color="primary"
                            ></v-progress-circular>

                        </div>
                        <v-row justify="center">
                            <v-col cols="12" md="2">
                                <v-card-text>
                                    <div  style="width: 100%">
                                        <v-btn @click="$store.state.customers.forms.active=true" :width="$vuetify.breakpoint.xs?60:80" color="success" dark class="f14 mr-1 mr-md-2 mt-md-2">تفعيل</v-btn>
                                        <v-btn @click="$store.state.customers.forms.payoff=true" :width="$vuetify.breakpoint.xs?60:80" color="primary" dark class="f14 mr-1 mr-md-2 mt-md-2">تسديد</v-btn>
                                        <v-btn @click="$store.state.customers.forms.debt=true" :width="$vuetify.breakpoint.xs?60:80" color="error" dark class="f14 mr-1 mr-md-2 mt-md-2">دين</v-btn>
                                        <v-btn @click="$store.state.customers.forms.history=true" :width="$vuetify.breakpoint.xs?60:80" color="indigo" dark class="f14 mr-1 mr-md-2 mt-md-2">سجل </v-btn>
                                    </div>

                                </v-card-text>
                                <v-divider v-if="$vuetify.breakpoint.xs" />
                            </v-col>
                            <v-divider v-if="!$vuetify.breakpoint.xs" vertical/>
                            <v-col cols="12" md="10">
                                <v-card-text>
                                    <v-row  class="ma-0">
                                        <v-col cols="12">
                                            <p class="f16b">
                                                {{cost_name}}
                                            </p>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <v-text-field readonly v-model="card_name"  outlined label="نوع الاشتراك" prepend-inner-icon="mdi-credit-card"/>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <v-text-field readonly v-model="remaining_days" outlined label="الايام المتبقية"   :prepend-inner-icon="remaining_days>0?'mdi-check':'mdi-close'"/>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <v-text-field readonly v-model="Sand_dateto" outlined label="تاريخ الانتهاء" prepend-inner-icon="mdi-update"/>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <v-text-field-money :properties="{outlined:true,readonly:true}" :options="{precision:0}" v-model="debts"  label="الديون السابقة" prepend-inner-icon="mdi-cash"/>
                                        </v-col>


                                    </v-row>

                                </v-card-text>
                            </v-col>
                        </v-row>
                    </v-card-text>



                    <v-divider/>
                    <v-card-actions style="direction: rtl">
                        <v-btn  color="primary" large @click="$store.state.customers.forms.details=false">
                            <v-icon>mdi-close</v-icon>
                            <span class="f16 pa-2">غلق</span>
                        </v-btn>
                        <v-btn dark color="orange" large @click="$store.state.customers.forms.details=false">
                            <v-icon>mdi-pencil</v-icon>
                            <span class="f16 pa-2">تعديل</span>
                        </v-btn>
                        <v-btn dark  color="error" large >
                            <v-icon>mdi-delete</v-icon>
                            <span class="f16 pa-2">حذف</span>
                        </v-btn>

                    </v-card-actions>

                </v-card>
            </v-form>
            <ActiveNet/>
            <PayOff/>
            <AddDebt/>
            <History/>
        </v-dialog>

</template>

<script>
    import ActiveNet from "@/components/Customers/ActiveNet";
    import PayOff from "@/components/Customers/PayOff";
    import AddDebt from "@/components/Customers/AddDebt";
    import History from "@/components/Customers/History";
    import moment from 'moment'

    export default {
        name: "CustomerDetails",
        components:{
            ActiveNet,
            PayOff,
            AddDebt,
            History
        },
        data(){
            return{
                valid:true,
                loading:false,
                cost_name:'',
                card_name:'',
                Sand_dateto:'',
                remaining_days:0,
                debts:0
            }
        },
        methods:{
            async get_customer_details()
            {
                this.loading = true;
                var id = this.$store.state.customers.target.cost_id;
                this.$axios.post('api/get-customer-details',{cost_id:id}).then(res=>{
                    this.$store.state.customers.target_active = res.data[0];
                    this.cost_name = res.data[0].cost_name +" / " + res.data[0].cost_user;
                    this.card_name = res.data[0].card_name;
                    if(parseInt(res.data[0].remaining_days) < 1)
                    {
                        this.remaining_days = 0;
                    }else{
                        this.remaining_days = parseInt(res.data[0].remaining_days);
                    }
                    if(res.data[0].remaining_days == null)
                    {
                        this.remaining_days = 0;
                    }

                    this.debts = res.data[0].remaining_money;
                    if(this.Sand_dateto != null || this.Sand_dateto !='' )
                    {
                        if(res.data[0].Sand_dateto != null && res.data[0].Sand_dateto !="" && res.data[0].Sand_dateto !=undefined)
                        {
                            this.Sand_dateto = moment(res.data[0].Sand_dateto).format('YYYY-MM-DD hh:mm A');
                            this.$store.state.customers.sand_dateto_from_db = res.data[0].Sand_dateto;
                            this.$store.state.customers.target_active = res.data[0];
                        }else{
                            this.Sand_dateto="";
                        }


                    }
                }).catch(err=>{
                    console.log(err)
                }).finally(fin=>{
                    this.loading = false;

                })
            },
        },
        computed:{
            get_customer_details2() {
                return this.$store.state.customers.forms.details;
            }
        },
        watch:{
            get_customer_details2(new_customer) {
                if(new_customer)
                {
                    this.get_customer_details();
                }

            }
        }
    }
</script>

<style scoped>


</style>