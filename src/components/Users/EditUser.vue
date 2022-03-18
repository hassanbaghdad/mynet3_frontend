<template>
    <v-dialog max-width="500" class="pa-0 ma-9" v-model="$store.state.users.forms.edit_user">
        <v-form lazy-validation v-model="valid" ref="form">
            <v-card :loading="loading" elevation="6"  max-width="500" class="ma-auto">
                <v-card-title class="pink"  style="direction: rtl;color: white">
                    <v-icon large color="white">mdi-account-edit</v-icon>
                    <span class="mr-2 f16">تعديل مشرف</span>
                    <v-spacer/>
                    <v-btn icon @click="$store.state.users.forms.edit_user=false">
                        <v-icon large color="white">mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-divider />
                <v-card-text>
                    <v-row  class="ma-0">
                        <v-col cols="12" >
                            <v-text-field v-model="user.Fullname" :rules="req" outlined label="اسم النشرف" prepend-inner-icon="mdi-info"/>
                        </v-col>
                        <v-col cols="12" >
                            <v-text-field v-model="user.user_name" :rules="req" outlined label="يوزر المشرف" prepend-inner-icon="mdi-user-account"/>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field  v-model="user.user_pass"  outlined label="باسوورد المشرف" prepend-inner-icon="mdi-lock"/>
                        </v-col>
                        <v-col cols="12">
                            <v-select :items="ranks" item-value="value" item-text="label" v-model="user.user_level" :rules="req" outlined label="صلاحية المشرف" prepend-inner-icon="mdi-account-details"/>
                        </v-col>
                        <v-col cols="12">
                            <v-select :items="types" item-value="value" item-text="label" v-model="user.user_type"  outlined label="تخصيص" prepend-inner-icon="mdi-account-details"/>
                        </v-col>



                    </v-row>

                </v-card-text>
                <v-divider/>
                <v-card-actions style="direction: rtl">
                    <v-btn :loading="loading" @click="edit_user"  color="primary" large>
                        <v-icon>mdi-check</v-icon>
                        <span class="f16 pa-2">حفظ</span>
                    </v-btn>

                </v-card-actions>

            </v-card>
        </v-form>

    </v-dialog>

</template>

<script>
    export default {
        name: "EditUser",
        data(){
            return{
                valid:true,
                loading:false,
                req:[v=>!!v ||'لايمكن ترك هذا الحقل فارغاً'],
                req_pass:[v=>v.length <= 5 ||'يجب ان تكون كلمة السر اكثر من 5 حروف او ارقام'],
                user:{
                    user_id:'',
                    Fullname:'',
                    user_name:'',
                    user_pass:'',
                    user_level:'',
                    user_type:0,
                },
                ranks:[
                    {label:'مدير',value:1},
                    {label:'محاسب',value:2},
                    {label:'وكيل',value:3},
                ],
                types:[
                    {label:'جميع المشتركين',value:0},
                    {label:'قائمة مخصصة',value:1},
                ]

            }
        },
        methods:{
            async edit_user(){
                console.log(this.user)
                if(this.user_pass == null)
                {
                    this.user_pass = "";
                }
                if(this.$refs.form.validate())
                {

                        if(this.user.user_pass !="" && this.user.user_pass.length<=5)
                        {
                            this.$fire({
                                title: "عفواً",
                                text: 'يجب ان تكون كلمة المرور من 6 أحرف او ارقام',
                                type: "warning",
                                timer: 4000
                            });
                        }else{
                            this.loading = true;
                            await this.$axios.post('api/edit-user',this.user).then(res=>{
                                this.$fire({
                                    title: "نجح",
                                    text: res.data.msg,
                                    type: "success",
                                    timer: 2000
                                });
                                //this.$refs.form.reset();
                                this.$store.state.users.forms.edit_user = false;
                                this.$store.commit("GET_USERS")
                            }).catch(err=>{
                                this.$fire({
                                    title: "عفواً",
                                    text: err.response.data.msg,
                                    type: "warning",
                                    timer: 4000
                                });
                            }).finally(fin=>{
                                this.loading = false;
                            })
                        }



                }
            }
        },
        computed:{
            get_user:function () {
                return this.$store.state.users.forms.edit_user;
            }
        },
        watch:{
            get_user:function (new_form) {
                if(new_form)
                {
                    this.user.user_id = this.$store.state.users.target.user_id;
                    this.user.Fullname = this.$store.state.users.target.Fullname;
                    this.user.user_name = this.$store.state.users.target.user_name;
                    this.user.user_level = this.$store.state.users.target.user_level;
                    this.user.user_type = this.$store.state.users.target.user_type;
                }
                if(this.user_pass == null)
                {
                    this.user_pass = "";
                }
            }
        },

    }
</script>

<style scoped>

</style>