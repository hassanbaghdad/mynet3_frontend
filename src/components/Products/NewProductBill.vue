<template>
        <v-row justify="center">
            <v-col cols="7">
                <v-card>
                    <v-card-text>
                        <table style="font-size: 10px !important;width: 100%">
                            <tr>
                                <th colspan="2">
                                    <v-select :items="$store.state.customers.customers" item-text="cost_name" item-value="cost_id" dense outlined label="اسم العميل" ></v-select>

                                </th>
                                <th>
                                    <v-text-field dense outlined label="مبلغ الفاتورة" ></v-text-field>

                                </th>
                                <th>

                                </th>

                            </tr>
                            <tr>
                                <th>
                                    <v-text-field dense outlined label="المبغ الواصل" ></v-text-field>
                                </th>
                                <th>
                                    <v-text-field dense outlined label="المبغ المتبقي"></v-text-field>

                                </th>
                                <th>
                                    <v-text-field dense outlined label="السابق"></v-text-field>

                                </th>
                            </tr>
                            <tr>
                                <th>
                                    <v-text-field dense outlined label="مجموع الديون" ></v-text-field>
                                </th>
                                <th>
                                    <v-text-field dense outlined label="رقم الفاتورة"></v-text-field>

                                </th>
                                <th>
                                    <v-text-field dense outlined label="تاريخ الفاتورة"></v-text-field>

                                </th>
                            </tr>

                        </table>

                    </v-card-text>
                    <v-divider/>
                    <v-card-text>
                        <v-simple-table style="direction: rtl">
                            <template v-slot:default>
                                <thead>

                                <tr>
                                    <th class="text-center f18">#</th>
                                    <th class="text-center f18">اسم المادة</th>
                                    <th class="text-center f18">الكمية</th>
                                    <th class="text-center f18">سعر البيع بالدينار</th>
                                    <th class="text-center f18">السعر الاجمالي</th>
                                    <th class="text-center f18">اللون</th>
                                    <th class="text-center f18">الذاكرة</th>
                                    <th class="text-center f18">الكود</th>
                                    <th class="text-center f18">التكلفة</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(item,i) in items2" :key="'item__'+i">
                                    <td><v-btn @click="delete_item_from_bill(item)" color="error" fab x-small><v-icon dark>mdi-minus</v-icon></v-btn></td>
                                    <td class="text-center f16">{{item.item_name}}</td>
                                    <td class="text-center f16">{{item.item_count}}</td>
                                    <td class="text-center f16">{{item.item_priceDinar}}</td>
                                    <td class="text-center f16">{{parseFloat(item.item_priceDinar)*parseInt(item.item_count)}}</td>
                                    <td class="text-center f16">{{item.item_color}}</td>
                                    <td class="text-center f16">{{item.item_memory}}</td>
                                    <td class="text-center f16">{{item.item_barcode}}</td>
                                    <td class="text-center f16">0</td>
                                </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="5">
                <v-card>
                    <v-card-text>
                        <v-text-field label="البحث بالاسم او الباركود"  outlined dense prepend-inner-icon="mdi-magnify"/>
                        <v-divider/>
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
                                    <th class="text-center f18">اللون</th>
                                    <th class="text-center f18">الذاكرة</th>
                                    <th class="text-center f18">المخزن</th>
                                </tr>
                                <tr>
                                    <th></th>
                                    <th class="text-center f16b">
                                        <v-text-field  outlined dense prepend-inner-icon="mdi-magnify"/>
                                    </th>
                                    <th class="text-center f16b">
                                        <v-text-field  outlined dense prepend-inner-icon="mdi-magnify"/>
                                    </th>

                                    <th class="text-center f16b">
                                        <v-text-field  outlined dense prepend-inner-icon="mdi-magnify"/>
                                    </th>
                                    <th class="text-center f16b">
                                        <v-text-field  outlined dense prepend-inner-icon="mdi-magnify"/>
                                    </th>
                                    <th class="text-center f16b">
                                        <v-text-field  outlined dense prepend-inner-icon="mdi-magnify"/>
                                    </th>
                                    <th class="text-center f16b">
                                        <v-text-field  outlined dense prepend-inner-icon="mdi-magnify"/>
                                    </th>
                                    <th class="text-center f16b">
                                        <v-text-field  outlined dense prepend-inner-icon="mdi-magnify"/>
                                    </th>
                                    <th class="text-center f16b">
                                        <v-text-field  outlined dense prepend-inner-icon="mdi-magnify"/>
                                    </th>


                                </tr>

                                </thead>
                                <tbody>
                                <tr v-for="item in products" :key="'item____'+item.item_id" @click="append_to_items_bill(item)" style="cursor: pointer">
                                    <th class="text-center f16">{{products.indexOf(item)+1}}</th>
                                    <th class="text-center f16">{{item.item_name}}</th>
                                    <th class="text-center f16">{{item.item_cat}}</th>
                                    <th class="text-center f16">{{item.item_priceDinar}}</th>
                                    <th class="text-center f16">{{parseFloat(item.item_priceDinar)*parseInt(item.item_count)}}</th>
                                    <th class="text-center f16"><p v-text="item.item_count"></p></th>
                                    <th class="text-center f16">{{item.item_color}}</th>
                                    <th class="text-center f16">-</th>
                                    <th class="text-center f16">1</th>

                                </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </v-card-text>
                    <v-divider/>
<!--                    <v-card elevation="1" class="f14 text-center pa-4">-->
<!--                        <jw-pagination :pageSize="10" :maxPages="$vuetify.breakpoint.xs?1:10"  :items="products" :labels="customLabels" :styles="customStyles" @changePage="onChangePage"></jw-pagination>-->
<!--                    </v-card>-->
                </v-card>
            </v-col>


        </v-row>
</template>

<script>


    //import JwPagination from "jw-vue-pagination";

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
          //  JwPagination
        },
        data(){
            return{
                customLabels,
                customStyles,
                pageOfItems: [],
                products:this.$store.state.store_products.products,
                items2:[]
            }
        },
        methods:{
            onChangePage(pageOfItems) {
                // update page of items
                this.pageOfItems = pageOfItems;
            },
            append_to_items_bill(item2)
            {
                const item = item2;
                if(this.items2.filter(it=>it.item_id == item.item_id).length > 0)
                {
                    for (var i in this.items2) {
                        if (this.items2[i].item_id == item.item_id) {
                            this.items2[i].item_count += 1;
                            break; //Stop this loop, we found it!
                        }
                    }
                    // for (var p in this.products) {
                    //     if (this.products[p].item_id == item.item_id) {
                    //         this.products[p2].item_count = parseInt(this.products[p2].item_count)-1 ;
                    //         break; //Stop this loop, we found it!
                    //     }
                    // }

                }else{
                    // for (var p2 in this.products) {
                    //     if (this.products[p2].item_id == item.item_id) {
                    //         this.products[p2].item_count = parseInt(this.products[p2].item_count)-1 ;
                    //         break; //Stop this loop, we found it!
                    //     }
                    // }
                    item.item_count = 1;

                    this.items2.push(item);


                }

                console.log( this.items2)
            },
            delete_item_from_bill(item)
            {
                for (var i in this.items2) {
                    if (this.items2[i].item_id == item.item_id) {
                        console.log(this.items2)
                        this.items2.splice(i,1);
                        break; //Stop this loop, we found it!
                    }
                }
            }
        },

        created()
        {
            this.products = this.$store.state.store_products.products;

        }

    }
</script>

<style scoped>

</style>