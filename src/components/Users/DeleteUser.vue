<template>
    <v-dialog max-width="250" class="pa-0 ma-9" v-model="$store.state.users.forms.delete_user">
            <v-card :loading="loading" elevation="6"  max-width="800" class="ma-auto">
                <v-card-title class="error"  style="direction: rtl;color: white">
                    <v-icon large color="white">mdi-delete</v-icon>
                    <span class="mr-2 f16">حذف برج</span>
                    <v-spacer/>
                    <v-btn icon @click="$store.state.users.forms.delete_user=false">
                        <v-icon large color="white">mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-divider />
                <v-card-text>
                   <div class="f18 pa-4 ma-4 text-center">
                       هل انت متأكد من حذف المشرف ؟
                      <p class="f18b mt-4"> {{user.Fullname}}</p>
                   </div>

                </v-card-text>
                <v-divider/>
                <v-card-actions style="direction: rtl">
                    <v-btn :loading="loading" @click="delete_user"  color="error" large>
                        <v-icon>mdi-delete</v-icon>
                        <span class="f16 pa-2">حذف</span>
                    </v-btn>
                    <v-btn dark  @click="$store.state.users.forms.delete_user = false"  color="grey" large>
                        <v-icon>mdi-close</v-icon>
                        <span class="f16 pa-2">اللغاء</span>
                    </v-btn>


                </v-card-actions>

            </v-card>

    </v-dialog>
</template>

<script>
    export default {
        name: "DeleteUser",
        data(){
            return{
                loading:false,
                user:this.$store.state.users.target
            }
        },
        methods:{
            async delete_user(){


                this.loading = true;
                this.$axios.post('api/delete-user',{user_id:this.user.user_id}).then(res=>{
                   this.$store.commit("GET_USERS");
                   this.$store.state.users.forms.delete_user= false;
                }).catch(err=>{
                    console.log(err)
                }).finally(fin=>{
                    this.loading = false;
                })
            }
        },
        computed:{
            get_user:function () {
                return this.$store.state.users.target
            },
        },
        watch:{
            get_user:function (new_user) {
                this.user= new_user;
            },
        },

    }
</script>

<style scoped>

</style>