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
              <v-icon left>mdi-code-tags</v-icon>
              {{works[0].fields.tags[0].fields.name}}
            </v-chip>
          </v-card>
        </v-col>
        <v-col md="10">
          <v-row dense>
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
          </v-row>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<!-- ここまで追加 -->
<script>
    import {createClient} from '~/plugins/contentful.js'
    import Item from "../../components/Item";

    const client = createClient()
    export default {
        components: {Item},
        asyncData(params) {
            return Promise.all([
                client.getEntries({
                    'content_type': 'work',
                    'fields.tags.sys.id': params.params.id,
                    order: '-sys.createdAt'
                }),
            ]).then(([works]) => {
                return {
                    works: works.items
                }
            }).catch(console.error)
        }
    }
</script>
