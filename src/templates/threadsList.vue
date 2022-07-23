<template>
  <Layout>
    <div v-if="!$vuetify.breakpoint.mdAndUp" id="mobile">
      <div
        class="pa-6"
        :style="{
          position: 'fixed',
          top: '80px',
          width: '100%',
        }"
      >
        <!-- <v-card
          class="pa-3 mb-2"
          outlined
          rounded
          v-for="(edge, i) in $page.posts.edges"
          :key="i"
          @click="$router.push({ path: '/blog/' + edge.node.id })"
        >
          <h3 class="my-1">{{ edge.node.title }}</h3>
          <p>{{ edge.node.content[edge.node.content.length - 1].text }}</p>
          <v-layout class="px-0" justify-space-between>
            <span> {{ edge.node.content.length }} Tarjetas </span>
            <i> por {{ edge.node.author }} </i>
          </v-layout>
        </v-card> -->
        <v-card class="pa-3" flat color="red lighten-5">
          <v-subheader>Ver otra vez</v-subheader>
          <v-btn dark depressed block @click="resetCards" color="secundary"
            >Ver de nuevo</v-btn
          >
        </v-card>
        <p class="mt-12">
          Si te ha gustado la publicación, puedes seguirme a través de:
        </p>
        <v-layout justify-space-around>
          <v-btn
            large
            depressed
            rounded
            @click="openTwitter"
            color="blue lighten-5"
          >
            <v-icon color="twitter">mdi-twitter</v-icon>
            <span>Twitter</span>
          </v-btn>
          <v-btn
            large
            depressed
            rounded
            @click="openLinkedin"
            color="blue lighten-5"
          >
            <v-icon color="linkedin">mdi-linkedin</v-icon>
            <span>Linkedin</span>
          </v-btn>
        </v-layout>
      </div>

      <GamecardStack
        v-if="cards.length !== 0"
        :key="rerender"
        :cards="cards"
        :thread="$page.threadsList"
        @cardSkipped="removeCardFromDeck"
        :style="{
          position: 'fixed',
          top: '56px',
          bottom: '94px',
          left: '12px',
          right: '12px',
          width: 'calc(100% - 24px)',
          height: '100%',
          borderRadius: '8px',
        }"
      >
      </GamecardStack>
      <v-layout
        style="position: fixed; bottom: 16px; left: 0; right: 0; width: 100%"
        justify-space-between
        class="px-1"
      >
        <v-layout align-center>
          <v-icon>mdi-heart-outline</v-icon>
          <span class="ml-2">
            {{ $page.threadsList.content[0].public_metrics.like_count }}
          </span>
        </v-layout>
        <share-button></share-button>
      </v-layout>
    </div>
    <div v-else>
      <v-layout
        justify-space-between
        class="px-12 mx-12"
        style="max-width: 100%; margin-top: 120px"
      >
        <v-flex md7>
          <v-card class="pa-6 mb-12" outlined rounded>
            <div
              class="mb-6"
              v-for="(card, i) in $page.threadsList.content"
              :key="i"
            >
              <img
                v-if="card.urls.length > 0"
                class="mb-4 mx-n6"
                :src="card.urls[0]"
                style="max-height: 400px; width: 100%; object-fit: contain"
              />
              <div v-if="i == 0" class="mb-4">
                <h1>{{ $page.threadsList.title }}</h1>
                <i>{{ $t("by") }} {{ $page.threadsList.author }} </i>
                <v-layout
                  justify-space-between
                  align-centers
                  class="px-0 py-3"
                  style="width: 100%"
                >
                  <v-layout align-center class="px-0">
                    <v-icon>mdi-heart-outline</v-icon>
                    <span class="ml-2 mt-1">
                      {{
                        $page.threadsList.content[0].public_metrics.like_count
                      }}
                    </span>
                  </v-layout>
                  <share-button></share-button>
                </v-layout>
              </div>
              <p v-html="linkify(card.text)" style="font-size: 1.3em"></p>
            </div>
          </v-card>
        </v-flex>
        <v-flex md4>
          <v-card class="pa-6" flat color="red lighten-5">
            <v-layout class="px-0" align-center>
              <v-avatar
                size="64"
                style="border: 3px solid #f0134d"
                @click="$router.push({ path: '/' })"
              >
                <v-img
                  src="https://pbs.twimg.com/profile_images/1442752801965232131/x2ovRWHQ_400x400.jpg"
                ></v-img>
              </v-avatar>
              <span class="ml-4 font-weight-bold">Andriu Garcia</span>
            </v-layout>
            <p class="font-weight-light mt-4">
              {{ $t("description") }}
            </p>
          </v-card>
          <v-subheader class="mt-6">{{ $t("otherPosts") }}</v-subheader>
          <v-divider class="mx-4"></v-divider>
          <v-card
            v-for="(edge, i) in posts"
            :key="i"
            class="ma-4 pa-3"
            outlined
            rounded
            color="primary"
            style="
              -webkit-box-shadow: 10px 10px 0px 0px #000000;
              box-shadow: 10px 10px 0px 0px #000000;
            "
            @click="
              $router.push({
                path: `/${$i18n.locale.substring(0, 2)}/blog/` + edge.node.id,
              })
            "
          >
            <h3 class="my-1">{{ edge.node.title }}</h3>
            <p>{{ edge.node.content[0].text }}</p>
            <v-layout class="px-0" justify-space-between>
              <span> {{ edge.node.content.length }} Tarjetas </span>
              <i> {{ $t("by") }} {{ edge.node.author }} </i>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
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
import GamecardStack from "@/components/GamecardStack.vue";
import ShareButton from "../components/ShareButton.vue";
export default {
  watch: {
    $route(to, from) {
      this.cards = [...this.$page.threadsList.content];
      this.rerender++;
    },
  },
  computed: {
    posts() {
      console.log(this.$page.posts.edges);
      return this.$page.posts.edges.filter((post) =>
        this.$i18n.locale.startsWith(post.node.locale)
      );
    },
  },
  metaInfo() {
    return {
      title: this.$page.threadsList.title,
      meta: [
        {
          name: "author",
          content: this.$page.threadsList.author,
        },
        {
          name: "description",
          content: this.$page.threadsList.content[0].text,
        },
      ],
    };
  },
  components: {
    GamecardStack,
    ShareButton,
  },

  mounted() {
    this.cards = [...this.$page.threadsList.content];
  },

  data() {
    return {
      cards: [],
      rerender: 0,
    };
  },

  // beforeRouteUpdate(to, from) {
  //   console.log(to);
  //   setTimeout(() => {
  //     console.log(this.$page.threadsList.content);
  //     this.cards = [...this.$page.threadsList.content];
  //     this.rerender++;
  //   });
  // },

  methods: {
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
    openTwitter() {
      window.open("https://twitter.com/Versymattic");
    },

    openLinkedin() {
      window.open("https://www.linkedin.com/in/andriugarcia/");
    },
    linkify(inputText) {
      //URLs starting with http://, https://, or ftp://
      var replacePattern1 =
        /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
      var replacedText = inputText.replace(replacePattern1, "");

      //URLs starting with www. (without // before it, or it'd re-link the ones done above)
      var replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
      var replacedText = replacedText.replace(replacePattern2, "");

      //Change email addresses to mailto:: links
      var replacePattern3 =
        /(([a-zA-Z0-9_\-\.]+)@[a-zA-Z_]+?(?:\.[a-zA-Z]{2,6}))+/gim;
      var replacedText = replacedText.replace(replacePattern3, "");

      return replacedText.replace(/\n/g, "<br />");
    },
    resetCards() {
      this.cards = [...this.$page.threadsList.content];
      this.rerender++;
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/mixins.scss";
</style>