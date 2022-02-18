<template>
    <v-dialog max-width="800" class="pa-0 ma-9" v-model="$store.state.towers.forms.edit_tower">
        <v-form lazy-validation v-model="valid" ref="form">
            <v-card :loading="loading" elevation="6"  max-width="800" class="ma-auto">
                <v-card-title class="cardtitle"  style="direction: rtl;color: white">
                    <v-icon large color="white">mdi-eiffel-tower</v-icon>
                    <span class="mr-2 f16">تعديل برج</span>
                    <v-spacer/>
                    <v-btn icon @click="$store.state.towers.forms.edit_tower=false">
                        <v-icon large color="white">mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-divider />
                <v-card-text>
                    <v-row  class="ma-0">
                        <v-col cols="12" md="6">
                            <v-text-field v-model="brig.brig_name" :rules="req" outlined label="اسم البرج" prepend-inner-icon="mdi-eiffel-tower"/>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-select v-model="brig.brig_main" :items="scope_type" item-value="value" item-text="label"  outlined label="صنف البرج" prepend-inner-icon="mdi-format-list-bulleted-type"/>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="brig.brig_user" :rules="req" outlined label="يوزر البرج" prepend-inner-icon="mdi-account"/>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="brig.brig_pass" :rules="req" outlined label="باسوورد البرج" prepend-inner-icon="mdi-lock"/>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="brig.brig_passOnline" :rules="req" outlined label="باسورد اونلاين" prepend-inner-icon="mdi-lock"/>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-select v-model="brig.brig_type" :items="servies_type" item-text="label" item-value="value"  outlined label="توع الخدمة" prepend-inner-icon="mdi-call-merge"/>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-select v-model="brig.brig_month" :items="type_active" item-value="value" item-text="label"  outlined label="مدة التفعيل" prepend-inner-icon="mdi-clock-outline"/>
                        </v-col>


                    </v-row>

                </v-card-text>
                <v-divider/>
                <v-card-actions style="direction: rtl">
                    <v-btn :loading="loading" @click="edit_tower"  color="primary" large>
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
        name: "AddTower",
        data(){
            return{
                valid:true,
                loading:false,
                req:[v=>!!v ||'لايمكن ترك هذا الحقل فارغاً'],
                scope_type:[
                    {label:'رئيسي',value:1},
                    {label:'فرعي',value:0},
                ],
                servies_type:[
                    {label:'ايرثلينك',value:1},
                    {label:'الجزيرة',value: 2},
                    {label:'SAS3',value: 3},
                    {label:'SAS4',value: 4},
                    {label:'البث الرقمي',value: 5},
                    {label:'اخرى',value: 6},
                ],
                type_active:[
                    {label:'30 يوم',value:0},
                    {label:'شهري',value:1},
                ],
            brig:{
                    brig_id:0,
                    brig_name:'',
                    brig_main:'',
                    brig_user:'',
                    brig_pass:'',
                    brig_passOnline:'',
                    brig_type:'',
                    brig_month:'',
                    brig_address:'',
                    brig_note:'',
            }

            }
        },
        methods:{
            async edit_tower(){
                if(this.$refs.form.validate())
                {
                    this.loading = true;
                    this.$axios.post('api/edit-tower',this.brig).then(res=>{
                        this.$fire({
                            title: "نجح",
                            text: res.data.msg,
                            type: "success",
                            timer: 2000
                        });
                        this.$refs.form.reset();
                        this.$store.state.towers.forms.edit_tower = false;
                        this.$store.commit("GET_TOWERS")
                    }).catch(err=>{

                    }).finally(fin=>{
                        this.loading = false;
                    })
                }
            }
        },
        computed:{
            get_tower_to_edit:function () {
                return this.$store.state.towers.target;
            }
        },
        watch:{
            get_tower_to_edit:function (new_tower) {
                this.brig = new_tower
            }
        },

    }
</script>

<style scoped>

</style>