<template>
  <Layout>
    <div id="main">
      <video
        id="video"
        playsinline
        webkit-playsinline
        muted
        loop
        autoplay
        width="320"
        height="240"
        src="olimaps.mp4"
        style="display: none"
      ></video>

      <v-card
        color="secundary"
        style="
          scroll-snap-align: start;
          height: 100vh;
          width: 100vw;
          z-index: 20;
        "
        tile
      >
        <!-- <v-layout
          style="position: absolute; bottom: 12px; left: 0; right: 0"
          column
          align="center"
        >
          <v-avatar color="black">
            <v-icon color="white">mdi-arrow-down</v-icon>
          </v-avatar>
          <div>Ver Proyectos</div>
        </v-layout> -->
        <v-row
          class="pa-12"
          style="height: 100%; width: 100%"
          justify="center"
          align="center"
        >
          <v-flex xs4 v-if="$vuetify.breakpoint.lgAndUp">
            <v-card
              class="rounded-xl elevation-12"
              style="
                height: 300px;
                width: 300px;
                transform: rotateY(30deg) skewY(-5deg);
              "
            >
              <v-img :src="require('~/assets/fotoperfil.png')"></v-img>
            </v-card>
            <v-card
              class="rounded-xl elevation-12 mt-6"
              style="
                height: 200px;
                width: 200px;
                margin-left: 100px;
                transform: rotateY(-30deg) skewY(5deg);
              "
            ></v-card>
            <v-card
              class="rounded-xl elevation-12"
              style="
                height: 100px;
                width: 100px;
                margin-left: 40px;
                transform: rotateY(30deg) skewY(-5deg);
              "
            >
            </v-card>
          </v-flex>
          <v-flex xs12 lg5 class="pt-6">
            <span class="mono font-weight-bold yellow--text">Hola! Soy</span>
            <h1
              class="white--text mt-2"
              style="font-size: 280%; font-weight: 600; line-height: 48px"
            >
              Andriu Garcia
            </h1>
            <p
              class="white--text mt-2"
              style="
                font-size: 260%;
                font-weight: 600;
                line-height: 48px;
                opacity: 0.8;
              "
            >
              Construyo para dar superpoderes a las personas.
            </p>
            <p class="white--text" style="max-width: 500px">
              Mi misión es crear para dar valor para las personas, hacer
              realidad ideas que resuelvan diferentes necesidades y utilizar mis
              conocimientos de desarrollo para maximizar el valor que les puedo
              aportar.
            </p>
            <v-subheader class="white--text">HABLEMOS</v-subheader>
            <v-layout class="mb-2 px-0" justify-start>
              <v-btn
                class="text-capitalize mr-2"
                depressed
                dark
                color="secundary darken-1"
                @click="openEmail"
              >
                <v-icon class="mr-2">mdi-email</v-icon>
                <div style="letter-spacing: 0">E-mail</div>
              </v-btn>
              <v-btn
                class="text-capitalize mr-2"
                depressed
                dark
                color="secundary darken-1"
                @click="openTwitter"
              >
                <v-icon class="mr-2">mdi-twitter</v-icon>
                <div style="letter-spacing: 0">Twitter</div>
              </v-btn>
              <v-btn
                class="text-capitalize"
                depressed
                dark
                color="secundary darken-1"
                @click="openLinkedin"
              >
                <v-icon class="mr-2">mdi-linkedin</v-icon>
                <div style="letter-spacing: 0">Linkedin</div>
              </v-btn>
            </v-layout>
          </v-flex>
        </v-row>
      </v-card>
      <canvas
        id="bg"
        style="position: fixed; top: 0; bottom: 0; right: 0; left: 0"
      ></canvas>
      <div id="startCanvas"></div>
      <div class="redbar"></div>
      <v-card
        v-for="(project, i) in projects"
        :key="i"
        class="block d-flex flex-row-reverse"
        color="transparent"
        flat
        style="padding-top: 82px; padding-right: 48px"
      >
        <div class="text-right" style="width: 460px; max-width: 80vw">
          <v-layout class="px-0" justify-end style="margin-right: -39px">
            <h1 class="mr-2">{{ project.name }}</h1>

            <v-avatar style="z-index: 10">
              <v-img :src="project.logo"></v-img>
            </v-avatar>
          </v-layout>
          <span class="mono">{{ project.stack }} </span>
          <p class="mt-3" style="text-align: justify; font-weight: 600">
            {{ project.description }}
          </p>
          <v-layout justify-end class="px-0">
            <v-btn
              v-if="project.github.length != 0"
              class="mr-2 text-capitalize"
              depressed
              color="grey lighten-4"
            >
              <v-icon class="mr-1">mdi-github</v-icon>
              <span>GitHub</span>
            </v-btn>
            <v-btn
              v-if="project.app.length != 0"
              class="text-capitalize"
              dark
              depressed
              color="secundary"
              >Ver App</v-btn
            >
          </v-layout>
        </div>
      </v-card>
      <div id="endCanvas"></div>
      <v-card flat style="scroll-snap-align: start; z-index: 2">
        <v-layout
          class="px-0 mx-0 pb-12"
          justify-center
          style="max-width: 100%"
        >
          <v-flex sm9 xs12>
            <v-subheader style="margin-top: 72px">Posts</v-subheader>
            <v-divider class="mx-4"></v-divider>
            <v-layout wrap justify-start style="max-width: 100%">
              <v-flex
                v-for="(edge, i) in $page.allThreadsList.edges"
                :key="i"
                xs12
                md4
                class="mb-4"
              >
                <v-card
                  class="ma-4 pa-3"
                  outlined
                  rounded
                  color="primary"
                  style="
                    height: 100%;
                    -webkit-box-shadow: 10px 10px 0px 0px #000000;
                    box-shadow: 10px 10px 0px 0px #000000;
                  "
                  @click="$router.push({ path: '/blog/' + edge.node.id })"
                >
                  <h3 class="my-1">{{ edge.node.title }}</h3>
                  <p>{{ edge.node.content[0].text | truncate }}</p>
                  <v-layout
                    style="position: absolute; bottom: 0; left: 0; right: 0"
                    class="px-4 pb-2"
                    justify-space-between
                  >
                    <span> {{ edge.node.content.length }} Tarjetas </span>
                    <i> por {{ edge.node.author }} </i>
                  </v-layout>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card>
      <v-toolbar dark color="background" style="z-index: 2">
        <v-spacer></v-spacer>
        <span class="mono"
          >Página desarrollada con: Vue.js · Gridsome · Vuetify · Three.js</span
        >
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-footer
        color="secundary"
        class="pa-6 pt-12"
        style="scroll-snap-align: start; z-index: 2"
      >
        <v-layout justify-space-around class="px-0" wrap>
          <v-flex md5 xs12 sm12 class="mb-6">
            <v-subheader>CV / Resume</v-subheader>
            <v-layout class="mb-2 px-0" justify-space-around>
              <v-btn
                class="text-capitalize"
                depressed
                color="secundary darken-1"
                @click="downloadResumeFullstack"
              >
                <v-icon class="mr-2">mdi-paperclip</v-icon>
                <span style="letter-spacing: 0">Full-Stack Engineer</span>
              </v-btn>
              <v-btn
                class="text-capitalize"
                depressed
                color="secundary darken-1"
                @click="downloadResumeProductManager"
              >
                <v-icon class="mr-2">mdi-paperclip</v-icon>
                <span style="letter-spacing: 0">Product Manager</span>
              </v-btn>
            </v-layout>
          </v-flex>
          <v-flex md5 xs12 sm12 class="mb-6">
            <h1>Hablamos?</h1>
            <v-layout class="mb-2 px-0" justify-space-around>
              <v-btn
                class="text-capitalize"
                depressed
                color="secundary darken-1"
              >
                <v-icon class="mr-2">mdi-twitter</v-icon>
                <span style="letter-spacing: 0">@versymattic</span>
              </v-btn>
              <v-btn
                class="text-capitalize"
                depressed
                color="secundary darken-1"
              >
                <v-icon class="mr-2">mdi-linkedin</v-icon>
                <span style="letter-spacing: 0">/in/andriugarcia</span>
              </v-btn>
            </v-layout>
            <v-text-field
              value="contacto@andriugarcia.com"
              append-icon="mdi-at"
              solo-inverted
              flat
              readonly
              @click="window.open('mailto:contacto@andriugarcia.com')"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-footer>
    </div>
  </Layout>
</template>

<page-query>
query {
  allThreadsList(limit: 3) {
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
let threeLoaded = false;
export default {
  metaInfo() {
    return {
      title: "Posts",
    };
  },

  methods: {
    openEmail() {
      window.open("mailto:contacto@andriugarcia.com");
    },

    openTwitter() {
      window.open("https://twitter.com/Versymattic");
    },

    openLinkedin() {
      window.open("https://www.linkedin.com/in/andriugarcia/");
    },
    downloadResumeFullstack() {
      window.open("/AndriuGarcia-WebDeveloperResume.pdf");
    },
    downloadResumeProductManager() {
      window.open("/ResumeAndriuGarcia-ProductManager.pdf");
    },
  },

  data() {
    return {
      projects: [
        {
          name: "Olimaps",
          logo: "https://olimaps.com/_nuxt/img/olimaps-logo.2297405.png",
          description:
            "Olimaps is a social network with the mission of recovering real relationships between people, in this project I have been able to develop the complete platform, including its business model, architecture, design, branding, and implementation of the entire web app and infrastructure",
          stack:
            "Nuxt.js (Vue.js) · Express.js · Prisma.js · TypeScript · PostgreSQL · ElasticSearch",
          app: "https://olimaps.com",
          github: "https://github.com/andriugarcia/Olimaps-Frontend",
        },
        {
          name: "Pantala",
          logo: "https://pantala.es/wp-content/uploads/2021/04/cropped-cropped-Logo-Pantala-1-1.png",
          description:
            "Pantala is a subscription service where users have 3 garments that they can change monthly",
          stack:
            "Nuxt.js (Vue.js), GraphQL, MySQL, Firebase, CloudFlare, Stripe",
          app: "https://pantala.es",
          github: "",
        },
      ],
    };
  },

  filters: {
    truncate(value) {
      return value.substr(0, 120) + "...";
    },
  },

  mounted() {
    const THREE = require("three");
    const olimaps = require("@/three/pages/olimaps");
    const pantala = require("@/three/pages/pantala");
    const { getCamera, moveCamera } = require("@/three/camera");

    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector("#bg"),
    });

    // camera.position.setX(-1000); X es una variable relativa

    const camera = getCamera();

    const gridHelper = new THREE.GridHelper(10000, 1000, 0xe0e0e0, 0xe0e0e0);
    scene.add(gridHelper);

    olimaps.load(scene);

    let step = 1;

    setTimeout(() => {
      const block = document.getElementsByClassName("block")[1];
      const xoffset = step * block.offsetHeight * 0.2;

      scene.add(pantala.load(xoffset));
    });

    // const map = loadImage("/world-map-vector.png", 100, 60);
    // map.rotation.x = THREE.MathUtils.degToRad(-90);
    // map.position.y = 0.05;
    // map.position.z = 20;

    const ambientLight = new THREE.AmbientLight(0xffffff);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(-1, 1, 1);
    // pointLight.position.set(15, 15, 15);
    scene.add(ambientLight, directionalLight);

    // const controls = new OrbitControls(camera, renderer.domElement);

    document.getElementById("main").onscroll = moveCamera;
    moveCamera();

    // const axesHelper = new THREE.AxesHelper(200);
    // scene.add(axesHelper);

    function animate() {
      requestAnimationFrame(animate);
      // console.log(camera.rotation);

      renderer.render(scene, camera);

      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0xffffff, 1);
      // updateAspectRatio();
      olimaps.animate();
      pantala.animate();

      // controls.update();
    }

    animate();
  },
};
</script>

<style>
.home-links a {
  margin-right: 1rem;
}

#main {
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  height: 100vh;
}

html {
  overflow-y: none;
}

.redbar {
  position: absolute;
  right: 32px;
  top: 0;
  width: 3px;
  z-index: 1;
  height: 100vh;
  background-color: red;
  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent 5%,
    rgba(0, 0, 0, 1) 12%,
    rgba(0, 0, 0, 1) 60%,
    transparent 90%
  );
  mask-image: linear-gradient(
    to bottom,
    transparent 5%,
    rgba(0, 0, 0, 1) 12%,
    rgba(0, 0, 0, 1) 60%,
    transparent 90%
  );
}

.block {
  scroll-snap-align: start;
  height: 100vh;
  z-index: 20;
}

.mono {
  font-family: "Cutive Mono", monospace;
}
</style>
