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

import Item from '@/components/Item' // ここを追加

import { createClient } from '~/plugins/contentful.js'
const client = createClient()

export default {

  // ここから追加
  components: {
    Item
  },
  // ここまで追加

  asyncData (params) {
    return Promise.all([
      client.getEntries({
        'content_type': 'work',
        query: params.params.keyword,
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
