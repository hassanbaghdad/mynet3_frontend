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
                        <v-btn fab small color="blue"  v-bind="attrs" v-on="on" @click="$store.state.store_products.forms.add_product=true">
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
                    <th class="text-center f18">تاريخ الاضافة</th>
                    <th class="text-center f18">المخزن</th>
                    <th class="text-center f18">خيارات</th>
                    </tr>
                    <tr>
                        <th></th>
                        <th class="text-center f16b">
                            <v-text-field v-model="search.item_name" @keyup="search_item" outlined dense prepend-inner-icon="mdi-magnify"/>
                        </th>
                        <th class="text-center f16b">
                            <v-text-field v-model="search.item_cat" @keyup="search_item" outlined dense prepend-inner-icon="mdi-magnify"/>
                        </th>
                        <th class="text-center f16b">
                            <v-text-field  v-model="search.item_priceDinar" @keyup="search_item" outlined dense prepend-inner-icon="mdi-magnify"/>
                        </th>
                        <th class="text-center f16b">
                            <v-text-field  v-model="search.item_priceSale" @keyup="search_item" outlined dense prepend-inner-icon="mdi-magnify"/>
                        </th>
                        <th class="text-center f16b">
                            <v-text-field  v-model="search.item_count" @keyup="search_item" outlined dense prepend-inner-icon="mdi-magnify"/>
                        </th>
                        <th class="text-center f16b">

                        </th>
                        <th class="text-center f16b">

                        </th>
                        <th class="text-center f16b">
                            <v-text-field  v-model="search.created_at" @keyup="search_item" outlined dense prepend-inner-icon="mdi-magnify"/>
                        </th>
                        <th class="text-center f16b">
                            <v-text-field  v-model="search.item_store" @keyup="search_item" outlined dense prepend-inner-icon="mdi-magnify"/>
                        </th>

                        <th></th>

                    </tr>

                    </thead>
                    <tbody>
                        <tr v-for="p in pageOfItems" :key="'p_p_'+p.item_id">
                            <th class="text-center f16">{{products.indexOf(p)+1}}</th>
                            <th class="text-center f16">{{p.item_name}}</th>
                            <th class="text-center f16">{{p.item_cat}}</th>
                            <th class="text-center f16">{{p.item_priceDinar}}</th>
                            <th class="text-center f16">{{p.item_priceSale}}</th>
                            <th class="text-center f16">{{p.item_count}}</th>
                            <th class="text-center f16">{{p.item_count*p.item_priceDinar}}</th>
                            <th class="text-center f16">{{p.item_count*p.item_priceSale}}</th>
                            <th class="text-center f16">{{p.created_at | from_now}}</th>
                            <th class="text-center f16">{{p.item_store}}</th>
                            <th class="text-center f16">
                                <v-row justify="center">
                                    <v-col cols="6">
                                        <v-btn @click="set_product_to_edit(p)" icon small class="d-inline-block">
                                            <v-icon color="primary">mdi-pencil</v-icon>
                                        </v-btn>
                                    </v-col>
                                   <v-col cols="6">
                                       <v-btn @click="set_product_to_delete(p)" icon small class="d-inline-block">
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
        <v-card elevation="1" class="f14 text-center pa-4">
            <jw-pagination :pageSize="10" :maxPages="$vuetify.breakpoint.xs?1:10"  :items="products" :labels="customLabels" :styles="customStyles" @changePage="onChangePage"></jw-pagination>
        </v-card>
        <AddProduct/>
        <EditProduct/>
        <DeleteProduct/>
    </v-card>
</template>

<script>

    import AddProduct from "@/components/Products/AddProduct";
    import EditProduct from "@/components/Products/EditProduct";
    import DeleteProduct from "@/components/Products/DeleteProduct";
    import JwPagination from 'jw-vue-pagination';
    import moment from 'moment'

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
        name: "StoreProducts",
        components:{
            DeleteProduct,
            AddProduct,
            EditProduct,
            JwPagination,
        },
        filters:{
            from_now:function (value) {

                return moment(value).format('YYYY-MM-DD');
            }
        },
        data(){
            return{
                customLabels,
                customStyles,
                pageOfItems: [],
                products:[],
                search:{
                    item_name:'',
                    item_cat:'',
                    item_priceDinar:'',
                    item_priceDolar:'',
                    item_priceSale:'',
                    item_count:'',
                    item_type:'',
                    item_store:'',
                    item_size:'',
                    item_barcode:'',
                    created_at:''
                },
                types:[
                    {label:'مخزنية',value:'1'},
                    {label:'خدمية',value:'2'},
                ]
            }
        },
        methods:{
            onChangePage(pageOfItems) {
                // update page of items
                this.pageOfItems = pageOfItems;
            },
            set_product_to_edit(item)
            {
                this.$store.state.store_products.target_item = item;
                this.$store.state.store_products.forms.edit_product=true;
            },
            set_product_to_delete(item)
            {
                this.$store.state.store_products.target_item = item;
                this.$store.state.store_products.forms.delete_product=true;
            },
            search_item()
            {
                var filtered = this.$store.state.store_products.products;

                filtered = filtered.map(x=>{
                    if(x.item_cat == null || x.item_cat == undefined)
                    {
                        x.item_cat = "";
                    }
                    if(x.item_priceDinar != null && x.item_priceDinar != undefined)
                    {
                        x.item_priceDinar = x.item_priceDinar.toString();
                    }else{
                        x.item_priceDinar = "";
                    }
                    if(x.item_priceDolar != null && x.item_priceDolar != undefined)
                    {
                        x.item_priceDolar = x.item_priceDolar.toString();
                    }else{
                        x.item_priceDolar = "";
                    }
                    if(x.item_priceSale != null && x.item_priceSale != undefined)
                    {
                        x.item_priceSale = x.item_priceSale.toString();
                    }else{
                        x.item_priceSale = "";
                    }
                    if(x.item_count != null && x.item_count != undefined)
                    {
                        x.item_count = x.item_count.toString();
                    }else{
                        x.item_count = "";
                    }
                    if(x.item_type != null && x.item_type != undefined)
                    {
                        x.item_type = x.item_type.toString();
                    }else{
                        x.item_type = "";
                    }
                    if(x.item_store != null && x.item_store != undefined)
                    {
                        x.item_store = x.item_store.toString();
                    }else{
                        x.item_store = "";
                    }
                    if(x.item_size != null && x.item_size != undefined)
                    {
                        x.item_size = x.item_size.toString();
                    }else{
                        x.item_size = "";
                    }
                    if(x.item_barcode != null && x.item_barcode != undefined)
                    {
                        x.item_barcode = x.item_barcode.toString();
                    }else{
                        x.item_barcode = "";
                    }
                    return x;

                });

                filtered = filtered.filter(item=>item.item_name.match(this.search.item_name));
                filtered = filtered.filter(item=>item.item_cat.match(this.search.item_cat));
                filtered = filtered.filter(item=>item.item_priceDinar.match(this.search.item_priceDinar));
                filtered = filtered.filter(item=>item.item_priceDolar.match(this.search.item_priceDolar));
                filtered = filtered.filter(item=>item.item_priceSale.match(this.search.item_priceSale));
                filtered = filtered.filter(item=>item.item_size.match(this.search.item_size));
                filtered = filtered.filter(item=>item.item_count.match(this.search.item_count));
                filtered = filtered.filter(item=>item.item_type.match(this.search.item_type));
                filtered = filtered.filter(item=>item.item_store.match(this.search.item_store));
                filtered = filtered.filter(item=>item.item_barcode.match(this.search.item_barcode));

                this.products = filtered;
            }

        },
        created(){
            this.$store.commit("GET_ITEMS");
        },
        computed:{
            get_items:function () {
                return this.$store.state.store_products.products;
            }
        },
        watch:{
            get_items:function (new_products) {
                this.products = new_products;
            }
        },

    }
</script>

<style scoped>

</style>