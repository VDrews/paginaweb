<template>
  <v-app>
    <v-main>
      <header
        class="header mb-0"
        style="position: fixed; top: 0; left: 0; right: 0; z-index: 100"
      >
        <v-toolbar flat color="transparent">
          <v-avatar
            style="border: 3px solid #f0134d"
            @click="$router.push({ path: '/' })"
          >
            <v-img
              src="https://pbs.twimg.com/profile_images/1442752801965232131/x2ovRWHQ_400x400.jpg"
            ></v-img>
          </v-avatar>
          <v-spacer></v-spacer>
          <v-btn icon large @click="openTwitter">
            <v-icon>mdi-twitter</v-icon>
          </v-btn>
          <v-btn icon large @click="openLinkedin">
            <v-icon>mdi-linkedin</v-icon>
          </v-btn>
        </v-toolbar>
      </header>
      <slot />
    </v-main>
  </v-app>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
export default {
  methods: {
    openTwitter() {
      window.open("https://twitter.com/Versymattic");
    },

    openLinkedin() {
      window.open("https://www.linkedin.com/in/andriugarcia/");
    },
  },
};
</script>

<style>
body {
  font-family: "Josefin Sans" -apple-system, system-ui, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
  margin: 0;
  padding: 0;
  line-height: 1.5;
}

.v-application {
  font-family: "Josefin Sans", sans-serif !important;
}

.v-application .title {
  font-family: "Josefin Sans", sans-serif !important;
}

.layout {
  max-width: 760px;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav__link {
  margin-left: 20px;
}
</style>
