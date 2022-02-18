<template>
    <v-form lazy-validation v-model="valid" ref="form">
        <v-container>
            <v-row justify="center" class="mt-8">
                <v-col cols="12">
                    <div :class="error?'div-login':''">
                        <v-card :loading="loading" elevation="6"  max-width="800" class="ma-auto">
                            <v-card-title style="direction: rtl">
                                <v-icon>mdi-lock</v-icon>
                                <span class="mr-2 f16">تسجيل الدخول</span>
                            </v-card-title>
                            <v-divider />
                            <v-row>
                                <v-col cols="12" md="6">
                                    <v-card-text>
                                        <v-row justify="center" class="mt-4">
                                            <v-col cols="12">
                                                <v-text-field append-icon="mdi-account" :rules="req" v-model="user.username" outlined label="اسم المستخدم"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" class="text-center">
                                                <v-text-field @click:append="show=!show" :type="show?'text':'password'" :append-icon="show?'mdi-eye-off':'mdi-eye'" :rules="req" v-model="user.password" outlined label="كلمة المرور"></v-text-field>
                                                <v-chip v-show="error" class="f16 pa-2 text-center" color="error">اسم المستخدم او كلمة المرور غير صحيحة </v-chip>
                                            </v-col>

                                        </v-row>
                                    </v-card-text>
                                </v-col>
                                <v-col cols="12" md="6">

                                    <div class="pa-4 ma-auto d-flex" style="height: 100%">
                                        <div class="ma-auto">
                                            <span class="f-en text-center align-self-center">MY</span>
                                            <span style="color: #ff8a10" class="f-en text-center  align-self-center">N</span>
                                            <span class="f-en text-center align-self-center">ET</span>
                                        </div>
                                    </div>

                                </v-col>


                            </v-row>

                            <v-divider/>
                            <v-card-actions style="direction: rtl">
                                <v-btn :loading="loading" @click="login" color="primary" large>
                                    <v-icon>mdi-key</v-icon>
                                    <span class="f16 pa-2">دخول</span>
                                </v-btn>

                            </v-card-actions>

                        </v-card>
                    </div>

                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>

<script>

    export default {
        name: "Login",
        data(){
            return{
                error:false,
                show:false,
                loading:false,
                valid:true,
                req:[v=>!!v || 'لايمكن ترك الحقل فارغاً'],
                user:{
                    username:'hassan',
                    password:'123456'
                }
            }
        },
        methods:{
            async login()
            {
                if(this.$refs.form.validate())
                {
                    this.error = false;
                    this.loading = true;
                    this.$axios.post('api/login',this.user).then(res=>{
                        console.log(res.data)
                    }).catch(err=>{
                        console.log(err)
                        this.error = true;
                    }).finally(fin=>{
                        this.loading = false;
                    })
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    @import url('https://fonts.googleapis.com/css2?family=Righteous&display=swap');
    .f-en{
        font-family: 'Righteous', cursive;

        font-size: 80px;
    }
    #input-54{
        text-align: center !important;
    }

    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@700&display=swap');

    .f16{
        font-size: 16px !important;
        font-family: 'Cairo', sans-serif !Important;
    }
    .div-login{
        animation: mymove .3s 2;
    }
    @keyframes mymove {
        0%{
            margin-left: -50px ;
        }
        25%{
            margin-left: 50px ;
        }
        50%{
           margin-left: -50px;
        }
        75%{
            margin-left: 50px ;
        }
        100%{
            margin-left: 0px;
        }

    }
</style>