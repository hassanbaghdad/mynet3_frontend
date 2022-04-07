<template>
    <v-dialog max-width="600" class="pa-0 ma-9" v-model="$store.state.customers.forms.print_view">
        <v-card  elevation="6"  max-width="100%" class="ma-auto">
            <v-card-title class="cardtitleblack"  style="direction: rtl;color: white">
                <v-btn icon @click="$store.state.customers.forms.print_view=false">
                    <v-icon large color="white">mdi-close</v-icon>
                </v-btn>
                <span class="mr-2 f18">طباعة وصل </span>

            </v-card-title>
            <v-divider />
            <v-card-text>
                <!-- SOURCE -->
                <div id="printMe" >
                  <div class="container">


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
                                      نوع الوصل
                                  </div>
                              </th>
                              <th style="border: 1px solid black !important"  scope="col">
                                  {{sand.Sand_moneyType | moneyType}}
                              </th>
                          </tr>
                          <tr>
                              <th style="background-color: #dfdfdf;padding: 0px !important ; margin: 0px !important;border: 1px solid black !important" scope="col">
                                  رقم الوصل
                              </th>
                              <th style="border: 1px solid black !important" scope="col">
                                  {{sand.Sand_id}}
                              </th>
                          </tr>
                          <tr>
                              <th style="background-color: #dfdfdf;padding: 0px !important ; margin: 0px !important;border: 1px solid black !important" scope="col">
                              تاريخ الوصل</th>
                              <th  style="border: 1px solid black !important" scope="col">
                                  {{sand.Sand_date |datefilter}}
                              </th>
                          </tr>
                          <tr>
                              <th style="background-color: #dfdfdf;padding: 0px !important ; margin: 0px !important;border: 1px solid black !important" scope="col">
                                  اسم المشترك
                              </th>
                              <th  style="border: 1px solid black !important" scope="col">
                                  {{sand.cost_name}}
                              </th>
                          </tr>
                          <tr>
                              <th style="background-color: #dfdfdf;padding: 0px !important ; margin: 0px !important;border: 1px solid black !important" scope="col">
                                  يوزر المشترك
                              </th>
                              <th  style="border: 1px solid black !important" scope="col">
                                  {{sand.cost_user}}
                              </th>
                          </tr>

                          <tr v-if="sand.Sand_moneyType ==1">
                              <th style="background-color: #dfdfdf;padding: 0px !important ; margin: 0px !important;border: 1px solid black !important" scope="col">
                              نوع الاشتراك </th>
                              <th  style="border: 1px solid black !important" scope="col">
                                  {{sand.Sand_cardtype}}
                              </th>
                          </tr>

                          <tr  v-if="sand.Sand_moneyType != 2">
                              <th style="background-color: #dfdfdf;padding: 0px !important ; margin: 0px !important;border: 1px solid black !important" scope="col">
                                مبلغ الوصل
                              </th>
                              <th  style="border: 1px solid black !important" scope="col">
                                  {{sand.Sand_money}}
                              </th>
                          </tr>
                          <tr>
                              <th style="background-color: #dfdfdf;padding: 0px !important ; margin: 0px !important;border: 1px solid black !important" scope="col">
                                الواصل
                              </th>
                              <th  style="border: 1px solid black !important" scope="col">
                                  {{sand.Sand_moneyin}}
                              </th>
                          </tr>
                          <tr  v-if="sand.Sand_moneyType !=2">
                              <th style="background-color: #dfdfdf;padding: 0px !important ; margin: 0px !important;border: 1px solid black !important" scope="col">
                               باقي الوصل
                              </th>
                              <th  style="border: 1px solid black !important" scope="col">
                                  {{parseFloat(sand.Sand_money) - parseFloat(sand.Sand_moneyin)}}
                              </th>
                          </tr>
                          <tr  v-if="sand.Sand_moneyType ==1">
                              <th style="background-color: #dfdfdf;padding: 0px !important ; margin: 0px !important;border: 1px solid black !important" scope="col">
                                  تاريخ الانتهاء
                              </th>
                              <th  style="border: 1px solid black !important" scope="col">
                                  {{sand.Sand_dateto | datefilter}}
                              </th>
                          </tr>
                          <tr>
                              <th style="background-color: #dfdfdf;padding: 0px !important ; margin: 0px !important;border: 1px solid black !important" scope="col">
                              مسجل الوصل
                              </th>
                              <th  style="border: 1px solid black !important" scope="col">
                                  {{sand.sand_user}}
                              </th>
                          </tr>

                          </thead>

                      </table>
                  </div>
                </div>

            </v-card-text>
            <v-divider/>
            <v-card-actions>
                <v-btn dark color="cardtitleblack" block @click="print">
                    <v-icon>mdi-printer</v-icon>
                    <span class="mr-2 f16">طباعة الوصل</span>
                </v-btn>
            </v-card-actions>

        </v-card>



    </v-dialog>
</template>

<script>
    import moment from "moment";

    export default {
        name: "PrintView",
        filters: {
            datefilter: function (value) {
                if (value != null && value != '' && value != undefined && value != 'NaN') {
                    return moment(value).format('YYYY-MM-DD hh:mm A')
                }
            },
            moneyType:function (value) {
                if(value ==1)
                {
                    return "تفعيل";
                }
                if(value ==2)
                {
                    return "تسديد";
                }
                if(value ==6)
                {
                    return "دين";
                }

            }
        },
        data(){
            return{
                sand:{
                    cost_name:'',
                    cost_user:'',
                    Sand_id:0,
                    Sand_date:'',
                    Sand_moneyType:0,
                    Sand_money:0,
                    Sand_moneyin:0,
                    Sand_cardtype:'',
                    Sand_dateto:'',
                    sand_user:''
                }
            }
        },
        methods:{
            async print () {
                // Pass the element id here
                await this.$htmlToPaper('printMe');
            }
        },
        computed:{
            customer4:function () {
                return this.$store.state.customers.target;
            },
            sand4:function () {
                return this.$store.state.customers.target_sand;
            },
            customer_form4:function () {
                return this.$store.state.customers.forms.print_view;
            },
        },
        watch:{
            customer4:function (new_customer) {
                console.log(new_customer)
            },
            customer_form4:function (new_form) {
                if(new_form)
                {
                    var new_customer = this.$store.state.customers.target;
                    this.sand.cost_name = new_customer.cost_name;
                    this.sand.cost_user = new_customer.cost_user;
                }
            },
            sand4:function (new_sand) {
                this.sand = new_sand;
            },

        },
    }
</script>

<style scoped>
.th-label{
    background-color: #dfdfdf;
}
    table tr th {
        border:2px solid black !important;
    }

    @media print {
        table tr th {
            border:2px solid black !important;
        }
    }
</style>