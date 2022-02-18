<template>
    <v-dialog max-width="500" class="pa-0 ma-9" v-model="$store.state.cards.forms.add_card">
        <v-form lazy-validation v-model="valid" ref="form">
            <v-card :loading="loading" elevation="6"  max-width="500" class="ma-auto">
                <v-card-title class="cardtitle"  style="direction: rtl;color: white">
                    <v-icon large color="white">mdi-credit-card</v-icon>
                    <span class="mr-2 f16">اضافة اشتراك</span>
                    <v-spacer/>
                    <v-btn icon @click="$store.state.cards.forms.add_card=false">
                        <v-icon large color="white">mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-divider />
                <v-card-text>
                    <v-row  class="ma-0">
                        <v-col cols="12" >
                            <v-text-field v-model="card.card_name" :rules="req" outlined label="اسم الاشتراك" prepend-inner-icon="mdi-credit-card"/>
                        </v-col>
                        <v-col cols="12" >
                            <v-text-field v-model="card.card_priceDinar" :rules="req_no" outlined label="سعر الاشتراك بالدينار" prepend-inner-icon="mdi-cash"/>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="card.card_priceDO" :rules="req_no" outlined label="سعر الاشتراك بالدولار" prepend-inner-icon="mdi-currency-usd"/>
                        </v-col>



                    </v-row>

                </v-card-text>
                <v-divider/>
                <v-card-actions style="direction: rtl">
                    <v-btn :loading="loading" @click="add_card"  color="primary" large>
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
        name: "AddCard",

        data(){
            return{
                valid:true,
                loading:false,
                req:[v=>!!v ||'لايمكن ترك هذا الحقل فارغاً'],
                req_no:[v=>!!v&&Number(v) ||'يجب ادخال ارقام فقط'],
                card:{
                    card_name:'',
                    card_priceDinar:'',
                    card_priceDO:'',
                }

            }
        },
        methods:{
            async add_card(){
                if(this.$refs.form.validate())
                {
                    this.loading = true;
                    this.$axios.post('api/add-card',this.card).then(res=>{
                        this.$fire({
                            title: "نجح",
                            text: res.data.msg,
                            type: "success",
                            timer: 2000
                        });
                        this.$refs.form.reset();
                        this.$store.state.cards.forms.add_card = false;
                        this.$store.commit("GET_CARDS")
                    }).catch(err=>{

                    }).finally(fin=>{
                        this.loading = false;
                    })
                }
            }
        },

    }
</script>

<style scoped>

</style>