<template>
    <v-card class="pa-0" elevation="1">
        <v-card-title>
            <v-icon large>mdi-transmission-tower</v-icon>
            <span class="f20b mr-2">الابراج </span>
        </v-card-title>
        <v-divider/>
        <v-card-title class="ma-0 pa-0">
            <v-toolbar elevation="0" class="ma-0 pa-0">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn fab small color="blue"  v-bind="attrs" v-on="on" @click="$store.state.towers.forms.add_tower=true">
                            <v-icon color="white">mdi-plus</v-icon>
                        </v-btn>
                    </template>
                    <span>اضافة برج</span>
                </v-tooltip>
                <v-spacer/>
                <div class="text-center">
                    <v-menu offset-y :close-on-content-click="false">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn fab small color="orange"  v-bind="attrs" v-on="on">
                                <v-icon color="white">mdi-table</v-icon>
                            </v-btn>
                        </template>
                        <v-list >
                            <v-list-item>
                                <v-checkbox class="ma-0 pa-0" label="البرج" v-model="$store.state.ui_user.towers.col_brig_name"/>
                            </v-list-item>
                            <v-list-item>
                                <v-checkbox class="ma-0 pa-0"  label="نوعه" v-model="$store.state.ui_user.towers.col_brig_main"/>
                            </v-list-item>
                            <v-list-item>
                                <v-checkbox class="ma-0 pa-0"  label="الخدمة" v-model="$store.state.ui_user.towers.col_brig_type"/>
                            </v-list-item>
                            <v-list-item>
                                <v-checkbox class="ma-0 pa-0"  label="عدد المشتركين" v-model="$store.state.ui_user.towers.col_count_customers"/>
                            </v-list-item>



                            <v-list-item>
                                <v-btn block @click="save_ui_towers" :loading="loading" color="primary">
                                    <v-icon>mdi-check</v-icon>
                                    <span class="mr-2 f16b">حفظ الشكل</span>
                                </v-btn>
                            </v-list-item>


                        </v-list>

                    </v-menu>
                </div>

            </v-toolbar>
        </v-card-title>
        <v-divider/>
        <v-card-text>
            <v-simple-table style="direction: rtl">
                <template v-slot:default>
                    <thead>
                    <tr>
                        <th class="text-center f16b">ت</th>
                        <th v-if="$store.state.ui_user.towers.col_brig_name" class="text-center f16b">البرج</th>
                        <th v-if="$store.state.ui_user.towers.col_brig_name" class="text-center f16b">نوعه</th>
                        <th v-if="$store.state.ui_user.towers.col_brig_type" class="text-center f16b">الخدمة</th>
                        <th v-if="$store.state.ui_user.towers.col_count_customers" class="text-center f16b">عدد المشتركين</th>
                        <th class="text-center f16b">خيارات</th>


                    </tr>
                    <tr>
                        <th></th>
                        <th v-if="$store.state.ui_user.towers.col_brig_name" class="text-center f16b">
                            <v-text-field outlined dense v-model="search.brig_name" @keyup="search_tower" prepend-inner-icon="mdi-magnify"/>
                        </th>
                        <th v-if="$store.state.ui_user.towers.col_brig_main" class="text-center f16b">
                            <v-select outlined dense v-model="search.brig_main" @keyup="search_tower" @change="search_tower" clearable :items="scope_type" item-text="label" item-value="value" prepend-inner-icon="mdi-magnify"/>
                        </th>
                        <th  v-if="$store.state.ui_user.towers.col_brig_type" class="text-center f16b">
                            <v-select outlined dense v-model="search.brig_type" @keyup="search_tower"  @change="search_tower" :items="servies_type" clearable item-text="label" item-value="value" prepend-inner-icon="mdi-magnify"/>
                        </th>

                        <th  v-if="$store.state.ui_user.towers.col_count_customers" class="text-center f16b">
                            <v-text-field v-model="search.count_customers" @keyup="search_tower" outlined dense prepend-inner-icon="mdi-magnify"/>
                        </th>

                        <th></th>

                    </tr>

                    </thead>
                    <tbody>
                    <tr v-for="tower in pageOfItems" :key="tower.brig_id" >
                        <td class="text-center f16">{{towers.indexOf(tower)+1}}</td>
                        <td  v-if="$store.state.ui_user.towers.col_brig_name" class="text-center f16">{{tower.brig_name}}</td>
                        <td  v-if="$store.state.ui_user.towers.col_brig_main" class="text-center f16">{{tower.brig_main | brig_main_filter2}}</td>
                        <td  v-if="$store.state.ui_user.towers.col_brig_type" class="text-center f16">{{tower.brig_type | brig_type_filter}}</td>
                        <td  v-if="$store.state.ui_user.towers.col_count_customers" class="text-center f16">{{tower.count_customers}}</td>
                        <td  class="text-center f16">
                            <v-btn icon @click="set_tower_to_edit(tower)">
                                <v-icon color="primary">mdi-pencil</v-icon>
                            </v-btn>
                            <v-btn icon @click="set_tower_to_delete(tower)">
                                <v-icon color="error">mdi-delete</v-icon>
                            </v-btn>

                        </td>


                    </tr>


                    </tbody>
                </template>
            </v-simple-table>
        </v-card-text>
        <v-divider/>
        <v-card elevation="1" class="f14 text-center pa-4">
            <jw-pagination :pageSize="15" :maxPages="$vuetify.breakpoint.xs?1:10"  :items="towers" :labels="customLabels" :styles="customStyles" @changePage="onChangePage"></jw-pagination>
        </v-card>
    <AddTower/>
        <EditTower/>
        <DeleteTower/>
    </v-card>
</template>

<script>
    import AddTower from "@/components/Towers/AddTower";
    import EditTower from "@/components/Towers/EditTower";
    import DeleteTower from "@/components/Towers/DeleteTower";
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
        name: "Towers",
        components:{
            AddTower,
            EditTower,
            DeleteTower,
            JwPagination
        },
        filters:{
            brig_main_filter2:function (value) {
                if(value==1 || value=="1"){
                    return "رئيسي";
                }
                if(value==0 || value =="0"){
                    return "فرعي";
                }

            },
            brig_type_filter:function (value) {
                if(value==1 || value=="1"){
                    return "ايرثلنك";
                }
                if(value==2 || value=="2"){
                    return "جزيرة";
                }
                if(value==3 || value=="3"){
                    return "SAS3";
                }
                if(value==4 || value=="4"){
                    return "SAS4";
                }
                if(value==5 || value=="5"){
                    return "بث رقمي";
                }
                if(value==6 || value=="6"){
                    return "اخرى";
                }


            },

        },
        data(){
            return{
                towers:this.$store.state.towers.towers,
                loading:false,
                pageOfItems: [],
                customStyles,
                customLabels,
                scope_type:[
                    {label:'رئيسي',value:1},
                    {label:'فرعي',value:0},
                ],
                servies_type:[
                    {label:'ايرثلينك',value:1},
                    {label:'الجزيرة',value: 2},
                    {label:'SAS3',value: 3},
                    {label:'SAS4',value: 4},
                    {label:'البث الرقمي',value: 5},
                    {label:'اخرى',value: 6},
                ],
                type_active:[
                    {label:'30 يوم',value:0},
                    {label:'شهري',value:1},
                ],
                search:{
                    brig_name:'',
                    brig_main:'',
                    brig_type:'',
                    count_customers:'',
                }
            }
        },
        methods:{
            set_tower_to_edit(item)
            {
                console.log(item)
                this.$store.state.towers.target = item;
                this.$store.state.towers.forms.edit_tower = true;
            },
            set_tower_to_delete(item)
            {
                this.$store.state.towers.target = item;
                this.$store.state.towers.forms.delete_tower = true;
            },

            onChangePage(pageOfItems) {
                // update page of items
                this.pageOfItems = pageOfItems;
            },
            search_tower(){
                var filtered = this.$store.state.towers.towers;

                filtered = filtered.filter(item=>item.brig_name.match(this.search.brig_name));
                if(this.search.brig_main != null && this.search.brig_main !="")
                {
                    filtered = filtered.filter(item=>item.brig_main == this.search.brig_main);
                }
                if(this.search.brig_type != null && this.search.brig_type !="")
                {
                    filtered = filtered.filter(item=>item.brig_type == this.search.brig_type);
                }
                if(this.search.count_customers != null && this.search.count_customers !="")
                {
                    filtered = filtered.filter(item=>item.count_customers == this.search.count_customers);
                }

                this.towers = filtered;
            },
            async save_ui_towers()
            {
                this.loading = true;
                await this.$axios.post('api/save-ui-towers',this.$store.state.ui_user.towers).then(res=>{

                    this.$fire({
                        title: "نجح",
                        text: res.data.msg,
                        type: "success",
                        timer: 2000
                    });

                    this.$store.commit("GET_UI_TOWERS");
                }).catch(err=>{
                    console.log(err)
                }).finally(fin=>{
                    this.loading = false
                })
            }
        },
        computed:{
            get_towers:function () {
                return this.$store.state.towers.towers;
            }
        },
        watch:{
            get_towers:function (new_towers) {
                 this.towers = new_towers;
            }
        },
        created(){
            this.$store.commit("GET_TOWERS");
        }
    }
</script>

<style scoped>

</style>