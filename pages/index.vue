<template>
  <div>
    <v-row dense>
      <v-col md="2">
        <v-card flat>
          <v-avatar>
            <v-img
              :src="works[0].fields.image.fields.file.url"
            >
            </v-img>
          </v-avatar>
          Naoya Moriguchi
          <v-card-text>
            バックエンドよりのフロントエンドエンジニアです。。Vue.js,
            Nuxt.jsが大好きです。Pythonも使います。ご依頼はDMからどうぞ。
            <v-icon>mdi-github</v-icon>
            <v-icon>mdi-xml</v-icon>
            <v-icon>mdi-twitter</v-icon>
          </v-card-text>
          <v-card-actions>
            <v-text-field
              label="検索"
              outlined
              placeholder="Keywords"
              v-model="keyword" @keypress.enter="$router.push('/search/'+keyword)"
            ></v-text-field>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col md="10">
        <v-row dense>
          <v-col
            v-for="work in works"
            :key="work.sys.id"
            :cols="6"
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
</template>

<script>

    import {createClient} from '../plugins/contentful.js'
    import Item from "../components/Item";

    const client = createClient()
    export default {
        components: {Item},

        asyncData() {
            return Promise.all([
                client.getEntries({
                    'content_type': 'work',
                    order: '-sys.createdAt'
                })
            ]).then(([works]) => {
                return {
                    works: works.items
                }
            }).catch(console.error)
        },
        data() {
            return {
                keyword: "",
            }
        },
    }
</script>
