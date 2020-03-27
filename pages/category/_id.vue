<!-- ここから追加 -->
<template>
  <div>
    <Item
      v-for="work in works"
      :key="work.sys.id"
      :work="work"
    />
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
            console.log("params")
            console.log(params.params.id,)
            return Promise.all([
                client.getEntries({
                    'content_type': 'work',
                    'fields.category.sys.id': params.params.id,
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
