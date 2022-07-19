<template>
  <Layout>
    <v-layout class="px-0 mx-0 pb-12" justify-center style="max-width: 100%">
      <v-flex sm9 xs12>
        <v-subheader style="margin-top: 72px">Posts</v-subheader>
        <v-divider class="mx-4"></v-divider>
        <v-layout wrap justify-start style="max-width: 100%">
          <v-flex v-for="(edge, i) in posts" :key="i" xs12 md4 class="mb-4">
            <v-card
              class="ma-4 pa-3 shadow"
              outlined
              rounded
              color="primary"
              style="height: 100%"
              @click="$router.push({ path: '/blog/' + edge.node.id })"
            >
              <h3 class="my-1">{{ edge.node.title }}</h3>
              <p>{{ edge.node.content[0].text | truncate }}</p>
              <v-layout
                style="position: absolute; bottom: 0; left: 0; right: 0"
                class="px-4 pb-2"
                justify-space-between
              >
                <span> {{ edge.node.content.length }} {{ $t("cards") }} </span>
                <i> {{ $t("by") }} {{ edge.node.author }} </i>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </Layout>
</template>

<page-query>
query {
  allThreadsList {
    edges {
      node {
        id,
        title,
        author,
        locale,
        content {
          text,
          urls
        }
      }
    }
  }
}
</page-query>

<script>
export default {
  computed: {
    posts() {
      return this.$page.allThreadsList.edges.filter((post) =>
        this.$i18n.locale.startsWith(post.node.locale)
      );
    },
  },
};
</script>
