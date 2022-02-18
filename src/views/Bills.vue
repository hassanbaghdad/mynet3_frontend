<template>
    <v-card class="pa-0" elevation="1">
        <v-card-title class="ma-0 pa-0">
            <v-toolbar elevation="0" class="ma-0 pa-0">
                <v-icon large>mdi-file-sign</v-icon>
                <span class="f20b mr-2">الوصولات </span>

                <v-spacer/>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn fab small color="orange"  v-bind="attrs" v-on="on">
                            <v-icon color="white">mdi-table</v-icon>
                        </v-btn>
                    </template>
                    <span>ضبط الجدول</span>
                </v-tooltip>

            </v-toolbar>
        </v-card-title>
        <v-divider/>
        <v-card-title>
            <v-row>
                <v-col cols="12" lg="3">
                    <span class="f16 ml-2">من تاريخ:</span>
                    <input type="date" style="border: 1px solid black;width: 75%"/>
                </v-col>
                <v-col cols="12" lg="3">
                    <span class="f16 ml-2">الى تاريخ:</span>
                    <input type="date" style="border: 1px solid black;width: 75%"/>
                </v-col>
                <v-col cols="12" lg="3">
                    <v-btn elevation="2" dark color="primary" :width="$vuetify.breakpoint.xs?'97%':'40%'"  rounded>
                        <v-icon large>mdi-magnify</v-icon>
                        <span class="mr-2 f16b">فلترة</span>
                    </v-btn>
                </v-col>


            </v-row>

        </v-card-title>
        <v-divider/>
        <v-card-text>
            <v-simple-table style="direction: rtl">
                <template v-slot:default>
                    <thead>
                    <tr>
                        <th class="text-center f16b">ت</th>
                        <th class="text-center f16b">رقم الوصل</th>
                        <th class="text-center f16b">نوع الوصل</th>
                        <th class="text-center f16b">اسم الزبون</th>
                        <th class="text-center f16b">يوزر الزبون</th>
                        <th class="text-center f16b">مبلغ الوصل</th>
                        <th class="text-center f16b">الواصل</th>
                        <th class="text-center f16b">نوع الاشتراك</th>
                        <th class="text-center f16b">تاريخ الوصل</th>
                        <th class="text-center f16b">مسجل الوصل</th>
                        <th class="text-center f16b">خيارات</th>


                    </tr>
                    <tr>
                        <th></th>
                        <th class="text-center f16b">
                            <v-text-field prepend-inner-icon="mdi-magnify"/>
                        </th>
                        <th class="text-center f16b">
                            <v-text-field prepend-inner-icon="mdi-magnify"/>
                        </th>
                        <th class="text-center f16b">
                            <v-text-field prepend-inner-icon="mdi-magnify"/>
                        </th>
                        <th class="text-center f16b">
                            <v-text-field prepend-inner-icon="mdi-magnify"/>
                        </th>
                        <th class="text-center f16b">
                            <v-text-field prepend-inner-icon="mdi-magnify"/>
                        </th>
                        <th class="text-center f16b">
                            <v-text-field prepend-inner-icon="mdi-magnify"/>
                        </th>
                        <th class="text-center f16b">
                            <v-text-field prepend-inner-icon="mdi-magnify"/>
                        </th>
                        <th class="text-center f16b">
                            <v-text-field prepend-inner-icon="mdi-magnify"/>
                        </th>
                        <th class="text-center f16b">
                            <v-text-field prepend-inner-icon="mdi-magnify"/>
                        </th>

                        <th></th>

                    </tr>

                    </thead>
                    <tbody>
                    <tr v-for="i in 60" :key="i" >
                        <td class="text-center f16">{{i}}</td>
                        <td  class="text-center f16">Economy+</td>
                        <td  class="text-center f16">35000</td>
                        <td  class="text-center f16">20$</td>
                        <td class="text-center f16">{{i}}</td>
                        <td  class="text-center f16">Economy+</td>
                        <td  class="text-center f16">35000</td>
                        <td  class="text-center f16">20$</td>
                        <td  class="text-center f16">35000</td>
                        <td  class="text-center f16">20$</td>

                        <td  class="text-center f16">
                            <v-row class="pa-0 ma-0">
                                <v-col cols="6" class="pa-0 ma-0">
                                    <v-btn icon class="mr-2">
                                        <v-icon color="primary">mdi-eye</v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="6" class="pa-0 ma-0">
                                    <v-btn icon class="mr-4">
                                        <v-icon color="error">mdi-delete</v-icon>
                                    </v-btn>
                                </v-col>

                            </v-row>



                        </td>


                    </tr>


                    </tbody>
                </template>
            </v-simple-table>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        name: "Bills"
    }
</script>

<style scoped>

</style>