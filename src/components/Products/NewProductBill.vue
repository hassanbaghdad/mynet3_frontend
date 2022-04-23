<template>
        <v-row justify="center">
            <v-col cols="12" lg="6">
                <v-form lazy-validation v-model="valid" ref="form">
                    <v-card>
                        <v-card-title>
                            <v-icon color="black">mdi-account</v-icon>
                            <span class="f20b mr-2">معلومات العميل</span>
                        </v-card-title>
                        <v-divider/>
                        <v-card-text>
                            <v-row >
                                <v-col cols="12" md="6">
                                    <v-autocomplete @click:prepend="$store.state.customers.forms.add_customer=true" prepend-icon="mdi-plus" class="h25" :rules="req" @change="get_customer_debts(fatora.fatora_cosfk)" v-model="fatora.fatora_cosfk" :items="$store.state.customers.customers" item-text="cost_name" item-value="cost_id" dense outlined label="اسم العميل" ></v-autocomplete>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field-money v-model="fatora.fatora_total_my" class="h25" :options="{precision:0}" :properties="{outlined:true,dense:true,readonly:true}" label="مبلغ الفاتورة" ></v-text-field-money>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field-money :options="{precision:0}" v-model="fatora.fatora_wasel_him" v-bind:valueWhenIsEmpty="0" :properties="{outlined:true,dense:true}" class="h25"  dense outlined label="المبغ الواصل"  @change="remaining_money_calc" @input="remaining_money_calc"></v-text-field-money>

                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field-money :options="{precision:0}" v-model="fatora.remaining_money" :properties="{outlined:true,dense:true,readonly:true}" class="h25" dense outlined label="المبغ المتبقي"></v-text-field-money>

                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field-money :options="{precision:0}" v-model="fatora.debts" :properties="{outlined:true,dense:true,readonly:true}" class="h25" dense outlined label="السابق"></v-text-field-money>

                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field-money :options="{precision:0}" v-model="fatora.sum_debts" :properties="{outlined:true,dense:true,readonly:true}" class="h25" dense outlined label="مجموع الديون" ></v-text-field-money>

                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field-integer  v-model="fatora.fatora_number" :properties="{outlined:true,dense:true,rules:req}" class="h25" dense outlined label="رقم الفاتورة"></v-text-field-integer>

                                </v-col>
                                <v-col cols="12" md="6">
                                    <div style="border: 1px solid ;border-radius: 3px">
                                        <input v-model="fatora.fatora_date"  type="datetime-local" class="pa-2" style="width: 100%;">
                                    </div>

                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field outlined label="الملاحظات"  class="h25 mb-2"  v-model="fatora.fatora_notes" dense></v-text-field>
                                </v-col>

                            </v-row>
                        </v-card-text>
                        <v-divider/>
                        <v-card-title>
                            <v-icon color="black">mdi-file-document-edit-outline</v-icon>
                            <span class="f20b mr-2">الفاتورة</span>
                        </v-card-title>
                        <v-divider/>
                        <v-card-text>
                            <v-simple-table style="direction: rtl">
                                <template v-slot:default>
                                    <thead>

                                    <tr>
                                        <th class="text-center f18">
                                           #
                                        </th>
                                        <th class="text-center f18"> المادة</th>
                                        <th class="text-center f18">الكمية</th>
                                        <th class="text-center f18">سعر البيع</th>
                                        <th class="text-center f18"> الاجمالي</th>
                                        <th class="text-center f18">الكود</th>
                                        <th class="text-center f18">التكلفة</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="(item,i) in item_fatora" :key="'item__'+i">
                                        <td><v-btn outlined @click="delete_item_from_bill(item)" color="error" fab x-small><v-icon dark>mdi-minus</v-icon></v-btn></td>
                                        <td class="text-center f16">{{item.item_name}}</td>
                                        <td class="text-center f16">
                                            <div style="width: 100%;display: flex">
                                                <v-btn @click="increment_count(i)" icon class="d-inline float-right align-self-center"  x-small>
                                                    <v-icon>mdi-plus</v-icon>
                                                </v-btn>
                                                <v-text-field-integer v-model="item_fatora[i].item_count" class="d-inline float-right align-self-center" @keyup="remaining_money_calc" @input="remaining_money_calc"   :properties="{flat:true}"></v-text-field-integer>
                                                <v-btn @click="discrement_count(i)" icon class="d-inline float-right align-self-center"  x-small>
                                                    <v-icon>mdi-minus</v-icon>
                                                </v-btn>
                                            </div>

                                        </td>
                                        <td class="text-center f16">
                                            <v-text-field-money :options="{precision:0}" @input="remaining_money_calc" @keyup="remaining_money_calc" v-model="item_fatora[i].item_priceSale" :properties="{flat:true}"></v-text-field-money>
                                        </td>
                                        <td class="text-center f16">{{parseFloat(item.item_priceSale)*parseInt(item.item_count) |money_iq}}</td>

                                        <td class="text-center f16">{{item.item_barcode}}</td>
                                        <td class="text-center f16">{{item.item_priceDinar | money_iq}}</td>
                                    </tr>

                                    </tbody>
                                </template>
                            </v-simple-table>
                            <v-divider class="mt-4"/>
                            <v-simple-table style="direction: rtl;">
                                <template v-slot:default>
                                    <thead>
                                    <tr>
                                        <td class="text-center f16" colspan="3">المبلغ الاجمالي للفاتورة</td>
                                        <td class="text-center f16">{{fatora.fatora_total_my |money_iq}}</td>
                                    </tr>
                                    </thead>
                                </template>
                            </v-simple-table>
                        </v-card-text>
                        <v-divider/>
                        <v-card-actions>
                            <v-btn class="success" @click="save_bill" :loading="loading">
                                <v-icon>mdi-check</v-icon>
                                <span class="f14">حفظ الغاتورة</span>
                            </v-btn>
                            <v-btn class="error" @click="reset_bill">
                                <v-icon>mdi-delete</v-icon>
                                <span class="f14">تفريغ</span>
                            </v-btn>

                        </v-card-actions>
                    </v-card>
                </v-form>
            </v-col>
            <v-col cols="12" lg="6">
                <v-card>
                    <v-card-title>
                        <v-icon color="black">mdi-cube-outline</v-icon>
                        <span class="f20b mr-2">المنتجات المخزونة</span>
                    </v-card-title>
                    <v-divider/>
                    <v-card-text>
                        <v-text-field @keyup="search_item" @input="search_item" v-model="search.item_barcode" autofocus label="البحث بالاسم او الباركود"  outlined dense prepend-inner-icon="mdi-magnify"/>
                        <v-divider/>
                        <v-simple-table style="direction: rtl">
                            <template v-slot:default>
                                <thead>

                                <tr>
                                    <th class="text-center f18">ت</th>
                                    <th class="text-center f18"> المادة</th>
                                    <th class="text-center f18">الصنف</th>
                                    <th class="text-center f18"> الشراء</th>
                                    <th class="text-center f18"> البيع</th>
                                    <th class="text-center f18">الكمية</th>
                                    <th class="text-center f18">الكود</th>
                                    <th class="text-center f18">المخزن</th>

                                </tr>
                                <tr>
                                    <th></th>
                                    <th class="text-center f16b">
                                        <v-text-field @keyup="search_item" v-model="search.item_name"  outlined dense prepend-inner-icon="mdi-magnify"/>
                                    </th>
                                    <th class="text-center f16b">
                                        <v-text-field @keyup="search_item" v-model="search.item_cat"  outlined dense prepend-inner-icon="mdi-magnify"/>
                                    </th>

                                    <th class="text-center f16b">
                                        <v-text-field-integer :properties="{outlined:true,dense:true,'prepend-inner-icon':'mdi-magnify'}" @keyup="search_item" @input="search_item"  v-model="search.item_priceDinar"  outlined dense prepend-inner-icon="mdi-magnify"/>
                                    </th>
                                    <th class="text-center f16b">
                                        <v-text-field-integer  :properties="{outlined:true,dense:true,'prepend-inner-icon':'mdi-magnify'}" @keyup="search_item" @input="search_item"  v-model="search.item_priceSale"   outlined dense prepend-inner-icon="mdi-magnify"/>
                                    </th>
                                    <th class="text-center f16b">
                                        <v-text-field-integer  :properties="{outlined:true,dense:true,'prepend-inner-icon':'mdi-magnify'}" @keyup="search_item" @input="search_item"  v-model="search.item_count"   outlined dense prepend-inner-icon="mdi-magnify"/>
                                    </th>
                                    <th class="text-center f16b">
                                        <v-text-field  @keyup="search_item" v-model="search.item_barcode"  outlined dense prepend-inner-icon="mdi-magnify"/>
                                    </th>
                                    <th class="text-center f16b">
                                        <v-text-field-integer  :properties="{outlined:true,dense:true,'prepend-inner-icon':'mdi-magnify'}" @keyup="search_item" @input="search_item" v-model="search.item_store"  outlined dense prepend-inner-icon="mdi-magnify"/>
                                    </th>



                                </tr>

                                </thead>
                                <tbody>
                                <tr v-for="item in products" :key="'item____'+item.item_id" @click="append_to_items_bill(item)" style="cursor: pointer">
                                    <th class="text-center f16">{{products.indexOf(item)+1}}</th>
                                    <th class="text-center f16">{{item.item_name}}</th>
                                    <th class="text-center f16">{{item.item_cat}}</th>
                                    <th class="text-center f16">{{item.item_priceDinar}}</th>
                                    <th class="text-center f16">{{item.item_priceSale}}</th>
                                    <th class="text-center f16"><p v-text="item.item_count"></p></th>
                                    <th class="text-center f16">{{item.item_barcode}}</th>
                                    <th class="text-center f16">{{item.item_store}}</th>


                                </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </v-card-text>
                    <v-divider/>
                    <v-card elevation="1" class="f14 text-center pa-4">
                        <jw-pagination :pageSize="10" :maxPages="$vuetify.breakpoint.xs?1:10"  :items="products" :labels="customLabels" :styles="customStyles" @changePage="onChangePage"></jw-pagination>
                    </v-card>
                    <AddCustomer/>
                </v-card>
            </v-col>


        </v-row>

</template>

<script>


    import JwPagination from "jw-vue-pagination";
import AddCustomer from "@/components/Customers/AddCustomer";
    import moment from "moment";

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
        name: "NewProductBill",
        components:{
           JwPagination,
            AddCustomer
        },
        filters:{
            money_iq:function(value){
                if(value != null || value != 0 || value !=undefined)
                {
                    value = Math.trunc(value);
                    return value.toLocaleString('en-IQ')
                }
            },
        },
        data(){
            return{
                customLabels,
                customStyles,
                pageOfItems: [],
                valid:true,
                loading:false,
                products:this.$store.state.store_products.products,
                sum_price_fatora:0,
                fatora:{
                    fatora_date:moment(new Date()).format('YYYY-MM-DDTHH:mm'),
                    fatora_SaveDate:moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
                    fatora_number:'',
                    fatora_numberItems:'',
                    fatora_total_my:0,
                    fatora_wasel_him:0,
                    fatora_pushtype:'',
                    fatora_user:'',
                    fatora_type:'',
                    fatora_cosfk:'',
                    fatora_notes:'',
                    debts:0,
                    remaining_money:0,
                    sum_debts:0
                },
                item_fatora:[],
                req:[v=>!!v || 'هذا الحقل مطلوب'],
                search:{
                    item_name:'',
                    item_cat:'',
                    item_priceDinar:'',
                    item_priceSale:'',
                    item_count:'',
                    item_type:1,
                    item_store:'',
                    item_barcode:'',
                }

            }
        },
        methods:{
            increment_count(index)
            {
                this.item_fatora[index].item_count += 1;
                this.fatora.fatora_total_my += parseFloat(this.item_fatora[index].item_priceSale);
                this.remaining_money_calc();
            },
            discrement_count(index)
            {
                if(this.item_fatora[index].item_count > 1)
                {
                    this.item_fatora[index].item_count -= 1;
                    this.fatora.fatora_total_my -= parseFloat(this.item_fatora[index].item_priceSale);
                    this.remaining_money_calc();
                }

            },
            onChangePage(pageOfItems) {
                // update page of items
                this.pageOfItems = pageOfItems;
            },
            append_to_items_bill(item2)
            {
                //Copy Products array to fix auto edited for element from products
                var copy_products = JSON.parse(JSON.stringify(this.products));

                copy_products = copy_products.filter(ite=>ite.item_id==item2.item_id);

                var item = copy_products[0];
                //Check if item in fatora or no
                if(this.item_fatora.filter(it=>it.item_id == item.item_id).length > 0)
                {
                    for (var i in this.item_fatora) {
                        if (this.item_fatora[i].item_id == item.item_id) {
                            if(this.item_fatora[i].item_priceSale != null && this.item_fatora[i].item_priceSale != "" && this.item_fatora[i].item_priceSale != undefined)
                            {

                                this.fatora.fatora_total_my += parseFloat(this.item_fatora[i].item_priceSale);
                                this.item_fatora[i].item_count += 1;
                                //this.remaining_money_calc();
                                break; //Stop this loop, we found it!
                            }
                        }
                    }


                }else {
                    //append New item in fatora
                    item.item_count = 1;
                    this.fatora.fatora_total_my += item.item_priceSale;
                    this.item_fatora.push(item);
                    this.remaining_money_calc();

                }


            },
            delete_item_from_bill(item)
            {
                for (var i in this.item_fatora) {
                    if (this.item_fatora[i].item_id == item.item_id) {
                        this.fatora.fatora_total_my -= parseFloat(this.item_fatora[i].item_priceSale);
                        this.item_fatora.splice(i,1);
                        this.remaining_money_calc();
                        break; //Stop this loop, we found it!
                    }
                }
                if(this.item_fatora.length ==0)
                {
                    this.fatora_total_my = 0 ;
                }
            },
            clear_fatora()
            {
                this.item_fatora = [];
                this.fatora.fatora_total_my = 0;
            },
            remaining_money_calc()
            {
                //if(this.fatora.fatora_total_my != null && this.fatora.fatora_total_my !="" && this.fatora.fatora_wasel_him !=null && this.fatora.fatora_wasel_him != "")
                //{
                    if(this.fatora.fatora_wasel_him == null || this.fatora.fatora_wasel_him =="" || this.fatora.fatora_wasel_him ==undefined)
                    {
                        this.fatora.fatora_wasel_him = 0 ;
                    }

                    // this.fatora.remaining_money = total - wasel;
                    // //console.log(this.fatora.debts)
                    // this.fatora.sum_debts = (total - wasel) + parseFloat(this.fatora.debts);
                    this.fatora.fatora_total_my = 0 ;
                    for (var y in this.item_fatora)
                    {
                       this.fatora.fatora_total_my += parseFloat(this.item_fatora[y].item_priceSale) * parseInt(this.item_fatora[y].item_count);

                    }
                    var total = parseFloat(this.no_zero(this.fatora.fatora_total_my));
                    var wasel = parseFloat(this.no_zero(this.fatora.fatora_wasel_him));
                    this.fatora.remaining_money = total - wasel;
                    //console.log(this.fatora.debts)
                    this.fatora.sum_debts = (total - wasel) + parseFloat(this.fatora.debts);
                //}
            },
            async get_customer_debts(cost_id)
            {
                this.fatora.fatora_total_my = 0 ;
                this.fatora.fatora_wasel_him = 0 ;
                this.fatora.debts = 0 ;
                this.fatora.sum_debts = 0 ;
                this.fatora.remaining_money = 0 ;
                this.item_fatora = [] ;



                await this.$axios.post('api/get-customer-fatora-debts',{cost_id:cost_id}).then(res=>{
                    if(res.data.debts != null && res.data.debts != "")
                    {
                        this.fatora.debts = parseFloat(res.data.debts);
                        this.remaining_money_calc();
                    }else{
                        this.fatora.debts = 0 ;
                    }
                })
            },
            no_zero(model)
            {
                if(model == "" || model == null)
                {
                    model = 0 ;
                }
                return model;
            },
            async save_bill()
            {
                if(this.$refs.form.validate()) {

                    if (this.item_fatora.length > 0) {
                        this.fatora.fatora_date = moment(this.fatora.fatora_date).format('YYYY-MM-DD hh:mm:ss');
                        this.loading = true;
                        await this.$axios.post('api/save-fatora', {
                            fatora: this.fatora,
                            item_fatora: this.item_fatora
                        }).then(res => {

                            this.$fire({
                                title: "نجح",
                                text: res.data.msg,
                                type: "success",
                                timer: 2000
                            });
                            this.$store.state.store_products.products = res.data.items;

                            this.reset_bill();
                        }).catch(err => {
                            console.log(err)
                        }).finally(fin => {
                            this.loading = false;
                        })
                    } else {
                        this.$fire({
                            title: "عفوا",
                            text: "لايمكن حفظ فاتورة فارغة",
                            type: "warning",
                            timer: 3000
                        });
                    }

                }
            },
            reset_bill(){
                this.$refs.form.reset();
                this.clear_fatora();
                this.fatora.fatora_date = moment(new Date()).format('YYYY-MM-DDTHH:mm');
            },
            search_item(){
                var filtered = this.$store.state.store_products.products;

                filtered = filtered.map(x=>{
                    if(x.item_name == null || x.item_name == "" || x.item_name == undefined)
                    {
                        x.item_name = "";
                    }else{
                        x.item_name = x.item_name.toString();
                    }
                    if(x.item_cat == null || x.item_cat == "" || x.item_cat == undefined)
                    {
                        x.item_cat = "";
                    }else{
                        x.item_cat = x.item_cat.toString();
                    }
                    if(x.item_priceDinar == null || x.item_priceDinar == "" || x.item_priceDinar == undefined)
                    {
                        x.item_priceDinar = "";
                    }else{
                        x.item_priceDinar = parseFloat(x.item_priceDinar);
                    }
                    if(x.item_priceSale == null || x.item_priceSale == "" || x.item_priceSale == undefined)
                    {
                        x.item_priceSale = "";
                    }else{
                        x.item_priceSale = parseFloat(x.item_priceSale);
                    }
                    if(x.item_count == null || x.item_count == "" || x.item_count == undefined)
                    {
                        x.item_count = "";
                    }else{
                        x.item_count = parseInt(x.item_count);
                    }
                    if(x.item_type == null || x.item_type == "" || x.item_type == undefined)
                    {
                        x.item_type = 1;
                    }
                    if(x.item_store == null || x.item_store == "" || x.item_store == undefined)
                    {
                        x.item_store = "";
                    }else{
                        x.item_store = x.item_store.toString();
                    }
                    if(x.item_barcode == null || x.item_barcode == "" || x.item_barcode == undefined)
                    {
                        x.item_barcode = "";
                    }else{
                        x.item_barcode = x.item_barcode.toString();
                    }
                    return x;

                });
                if(this.search.item_name != null && this.search.item_name !="" && this.search.item_name != undefined)
                {
                    filtered = filtered.filter(item=>item.item_name.match(this.search.item_name));
                }
                if(this.search.item_cat != null && this.search.item_cat !="" && this.search.item_cat != undefined)
                {
                    filtered = filtered.filter(item=>item.item_cat.match(this.search.item_cat));
                }
                if(this.search.item_priceDinar != null && this.search.item_priceDinar !="" && this.search.item_priceDinar != undefined)
                {
                    filtered = filtered.filter(item=>item.item_priceDinar.match(this.search.item_priceDinar));
                }
                if(this.search.item_priceSale != null && this.search.item_priceSale !="" && this.search.item_priceSale != undefined)
                {
                    filtered = filtered.filter(item=>item.item_priceSale.match(this.search.item_priceSale));
                }
                if(this.search.item_count != null && this.search.item_count !="" && this.search.item_count != undefined)
                {
                    filtered = filtered.filter(item=>item.item_count.match(this.search.item_count));
                }
                if(this.search.item_store != null && this.search.item_store !="" && this.search.item_store != undefined)
                {
                    filtered = filtered.filter(item=>item.item_store.match(this.search.item_store));
                }
                if(this.search.item_barcode != null && this.search.item_barcode !="" && this.search.item_barcode != undefined)
                {
                    filtered = filtered.filter(item=>item.item_barcode.match(this.search.item_barcode));
                }



                this.products = filtered;

            }


        },

        created()
        {
            this.$store.commit("GET_ITEMS")

        },
        computed:{
            get_products:function () {
                return this.$store.state.store_products.products;
            }
        },
        watch:{
            get_products:function (new_products) {
                this.products = new_products;
            }
        },


    }
</script>

<style scoped>
    .h25{
        max-height: 30px;
    }
</style>