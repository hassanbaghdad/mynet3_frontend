<template>
    <v-container>
      <v-card :loading="$store.state.loading">
          <v-card-title>
              <v-icon>mdi-text-box-multiple-outline</v-icon>
              <span class="f18b mr-2">فواتير المبيع</span>
          </v-card-title>
          <v-divider/>
          <v-card-text>
              <v-simple-table style="direction: rtl;">
                  <template v-slot:default>
                      <thead>
                      <tr>
                          <th class="text-center f16">ت</th>
                          <th class="text-center f16">اسم الزبون</th>
                          <th class="text-center f16">رقم الفاتورة</th>
                          <th class="text-center f16">تاريخ الفاتورة</th>
                          <th class="text-center f16">تاريخ الحفظ</th>
                          <th class="text-center f16">الكمية الكلية</th>
                          <th class="text-center f16">المبلغ الكلي</th>
                          <th class="text-center f16">الواصل</th>
                          <th class="text-center f16">المتبقي</th>
                          <th class="text-center f16">طريقة الدفع</th>
                          <th class="text-center f16">الملاحظات</th>
                          <th class="text-center f16">اليوزر</th>
                          <th class="text-center f16">خيارات</th>
                      </tr>
                      <tr>
                          <th class="text-center f16"></th>
                          <th class="text-center">
                              <v-text-field v-model="search.cost_name" @keyup="search_sell_fatora" outlined dense prepend-inner-icon="mdi-magnify"/>
                          </th>
                          <th class="text-center f16">
                              <v-text-field v-model="search.fatora_number" @keyup="search_sell_fatora"  outlined dense prepend-inner-icon="mdi-magnify"/>
                          </th>
                          <th class="text-center f16">
                              <v-text-field v-model="search.fatora_date" @keyup="search_sell_fatora"  outlined dense prepend-inner-icon="mdi-magnify"/>
                          </th>
                          <th class="text-center f16">
                              <v-text-field v-model="search.fatora_SaveDate" @keyup="search_sell_fatora"  outlined dense prepend-inner-icon="mdi-magnify"/>
                          </th>
                          <th class="text-center f16">
                              <v-text-field v-model="search.fatora_numberItems" @keyup="search_sell_fatora"  outlined dense prepend-inner-icon="mdi-magnify"/>
                          </th>
                          <th class="text-center f16">
                              <v-text-field v-model="search.fatora_total_my" @keyup="search_sell_fatora"  outlined dense prepend-inner-icon="mdi-magnify"/>
                          </th>
                          <th class="text-center f16">
                              <v-text-field  v-model="search.fatora_wasel_him" @keyup="search_sell_fatora" outlined dense prepend-inner-icon="mdi-magnify"/>
                          </th>
                          <th class="text-center f16"></th>
                          <th class="text-center f16">
                              <v-text-field  v-model="search.fatora_pushtype" @keyup="search_sell_fatora" outlined dense prepend-inner-icon="mdi-magnify"/>
                          </th>
                          <th class="text-center f16">
                              <v-text-field  v-model="search.fatora_notes" @keyup="search_sell_fatora" outlined dense prepend-inner-icon="mdi-magnify"/>
                          </th>
                          <th class="text-center f16">
                              <v-text-field v-model="search.fatora_user" @keyup="search_sell_fatora"  outlined dense prepend-inner-icon="mdi-magnify"/>
                          </th>
                          <th class="text-center f16"></th>

                      </tr>

                      </thead>
                      <tbody>
                      <tr v-for="fat in pageOfItems" :key="fat.fatora_id">
                          <td class="text-center f16">
                              {{foater_sells.indexOf(fat)+1}}
                          </td>
                          <td class="text-center f16">
                              {{fat.cost_name}}
                          </td>
                          <td class="text-center f16">
                              {{fat.fatora_number}}
                          </td>
                          <td class="text-center f16">
                              {{fat.fatora_date}}
                          </td>
                          <td class="text-center f16">
                              {{fat.fatora_SaveDate}}
                          </td>
                          <td class="text-center f16">
                              {{fat.fatora_numberItems}}
                          </td>
                          <td class="text-center f16">
                              {{fat.fatora_total_my |money_iq}}
                          </td>
                          <td class="text-center f16">
                              {{fat.fatora_wasel_him |money_iq}}
                          </td>
                          <td class="text-center f16">
                              {{parseFloat(fat.fatora_total_my)-parseFloat(fat.fatora_wasel_him) | money_iq}}
                          </td>
                          <td class="text-center f16">
                              {{fat.fatora_pushtype}}
                          </td>
                          <td class="text-center f16">
                              {{fat.fatora_notes}}
                          </td>
                          <td class="text-center f16">
                              {{fat.fatora_user}}
                          </td>
                          <td class="text-center f16">
                              <div class="d-flex">
                                  <v-btn icon class="d-inline float-right" @click="set_fatora_to_print(fat)">
                                      <v-icon color="indigo">mdi-printer</v-icon>
                                  </v-btn>
                                  <v-btn icon class="d-inline float-right" @click="set_fatora_to_delete(fat.fatora_id,fat.fatora_number)">
                                      <v-icon color="error">mdi-delete</v-icon>
                                  </v-btn>
                              </div>


                          </td>
                      </tr>
                      </tbody>
                  </template>
              </v-simple-table>
          </v-card-text>
          <v-divider/>
          <v-card elevation="1" class="f14 text-center pa-4">
              <jw-pagination :pageSize="15" :maxPages="$vuetify.breakpoint.xs?1:10"  :items="foater_sells" :labels="customLabels" :styles="customStyles" @changePage="onChangePage"></jw-pagination>
          </v-card>
      </v-card>
        <PrintFatora/>
        <DeleteSellFatora/>
    </v-container>
</template>

<script>
    import JwPagination from 'jw-vue-pagination';
    import PrintFatora from "@/components/Fatora/SellFoater/PrintFatora";
    import DeleteSellFatora from "@/components/Fatora/SellFoater/DeleteSellFatora";
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
        name: "Foater",
        components: {
            JwPagination,
            PrintFatora,
            DeleteSellFatora
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
                foater_sells:this.$store.state.foater.foater_sell,
                loading:false,
                customLabels,
                customStyles,
                pageOfItems: [],
                search:{
                    cost_name: '',
                    fatora_SaveDate:'',
                    fatora_date:'',
                    fatora_notes: '',
                    fatora_number:'',
                    fatora_numberItems: '',
                    fatora_pushtype: '',
                    fatora_total_my: '',
                    fatora_user: '',
                    fatora_wasel_him: '',
                }

            }
        },
        methods:{
            onChangePage(pageOfItems) {
                // update page of items
                this.pageOfItems = pageOfItems;
            },
            if_null(col)
            {
                if(col == null || col == "" ||col == undefined)
                {
                    col = "";
                    return col;
                }
                return  col.toString();
            },
            search_sell_fatora(){
                var filtered = this.$store.state.foater.foater_sell;

                filtered = filtered.map(x=>{
                    x.cost_name=this.if_null(x.cost_name);
                    x.fatora_SaveDate=this.if_null(x.fatora_SaveDate);
                    x.fatora_date=this.if_null(x.fatora_date);
                    x.fatora_notes=this.if_null(x.fatora_notes);
                    x.fatora_number=this.if_null(x.fatora_number);
                    x.fatora_numberItems=this.if_null(x.fatora_numberItems);
                    x.fatora_pushtype=this.if_null(x.fatora_pushtype);
                    x.fatora_total_my=this.if_null(x.fatora_total_my);
                    x.fatora_wasel_him=this.if_null(x.fatora_wasel_him);
                    x.fatora_user=this.if_null(x.fatora_user);

                    return x;
                });

                filtered = filtered.filter(item=>item.cost_name.match(this.search.cost_name));
                filtered = filtered.filter(item=>item.fatora_SaveDate.match(this.search.fatora_SaveDate));
                filtered = filtered.filter(item=>item.fatora_date.match(this.search.fatora_date));
                filtered = filtered.filter(item=>item.fatora_notes.match(this.search.fatora_notes));
                filtered = filtered.filter(item=>item.fatora_number.match(this.search.fatora_number));
                filtered = filtered.filter(item=>item.fatora_numberItems.match(this.search.fatora_numberItems));
                filtered = filtered.filter(item=>item.fatora_pushtype.match(this.search.fatora_pushtype));
                filtered = filtered.filter(item=>item.fatora_total_my.match(this.search.fatora_total_my));
                filtered = filtered.filter(item=>item.fatora_user.match(this.search.fatora_user));
                filtered = filtered.filter(item=>item.fatora_wasel_him.match(this.search.fatora_wasel_him));

                this.foater_sells = filtered;
            },
            set_fatora_to_print(fatora)
            {

                this.$store.state.foater.target = fatora;
                this.$store.state.foater.forms.print_sell_fatora = true;
            },
            set_fatora_to_delete(fatora_id,fatora_number)
            {

                this.$store.state.foater.target = {fatora_id:fatora_id,fatora_number:fatora_number};
                this.$store.state.foater.forms.delete_sell_fatora = true;
            },

        },
        computed:{
            get_foater_sells:function () {
                return this.$store.state.foater.foater_sell;
            }
        },
        watch:{
            get_foater_sells:function (new_foater) {
                this.foater_sells = new_foater;
            }
        },
        created(){
            this.$store.commit("GET_SELL_FOATER");
        }

    }
</script>

<style scoped>

</style>