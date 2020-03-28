<!-- ここから追加 -->
<template>
  <div>
    <div>
      <v-row dense>
        <v-col md="2" xs="12">
          <v-card flat>
            <v-chip
              class="ma-2"
              color="primary"
              label
            >
              <v-icon left>mdi-magnify</v-icon>
              {{ $route.params.keyword }}
            </v-chip>
          </v-card>
        </v-col>
        <v-col md="10">
          <v-row dense>
            <div v-if="isWorks">
              <v-col
                v-for="work in works"
                :key="work.sys.id"
                :cols="12"
                md="6"
                xs="12"
                :work="work"
              >
                <Item
                  :key="work.sys.id"
                  :work="work"
                />
              </v-col>
            </div>
            <div v-else>
              記事が見つかりませんでした。
            </div>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<!-- ここまで追加 -->

<script>

    import Item from '@/components/Item' // ここを追加
    import {createClient} from '~/plugins/contentful.js'

    const client = createClient()

    export default {

        // ここから追加
        components: {
            Item
        },
        // ここまで追加

        asyncData(params) {
            return Promise.all([
                client.getEntries({
                    'content_type': 'work',
                    query: params.params.keyword,
                    order: '-sys.createdAt'
                }),
            ]).then(([works]) => {
                let isWorks = true
                if (works.items.length === 0) {
                    isWorks = false
                }

                return {
                    works: works.items,
                    isWorks: isWorks
                }
            }).catch(console.error)
        }
    }
</script>
