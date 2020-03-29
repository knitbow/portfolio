<template>

  <v-card>
    <v-img
      class="white--text align-start"
      :src="work.fields.image.fields.file.url"
      @click="to_work(work.fields.slug)"
      height="300px"
    >
      <v-chip
        link
        class="btn-field"
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
             :to=" '/tag/'+tag.sys.id+'?tag='+tag.fields.name "
             :key="tag.sys.id"
             class="tag-field">{{ tag.fields.name }}
      </v-btn>
    </v-card-actions>
    <v-card-actions>
      <Task :work="work"></Task>
    </v-card-actions>
  </v-card>
</template>
<script>

    import Task from "./Task";

    export default {
        name: "Item",
        components: {Task},
        props: ['work'],
        data() {
            return {
                to: "1"
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

</style>
