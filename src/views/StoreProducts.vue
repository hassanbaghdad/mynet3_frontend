<template>
    <v-card class="pa-0" elevation="1" :loading="$store.state.loading">
        <v-card-title>
            <v-icon large>mdi-cube-outline</v-icon>
            <span class="f20b mr-2">المخزن </span>
        </v-card-title>
        <v-divider/>
        <v-card-title class="ma-0 pa-0">
            <v-toolbar elevation="0" class="ma-0 pa-0">


                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn fab small color="blue"  v-bind="attrs" v-on="on" @click="$store.state.users.forms.add_user=true">
                            <v-icon color="white">mdi-plus</v-icon>
                        </v-btn>
                    </template>
                    <span>اضافة مادة</span>
                </v-tooltip>


                <v-spacer/>


            </v-toolbar>
        </v-card-title>
        <v-divider/>
        <v-card-text>
            <v-simple-table style="direction: rtl">
                <template v-slot:default>
                    <thead>

                    <tr>
                    <th class="text-center f18">ت</th>
                    <th class="text-center f18">اسم المادة</th>
                    <th class="text-center f18">الصنف</th>
                    <th class="text-center f18">سعر الشراء بالدينار</th>
                    <th class="text-center f18">سعر البيع بالدينار</th>
                    <th class="text-center f18">الكمية</th>
                    <th class="text-center f18">مجموع الشراء</th>
                    <th class="text-center f18">مجموع المبيع</th>
                    <th class="text-center f18">اللون</th>
                    <th class="text-center f18">الذاكرة</th>
                    <th class="text-center f18">تاريخ الاضافة</th>
                    <th class="text-center f18">المخزن</th>
                    <th class="text-center f18">خيارات</th>
                    </tr>
                    <tr>
                        <th></th>
                        <th class="text-center f16b">
                            <v-text-field  outlined dense prepend-inner-icon="mdi-magnify"/>
                        </th>
                        <th class="text-center f16b">
                            <v-text-field  outlined dense prepend-inner-icon="mdi-magnify"/>
                        </th>
                        <th class="text-center f16b">
                            <v-text-field  outlined dense prepend-inner-icon="mdi-magnify"/>
                        </th>
                        <th class="text-center f16b">
                            <v-text-field  outlined dense prepend-inner-icon="mdi-magnify"/>
                        </th>
                        <th class="text-center f16b">
                            <v-text-field  outlined dense prepend-inner-icon="mdi-magnify"/>
                        </th>
                        <th class="text-center f16b">
                            <v-text-field  outlined dense prepend-inner-icon="mdi-magnify"/>
                        </th>
                        <th class="text-center f16b">
                            <v-text-field  outlined dense prepend-inner-icon="mdi-magnify"/>
                        </th>
                        <th class="text-center f16b">
                            <v-text-field  outlined dense prepend-inner-icon="mdi-magnify"/>
                        </th>
                        <th class="text-center f16b">
                            <v-text-field  outlined dense prepend-inner-icon="mdi-magnify"/>
                        </th>
                        <th class="text-center f16b">
                            <v-text-field  outlined dense prepend-inner-icon="mdi-magnify"/>
                        </th>
                        <th class="text-center f16b">
                            <v-text-field  outlined dense prepend-inner-icon="mdi-magnify"/>
                        </th>
                        <th></th>

                    </tr>

                    </thead>
                    <tbody>
                        <tr v-for="item in 9" :key="item">
                            <th class="text-center f16">{{item}}</th>
                            <th class="text-center f16">نانو</th>
                            <th class="text-center f16">الكترونيات</th>
                            <th class="text-center f16">50,000</th>
                            <th class="text-center f16">100,000</th>
                            <th class="text-center f16">10</th>
                            <th class="text-center f16">500,000</th>
                            <th class="text-center f16">1,000,000</th>
                            <th class="text-center f16">ابيض</th>
                            <th class="text-center f16">-</th>
                            <th class="text-center f16">2022-04-07</th>
                            <th class="text-center f16">1</th>
                            <th class="text-center f16">
                                <v-row justify="center">
                                    <v-col cols="6">
                                        <v-btn icon small class="d-inline-block">
                                            <v-icon color="primary">mdi-pencil</v-icon>
                                        </v-btn>
                                    </v-col>
                                   <v-col cols="6">
                                       <v-btn icon small class="d-inline-block">
                                           <v-icon color="error">mdi-delete</v-icon>
                                       </v-btn>
                                   </v-col>

                                </v-row>


                            </th>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-card-text>
        <v-divider/>

    </v-card>
</template>

<script>
    export default {
        name: "StoreProducts",
        data(){
            return{

            }
        }
    }
</script>

<style scoped>

</style>