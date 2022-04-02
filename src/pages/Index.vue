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
        src="/olimaps.mp4"
        style="display: none"
      ></video>
      <video
        id="videoPantala"
        playsinline
        webkit-playsinline
        muted
        loop
        autoplay
        width="320"
        height="240"
        src="/pantala.mp4"
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
        <v-card
          v-if="$vuetify.breakpoint.lgAndUp"
          flat
          color="transparent"
          style="position: absolute; bottom: 12px; left: 0; right: 0"
          column
          align="center"
          @click="scrollProjects"
        >
          <v-avatar color="background">
            <v-icon color="secundary">mdi-arrow-down</v-icon>
          </v-avatar>
          <div class="background--text" style="font-weight: 600">
            {{ $t("viewProjects") }}
          </div>
        </v-card>
        <v-row
          class="pa-12"
          style="height: 100%; width: 100%"
          justify="center"
          align="center"
        >
          <v-flex xs4 v-if="$vuetify.breakpoint.lgAndUp">
            <v-card
              outlined
              class="rotate-1 rounded-xl"
              style="
                height: 300px;
                width: 300px;
                background: linear-gradient(-45deg, #ddd9ce, #e0e2e1);
              "
            >
              <v-img :src="require('~/assets/fotoperfil.png')"></v-img>
            </v-card>
            <v-card
              outlined
              class="
                rotate-2
                d-flex
                flex-column
                justify-center
                align-center
                rounded-xl
                secundary--text
                mt-6
              "
              style="height: 200px; width: 200px; margin-left: 100px"
            >
              <span
                class="mt-10"
                style="font-size: 82px; font-weight: 800; line-height: 32px"
                >10</span
              >
              <div
                class="justify-self-end"
                style="font-size: 24px; font-weight: bold"
              >
                {{ $t("webProjects") }}
              </div>
              <div
                class="justify-self-end"
                style="font-size: 16px; font-weight: 500"
              >
                {{ $t("in5years") }}
              </div>
            </v-card>
            <v-card
              outlined
              class="rotate-3 rounded-xl"
              style="height: 150px; width: 150px; margin-left: 40px"
            >
              <v-carousel
                v-model="projectShortcutIteration"
                cycle
                :interval="3000"
                hide-delimiters
                touchless
                :show-arrows="false"
              >
                <v-carousel-item v-for="(icon, i) in projectIcons" :key="i">
                  <v-img class="ma-6" :src="icon"></v-img>
                </v-carousel-item>
              </v-carousel>
            </v-card>
          </v-flex>
          <v-flex xs12 lg5 class="pt-6">
            <span class="mono font-weight-bold yellow--text">{{
              $t("greetings")
            }}</span>
            <v-fade-transition>
              <h1
                v-show="nameShow"
                class="white--text mt-2"
                style="font-size: 280%; font-weight: 600; line-height: 48px"
              >
                Andriu Garcia
              </h1>
            </v-fade-transition>
            <v-fade-transition>
              <p
                v-show="missionShow"
                class="white--text mt-2"
                style="
                  font-size: 240%;
                  font-weight: 600;
                  line-height: 48px;
                  opacity: 0.8;
                "
              >
                {{ $t("mission") }}
              </p>
            </v-fade-transition>
            <v-fade-transition>
              <p
                v-show="descriptionShow"
                class="white--text"
                style="max-width: 500px"
              >
                {{ $t("description") }}
              </p>
            </v-fade-transition>
            <v-fade-transition>
              <v-layout v-show="ctaShow" class="mb-2 px-0" justify-start>
                <v-card
                  style="min-width: 80px"
                  class="
                    text-capitalize
                    d-flex
                    flex-column
                    justify-center
                    align-center
                    rounded-xl
                    mr-2
                    pa-4
                  "
                  outlined
                  depressed
                  dark
                  color="secundary darken-1"
                  @click="openEmail"
                >
                  <v-icon size="36">mdi-email</v-icon>
                  <div style="letter-spacing: 0">E-mail</div>
                </v-card>
                <v-card
                  style="min-width: 80px"
                  class="
                    text-capitalize
                    d-flex
                    flex-column
                    justify-center
                    align-center
                    rounded-xl
                    mr-2
                    pa-4
                  "
                  outlined
                  depressed
                  dark
                  color="secundary darken-1"
                  @click="openTwitter"
                >
                  <v-icon size="36">mdi-twitter</v-icon>
                  <div style="letter-spacing: 0">Twitter</div>
                </v-card>
                <v-card
                  style="min-width: 80px"
                  class="
                    text-capitalize
                    d-flex
                    flex-column
                    justify-center
                    align-center
                    rounded-xl
                    xl
                    pa-4
                  "
                  outlined
                  depressed
                  dark
                  color="secundary darken-1"
                  @click="openLinkedin"
                >
                  <v-icon size="36">mdi-linkedin</v-icon>
                  <div style="letter-spacing: 0">Linkedin</div>
                </v-card>
              </v-layout>
            </v-fade-transition>
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
        style="padding-top: 82px; padding-right: 60px"
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
              >{{ $t("checkApp") }}</v-btn
            >
          </v-layout>
        </div>
      </v-card>
      <v-card
        flat
        color="transparent"
        style="scroll-snap-align: start; z-index: 2"
      >
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
                    <span>
                      {{ edge.node.content.length }} {{ $t("cards") }}
                    </span>
                    <i> {{ $t("by") }} {{ edge.node.author }} </i>
                  </v-layout>
                </v-card>
              </v-flex>
              <v-flex xs12>
                <v-btn class="mt-12" block depressed color="grey lighten-5">{{
                  $t("morePosts")
                }}</v-btn>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card>
      <v-toolbar dark color="background" style="z-index: 2">
        <v-spacer></v-spacer>
        <span class="mono" style="font-size: min(3vw, 16px)"
          >Made with Vue.js · Gridsome · Vuetify · Three.js</span
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
            <h1>Andriu Garcia</h1>
            <v-subheader>CV / Resume</v-subheader>
            <v-layout class="mb-2 px-0" justify-space-around>
              <v-btn
                class="text-capitalize"
                depressed
                block
                color="#e11548"
                @click="downloadResumeFullstack"
              >
                <v-icon class="mr-2">mdi-paperclip</v-icon>
                <span style="letter-spacing: 0">CV / Resume</span>
              </v-btn>
            </v-layout>
          </v-flex>
          <v-flex md5 xs12 sm12 class="mb-6">
            <h1>{{ $t("letsTalk") }}</h1>
            <v-layout class="mb-2 px-0" justify-space-around>
              <v-btn class="text-capitalize" depressed color="#e11548">
                <v-icon class="mr-2">mdi-twitter</v-icon>
                <span style="letter-spacing: 0">@versymattic</span>
              </v-btn>
              <v-btn class="text-capitalize" depressed color="#e11548">
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
    scrollProjects() {
      document
        .getElementById("main")
        .scrollTo({ top: window.innerHeight, behavior: "smooth" });
    },
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
      projectShortcutIteration: 0,
      projectIcons: [
        "https://olimaps.com/_nuxt/img/olimaps-logo.2297405.png",
        require("~/assets/pantala.png"),
        require("~/assets/kanuki.png"),
        require("~/assets/PickALook.png"),
        require("~/assets/QueComprar.png"),
        require("~/assets/rubik.png"),
      ],
      nameShow: false,
      missionShow: false,
      descriptionShow: false,
      ctaShow: false,
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
          logo: require("~/assets/pantala.png"),
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

    let camera = getCamera();
    window.onresize = () => {
      camera = getCamera();
    };

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

    setTimeout(() => (this.nameShow = true), 0);
    setTimeout(() => (this.missionShow = true), 500);
    setTimeout(() => (this.descriptionShow = true), 1000);
    setTimeout(() => (this.ctaShow = true), 1500);
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
  right: 44px;
  top: 0;
  width: 3px;
  z-index: 1;
  height: 100vh;
  background-color: #f0154d;
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

@keyframes float1 {
  0% {
    box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
    transform: translatey(0px) rotateY(30deg) skewY(-5deg);
  }
  50% {
    box-shadow: 0 25px 15px 0px rgba(0, 0, 0, 0.2);
    transform: translatey(-20px) rotateY(30deg) skewY(-5deg);
  }
  100% {
    box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
    transform: translatey(0px) rotateY(30deg) skewY(-5deg);
  }
}

.rotate-1 {
  box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
  transform: translatey(0px) rotateY(30deg) skewY(-5deg);
  animation: float1 6s ease-in-out infinite;
}

@keyframes float3 {
  0% {
    box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
    transform: translatey(0px) rotateY(30deg) skewY(-5deg);
  }
  50% {
    box-shadow: 0 25px 15px 0px rgba(0, 0, 0, 0.2);
    transform: translatey(-20px) rotateY(30deg) skewY(-5deg);
  }
  100% {
    box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
    transform: translatey(0px) rotateY(30deg) skewY(-5deg);
  }
}

.rotate-3 {
  box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
  transform: translatey(0px) rotateY(30deg) skewY(-5deg);
  animation: float3 8s ease-in-out infinite;
}

@keyframes float2 {
  0% {
    box-shadow: 0 25px 15px 0px rgba(0, 0, 0, 0.2);
    transform: translatey(0px) rotateY(-30deg) skewY(5deg);
  }
  50% {
    box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
    transform: translatey(20px) rotateY(-30deg) skewY(5deg);
  }
  100% {
    box-shadow: 0 25px 15px 0px rgba(0, 0, 0, 0.2);
    transform: translatey(0px) rotateY(-30deg) skewY(5deg);
  }
}

.rotate-2 {
  box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
  transform: translatey(0px) rotateY(-30deg) skewY(5deg);
  animation: float2 6s ease-in-out infinite;
}

.block {
  scroll-snap-align: start;
  height: 100vh;
  z-index: 20;
}

.mono {
  font-family: monospace;
}
</style>
