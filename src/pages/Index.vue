<template>
  <Layout>
    <v-subheader style="margin-top: 72px">Posts</v-subheader>
    <v-divider class="mx-4"></v-divider>
    <v-card
      class="ma-4 pa-3"
      outlined
      rounded
      color="primary"
      style="
        -webkit-box-shadow: 10px 10px 0px 0px #000000;
        box-shadow: 10px 10px 0px 0px #000000;
      "
      v-for="(edge, i) in $page.allThreadsList.edges"
      :key="i"
      @click="$router.push({ path: '/blog/' + edge.node.id })"
    >
      <h3 class="my-1">{{ edge.node.title }}</h3>
      <p>{{ edge.node.content[edge.node.content.length - 1].text }}</p>
      <v-layout class="px-0" justify-space-between>
        <span> {{ edge.node.content.length }} Tarjetas </span>
        <i> por {{ edge.node.author }} </i>
      </v-layout>
    </v-card>
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
  metaInfo: {
    title: "Hello, world!",
  },
};
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
