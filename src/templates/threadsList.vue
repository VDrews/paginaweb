<template>
  <Layout>
    <div
      class="pa-6"
      :style="{
        position: 'absolute',
        top: '80px',
        width: '100%',
      }"
    >
      <span class="font-weight-bold mb-2">Otras Publicaciones</span>
      <!-- <g-link
        v-for="(edge, i) in $page.posts.edges"
        :key="i"
        :to="'/blog/' + edge.node.id"
      >
        <v-card class="pa-3 mb-2" outlined rounded>
          <h3 class="my-1">{{ edge.node.title }}</h3>
          <p>{{ edge.node.content[edge.node.content.length - 1].text }}</p>
          <v-layout class="px-0" justify-space-between>
            <span> {{ edge.node.content.length }} Tarjetas </span>
            <i> por {{ edge.node.author }} </i>
          </v-layout>
        </v-card>
      </g-link> -->
      <p class="mt-6">
        Si te ha gustado la publicación, puedes seguirme a través de:
      </p>
      <v-layout justify-space-around>
        <v-btn large depressed rounded color="blue lighten-5">
          <v-icon color="twitter">mdi-twitter</v-icon>
          <span>Twitter</span>
        </v-btn>
        <v-btn large depressed rounded color="blue lighten-5">
          <v-icon color="linkedin">mdi-linkedin</v-icon>
          <span>Linkedin</span>
        </v-btn>
      </v-layout>
    </div>

    <GamecardStack
      :cards="cards"
      :thread="$page.threadsList"
      @cardSkipped="removeCardFromDeck"
      :style="{
        position: 'absolute',
        top: '72px',
        bottom: '120px',
        left: '12px',
        right: '12px',
        width: 'calc(100% - 24px)',
        height: '100%',
        borderRadius: '8px',
      }"
    >
    </GamecardStack>
    <v-layout
      style="position: absolute; bottom: 24px; left: 0; right: 0; width: 100%"
      justify-space-between
    >
      <v-layout align-center>
        <v-icon>mdi-heart-outline</v-icon>
        <span class="ml-2">
          {{ $page.threadsList.content[0].public_metrics.like_count }}
        </span>
      </v-layout>
      <v-btn rounded depressed large color="red lighten-5">
        <span class="mr-2 secundary--text text-capitalize">Compartir</span>
        <v-icon color="secundary" size="32">mdi-share-variant</v-icon>
      </v-btn>
    </v-layout>
  </Layout>
</template>

<page-query>
query($id: ID!) {
  threadsList(id: $id) {
    id,
    title,
    author,
    content {
      text,
      urls,
      public_metrics {
        like_count
      }
    }
  }
  posts: allThreadsList {
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
import GamecardStack from "@/components/GamecardStack.vue";
export default {
  components: {
    GamecardStack,
  },

  mounted() {
    this.cards = [...this.$page.threadsList.content];
  },

  data() {
    return {
      cards: [],
    };
  },
  methods: {
    share() {
      Navigator.share();
    },
    handleCardAccepted() {
      console.log("handleCardAccepted");
    },
    handleCardRejected() {
      console.log("handleCardRejected");
    },
    handleCardSkipped() {
      console.log("handleCardSkipped");
    },
    removeCardFromDeck() {
      // this.cards.shift();
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/mixins.scss";
</style>