<template>
    <v-dialog max-width="250" class="pa-0 ma-9" v-model="$store.state.cards.forms.delete_card">
            <v-card :loading="loading" elevation="6"  max-width="800" class="ma-auto">
                <v-card-title class="error"  style="direction: rtl;color: white">
                    <v-icon large color="white">mdi-delete</v-icon>
                    <span class="mr-2 f16">حذف اشتراك</span>
                    <v-spacer/>
                    <v-btn icon @click="$store.state.cards.forms.delete_card=false">
                        <v-icon large color="white">mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-divider />
                <v-card-text>
                   <div class="f18 pa-4 ma-4 text-center">
                       هل انت متأكد من حذف الاشتراك ؟
                      <p class="f18b mt-4"> {{card.card_name}}</p>
                   </div>

                </v-card-text>
                <v-divider/>
                <v-card-actions style="direction: rtl">
                    <v-btn :loading="loading" @click="delete_card"  color="error" large>
                        <v-icon>mdi-delete</v-icon>
                        <span class="f16 pa-2">حذف</span>
                    </v-btn>
                    <v-btn dark  @click="$store.state.cards.forms.delete_card = false"  color="grey" large>
                        <v-icon>mdi-close</v-icon>
                        <span class="f16 pa-2">اللغاء</span>
                    </v-btn>


                </v-card-actions>

            </v-card>

    </v-dialog>
</template>

<script>
    export default {
        name: "DeleteCard",
        data(){
            return{
                loading:false,
                card:this.$store.state.cards.target
            }
        },
        methods:{
            async delete_card(){


                this.loading = true;
                this.$axios.post('api/delete-card',{card_id:this.card.card_id}).then(res=>{
                   this.$store.commit("GET_CARDS");
                   this.$store.state.cards.forms.delete_card= false;
                }).catch(err=>{
                    console.log(err)
                }).finally(fin=>{
                    this.loading = false;
                })
            }
        },
        computed:{
            get_card:function () {
                return this.$store.state.cards.target
            },
        },
        watch:{
            get_card:function (new_card) {
                this.card= new_card;
            },
        },

    }
</script>

<style scoped>

</style>