<template>
    <v-card class="pa-0" elevation="1">
        <v-card-title>
            <v-icon large>mdi-lock</v-icon>
            <span class="f20b mr-2">الصلاحيات </span>
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
                    <span>اضافة مشرف</span>
                </v-tooltip>
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
                        <th class="text-center f16b">الاسم</th>
                        <th class="text-center f16b">اليوزر</th>
                        <th class="text-center f16b">الصلاحية</th>
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

                        <th></th>

                    </tr>

                    </thead>
                    <tbody>
                    <tr v-for="i in 60" :key="i" >
                        <td class="text-center f16">{{i}}</td>
                        <td  class="text-center f16">Economy+</td>
                        <td  class="text-center f16">35000</td>
                        <td  class="text-center f16">20$</td>
                        <td  class="text-center f16">
                            <v-btn icon>
                                <v-icon color="primary">mdi-pencil</v-icon>
                            </v-btn>
                            <v-btn icon>
                            <v-icon color="error">mdi-delete</v-icon>
                            </v-btn>

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
        name: "Users"
    }
</script>

<style scoped>

</style>