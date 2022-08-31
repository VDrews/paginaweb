<template>
  <div id="share-button">
    <v-btn
      v-if="canShare"
      @click="share"
      rounded
      depressed
      large
      color="red lighten-5"
    >
      <span class="mr-2 secundary--text text-capitalize">{{
        $t("share")
      }}</span>
      <v-icon color="secundary" size="32">mdi-share-variant</v-icon>
    </v-btn>
    <v-layout v-else align-center>
      <v-divider color="grey"></v-divider>
      <v-btn icon @click="share('whatsapp')">
        <v-icon>mdi-whatsapp</v-icon>
      </v-btn>
      <v-btn icon @click="share('twitter')">
        <v-icon>mdi-twitter</v-icon>
      </v-btn>
      <v-btn icon @click="share('facebook')">
        <v-icon>mdi-facebook</v-icon>
      </v-btn>
      <v-btn icon @click="share('linkedin')">
        <v-icon>mdi-linkedin</v-icon>
      </v-btn>
      <v-avatar class="ml-2" color="secundary">
        <v-icon class="white--text">mdi-share-variant</v-icon>
      </v-avatar>
    </v-layout>
  </div>
</template>

<script>
export default {
  computed: {
    canShare() {
      if (typeof navigator == "undefined") return false;
      return navigator.canShare;
    },
  },
  methods: {
    async share(channel) {
      console.log(this.$t);
      switch (channel) {
        case "whatsapp":
          window.open(
            "whatsapp://send?text=" +
              this.$t("checkArticle") +
              window.location.href
          );
          break;
        case "facebook":
          window.open(
            "https://www.facebook.com/sharer/sharer.php?u=" +
              window.location.href
          );
          break;
        case "twitter":
          window.open(
            "https://twitter.com/intent/tweet?text=" +
              this.$t("checkArticle") +
              window.location.href
          );
          break;
        case "linkedin":
          window.open(
            "https://www.linkedin.com/shareArticle?mini=true&url=" +
              window.location.href
          );
          break;
        default:
          try {
            await navigator.share({
              title: this.$page.threadsList.title,
              text: "",
              url: window.location.href,
            });
          } catch (err) {
            console.error(err);
          }
      }
    },
  },
};
</script>