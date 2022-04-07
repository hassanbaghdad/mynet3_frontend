<template>

        <v-navigation-drawer
                               app :right="$vuetify.rtl" dark v-model="$store.state.drawer">
            <v-list-item>

                <v-list-item-content>

                    <v-list-item-title class="text-h6">
                        <span class="f18b">{{$store.state.user.Fullname}}</span>

                    </v-list-item-title>
                    <v-list-item-subtitle class="text-center">
                        internet system
                    </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-avatar v-if="$vuetify.breakpoint.xs">
                    <v-btn icon @click="$store.state.drawer=!$store.state.drawer">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-list-item-avatar>
            </v-list-item>

            <v-divider></v-divider>

            <v-list
                    dense
                    nav
            >
<!--                <v-list-item link to="reports" v-if="$store.state.user.user_level==1">-->
<!--                    <v-list-item-icon>-->
<!--                        <v-icon color="orange" large>mdi-chart-bar</v-icon>-->
<!--                    </v-list-item-icon>-->
<!--                    <v-list-item-content>-->
<!--                        <v-list-item-title class="f20 text-right">التقارير</v-list-item-title>-->
<!--                    </v-list-item-content>-->
<!--                </v-list-item>-->
                <v-list-item link to="/customers">
                    <v-list-item-icon>
                        <v-icon color="#75ddb2" large>mdi-account-group</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title class="f20 text-right">المشتركين</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link to="/towers" v-if="$store.state.user.user_level==1">
                    <v-list-item-icon>
                        <v-icon large>mdi-transmission-tower</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title class="f20 text-right">الابراج</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link to="/cards" v-if="$store.state.user.user_level==1">
                    <v-list-item-icon>
                        <v-icon color="#3bc70e" large>mdi-credit-card</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title class="f20 text-right">الاشتراكات</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link to="/bills">
                    <v-list-item-icon>
                        <v-icon color="success" large>mdi-text-box-check-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title class="f20 text-right">الوصولات</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link to="/debts">
                    <v-list-item-icon>
                        <v-icon color="error" large>mdi-cash</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title class="f20 text-right">الديون</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item link to="/credits">
                    <v-list-item-icon>
                        <v-icon color="yellow" large>mdi-currency-usd</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title class="f20 text-right">ارصدة الوكلاء</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-group
                        v-model="active"


                        color="blue"
                        style="font-size: 90px !important;"
                >
                    <template v-slot:activator>
                        <v-list-item-content>
                            <v-list-item-title class="f20 text-right" >
                                <v-icon righ large>mdi-cube-outline</v-icon>
                                <span class="mr-8" style="width: 100% !important;text-align: center;">المبيعات</span>
                            </v-list-item-title>
                        </v-list-item-content>
                    </template>

                    <v-list-item link dense class="text-right" >
                        <v-list-item-content>
                            <v-list-item-title class="text-right mr-16">
                                <v-icon>mdi-plus</v-icon>
                                <span class="mr-2 f16">فاتورة جديدة</span>
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item link to="/store" dense class="text-right">
                        <v-list-item-content>
                            <v-list-item-title class="text-right mr-16">
                                <v-icon >mdi-shape</v-icon>
                                <span class="mr-2 f16">المخزن</span>
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                </v-list-group>
                <v-list-item link to="/users" v-if="$store.state.user.user_level==1">
                    <v-list-item-icon>
                        <v-icon color="error" large>mdi-lock</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title class="f20 text-right">الصلاحيات</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item link to="/backups"  v-if="$store.state.user.user_level==1">
                    <v-list-item-icon>
                        <v-icon color="#d3d1d3" large>mdi-database-arrow-down</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title class="f20 text-right">نسخة احتياطية</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
<!--                <v-list-item link  v-if="$store.state.user.user_level==1">-->
<!--                    <v-list-item-icon>-->
<!--                        <v-icon color="orange" large>mdi-monitor</v-icon>-->
<!--                    </v-list-item-icon>-->
<!--                    <v-list-item-content>-->
<!--                        <v-list-item-title class="f20 text-right">نسخة Windows</v-list-item-title>-->
<!--                    </v-list-item-content>-->
<!--                </v-list-item>-->
                <v-list-item link to="settings"  v-if="$store.state.user.user_level==1">
                    <v-list-item-icon>
                        <v-icon color="info" large>mdi-cog</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title class="f20 text-right">الاعدادات</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link href="tel://07810780497"  v-if="$store.state.user.user_level==1">
                    <v-list-item-icon>
                        <v-icon color="success" large>mdi-phone</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title class="f20 text-right">مساعدة</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

            </v-list>
            <template v-slot:append>
                <div class="pa-2">
                    <v-btn block color="error" @click="$store.commit('LOGOUT')">
                        <v-icon>mdi-exit-run</v-icon>
                        <span class="f20">تسجيل الخروج</span>
                    </v-btn>
                </div>
            </template>
        </v-navigation-drawer>
</template>

<script>
    export default {
        name: "Drawer",
        data () {
            return {
                items: [
                    { title: 'Home', icon: 'mdi-home-city' },
                    { title: 'My Account', icon: 'mdi-account' },
                    { title: 'Users', icon: 'mdi-account-group-outline' },
                ],
                active:false
            }
        },
    }
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@600&display=swap');
    .f20{
    font-size: 20px !important;
    line-height: 30px !important;
        font-family: 'Cairo', sans-serif !Important;
}
    @import url('https://fonts.googleapis.com/css2?family=Righteous&display=swap');
    .f-en{
        font-family: 'Righteous', cursive !important;
    }
</style>