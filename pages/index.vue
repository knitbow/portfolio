<template>
  <div>
    <v-row dense>
      <v-col md="2" xs="12">
        <v-card flat>
          <v-avatar>
            <v-img
              src="https://images.ctfassets.net/0qyl5vkqyxwv/01C2KhFuFP6AvXIyZh16MD/74c3eacfc44ef9c63232390899ede3ed/ryu.png"
            >
            </v-img>
          </v-avatar>
          Naoya Moriguchi
          <v-card-text>
            バックエンドエンジニアですが、Vue.js, Nuxt.jsが大好きです。
            Python・Java・PHPを使います。このサイトはNuxtで作っています。お仕事依頼・お問い合わせはContactからお願いします。
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
        <client-only>
          <v-form netlify>
            <input type="hidden" name="form-name" value="contact">
            <v-card>
              <v-container fluid>
                <v-card-title>
                  Contact Form
                </v-card-title>
                <v-card-text>
                  <v-text-field
                    label="Name"
                    placeholder="山田 太郎"
                    outlined
                    dense
                    name="name"
                  ></v-text-field>
                  <v-text-field
                    label="Email"
                    placeholder="yamada@example.co.jp"
                    outlined
                    dense
                    name="email"
                  ></v-text-field>
                  <v-textarea
                    label="Message"
                    placeholder="message"
                    outlined
                    dense
                    name="message"
                  ></v-textarea>
                </v-card-text>
                <v-card-actions>
                  <v-btn depressed small type="submit" color="primary">send message</v-btn>
                </v-card-actions>
              </v-container>
            </v-card>
          </v-form>
        </client-only>
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

<style lang="scss" scoped>
  a {
    text-decoration: none;
  }

</style>
