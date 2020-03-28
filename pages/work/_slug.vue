<template>
  <div>
    <v-card>

      <v-img
        :src="work.fields.image.fields.file.url"
        height="400px"
      >
      </v-img>
      <v-card-title primary-title>
        <div>
          <nuxt-link :to=" '/category/'+work.fields.category.sys.id ">
            <div class="headline black--text">{{ work.fields.category.fields.name
              }}
            </div>
          </nuxt-link>
          <span class="grey--text">{{ work.fields.title }}</span>
        </div>
      </v-card-title>

      <v-btn small v-for="tag in work.fields.tags"
             :key="tag.sys.id" class="tag-field"
             :to=" '/tag/'+tag.sys.id+'?tag='+tag.fields.name "
      >{{ tag.fields.name }}
      </v-btn>
      <v-card-actions>
        <Task :work="work"></Task>
      </v-card-actions>
      <v-card-text>
        <div class="content" v-html="$md.render(work.fields.content)"></div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>

    // ここから追加
    import {faLink} from '@fortawesome/free-solid-svg-icons'
    import {faGithub} from '@fortawesome/free-brands-svg-icons'
    import {createClient} from '~/plugins/contentful.js'
    import Task from "../../components/Task";
    // ここまで追加
    const client = createClient()
    export default {
        components: {Task},
        asyncData({params, payload}) {

            // payloadのデータがあれば、そちらから取得する
            if (payload) {
                return {works: payload}
            }

            return Promise.all([
                client.getEntries({
                    'content_type': 'work',
                    'fields.slug': params.slug
                })
            ]).then(([works]) => {
                return {
                    work: works.items[0]
                }
            }).catch(console.error)
        },

        // ここから追加
        computed: {
            faLink() {
                return faLink
            },
            faGithub() {
                return faGithub
            }
        }
        // ここまで追加

    }
</script>
<!-- ここから追加 -->
<style>
  .content h1 {
    font-weight: bold;
    font-size: 1.2rem;
    margin: 25px 0;
    border-bottom: 2px solid #000;
  }

  .content h2 {
    font-weight: bold;
    font-size: 1rem;
    margin: 20px 0;
    border-bottom: 1px solid #eee;
  }

  .content h3 {
    font-weight: bold;
    font-size: .8rem;
    margin: 15px 0;
  }

  .content a {
    color: blue;
  }

  .content li {
    list-style: disc;
  }

  .content code {
    background: #eee;
    padding: 2px;
  }

  .content pre code {
    background: none;
    padding: 0;
  }

  .content pre {
    background: #000;
    color: #fff;
    padding: 5px;
  }

  a {
    text-decoration: none;
  }

  .tag-field {
    margin: 5px;
  }
</style>
