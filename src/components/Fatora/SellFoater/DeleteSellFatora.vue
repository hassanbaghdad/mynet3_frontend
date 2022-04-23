<template>
    <v-dialog max-width="250" class="pa-0 ma-9" v-model="$store.state.foater.forms.delete_sell_fatora">
            <v-card :loading="loading" elevation="6"  max-width="800" class="ma-auto">
                <v-card-title class="error"  style="direction: rtl;color: white">
                    <v-icon large color="white">mdi-delete</v-icon>
                    <span class="mr-2 f16">حذف فاتورة مبيع</span>
                    <v-spacer/>
                    <v-btn icon @click="$store.state.foater.forms.delete_sell_fatora=false">
                        <v-icon large color="white">mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-divider />
                <v-card-text>
                   <div class="f18 pa-4 ma-4 text-center">
                       هل انت متأكد من حذف الفاتورة ؟
                      <p class="f18b mt-4"> {{fatora.fatora_number}}</p>
                   </div>

                </v-card-text>
                <v-divider/>
                <v-card-actions style="direction: rtl">
                    <v-btn :loading="loading" @click="delete_sell_fatora"  color="error" large>
                        <v-icon>mdi-delete</v-icon>
                        <span class="f16 pa-2">حذف</span>
                    </v-btn>
                    <v-btn dark  @click="$store.state.foater.forms.delete_sell_fatora = false"  color="grey" large>
                        <v-icon>mdi-close</v-icon>
                        <span class="f16 pa-2">اللغاء</span>
                    </v-btn>


                </v-card-actions>

            </v-card>

    </v-dialog>
</template>

<script>
    export default {
        name: "DeleteSellFatora",
        data(){
            return{
                loading:false,
                fatora:this.$store.state.foater.target,
            }
        },
        methods:{
            async delete_sell_fatora(){
                this.loading = true;
                this.$axios.post('api/delete-sell-fatora',{fatora_id:this.fatora.fatora_id}).then(res=>{

                    this.$fire({
                        title: "نجح",
                        text: res.data.msg,
                        type: "success",
                        timer: 2000
                    });
                    this.$store.commit("GET_SELL_FOATER");
                    this.$store.state.foater.forms.delete_sell_fatora= false;
                }).catch(err=>{
                    console.log(err)
                }).finally(fin=>{
                    this.loading = false;
                })
            }
        },
        computed:{
            get_target_fatora:function () {
                return this.$store.state.foater.target
            },
        },
        watch:{
            get_target_fatora:function (new_fatora) {

                this.fatora = this.$store.state.foater.target;


            },
        },

    }
</script>

<style scoped>

</style>