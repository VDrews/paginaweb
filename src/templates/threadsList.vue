<template>
  <Layout>
    <div
      class="pa-6"
      :style="{
        position: 'absolute',
        top: '64px',
        bottom: '120px',
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
    <Swipeable
      v-for="(tweet, i) in cards"
      :key="i"
      v-on:swipe="onSwipe"
      :style="{
        position: 'absolute',
        top: '64px',
        bottom: '120px',
        width: '100%',
        borderRadius: '8px',
      }"
    >
      <v-card
        class="ma-4 pa-0"
        color="primary"
        outlined
        rounded
        style="
          height: 100%;
          -webkit-box-shadow: 10px 10px 0px 0px #000000;
          box-shadow: 10px 10px 0px 0px #000000;
        "
      >
        <div>
          <div v-if="i == $page.threadsList.content.length - 1" class="ma-4">
            <h1>{{ $page.threadsList.title }}</h1>
            <i>por {{ $page.threadsList.author }} </i>
          </div>
          <div v-else>
            <v-subheader>{{ $page.threadsList.title }}</v-subheader>
            <v-divider></v-divider>
          </div>
          <v-img
            v-if="tweet.urls.length == 1"
            class="mb-2"
            :src="tweet.urls[0]"
            style="max-height: 200px"
          ></v-img>
          <p class="font-weight-bold ma-4" style="font-size: 1.3em">
            {{ tweet.text }}
          </p>
        </div>
        <v-layout
          class="pb-2"
          justify-space-between
          align-center
          style="position: absolute; bottom: 0; left: 0; right: 0; width: 100%"
        >
          <v-btn
            fab
            color="yellow darken-3"
            outlined
            :disabled="backhistory.length == 0"
            @click="goBack"
          >
            <v-icon color="black">mdi-chevron-left</v-icon>
          </v-btn>
          <v-progress-linear
            color="black"
            class="mx-3"
            :height="10"
            :value="(position * 100) / ($page.threadsList.content.length - 1)"
          ></v-progress-linear>
          <v-btn fab color="yellow darken-3" outlined @click="onSwipe(null)">
            <v-icon color="black">mdi-chevron-right</v-icon>
          </v-btn>
        </v-layout>
      </v-card>
    </Swipeable>
    <v-layout
      style="position: absolute; bottom: 24px; left: 0; right: 0; width: 100%"
      justify-space-between
    >
      <v-layout align-center>
        <v-icon>mdi-heart-outline</v-icon>
        <span class="ml-2">
          {{
            $page.threadsList.content[$page.threadsList.content.length - 1]
              .public_metrics.like_count
          }}
        </span>
      </v-layout>
      <v-btn rounded depressed large color="secundary lighten-5">
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
import { Swipeable } from "vue-swipy";
export default {
  components: {
    Swipeable,
  },

  mounted() {
    this.cards = [...this.$page.threadsList.content];
  },

  data() {
    return {
      cards: [],
      backhistory: [],
      position: 0,
    };
  },
  methods: {
    goBack() {
      this.position -= 1;
      this.cards.push(this.backhistory.pop());
    },
    onSwipe(direction) {
      console.log(direction);
      setTimeout(() => {
        this.backhistory.push(this.cards.pop());
        this.position += 1;
      }, 300);
    },
    share() {
      Navigator.share();
    },
  },
};
</script>