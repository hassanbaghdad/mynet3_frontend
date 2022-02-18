<template>
    <v-card>
        <v-tabs
                v-model="tab"
                centered
                icons-and-text
        >
            <v-tabs-slider></v-tabs-slider>

            <v-tab href="#tab-1">
                <span class="f20b">ديون لنا</span>
                <v-icon large>mdi-arrow-down</v-icon>
            </v-tab>

            <v-tab href="#tab-2">
                <span class="f20b">ديون لهم</span>
                <v-icon large>mdi-arrow-up</v-icon>
            </v-tab>

        </v-tabs>

        <v-tabs-items v-model="tab">
            <v-tab-item value="tab-1">
                <DebtsToUs/>
            </v-tab-item>
        </v-tabs-items>
        <v-tabs-items v-model="tab">
            <v-tab-item value="tab-2">
             <DebtsToThem/>
            </v-tab-item>
        </v-tabs-items>

    </v-card>
</template>

<script>
    import DebtsToUs from "@/components/Debts/DebtsToUs";
    import DebtsToThem from "@/components/Debts/DebtsToThem";
    export default {
        name: "Debts",
        components:{
            DebtsToUs,
            DebtsToThem
        },
        data(){
            return{
                tab:null
            }
        }
    }
</script>

<style scoped>

</style>