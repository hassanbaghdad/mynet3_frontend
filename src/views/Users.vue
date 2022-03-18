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
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn disabled class="mr-2" fab small color="pink"  v-bind="attrs" v-on="on" @click="$store.state.users.forms.set_customers=true">
                            <v-icon color="white">mdi-account-multiple-check</v-icon>
                        </v-btn>
                    </template>
                    <span>تخصيص مشتركين</span>
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
                                <v-checkbox class="ma-0 pa-0" label="الاسم" v-model="$store.state.ui_user.users.col_Fullname"/>
                            </v-list-item>
                            <v-list-item>
                                <v-checkbox class="ma-0 pa-0"  label="اليوزر" v-model="$store.state.ui_user.users.col_username"/>
                            </v-list-item>
                            <v-list-item>
                                <v-checkbox class="ma-0 pa-0"  label="الصلاحية" v-model="$store.state.ui_user.users.col_user_level"/>
                            </v-list-item>
                            <v-list-item>
                                <v-checkbox class="ma-0 pa-0"  label="تخصبص" v-model="$store.state.ui_user.users.col_user_type"/>
                            </v-list-item>



                            <v-list-item>
                                <v-btn block @click="save_ui_users" :loading="loading" color="primary">
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
                        <th v-if="$store.state.ui_user.users.col_Fullname" class="text-center f16b">الاسم</th>
                        <th v-if="$store.state.ui_user.users.col_username" class="text-center f16b">اليوزر</th>
                        <th v-if="$store.state.ui_user.users.col_user_level" class="text-center f16b">الصلاحية</th>
                        <th v-if="$store.state.ui_user.users.col_user_type" class="text-center f16b">تخصيص</th>
                        <th class="text-center f16b">خيارات</th>


                    </tr>
                    <tr>
                        <th></th>
                        <th v-if="$store.state.ui_user.users.col_Fullname" class="text-center f16b">
                            <v-text-field v-model="search.Fullname" @keyup="search_user" outlined dense prepend-inner-icon="mdi-magnify"/>
                        </th>
                        <th v-if="$store.state.ui_user.users.col_username" class="text-center f16b">
                            <v-text-field v-model="search.user_name" @keyup="search_user" outlined dense prepend-inner-icon="mdi-magnify"/>
                        </th>
                        <th v-if="$store.state.ui_user.users.col_user_level" class="text-center f16b">
                            <v-select @change="search_user" v-model="search.user_level" :items="ranks" item-text="label" item-value="value" outlined dense prepend-inner-icon="mdi-magnify"/>
                        </th>
                        <th v-if="$store.state.ui_user.users.col_user_type" class="text-center f16b">
                            <v-select @change="search_user" v-model="search.user_type" :items="types" item-text="label" item-value="value" outlined dense prepend-inner-icon="mdi-magnify"/>
                        </th>

                        <th></th>

                    </tr>

                    </thead>
                    <tbody>
                    <tr v-for="user in pageOfItems" :key="user.user_id" >
                        <td  class="text-center f16">{{users.indexOf(user)+1}}</td>
                        <td v-if="$store.state.ui_user.users.col_Fullname"  class="text-center f16">{{user.Fullname}}</td>
                        <td  v-if="$store.state.ui_user.users.col_username" class="text-center f16">{{user.user_name}}</td>
                        <td  v-if="$store.state.ui_user.users.col_user_level" class="text-center f16">{{user.user_level | user_rank}}</td>
                        <td  v-if="$store.state.ui_user.users.col_user_type" class="text-center f16">{{user.user_type | user_type_f}}</td>
                        <td  class="text-center f16">
                            <v-btn icon @click="set_user_to_edit(user)">
                                <v-icon color="primary">mdi-pencil</v-icon>
                            </v-btn>
                            <v-btn icon @click="set_user_to_delete(user)">
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
            <jw-pagination :pageSize="15" :maxPages="$vuetify.breakpoint.xs?1:10"  :items="users" :labels="customLabels" :styles="customStyles" @changePage="onChangePage"></jw-pagination>
        </v-card>
        <AddUser/>
        <EditUser/>
        <DeleteUser/>
        <SetCustomers/>
    </v-card>
</template>

<script>
    import AddUser from "@/components/Users/AddUser";
    import EditUser from "@/components/Users/EditUser";
    import DeleteUser from "@/components/Users/DeleteUser";
    import SetCustomers from "@/components/Users/SetCustomers";
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
        name: "Users",
        components:{
            JwPagination,
            AddUser,
            EditUser,
            DeleteUser,
            SetCustomers
        },
        filters:{
            user_type_f:function(value)
            {
                if(value != null)
                {
                    if(value == 0 || value =="0")
                    {
                        return "جميع المشتركين";
                    }
                    if(value == 1  || value =="1")
                    {
                        return "قائمة مخصصة";
                    }


                }
            },
          user_rank:function (value) {
            if(value != null)
            {
                if(value == 1)
                {
                    return "مدير";
                }
                if(value == 2)
                {
                    return "محاسب";
                }
                if(value == 3)
                {
                    return "وكيل";
                }

            }
          }
        },
        data(){
            return{
                users:this.$store.state.users.users,
                loading:false,
                customLabels,
                customStyles,
                pageOfItems: [],
                search:{
                    Fullname:'',
                    user_name:'',
                    user_level:'',
                    user_type:''
                },
                ranks:[
                    {label:'مدير',value:1},
                    {label:'محاسب',value:2},
                    {label:'وكيل',value:3},
                ],
                types:[
                    {label:'الكل',value:'الكل'},
                    {label:'جميع المشتركين',value:0},
                    {label:'قائمة مخصصة',value:1},
                ]
            }
        },
        methods:{
            set_user_to_edit(user)
            {
                this.$store.state.users.target = user;
                this.$store.state.users.forms.edit_user = true;
            },
            set_user_to_delete(user)
            {
                this.$store.state.users.target = user;
                this.$store.state.users.forms.delete_user = true;
            },
            onChangePage(pageOfItems) {
                // update page of items
                this.pageOfItems = pageOfItems;
            },
            search_user()
            {
                var filterd = this.$store.state.users.users;
                filterd = filterd.filter(item=>item.Fullname.match(this.search.Fullname));
                filterd = filterd.filter(item=>item.user_name.match(this.search.user_name));
                if(this.search.user_level != null && this.search.user_level != "" && this.search.user_level != null)
                {
                    filterd = filterd.filter(item=>item.user_level==this.search.user_level);
                }
                if(this.search.user_type != null && this.search.user_type != "" && this.search.user_type != null && this.search.user_type !='الكل')
                {
                        filterd = filterd.filter(item=>item.user_type==this.search.user_type);
                }
                if(this.search.user_type == 0)
                {
                    filterd = filterd.filter(item=>item.user_type==0);
                }
                this.users = filterd;
            },
            async save_ui_users()
            {
                this.loading = true;
                await this.$axios.post('api/save-ui-users',this.$store.state.ui_user.users).then(res=>{

                    this.$fire({
                        title: "نجح",
                        text: res.data.msg,
                        type: "success",
                        timer: 2000
                    });

                    this.$store.commit("GET_UI_USERS");
                }).catch(err=>{
                    console.log(err)
                }).finally(fin=>{
                    this.loading = false
                })
            }

        },
        computed:{
            get_users:function () {
                return this.$store.state.users.users;
            }
        },
        watch:{
            get_users:function (new_users) {
                this.users = new_users;
            }
        },
        created(){
            this.$store.commit("GET_USERS");
        }

    }
</script>

<style scoped>

</style>