<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"/>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
      <nuxt-link :to=" '/'">
        <v-toolbar-title v-text="title" class="info--text"/>
      </nuxt-link>
      <v-spacer/>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt/>
      </v-container>
    </v-content>
    <v-card flat>
      <v-footer
        :fixed="fixed"
        app
      >
        <v-layout justify-center>
          <v-spacer></v-spacer>
          <span class="grey--text">&copy; {{ new Date().getFullYear() }}</span>
          <v-spacer></v-spacer>
          <a href="https://github.com/knitbow/">
            <v-icon>mdi-github</v-icon>
          </a>
          <a href="https://twitter.com/nit_bow">
            <v-icon>mdi-twitter</v-icon>
          </a>
          <a href="https://www.facebook.com/naoya.moriguchi">
            <v-icon>mdi-facebook</v-icon>
          </a>
          <a href="https://www.instagram.com/knitbow/">
            <v-icon>mdi-instagram</v-icon>
          </a>
          <v-spacer></v-spacer>
        </v-layout>
      </v-footer>
    </v-card>
  </v-app>
</template>

<script>
    export default {
        data() {
            return {
                clipped: false,
                drawer: false,
                fixed: false,
                items: [
                    {
                        icon: 'mdi-apps',
                        title: 'Home',
                        to: '/'
                    },
                    {
                        icon: 'mdi-shape-outline',
                        title: 'Category',
                        to: '/category'
                    },
                    {
                        icon: 'mdi-code-tags',
                        title: 'Code Tag',
                        to: '/tag'
                    }
                ],
                miniVariant: false,
                right: true,
                rightDrawer: false,
                title: 'Portfolio'
            }
        }
    }
</script>
