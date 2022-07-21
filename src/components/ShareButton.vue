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
    <v-layout v-else>
      <v-icon>mdi-share-variant</v-icon>
      <v-divider></v-divider>
      <v-btn small, icon>
        <v-icon>fab fa-whatsapp</v-icon>
      </v-btn>
      <v-btn small, icon>
        <v-icon>fab fa-twitter</v-icon>
      </v-btn>
      <v-btn small, icon>
        <v-icon>fab fa-facebook</v-icon>
      </v-btn>
      <v-btn small, icon>
        <v-icon>fab fa-linkedin</v-icon>
      </v-btn>
    </v-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      canShare: navigator.canShare,
    };
  },
  methods: {
    async share() {
      try {
        await navigator.share({
          title: this.$page.threadsList.title,
          text: "",
          url: window.location.href,
        });
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>