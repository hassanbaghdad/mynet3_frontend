<template>

        <v-dialog max-width="800" class="pa-0 ma-9" v-model="$store.state.customers.forms.add_customer">
            <v-form lazy-validation v-model="valid" ref="form">
                        <v-card :loading="loading" elevation="6"  max-width="800" class="ma-auto">
                            <v-card-title class="cardtitle"  style="direction: rtl;color: white">
                                <v-icon large color="white">mdi-account-plus</v-icon>
                                <span class="mr-2 f16">اضافة مشترك</span>
                                <v-spacer/>
                                <v-btn icon @click="$store.state.customers.forms.add_customer=false">
                                    <v-icon large color="white">mdi-close</v-icon>
                                </v-btn>
                            </v-card-title>
                            <v-divider />
                            <v-card-text>
                                <v-row  class="ma-0">
                                    <v-col cols="12" md="6">
                                        <v-text-field v-model="customer.cost_name" :rules="req" outlined label="اسم المشترك" prepend-inner-icon="mdi-information"/>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-text-field v-model="customer.cost_user" :rules="req" outlined label="اليوزر" prepend-inner-icon="mdi-account"/>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-text-field v-model="customer.cost_pass" :rules="req" outlined label="باسوورد" prepend-inner-icon="mdi-lock"/>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-select :items="towers" item-text="label" item-value="value" v-model="customer.cost_bregFk" :rules="req" outlined label="البرج" prepend-inner-icon="mdi-eiffel-tower"/>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-text-field v-model="customer.cost_address" :rules="req" outlined label="العنوان"  prepend-inner-icon="mdi-home"/>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-text-field v-model="customer.cost_phone" :rules="req" outlined label="الهاتف" prepend-inner-icon="mdi-phone"/>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-text-field v-model="customer.cost_secter" :rules="req" outlined label="السكتر" prepend-inner-icon="mdi-camera-metering-spot"/>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-select :items="notifications" item-value="value" item-text="label" v-model="customer.cost_sms" :rules="req" outlined label="طريقة التنبيه" prepend-inner-icon="mdi-bell-ring"/>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-text-field v-model="customer.cost_userNano" :rules="req" outlined label="يوزر النانو" prepend-inner-icon="mdi-account"/>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-text-field v-model="customer.cost_passNano" :rules="req" outlined label="باسورد النانو" prepend-inner-icon="mdi-lock"/>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-text-field v-model="customer.cost_ipNano" :rules="req" outlined label="IP" prepend-inner-icon="mdi-ip"/>
                                    </v-col>

                                </v-row>

                            </v-card-text>
                            <v-divider/>
                            <v-card-actions style="direction: rtl">
                                <v-btn :loading="loading" @click="add_customer"  color="primary" large>
                                    <v-icon>mdi-key</v-icon>
                                    <span class="f16 pa-2">حفظ</span>
                                </v-btn>

                            </v-card-actions>

                        </v-card>
            </v-form>

        </v-dialog>


</template>

<script>
    export default {
        name: "AddCustomer",
        data(){
            return{
                show:false,
                loading:false,
                valid:true,
                req:[v=>!!v || 'لايمكن ترك الحقل فارغاً'],
                customer:{
                    cost_name:'',
                    cost_user:'',
                    cost_pass:'',
                    cost_phone:'',
                    cost_address:'',
                    cost_secter:'',
                    cost_sms:'',
                    cost_userNano:'',
                    cost_passNano:'',
                    cost_ipNano:'',
                    cost_bregFk:'',
                },
                towers:[
                    {label:'Earthlink',value:1},
                    {label:'Telecom',value:2},
                    {label:'Jazera',value:3},
                ],
                notifications:[
                    {label:'sms',value:1},
                    {label:'whatsapp',value:2},
                    {label:'بدون تنبيه',value:3},
                ],

            }
        },
        methods:{
            async add_customer(){
                if(this.$refs.form.validate())
                {
                    this.loading = true;
                    await this.$axios.post('api/add-customer',this.customer).then(res=>{
                        this.$fire({
                            title: "نجح",
                            text: res.data.msg,
                            type: "success",
                            timer: 2000
                        });
                        this.$refs.form.reset();
                        this.$store.state.customers.forms.add_customer = false;
                        this.$store.commit("GET_CUSTOMERS")
                    }).catch(err=>{
                        console.log(err)
                    }).finally(fin=>{
                        this.loading = false;
                    })
                }
            }
        }
    }
</script>

<style >
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@700&display=swap');

    .f16{
        font-size: 16px !important;
        font-family: 'Cairo', sans-serif !Important;
    }

    .v-label{
        font-size: 20px !important;
        font-family: 'Cairo', sans-serif !Important;

        line-height: 15px !important;
    }

    input{
        font-size: 18px !important;
        text-align: center !important;
        font-family: 'Cairo', sans-serif !Important;
    }
    .v-select__selection{
        width: 100%;
        font-size: 16px !important;
        text-align: center !important;
        font-family: 'Cairo', sans-serif !Important;
    }
    .v-list-item__title
    {
        width: 100%;
        font-size: 16px !important;
        text-align: center !important;
        font-family: 'Cairo', sans-serif !Important;
    }
</style>