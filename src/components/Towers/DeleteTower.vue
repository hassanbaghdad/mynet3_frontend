<template>
    <v-dialog max-width="250" class="pa-0 ma-9" v-model="$store.state.towers.forms.delete_tower">
            <v-card :loading="loading" elevation="6"  max-width="800" class="ma-auto">
                <v-card-title class="error"  style="direction: rtl;color: white">
                    <v-icon large color="white">mdi-delete</v-icon>
                    <span class="mr-2 f16">حذف برج</span>
                    <v-spacer/>
                    <v-btn icon @click="$store.state.towers.forms.delete_tower=false">
                        <v-icon large color="white">mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-divider />
                <v-card-text>
                   <div class="f18 pa-4 ma-4 text-center">
                       هل انت متأكد من حذف البرج ؟
                      <p class="f18b mt-4"> {{brig.brig_name}}</p>
                   </div>

                </v-card-text>
                <v-divider/>
                <v-card-actions style="direction: rtl">
                    <v-btn :loading="loading" @click="delete_tower"  color="error" large>
                        <v-icon>mdi-delete</v-icon>
                        <span class="f16 pa-2">حذف</span>
                    </v-btn>
                    <v-btn dark  @click="$store.state.towers.forms.delete_tower = false"  color="grey" large>
                        <v-icon>mdi-close</v-icon>
                        <span class="f16 pa-2">اللغاء</span>
                    </v-btn>


                </v-card-actions>

            </v-card>

    </v-dialog>
</template>

<script>
    export default {
        name: "DeleteTower",
        data(){
            return{
                loading:false,
                brig:this.$store.state.towers.target
            }
        },
        methods:{
            async delete_tower(){


                this.loading = true;
                this.$axios.post('api/delete-tower',{brig_id:this.brig.brig_id}).then(res=>{
                   this.$store.commit("GET_TOWERS");
                   this.$store.state.towers.forms.delete_tower= false;
                }).catch(err=>{
                    console.log(err)
                }).finally(fin=>{
                    this.loading = false;
                })
            }
        },
        computed:{
            get_brig:function () {
                return this.$store.state.towers.target
            },
        },
        watch:{
            get_brig:function (new_tower) {
                this.brig= new_tower;
            },
        },

    }
</script>

<style scoped>

</style>