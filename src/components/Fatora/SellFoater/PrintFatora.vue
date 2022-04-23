<template>
    <v-container>
        <v-dialog max-width="600" class="pa-0 ma-9" v-model="$store.state.foater.forms.print_sell_fatora">
        <v-card>
            <v-card-title>
                <v-icon>mdi-printer</v-icon>
                <span class="f16 mr-2">طباعة فاتورة</span>

                <v-spacer/>
                <v-btn icon @click="$store.state.foater.forms.print_sell_fatora=false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-divider/>
            <v-card-text>
                <div id="printMe" >
                    <table class="text-center mt-4 pa-4 f16" style="direction: rtl;font-family: Cairo !important;width: 100%;height: 100%;border: 1px solid black !important;">
                        <thead>
                        <tr class="ma-0 pa-0" style="border: 1px solid black !important">
                            <th scope="col" colspan="2" class="ma-0 pa-0" style="padding: 0px !important;border: 1px solid black !important">
                                <div class="d-flex text-center ma-0 pa-4" style="background-color: #4e4e4e;color: white;height: 100px;width: 100%">

                                    <v-row justify="center">
                                        <v-col cols="12">
                                            <span style="width: 100%;">{{$store.state.settings.site_name}}</span>
                                        </v-col>
                                        <v-col cols="6">
                                            <span style="float: right">{{$store.state.settings.address}}</span>
                                        </v-col>
                                        <v-col cols="6">
                                            <span style="float: left">{{$store.state.settings.phone}}</span>
                                        </v-col>
                                    </v-row>

                                </div>

                            </th>
                        </tr>
                        <tr style="border: 1px solid black !important">
                            <th style="background-color: #dfdfdf;padding: 0px !important ; margin: 0px !important;border: 1px solid black !important" scope="col">
                                <div >
                                    نوع الفاتورة
                                </div>
                            </th>
                            <th style="border: 1px solid black !important"  scope="col">
                                {{fatora.fatora_type | fatora_type}}
                            </th>
                        </tr>
                        <tr>
                            <th style="background-color: #dfdfdf;padding: 0px !important ; margin: 0px !important;border: 1px solid black !important" scope="col">
                                رقم الفاتورة
                            </th>
                            <th style="border: 1px solid black !important" scope="col">
                                {{fatora.fatora_number}}
                            </th>
                        </tr>
                        <tr>
                            <th style="background-color: #dfdfdf;padding: 0px !important ; margin: 0px !important;border: 1px solid black !important" scope="col">
                                تاريخ الفاتورة</th>
                            <th  style="border: 1px solid black !important" scope="col">
                                {{fatora.fatora_date |datefilter}}
                            </th>
                        </tr>
                        <tr>
                            <th style="background-color: #dfdfdf;padding: 0px !important ; margin: 0px !important;border: 1px solid black !important" scope="col">
                                اسم المشترك
                            </th>
                            <th  style="border: 1px solid black !important" scope="col">
                                {{fatora.cost_name}}
                            </th>
                        </tr>
                        <tr  >
                            <th style="background-color: #dfdfdf;padding: 0px !important ; margin: 0px !important;border: 1px solid black !important" scope="col">
                                المبلغ الكلي
                            </th>
                            <th  style="border: 1px solid black !important;font-weight: bold !important;" scope="col" class="font-weight-bold">
                                <b>{{fatora.fatora_total_my}}</b>
                            </th>
                        </tr>
                        <tr>
                            <th style="background-color: #dfdfdf;padding: 0px !important ; margin: 0px !important;border: 1px solid black !important" scope="col">
                                تاريخ الحفظ
                            </th>
                            <th  style="border: 1px solid black !important" scope="col">
                                {{fatora.fatora_SaveDate}}
                            </th>
                        </tr>

                        <tr>
                            <th style="background-color: #dfdfdf;padding: 0px !important ; margin: 0px !important;border: 1px solid black !important" scope="col">
                                الكمية الكلية
                            </th>
                            <th  style="border: 1px solid black !important" scope="col">
                                {{fatora.fatora_numberItems}}
                            </th>
                        </tr>

                        <tr >
                            <th style="background-color: #dfdfdf;padding: 0px !important ; margin: 0px !important;border: 1px solid black !important" scope="col">
                                الواصل
                            </th>
                            <th  style="border: 1px solid black !important" scope="col">
                                {{fatora.fatora_wasel_him}}
                            </th>
                        </tr>
                        <tr>
                            <th style="background-color: #dfdfdf;padding: 0px !important ; margin: 0px !important;border: 1px solid black !important" scope="col">
                                المتبقي
                            </th>
                            <th  style="border: 1px solid black !important" scope="col">
                                {{parseFloat(fatora.fatora_total_my) - parseFloat(fatora.fatora_wasel_him)}}
                            </th>
                        </tr>
                        <tr>
                            <th style="background-color: #dfdfdf;padding: 0px !important ; margin: 0px !important;border: 1px solid black !important" scope="col">
                                طريقة  الدفع
                            </th>
                            <th  style="border: 1px solid black !important" scope="col">
                                {{fatora.fatora_pushtype}}
                            </th>
                        </tr>
                        <tr>
                            <th style="background-color: #dfdfdf;padding: 0px !important ; margin: 0px !important;border: 1px solid black !important" scope="col">
                                الملاحظة
                            </th>
                            <th  style="border: 1px solid black !important" scope="col">
                                {{fatora.fatora_notes}}
                            </th>
                        </tr>
                        <tr>
                            <th style="background-color: #dfdfdf;padding: 0px !important ; margin: 0px !important;border: 1px solid black !important" scope="col">
                                اليوزر
                            </th>
                            <th  style="border: 1px solid black !important" scope="col">
                                {{fatora.fatora_user}}
                            </th>
                        </tr>

                        </thead>

                    </table>

                </div>

            </v-card-text>
            <v-divider/>
            <v-card-actions>
                <v-btn dark color="cardtitleblack" block @click="print">
                    <v-icon>mdi-printer</v-icon>
                    <span class="mr-2 f16">طباعة الفاتورة</span>
                </v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
    import moment from "moment";

    export default {
        name: "PrintFatora",
        filters:{
            datefilter: function (value) {
                if (value != null && value != '' && value != undefined && value != 'NaN') {
                    return moment(value).format('YYYY-MM-DD hh:mm A')
                }
            },
            fatora_type:function (value) {
                if(value ==1)
                {
                    return "شراء";
                }
                if(value ==11)
                {
                    return "تسديد شراء";
                }
                if(value ==2)
                {
                    return "بيع";
                }
                if(value ==22)
                {
                    return "تسديد مبيع";
                }

            }
        },
        data(){
            return{
                fatora:this.$store.state.foater.target
            }
        },
        methods:{
            async print () {
                // Pass the element id here
                await this.$htmlToPaper('printMe');
            }
        },
        computed:{
            get_fatora:function () {
                return this.$store.state.foater.target
            }
        },
        watch:{
            get_fatora:function (new_fatora) {
                this.fatora = new_fatora;
            }
        },

    }
</script>

<style scoped>

</style>