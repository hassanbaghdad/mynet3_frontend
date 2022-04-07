<template>
    <v-container>
            <v-row justify="center">
                <v-col cols="12">
                    <v-row justify="center">
                        <v-col cols="12" lg="4">
                            <v-card max-width="500" class="pa-2 mt-8">
                                <v-card-title>
                                    <v-icon>mdi-cog</v-icon>
                                    <span class="mr-2 f20">اعدادات الموقع</span>
                                </v-card-title>
                                <v-divider/>
                                <v-card-text>
                                    <v-row justify="center">
                                        <v-col cols="12">
                                            <v-text-field v-model="settings.site_name" prepend-inner-icon="mdi-web" class="f20 align-self-center" outlined label="اسم الموقع"></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field v-model="settings.current_dollar" prepend-inner-icon="mdi-currency-usd" class="f20 align-self-center" outlined label="سعر الصرف"></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field v-model="settings.address" prepend-inner-icon="mdi-home" class="f20 align-self-center" outlined label="العنوان"></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field v-model="settings.phone" prepend-inner-icon="mdi-phone" class="f20 align-self-center" outlined label="رقم الموبايل"></v-text-field>
                                        </v-col>

                                        <v-col cols="12">
                                            <v-switch v-model="settings.dark" @change="change_theme" prepend-inner-icon="mdi-currency-usd" class="f20 align-self-center" outlined label="مظهر داكن"></v-switch>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-divider/>
                                            <v-btn @click="save_settings" block color="primary" class="mt-4">
                                                <v-icon>mdi-check</v-icon>
                                                <span class="mr-2 f18">حفظ</span>
                                            </v-btn>
                                        </v-col>

                                    </v-row>

                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "Settings",
        data(){
            return{
                settings:{
                    site_name:'',
                    current_dollar:'',
                    dark:this.$vuetify.theme.dark,
                    address:'',
                    phone:''
                }
            }
        },
        methods:{
            change_theme()
            {
                this.$vuetify.theme.dark =! this.$vuetify.theme.dark ;

            },
            async save_settings()
            {
                this.$axios.post('api/auth/save-settings',this.settings).then(res=>{
                    this.$fire({
                        title: "نجح",
                        text: res.data.msg,
                        type: "success",
                        timer: 2000
                    });

                });
                this.get_settings();
            },
           async get_settings()
            {
               await this.$axios.get('api/auth/get-settings').then(res=>{
                    this.settings = res.data[0];
                   this.$store.state.settings =res.data[0];
               })
            }
        },
        created(){
          this.get_settings();
        }
    }
</script>

<style scoped>

</style>