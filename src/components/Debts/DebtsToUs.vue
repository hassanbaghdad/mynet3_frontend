<template>
    <v-card class="pa-0" elevation="1">

        <v-divider/>
        <v-card-title class="ma-0 pa-0">
            <v-toolbar elevation="0" class="ma-0 pa-0">
                <v-icon large>mdi-file-sign</v-icon>
                <span class="f20b mr-2">ديون لنا </span>
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
        <v-card-text>
            <v-simple-table style="direction: rtl">
                <template v-slot:default>
                    <thead>
                    <tr>
                        <th class="text-center f16b">ت</th>
                        <th class="text-center f16b">تسديد</th>
                        <th class="text-center f16b">اسم المشترك</th>
                        <th class="text-center f16b">يوزر المشترك</th>
                        <th class="text-center f16b">المبلغ المتبقي</th>
                        <th class="text-center f16b">موبايل</th>
                        <th class="text-center f16b">البرج</th>
                        <th class="text-center f16b">تاريخ الانتهاء</th>


                    </tr>
                    <tr>
                        <th></th>
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


                    </tr>

                    </thead>
                    <tbody>
                    <tr v-for="i in 60" :key="i" >
                        <td class="text-center f16">{{i}}</td>
                        <td class="text-center f16">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn v-bind="attrs" v-on="on" max-height="30" max-width="30" fab small color="primary">
                                        <v-icon>mdi-plus</v-icon>
                                    </v-btn>
                                </template>
                                <span>تسديد</span>
                            </v-tooltip>

                        </td>

                        <td  class="text-center f16">Economy+</td>
                        <td  class="text-center f16">35000</td>
                        <td  class="text-center f16">20$</td>
                        <td  class="text-center f16">45345</td>
                        <td  class="text-center f16">345</td>
                        <td  class="text-center f16">534534</td>


                    </tr>


                    </tbody>
                </template>
            </v-simple-table>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        name: "DebtsToUs"
    }
</script>

<style scoped>

</style>