<template>

  <v-card>
    <v-img
      class="white--text align-start"
      :src="work.fields.image.fields.file.url"
      @click="to_work(work.fields.slug)"
      height="200px"
    >
      <v-chip
        link
        class="btn-field max-z"
        @click="to_category(work.fields.category.sys.id)"
        small
      >{{work.fields.category.fields.name}}
      </v-chip>
    </v-img>
    <v-card-title primary-title>
      <div>
        <nuxt-link :to=" '/work/' + work.fields.slug ">
          <span class="black--text">{{ work.fields.title }}</span>
        </nuxt-link>
      </div>
    </v-card-title>
    <v-card-subtitle primary-title>
      <div>
        <span class="grey--text">{{ work.fields.subTitle }}</span>
      </div>
    </v-card-subtitle>
    <v-card-actions>
      <v-btn x-small v-for="tag in work.fields.tags"
             :to=" '/tag/'+tag.sys.id "
             :key="tag.sys.id"
             class="tag-field">{{ tag.fields.name }}
      </v-btn>
    </v-card-actions>
    <v-card-actions>
      <apexchart type="pie" width="350" :options="chartOptions" :series="series"></apexchart>
    </v-card-actions>
  </v-card>
</template>
<script>

    export default {
        name: "Item",
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
                        monochrome: {
                            enabled: true
                        }
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
                to: "1"
            }
        },
        created() {
            if (this.work.fields !== undefined && this.work.fields["tasks"] !== undefined) {
                this.series = this.work.fields["tasks"].map(x => x.fields.Percentage)
                this.chartOptions["labels"] = this.work.fields["tasks"].map(x => x.fields.Task)
            }
        },
        methods: {
            to_work(id) {
                if (this.to !== "category") {
                    this.$router.push('/work/' + id)
                }
            },
            to_category(id) {
                this.$router.push('/category/' + id)
                this.to = "category"
            },
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

  .max-z {
    z-index: 100000000000000000000000
  }
</style>
