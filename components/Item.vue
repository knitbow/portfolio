<template>

  <v-card>
    <v-img
      class="white--text align-start"
      :src="work.fields.image.fields.file.url"
      height="200px"
    >
      <v-btn
        class="btn-field"
        :to=" '/category/'+work.fields.category.sys.id "
        small
      >{{work.fields.category.fields.name}}
      </v-btn>
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

    <v-btn x-small v-for="tag in work.fields.tags"
           :key="tag.sys.id" class="tag-field">{{ tag.fields.name }}
    </v-btn>

  </v-card>

</template>
<script>
    export default {
        name: "Item",
        props: ['work']
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
