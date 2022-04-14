<template>
    <v-dialog max-width="600" class="pa-0 ma-9" v-model="$store.state.store.forms.add_product">
        <v-form lazy-validation v-model="valid" ref="form">
            <v-card :loading="loading" elevation="6"  max-width="600" class="ma-auto">
                <v-card-title class="pink"  style="direction: rtl;color: white">
                    <v-icon large color="white">mdi-cube-outline</v-icon>
                    <span class="mr-2 f16">اضافة مادة</span>
                    <v-spacer/>
                    <v-btn icon @click="$store.state.store.forms.add_product=false">
                        <v-icon large color="white">mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-divider />
                <v-card-text>
                    <v-row  class="ma-0">
                        <v-col cols="12" lg="6" >
                            <v-text-field v-model="item.item_name" :rules="req" outlined label="اسم المادة" prepend-inner-icon="mdi-information"/>
                        </v-col>
                        <v-col cols="12" lg="6">
                            <v-text-field v-model="item.item_count" :rules="req" outlined label="الكمية" prepend-inner-icon="mdi-counter"/>
                        </v-col>
                        <v-col cols="12" lg="6">
                            <v-text-field v-model="item.item_barcode" :rules="req" outlined label="الباركود" prepend-inner-icon="mdi-barcode"/>
                        </v-col>
                        <v-col cols="12" lg="6">
                            <v-text-field v-model="item.item_color" :rules="req" outlined label="اللون" prepend-inner-icon="mdi-palette"/>
                        </v-col>
                        <v-col cols="12" lg="6">
                            <v-text-field class="f14" v-model="item.item_color" :rules="req" outlined label="سعر الشراء بالدينار" prepend-inner-icon="mdi-cash"/>
                        </v-col>
                        <v-col cols="12" lg="6">
                            <v-text-field class="f14" v-model="item.item_color" :rules="req" outlined label="سعر البيع بالدينار" prepend-inner-icon="mdi-cash"/>
                        </v-col>
                        <v-col cols="12" lg="6">
                            <v-text-field v-model="item.item_size" :rules="req" outlined label="الذاكرة" prepend-inner-icon="mdi-memory"/>
                        </v-col>
                        <v-col cols="12" lg="6">
                            <v-text-field v-model="item.item_color" :rules="req" outlined label="المخزن" prepend-inner-icon="mdi-cube"/>
                        </v-col>
                        <v-col cols="12" lg="6">
                            <v-select :items="types" item-value="value" item-text="label" v-model="item.item_type" :rules="req" outlined label="نوع المادة" prepend-inner-icon="mdi-call-merge"/>
                        </v-col>




                    </v-row>

                </v-card-text>
                <v-divider/>
                <v-card-actions style="direction: rtl">
                    <v-btn :loading="loading"  color="primary" large>
                        <v-icon>mdi-check</v-icon>
                        <span class="f16 pa-2">حفظ</span>
                    </v-btn>

                </v-card-actions>

            </v-card>
        </v-form>

    </v-dialog>

</template>

<script>
    export default {
        name: "AddProduct",
        data(){
            return{
                valid:true,
                loading:false,
                item:{
                    item_name:'',
                    item_cat:'',
                    item_priceDinar:'',
                    item_priceDolar:'',
                    item_priceSale:'',
                    item_count:'',
                    item_type:'',
                    item_store:'',
                    item_size:'',
                    item_color:'',
                    item_barcode:'',


                },
                req:[v=>!!v || 'لايمكن ترك هذا الحقل فارغ'],
                types:[
                    {label:'مخزنية',value:1},
                    {label:'خدمية',value:2},
                ]
            }
        }
    }
</script>

<style scoped>

</style>