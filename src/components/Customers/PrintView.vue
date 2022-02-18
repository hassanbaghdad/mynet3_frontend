<template>
    <v-dialog max-width="1000" class="pa-0 ma-9" v-model="$store.state.customers.forms.print_view">
        <v-card  elevation="6"  max-width="100%" class="ma-auto">
            <v-card-title class="indigo"  style="direction: rtl;color: white">
                <v-btn icon @click="$store.state.customers.forms.print_view=false">
                    <v-icon large color="white">mdi-close</v-icon>
                </v-btn>
                <span class="mr-2 f18">سجل الوصولات</span>

            </v-card-title>
            <v-divider />
            <v-card-text>

            </v-card-text>


        </v-card>
        <v-divider/>


    </v-dialog>
</template>

<script>
    export default {
        name: "PrintView",
        data(){
            return{
                sand:[]
            }
        }
    }
</script>

<style scoped>

</style>