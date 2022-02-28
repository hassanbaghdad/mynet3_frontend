<template>
    <v-dialog max-width="800" class="pa-0 ma-9" v-model="$store.state.customers.forms.active">
        <v-form lazy-validation v-model="valid" ref="form">
            <v-card :loading="loading" elevation="6"  max-width="800" class="ma-auto">
                <v-card-title class="success"  style="direction: rtl;color: white">
                    <v-btn icon @click="$store.state.customers.forms.active=false">
                        <v-icon large color="white">mdi-close</v-icon>
                    </v-btn>
                    <span class="mr-2 f18">تفعيل اشتراك</span>

                </v-card-title>
                <v-divider />
                <v-card-text>
                    <v-row  class="ma-0">
                        <v-col cols="12">
                            <p class="f16b">
                                {{cost_name}} / {{cost_user}}
                            </p>
                            <v-divider/>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-select :rules="req" @change="change_card_type" v-model="card_id" :items="cards" item-text="card_name" item-value="card_id"  outlined label="فئة الاشتراك" prepend-inner-icon="mdi-credit-card"/>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field readonly :disabled="card_name==''" :rules="req" v-model="months" @click:append="decrease_months" @click:prepend-inner="increase_months"  outlined label="عدد اشهر التفعيل" prepend-inner-icon="mdi-plus" append-icon="mdi-minus"/>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-sheet class="pa-3" outlined  label="تاريخ التفعيل">
                                <p class="f16">تاريخ التفعيل</p>
                                <v-divider/>
                                <input @change="change_date" :rules="req" v-model="sand_dateform" style="border: 0px;width: 100%" type="datetime-local">
                            </v-sheet>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-sheet class="pa-3" outlined  label="تاريخ الانتهاء" prepend-inner-icon="mdi-calendar-month-outline">
                                <p class="f16">تاريخ الانتهاء</p>
                                <v-divider/>
                                <input :rules="req" v-model="sand_dateto" style="border: 0px;width: 100%" type="datetime-local">
                            </v-sheet>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field-money @keyup="math_money" @input="math_money" :properties="{outlined:true}" :options="{precision:0}" v-model="price"  :rules="req"  label="كلفة الاشتراك" prepend-inner-icon="mdi-currency-usd"/>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field-money @keyup="math_money" @input="math_money" :properties="{outlined:true}" :options="{precision:0}" v-model="moneyin" outlined label="الواصل" prepend-inner-icon="mdi-cash"/>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field-money @keyup="math_money" @input="math_money" :properties="{outlined:true}" :options="{precision:0}" v-model="debts" outlined label="الديون السابقة" prepend-inner-icon="mdi-cash"/>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field-money :properties="{outlined:true,readonly:true}" :options="{precision:0}" v-model="sand_money"  :rules="req"  label="المبلغ الكلي للتفعبل" prepend-inner-icon="mdi-cash"/>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field-money :properties="{outlined:true,readonly:true}" :options="{precision:0}" v-model="remaining_money"  :rules="req"  label="المبلغ المتبقي كدين" prepend-inner-icon="mdi-cash"/>
                        </v-col>
                        <v-col cols="12">
                            <v-textarea height="80" v-model="sand_notes" outlined label="الملاحظات" prepend-inner-icon="mdi-information"/>
                        </v-col>

                    </v-row>

                </v-card-text>
                <v-divider/>
                <v-card-actions style="direction: rtl">
                    <v-btn :loading="loading" color="primary" large @click="active_net">
                        <v-icon>mdi-check</v-icon>
                        <span class="f16 pa-2">تفعيل</span>
                    </v-btn>

                </v-card-actions>

            </v-card>
        </v-form>

    </v-dialog>

</template>

<script>
    import moment from 'moment'
    export default {
        name: "ActiveNet",
        data(){
            return{
                valid:true,
                req:[v=>!!v || "يجب اختيار رقم"],
                loading:false,
                cost_name:'',
                cost_user:'',
                customer:this.$store.state.customers.target_active,
                card_id:'',
                card_name:'',
                card_price:'',
                req_no:[v=>!!v&&Number(v) || "يرجى ادخال عدد الاشهر رقماً"],
                cards:this.$store.state.cards.cards,
                months:0,
                price:0,
                moneyin:0,
                debts:0,
                remaining_money:0,
                sand_money:0,
                sand_dateform:'',
                sand_dateto:'',
                dateto_db:'',
                sand_date:moment.now,
                sand_costFk:'',
                sand_FkBrig:'',
                sand_notes:'',

            }
        },
        methods:{
            calc()
            {
                this.math_money();
                var _from =new Date();
                console.log("date db is : " + this.dateto_db + "and month type:" + parseInt(this.$store.state.customers.target.brig_month) )
                if(parseInt(this.$store.state.customers.target.brig_month) ==1)
                {

                    this.dateto_db = this.$store.state.customers.sand_dateto_from_db;

                    if(this.dateto_db != '' && this.dateto_db != null && this.dateto_db!= undefined)
                    {

                        if(moment(this.dateto_db) > moment.now())
                        {
                            console.log(this.dateto_db + " lagr from now")
                            _from =  this.$store.state.customers.sand_dateto_from_db;
                            this.math_money();
                        }
                        if(moment(this.dateto_db) < moment.now())
                        {
                            console.log(this.dateto_db + " small from now")
                            _from =  new Date();
                            this.math_money();
                        }
                    }
                    this.sand_dateto = moment(moment(_from).add(parseInt(this.months),'month')).format('YYYY-MM-DDTHH:mm')

                }
                if(parseInt(this.$store.state.customers.target.brig_month) ==0)
                {

                    if(this.dateto_db != '' && this.dateto_db != null && this.dateto_db!= undefined)
                    {
                        if(moment(this.dateto_db) > moment.now())
                        {
                            console.log(this.dateto_db + " lagr from now")
                            _from =  this.$store.state.customers.sand_dateto_from_db;
                            this.math_money();
                        }
                        if(moment(this.dateto_db) < moment.now())
                        {
                            console.log(this.dateto_db + " small from now")
                            _from =  new Date();
                            this.math_money();
                        }

                    }
                    this.sand_dateto = moment(moment(_from).add(parseInt(this.months)*30,'days')).format('YYYY-MM-DDTHH:mm')

                }
            },
            change_date()
            {
                this.math_money();
                var _from =new Date();
                console.log("date db is : " + this.dateto_db + "and month type:" + parseInt(this.$store.state.customers.target.brig_month) )
                if(parseInt(this.$store.state.customers.target.brig_month) ==1)
                {
                    _from =  this.sand_dateform;
                    this.sand_dateto = moment(moment(_from).add(parseInt(this.months),'month')).format('YYYY-MM-DDTHH:mm')
                }
                if(parseInt(this.$store.state.customers.target.brig_month) ==0)
                {
                    _from =  this.sand_dateform;
                    this.sand_dateto = moment(moment(_from).add(parseInt(this.months)*30,'days')).format('YYYY-MM-DDTHH:mm')
                }
            },
            increase_months()
            {
                if(this.months > -1 && this.months < 12)
                {

                    this.months+=1;
                    this.calc();

                }

            },
            decrease_months()
            {
                if(this.months > 0)
                {
                    this.months-=1;
                    this.calc();
                }
            },
            math_money()
            {
                if(this.sand_money =="")
                {
                    this.sand_money = 0;
                }
                if(this.moneyin =="" || this.moneyin ==null)
                {
                    this.moneyin = 0;
                }

                this.sand_money = parseFloat(parseInt(this.months) * parseFloat(this.price));
                this.remaining_money = parseFloat(parseInt(this.months) * parseFloat(this.price) - parseFloat(this.moneyin) + parseFloat(this.debts));
                console.log(this.remaining_money )
                console.log("months:"+parseInt(this.months) )
                console.log("price:"+this.price )
            },
            change_card_type()
            {
                console.log( this.card_id)

                //this.price = parseFloat(this.cards.filter(item=>item.card_id == this.card_id)[0].card_priceDinar);
                //this.card_name = this.cards.filter(item=>item.card_id == this.card_id)[0].card_name;
                this.calc();
                this.math_money();
            },
            async active_net()
            {
                if(this.$refs.form.validate())
                {


                    var sand = {
                        card_id:this.card_id,
                        sand_date:moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
                        remaining_money:this.remaining_money,
                        sand_money:this.sand_money,
                        moneyin:this.moneyin,
                        card_name:this.card_name,
                        sand_costFk:this.sand_costFk,
                        months:this.months,
                        sand_FkBrig:this.sand_FkBrig,
                        sand_notes:this.sand_notes,
                        sand_datefrom:this.sand_datefrom,
                        sand_dateto:this.sand_dateto,
                    };
                    this.$axios.post('api/active-net',sand).then(res=>{
                        this.$fire({
                            title: "نجح",
                            text: res.data.msg,
                            type: "success",
                            timer: 2000
                        });
                        this.$store.state.customers.forms.details = false;
                        this.$store.commit("GET_CUSTOMERS");

                    }).catch(err=>{
                        console.log(err)
                    }).finally(fin=>{
                        this.loading = false;
                    })
                }
            }



        },
        computed:{
            get_dateto_from_db:function () {
                return this.$store.state.customers.sand_dateto_from_db
            },
            get_customer_active_info:function () {
                return this.$store.state.customers.target_active
            },
            get_customer:function () {
                return this.$store.state.customers.forms.active
            },
            get_price:function () {
                return this.card_id;
            },
            get_form:function () {
                return this.$store.state.customers.forms.active;
            },

        },
        watch:{
            get_dateto_from_db:function (new_date) {
               this.dateto_db = new_date;
               console.log("new date is:" + new_date)
                this.sand_dateto = moment(new_date).format('YYYY-MM-DDTHH:mm');

            },
            get_customer_active_info:function (new_customer) {


            },
            get_customer:function (new_form) {
                if(new_form)
                {
                    var new_customer = this.$store.state.customers.target;
                    console.log(new_customer)
                    this.cost_name = new_customer.cost_name;
                    this.cost_user = new_customer.cost_user;
                    this.sand_costFk = new_customer.cost_id;
                    this.sand_FkBrig = new_customer.cost_bregFk;
                }else{
                    this.$refs.form.reset();
                }
            },
            get_price:function (new_card_id) {
                if(new_card_id != 9999)
                {
                        if(new_card_id != null)
                        {
                            this.price = this.cards.filter(item=>item.card_id == new_card_id)[0].card_priceDinar;
                            this.card_name = this.cards.filter(item=>item.card_id == this.card_id)[0].card_name;
                        }


                    
                }
            },
            get_form:function (new_form) {
               if(new_form)
               {
                   this.card_id =9999 ;
                   var new_customer = this.$store.state.customers.target_active;
                   this.debts = parseFloat(new_customer.remaining_money)
                   if(new_customer.Sand_cardtype != "" && new_customer.Sand_cardtype != null && new_customer.Sand_cardtype != undefined && new_customer.Sand_cardtype != "-")
                   {
                       console.log(new_customer)
                       this.card_id = this.cards.filter(item=>item.card_name == new_customer.Sand_cardtype)[0].card_id;
                       this.price = this.cards.filter(item=>item.card_name == new_customer.Sand_cardtype)[0].card_priceDinar;
                       this.change_card_type();
                   }
               }
            },

        },
    }
</script>

<style scoped>


</style>