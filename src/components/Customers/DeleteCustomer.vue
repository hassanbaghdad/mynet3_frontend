<template>

        <v-dialog max-width="300" class="pa-0 ma-9" v-model="$store.state.customers.forms.delete">

                        <v-card :loading="loading" elevation="6"  max-width="800" class="ma-auto">
                            <v-card-title class="error"  style="direction: rtl;color: white">
                                <v-icon large color="white">mdi-delete</v-icon>
                                <span class="mr-2 f16">حذف مشترك</span>
                                <v-spacer/>
                                <v-btn icon @click="$store.state.customers.forms.delete=false">
                                    <v-icon large color="white">mdi-close</v-icon>
                                </v-btn>
                            </v-card-title>
                            <v-divider />
                            <v-card-text class="pa-6">
                                <span class="f16 text-center">
                                    هل انت متأكد من حذف المشترك
                                </span>
                                <p class="f16b text-center">
                                    {{customer.cost_name}}
                                </p>
                                <p class="f16b text-center">
                                    {{customer.cost_user}}
                                </p>
                                <p class="f16b text-center">
                                   ؟
                                </p>

                            </v-card-text>
                            <v-divider/>
                            <v-card-actions style="direction: rtl">
                                <v-btn :loading="loading" @click="delete_customer"  color="error" large>
                                    <v-icon>mdi-delete</v-icon>
                                    <span class="f16 pa-2">حذف</span>
                                </v-btn>

                            </v-card-actions>

                        </v-card>


        </v-dialog>


</template>

<script>
    export default {
        name: "DeleteCustomer",
        data(){
            return{
                show:false,
                loading:false,
                customer:{
                    cost_id:'',
                    cost_name:'',
                    cost_user:''
                },


            }
        },
        methods:{

            async delete_customer(){
                    this.loading = true;
                    await this.$axios.post('api/delete-customer',this.customer).then(res=>{
                        this.$fire({
                            title: "نجح",
                            text: res.data.msg,
                            type: "success",
                            timer: 2000
                        });
                        this.$store.state.customers.forms.delete = false;
                        this.$store.commit("GET_CUSTOMERS")
                    }).catch(err=>{
                        console.log(err)
                    }).finally(fin=>{
                        this.loading = false;
                    })
            }
        },
        computed:{
            get_form:function () {
                return this.$store.state.customers.forms.delete
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