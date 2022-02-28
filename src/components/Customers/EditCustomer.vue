<template>

        <v-dialog max-width="800" class="pa-0 ma-9" v-model="$store.state.customers.forms.edit_customer">
            <v-form lazy-validation v-model="valid" ref="form">
                        <v-card :loading="loading" elevation="6"  max-width="800" class="ma-auto">
                            <v-card-title class="cardtitle"  style="direction: rtl;color: white">
                                <v-icon large color="white">mdi-account-edit</v-icon>
                                <span class="mr-2 f16">تغديل مشترك</span>
                                <v-spacer/>
                                <v-btn icon @click="$store.state.customers.forms.edit_customer=false">
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
                                        <v-select :items="towers" item-text="brig_name" item-value="brig_id" v-model="customer.cost_bregFk" :rules="req" outlined label="البرج" prepend-inner-icon="mdi-eiffel-tower"/>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-text-field v-model="customer.cost_address"  outlined label="العنوان"  prepend-inner-icon="mdi-home"/>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-text-field v-model="customer.cost_phone" :rules="req" outlined label="الهاتف" prepend-inner-icon="mdi-phone"/>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-text-field v-model="customer.cost_secter"  outlined label="السكتر" prepend-inner-icon="mdi-camera-metering-spot"/>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-select :items="notifications" item-value="value" item-text="label" v-model="customer.cost_sms"  outlined label="طريقة التنبيه" prepend-inner-icon="mdi-bell-ring"/>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-text-field v-model="customer.cost_userNano" outlined label="يوزر النانو" prepend-inner-icon="mdi-account"/>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-text-field v-model="customer.cost_passNano"  outlined label="باسورد النانو" prepend-inner-icon="mdi-lock"/>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-text-field v-model="customer.cost_ipNano"  outlined label="IP" prepend-inner-icon="mdi-ip"/>
                                    </v-col>

                                </v-row>

                            </v-card-text>
                            <v-divider/>
                            <v-card-actions style="direction: rtl">
                                <v-btn :loading="loading" @click="edit_customer"  color="primary" large>
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
                    cost_id:'',
                    cost_name:'',
                    cost_user:'',
                    cost_pass:'',
                    cost_phone:'',
                    cost_address:'',
                    cost_secter:'',
                    cost_sms:2,
                    cost_userNano:'',
                    cost_passNano:'',
                    cost_ipNano:'',
                    cost_bregFk:'',
                },
                towers:this.$store.state.towers.towers,
                notifications:[
                    {label:'sms',value:1},
                    {label:'whatsapp',value:2},
                    {label:'بدون تنبيه',value:3},
                ],

            }
        },
        methods:{

            async edit_customer(){
                if(this.$refs.form.validate())
                {
                    this.loading = true;
                    await this.$axios.post('api/edit-customer',this.customer).then(res=>{
                        this.$fire({
                            title: "نجح",
                            text: res.data.msg,
                            type: "success",
                            timer: 2000
                        });
                        this.$refs.form.reset();
                        this.$store.state.customers.forms.edit_customer = false;
                        this.$store.commit("GET_CUSTOMERS")
                    }).catch(err=>{
                        console.log(err)
                    }).finally(fin=>{
                        this.loading = false;
                    })
                }
            }
        },
        computed:{
            get_form:function () {
                return this.$store.state.customers.forms.edit_customer
            }
        },
        watch:{
            get_form:function (new_form) {
                if(new_form)
                {
                    this.customer = this.$store.state.customers.target;

                }

            }
        },

    }
</script>

<style >

</style>