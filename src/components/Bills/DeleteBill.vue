<template>
    <v-dialog max-width="250" class="pa-0 ma-9" v-model="$store.state.bills.forms.delete_bill">
            <v-card :loading="loading" elevation="6"  max-width="800" class="ma-auto">
                <v-card-title class="error"  style="direction: rtl;color: white">
                    <v-icon large color="white">mdi-delete</v-icon>
                    <span class="mr-2 f16">حذف وصل</span>
                    <v-spacer/>
                    <v-btn icon @click="$store.state.bills.forms.delete_bill=false">
                        <v-icon large color="white">mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-divider />
                <v-card-text>
                   <div class="f18 pa-4 ma-4 text-center">
                       هل انت متأكد من حذف الوصل المرقم
                      <p class="f18b mt-4"> {{bill.Sand_id}}</p>
                      <p class="f18b mt-4"> ؟ </p>
                   </div>

                </v-card-text>
                <v-divider/>
                <v-card-actions style="direction: rtl">
                    <v-btn :loading="loading" @click="delete_bill"  color="error" large>
                        <v-icon>mdi-delete</v-icon>
                        <span class="f16 pa-2">حذف</span>
                    </v-btn>
                    <v-btn dark  @click="$store.state.bills.forms.delete_bill = false"  color="grey" large>
                        <v-icon>mdi-close</v-icon>
                        <span class="f16 pa-2">اللغاء</span>
                    </v-btn>


                </v-card-actions>

            </v-card>

    </v-dialog>
</template>

<script>
    export default {
        name: "DeleteBill",
        data(){
            return{
                loading:false,
                bill:this.$store.state.bills.target
            }
        },
        methods:{
            async delete_bill(){


                this.loading = true;
                this.$axios.post('api/delete-bill',{Sand_id:this.bill.Sand_id}).then(res=>{
                   this.$store.commit("GET_BILLS");
                   this.$store.state.bills.forms.delete_bill= false;
                }).catch(err=>{
                    console.log(err)
                }).finally(fin=>{
                    this.loading = false;
                })
            }
        },
        computed:{
            get_bill:function () {
                return this.$store.state.bills.target
            },
        },
        watch:{
            get_bill:function (new_card) {
                this.bill= new_card;
            },
        },

    }
</script>

<style scoped>

</style>