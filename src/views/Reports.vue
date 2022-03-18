<template>
    <v-container>
        <v-card>
            <v-card-title>
                <v-icon large>mdi-finance</v-icon>
                <span class="f20b">التقارير</span>
            </v-card-title>
            <v-divider/>
            <v-card-text>
                <v-row justify="center">
                    <v-col cols="12" md="4" lg="3">
                        <LineChart  :chartdata="chartdata" :options="options"/>
                    </v-col>
                    <v-col cols="12" md="4" lg="3">
                        <BarChart  :chartdata="chartdata" :options="options"/>
                    </v-col>
                    <v-col cols="12" md="4" lg="3">
                        <PieChart  :chartdata="chartdata" :options="options"/>
                    </v-col>
                    <v-col cols="12" md="4" lg="3">
                        <RadarChart  :chartdata="chartdata" :options="options"/>
                    </v-col>
                    <v-col cols="12" md="4" lg="3">
                        <BubbleChart  :chartdata="chartdata" :options="options"/>
                    </v-col>
                    <v-col cols="12" md="4" lg="3">
                        <DoughnutChart  :chartdata="chartdata" :options="options"/>
                    </v-col>
                    <v-col cols="12" md="4" lg="3">
                        <ScatterChart  :chartdata="chartdata" :options="options"/>
                    </v-col>

                </v-row>


            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
    import LineChart from "@/components/Charts/LineChart";
    import BarChart from "@/components/Charts/BarChart";
    import PieChart from "@/components/Charts/PieChart";
    import RadarChart from "@/components/Charts/RadarChart";
    import BubbleChart from "@/components/Charts/BubbleChart";
    import DoughnutChart from "@/components/Charts/DoughnutChart";
    import ScatterChart from "@/components/Charts/ScatterChart";
    export default {
        name: "Reports",
        components:{
            LineChart,
            BarChart,
            PieChart,
            RadarChart,
            BubbleChart,
            DoughnutChart,
            ScatterChart
        },
        data () {
            return {
                loaded:false,
                chartdata: {
                    labels: ['January', 'February','January', 'February','January', 'February',],
                    datasets: [
                        {
                            label: 'Data One',
                            backgroundColor: ['#f87979','#584fff','#ff4400','#d1d1d1','#c3ff00','#ff78eb'],
                            data: [5, 6,2, 8,5, 3]
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    beginAtZero: true,
                    ticks: {
                        beginAtZero: true
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        },
                        xAxes: [{
                            ticks: {
                                fontSize: 20
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]

                    }
                },
            }
        },

    }
</script>

<style scoped>

</style>