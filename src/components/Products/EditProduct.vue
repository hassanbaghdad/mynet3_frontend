<template>
    <v-dialog max-width="600" class="pa-0 ma-9" v-model="$store.state.store_products.forms.edit_product">
        <v-form lazy-validation v-model="valid" ref="form">
            <v-card :loading="loading" elevation="6"  max-width="600" class="ma-auto">
                <v-card-title class="orange"  style="direction: rtl;color: white">
                    <v-icon large color="white">mdi-pencil</v-icon>
                    <span class="mr-2 f16">تعديل مادة</span>
                    <v-spacer/>
                    <v-btn icon @click="$store.state.store_products.forms.edit_product=false">
                        <v-icon large color="white">mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-divider />
                <v-card-text>
                    <v-row  class="ma-0">
                        <v-col cols="12" lg="6" >
                            <v-text-field class="h60" v-model="item.item_name" :rules="req" outlined label="اسم المادة" prepend-inner-icon="mdi-information"/>
                        </v-col>
                        <v-col cols="12" lg="6" >
                            <v-text-field class="h60" v-model="item.item_cat"  outlined label="صنف المادة" prepend-inner-icon="mdi-information"/>
                        </v-col>

                        <v-col cols="12" lg="6">
                            <v-text-field-integer v-model="item.item_count" :properties="{outlined:true,'prepend-inner-icon':'mdi-counter'}" label="الكمية"></v-text-field-integer>
                        </v-col>
                        <v-col cols="12" lg="6">
                            <v-text-field class="h60" v-model="item.item_barcode"  outlined label="الباركود" prepend-inner-icon="mdi-barcode"/>
                        </v-col>
                        <v-col cols="12" lg="6">
                            <v-text-field-integer v-model="item.item_priceDinar" :properties="{outlined:true,'prepend-inner-icon':'mdi-cash'}" label="سعر الشراء بالدينار"></v-text-field-integer>
                        </v-col>
                        <v-col cols="12" lg="6">
                            <v-text-field-integer v-model="item.item_priceSale" :properties="{outlined:true,'prepend-inner-icon':'mdi-cash'}" label="سعر البيع بالدينار"></v-text-field-integer>
                        </v-col>
                        <v-col cols="12" lg="6">
                            <v-text-field-integer v-model="item.item_store" :properties="{outlined:true,'prepend-inner-icon':'mdi-cube'}" label="المخزن"></v-text-field-integer>
                        </v-col>
                        <v-col cols="12" lg="6">
                            <v-select class="h60" :items="types" item-value="value" item-text="label" v-model="item.item_type"  outlined label="نوع المادة" prepend-inner-icon="mdi-call-merge"/>
                        </v-col>




                    </v-row>

                </v-card-text>
                <v-divider/>
                <v-card-actions style="direction: rtl">
                    <v-btn :loading="loading" @click="edit_item" color="primary" large>
                        <v-icon>mdi-check</v-icon>
                        <span class="f16 pa-2">تعديل</span>
                    </v-btn>
                    <v-btn outlined @click="$store.state.store_products.forms.edit_product=false" color="primary" large>
                        <v-icon>mdi-close</v-icon>
                        <span class="f16 pa-2">اللغاء</span>
                    </v-btn>

                </v-card-actions>

            </v-card>
        </v-form>

    </v-dialog>

</template>

<script>
    export default {
        name: "EditProduct",
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
        },
        methods:{
            async edit_item()
            {
                this.loading = true;
                await  this.$axios.post('api/edit-item',this.item).then(res=>{
                    this.$store.commit("GET_ITEMS");
                    this.$fire({
                        title: "نجح",
                        text: res.data.msg,
                        type: "success",
                        timer: 2000
                    });

                }).catch(err=>{
                    console.log(err)
                }).finally(fin=>{
                    this.loading = false;
                })
            }
        },
        computed:{
            get_item:function () {
                return this.$store.state.store_products.forms.edit_product;
            }
        },
        watch:{
            get_item:function (form) {
                if(form)
                {
                    this.item = this.$store.state.store_products.target_item;
                }
            }
        },

    }
</script>

<style scoped>
.h60{
    max-height: 60px;
}
</style>