<template>
    <v-card class="pa-0" elevation="1" :loading="$store.state.loading">
        <v-card-title>
            <v-icon large>mdi-file-sign</v-icon>
            <span class="f20b mr-2">الاشتراكات </span>
        </v-card-title>
        <v-divider/>
        <v-card-title class="ma-0 pa-0">
            <v-toolbar elevation="0" class="ma-0 pa-0">


                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn fab small color="blue"  v-bind="attrs" v-on="on" @click="$store.state.cards.forms.add_card=true">
                            <v-icon color="white">mdi-plus</v-icon>
                        </v-btn>
                    </template>
                    <span>اضافة اشتراك</span>
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
                                <v-checkbox class="ma-0 pa-0" label="اسم الاشتراك" v-model="$store.state.ui_user.cards.col_card_name"/>
                            </v-list-item>
                            <v-list-item>
                                <v-checkbox class="ma-0 pa-0"  label="السعر بالدينار" v-model="$store.state.ui_user.cards.col_card_priceDinar"/>
                            </v-list-item>
                            <v-list-item>
                                <v-checkbox class="ma-0 pa-0"  label="السعر بالدولار" v-model="$store.state.ui_user.cards.col_card_priceDO"/>
                            </v-list-item>



                            <v-list-item>
                                <v-btn block @click="save_ui_cards" :loading="loading" color="primary">
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
                        <th v-if="$store.state.ui_user.cards.col_card_name" class="text-center f16b">الاشتراك</th>
                        <th v-if="$store.state.ui_user.cards.col_card_priceDinar" class="text-center f16b">السعر بالدينار</th>
                        <th v-if="$store.state.ui_user.cards.col_card_priceDO" class="text-center f16b">السعر بالدولار</th>
                        <th class="text-center f16b">خيارات</th>


                    </tr>
                    <tr>
                        <th></th>
                        <th v-if="$store.state.ui_user.cards.col_card_name" class="text-center f16b">
                            <v-text-field v-model="search.card_name" @keyup="search_card" outlined dense prepend-inner-icon="mdi-magnify"/>
                        </th>
                        <th v-if="$store.state.ui_user.cards.col_card_priceDinar" class="text-center f16b">
                            <v-text-field v-model="search.card_priceDinar" @keyup="search_card" outlined dense prepend-inner-icon="mdi-magnify"/>
                        </th>
                        <th v-if="$store.state.ui_user.cards.col_card_priceDO" class="text-center f16b">
                            <v-text-field v-model="search.card_priceDO" @keyup="search_card" outlined dense prepend-inner-icon="mdi-magnify"/>
                        </th>

                        <th></th>

                    </tr>

                    </thead>
                    <tbody>
                    <tr v-for="card in pageOfItems" :key="card.card_id" >
                        <td class="text-center f16">{{cards.indexOf(card)+1}}</td>
                        <td v-if="$store.state.ui_user.cards.col_card_name" class="text-center f16">{{card.card_name}}</td>
                        <td v-if="$store.state.ui_user.cards.col_card_priceDinar" class="text-center f16">{{card.card_priceDinar | remove00}}</td>
                        <td v-if="$store.state.ui_user.cards.col_card_priceDO"  class="text-center f16">{{card.card_priceDO | remove00}}</td>
                        <td  class="text-center f16">
                            <v-btn icon @click="set_card_to_edit(card)">
                                <v-icon color="primary">mdi-pencil</v-icon>
                            </v-btn>
                            <v-btn icon @click="set_card_to_delete(card)">
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
            <jw-pagination :pageSize="15" :maxPages="$vuetify.breakpoint.xs?1:10"  :items="cards" :labels="customLabels" :styles="customStyles" @changePage="onChangePage"></jw-pagination>
        </v-card>
        <AddCard/>
        <EditCard/>
        <DeleteCard/>
    </v-card>
</template>

<script>
    import AddCard from "@/components/Cards/AddCard";
    import EditCard from "@/components/Cards/EditCard";
    import DeleteCard from "@/components/Cards/DeleteCard";
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
        name: "Cards",
        components:{
            JwPagination,
            AddCard,
            EditCard,
            DeleteCard
        },
        filters:{
            remove00:function(value)
            {
                if(value != null && value != "" && value != undefined)
                {
                    return Math.trunc(value);
                }
            },
        },
        data(){
            return{
                cards:[],
                loading:false,
                customLabels,
                customStyles,
                pageOfItems: [],
                search:{
                    card_name:'',
                    card_priceDinar:'',
                    card_priceDO:''
                }
            }
        },
        methods:{
            set_card_to_edit(item)
            {
                this.$store.state.cards.target = item;
                this.$store.state.cards.forms.edit_card = true;
            },
            set_card_to_delete(item)
            {
                this.$store.state.cards.target = item;
                this.$store.state.cards.forms.delete_card = true;
            },

            onChangePage(pageOfItems) {
                // update page of items
                this.pageOfItems = pageOfItems;
            },
            async save_ui_cards()
            {
                this.loading = true;
                await this.$axios.post('api/save-ui-cards',this.$store.state.ui_user.cards).then(res=>{

                    this.$fire({
                        title: "نجح",
                        text: res.data.msg,
                        type: "success",
                        timer: 2000
                    });

                    this.$store.commit("GET_UI_CARDS");
                }).catch(err=>{
                    console.log(err)
                }).finally(fin=>{
                    this.loading = false
                })
            },
            search_card()
            {
                var filterd = this.$store.state.cards.cards;

                filterd = filterd.filter(item=>item.card_name.match(this.search.card_name));
                if(this.search.card_priceDinar != "" && this.search.card_priceDinar != null && this.search.card_priceDinar != undefined)
                {
                    filterd = filterd.filter(item=>item.card_priceDinar==this.search.card_priceDinar);
                }
                if(this.search.card_priceDO != "" && this.search.card_priceDO != null && this.search.card_priceDO != undefined)
                {
                    filterd = filterd.filter(item=>item.card_priceDO==this.search.card_priceDO);
                }

                this.cards = filterd;

            }
        },
        computed:{
            get_cards:function () {
                return this.$store.state.cards.cards;
            }
        },
        watch:{
            get_cards:function (new_cards) {
                this.cards = new_cards;
            }
        },
        created(){
            this.$store.commit("GET_CARDS");
        }
    }
</script>

<style scoped>

</style>