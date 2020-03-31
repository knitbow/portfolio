<template>
  <apexchart type="pie" width="350" :options="chartOptions" :series="series"></apexchart>
</template>
<script>

    export default {
        name: "Task",
        props: ['work'],
        data() {
            return {
                series: [44, 55, 13, 43, 22],
                chartOptions: {
                    chart: {
                        width: '100%',
                        type: 'pie',
                    },
                    labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
                    theme: {
                        mode: 'light',
                        palette: 'palette5',
                        monochrome: {
                            enabled: false,
                            color: '#EEEEEE',
                            shadeTo: 'light',
                            shadeIntensity: 1.9
                        },
                    },
                    plotOptions: {
                        pie: {
                            dataLabels: {
                                offset: -5
                            }
                        }
                    },

                    title: {
                        text: "Task"
                    },
                    dataLabels: {
                        formatter(val, opts) {
                            const name = opts.w.globals.labels[opts.seriesIndex]
                            return [name, val.toFixed(0) + '%']
                        }
                    },
                    legend: {
                        show: false
                    },
                },
            }
        },
        created() {
            if (this.work.fields !== undefined && this.work.fields["tasks"] !== undefined) {
                this.series = this.work.fields["tasks"].map(x => x.fields.Percentage)
                this.chartOptions["labels"] = this.work.fields["tasks"].map(x => x.fields.Task)
            }
        },
    }
</script>

<style lang="scss" scoped>
  a {
    text-decoration: none;
  }

  .tag-field {
    margin: 5px;
  }

  .btn-field {
    margin: 10px;
  }


</style>
