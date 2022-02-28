<template>
    <v-dialog max-width="500" class="pa-0 ma-9" v-model="$store.state.users.forms.add_user">
        <v-form lazy-validation v-model="valid" ref="form">
            <v-card :loading="loading" elevation="6"  max-width="500" class="ma-auto">
                <v-card-title class="pink"  style="direction: rtl;color: white">
                    <v-icon large color="white">mdi-account-plus</v-icon>
                    <span class="mr-2 f16">اضافة مشرف</span>
                    <v-spacer/>
                    <v-btn icon @click="$store.state.users.forms.add_user=false">
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
                            <v-text-field v-model="user.username" :rules="req" outlined label="يوزر المشرف" prepend-inner-icon="mdi-user-account"/>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="user.passsword" :rules="req" outlined label="باسوورد المشرف" prepend-inner-icon="mdi-lock"/>
                        </v-col>
                        <v-col cols="12">
                            <v-select :items="ranks" item-value="value" item-text="label" v-model="user.user_level" :rules="req" outlined label="صلاحية المشرف" prepend-inner-icon="mdi-account-details"/>
                        </v-col>



                    </v-row>

                </v-card-text>
                <v-divider/>
                <v-card-actions style="direction: rtl">
                    <v-btn :loading="loading" @click="add_user"  color="primary" large>
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
        name: "AddUser",

        data(){
            return{
                valid:true,
                loading:false,
                req:[v=>!!v ||'لايمكن ترك هذا الحقل فارغاً'],
                user:{
                    Fullname:'',
                    username:'',
                    passsword:'',
                    user_level:'',
                },
                ranks:[
                    {label:'مدير',value:1},
                    {label:'محاسب',value:2},
                    {label:'وكيل',value:3},
                ]

            }
        },
        methods:{
            async add_user(){
                if(this.$refs.form.validate())
                {
                    this.loading = true;
                    await this.$axios.post('api/add-user',this.user).then(res=>{
                        this.$fire({
                            title: "نجح",
                            text: res.data.msg,
                            type: "success",
                            timer: 2000
                        });
                        this.$refs.form.reset();
                        this.$store.state.users.forms.add_user = false;
                        this.$store.commit("GET_USERS")
                    }).catch(err=>{

                    }).finally(fin=>{
                        this.loading = false;
                    })
                }
            }
        },

    }
</script>

<style scoped>

</style>