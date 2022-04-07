<template>
    <v-card class="pa-0" elevation="1" :loading="$store.state.loading">
        <v-card-title>
            <v-icon large>mdi-database</v-icon>
            <span class="f20b mr-2">قواعد البيانات</span>
        </v-card-title>
        <v-divider/>
        <v-card-title class="ma-0 pa-0">
            <v-btn color="primary" @click="create_backup">
                <v-icon>mdi-database-plus</v-icon>
                <span class="f20 mr-2">انشاء نسخة احتياطية</span>
            </v-btn>
        </v-card-title>
        <v-divider/>
        <v-card-text>
            <v-simple-table style="direction: rtl">
                <template v-slot:default>
                    <thead>
                    <tr>
                        <th class="text-center f16b">ت</th>
                        <th class="text-center f16b">النسخة</th>
                        <th class="text-center f16b">التاريخ</th>
                        <th class="text-center f16b">خيارات</th>


                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in pageOfItems" :key="item.back_id">
                        <td class="text-center f16b">{{backups.indexOf(item)+1}}</td>
                        <td class="text-center f16b">{{item.back_name}}</td>
                        <td class="text-center f16b">{{item.created_at.substr(0,10)}}</td>
                        <td class="text-center">
                            <v-btn @click="download('/mynet_backend/public/app/backups/'+sub+'/'+item.back_name,'backup.sql')" icon color="primary">
                                <v-icon>mdi-database-arrow-down</v-icon>
                            </v-btn>
                            <v-btn @click="delete_backup(item)" class="mr-2" icon color="error">
                                <v-icon>mdi-delete</v-icon>
                            </v-btn>

                        </td>
                    </tr>


                    </tbody>
                </template>
            </v-simple-table>
        </v-card-text>
        <v-divider/>
        <v-card elevation="1" class="f14 text-center pa-4">
            <jw-pagination :pageSize="15" :maxPages="$vuetify.breakpoint.xs?1:10"  :items="backups" :labels="customLabels" :styles="customStyles" @changePage="onChangePage"></jw-pagination>
        </v-card>
    </v-card>
</template>

<script>

    import JwPagination from 'jw-vue-pagination';
    const customLabels = {
        first: 'الاول',
        last: 'الاخير',
        previous: 'السابق',
        next: 'التالي'
    };
    const customStyles = {
        ul: {
            direction:'ltr'
        },
        li: {
            display: 'inline-block',
            border:'1px solid grey',
            margin:'2px',
            borderRadius:'5px'
        },
        a: {
            color: 'black'
        }
    };
    export default {
        name: "Backups",
        components:{
            JwPagination,
        },

        data(){
            return{
                backups:[],
                loading:false,
                customLabels,
                customStyles,
                pageOfItems: [],
                sub:window.location.href.split('//')[1].split('.')[0]
            }
        },
        methods:{
            onChangePage(pageOfItems) {
                // update page of items
                this.pageOfItems = pageOfItems;
            },
            create_backup()
            {
                this.$axios.get('api/auth/create-backup').then(res=>
                {
                    console.log(res.data)
                    this.$store.commit("GET_BACKUPS");
                })
            },
             download(dataurl, filename) {
            const link = document.createElement("a");
            link.href = dataurl;
            link.download = filename;
            link.click();
    },
            delete_backup(item)
            {
                this.$axios.post('api/auth/delete-backup',item).then(res=>{
                    this.$store.commit("GET_BACKUPS");
                })
            }

        },
        computed:{
            get_backups:function () {
                return this.$store.state.backups.backups;
            }
        },
        watch:{
            get_backups:function (new_backups) {
                this.backups = new_backups;
            }
        },
        created(){
            this.$store.commit("GET_BACKUPS");
        }
    }
</script>

<style scoped>

</style>