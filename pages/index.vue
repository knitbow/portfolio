<template>
  <div>
    <v-row dense>
      <v-col cols="2">
        <v-avatar>
          <v-img
            :src="works[0].fields.image.fields.file.url"
          >
          </v-img>
        </v-avatar>
        Naoya Moriguchi
        <v-icon>mdi-github</v-icon>
        <v-icon>mdi-xml</v-icon>
        <v-icon>mdi-twitter</v-icon>
      </v-col>
      <v-col cols="10">
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
        }
    }
</script>
