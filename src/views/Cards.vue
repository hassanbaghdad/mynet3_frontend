<template>
    <v-card class="pa-0" elevation="1">
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
                        <th class="text-center f16b">الاشتراك</th>
                        <th class="text-center f16b">السعر بالدينار</th>
                        <th class="text-center f16b">السعر بالدولار</th>
                        <th class="text-center f16b">خيارات</th>


                    </tr>
                    <tr>
                        <th></th>
                        <th class="text-center f16b">
                            <v-text-field outlined dense prepend-inner-icon="mdi-magnify"/>
                        </th>
                        <th class="text-center f16b">
                            <v-text-field outlined dense prepend-inner-icon="mdi-magnify"/>
                        </th>
                        <th class="text-center f16b">
                            <v-text-field outlined dense prepend-inner-icon="mdi-magnify"/>
                        </th>

                        <th></th>

                    </tr>

                    </thead>
                    <tbody>
                    <tr v-for="card in pageOfItems" :key="card.card_id" >
                        <td class="text-center f16">{{cards.indexOf(card)+1}}</td>
                        <td  class="text-center f16">{{card.card_name}}</td>
                        <td  class="text-center f16">{{card.card_priceDinar}}</td>
                        <td  class="text-center f16">{{card.card_priceDO}}</td>
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
        data(){
            return{
                cards:[],
                customLabels,
                customStyles,
                pageOfItems: [],
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
            this.$store.commit("GET_CARDS")
        }
    }
</script>

<style scoped>

</style>