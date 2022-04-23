<template>
    <v-dialog max-width="250" class="pa-0 ma-9" v-model="$store.state.store_products.forms.delete_product">
            <v-card :loading="loading" elevation="6"  max-width="800" class="ma-auto">
                <v-card-title class="error"  style="direction: rtl;color: white">
                    <v-icon large color="white">mdi-delete</v-icon>
                    <span class="mr-2 f16">حذف برج</span>
                    <v-spacer/>
                    <v-btn icon @click="$store.state.store_products.forms.delete_product=false">
                        <v-icon large color="white">mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-divider />
                <v-card-text>
                   <div class="f18 pa-4 ma-4 text-center">
                       هل انت متأكد من حذف
                       {{item.item_name}}
                       ؟
                   </div>

                </v-card-text>
                <v-divider/>
                <v-card-actions style="direction: rtl">
                    <v-btn :loading="loading" @click="delete_item"  color="error" large>
                        <v-icon>mdi-delete</v-icon>
                        <span class="f16 pa-2">حذف</span>
                    </v-btn>
                    <v-btn dark  @click="$store.state.store_products.forms.delete_product = false"  color="grey" large>
                        <v-icon>mdi-close</v-icon>
                        <span class="f16 pa-2">اللغاء</span>
                    </v-btn>


                </v-card-actions>

            </v-card>

    </v-dialog>
</template>

<script>
    export default {
        name: "DeleteProduct",
        data(){
            return{
                loading:false,
                item:[]
            }
        },
        methods:{
            async delete_item(){

                this.loading = true;
                await  this.$axios.post('api/delete-item',this.item).then(res=>{
                    this.$store.commit("GET_ITEMS");
                    this.$fire({
                        title: "نجح",
                        text: res.data.msg,
                        type: "success",
                        timer: 2000
                    });

                }).catch(err=>{
                    console.log(err)
                }).finally(fin=>{
                    this.loading = false;
                })
            }
        },
        computed:{
            get_item:function () {
                return this.$store.state.store_products.forms.delete_product;
            }
        },
        watch:{
            get_item:function (form) {
                if(form)
                {
                    this.item = this.$store.state.store_products.target_item;
                }
            }
        },

    }
</script>

<style scoped>

</style>