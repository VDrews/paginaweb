<template>
  <Layout>
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
    <div style="position: relative">
      <canvas
        id="bg"
        style="position: fixed; top: 0; bottom: 0; right: 0; left: 0"
      ></canvas>
      <div class="scroller pr-4" style="position: relative">
        <div
          style="
            position: absolute;
            right: 32px;
            top: 90px;
            width: 3px;
            z-index: 1;
            height: calc(500vh - 98vh);
            background-color: red;
          "
        ></div>
        <v-row
          v-for="i in 5"
          :key="i"
          style="padding-top: 86px"
          class="block pr-12"
          justify="end"
        >
          <div
            class="text-right"
            style="width: 460px; max-width: 80vw; padding-right: 18px"
          >
            <v-layout justify-end style="margin-right: -81px">
              <h1 class="mr-2">Olimaps</h1>
              <v-avatar style="z-index: 10">
                <v-img
                  src="https://olimaps.com/_nuxt/img/olimaps-logo.2297405.png"
                ></v-img>
              </v-avatar>
            </v-layout>
            <p class="font-weight-black" style="text-align: justify">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <v-layout justify-end>
              <v-btn dark depressed color="secundary">Ver App</v-btn>
            </v-layout>
          </div>
        </v-row>
      </div>
    </div>
    <!-- <v-layout class="px-0 mx-0" justify-center style="max-width: 100%">
      <v-flex sm9 xs12>
        <v-subheader style="margin-top: 72px">Posts</v-subheader>
        <v-divider class="mx-4"></v-divider>
        <v-layout wrap justify-start style="max-width: 100%">
          <v-flex
            v-for="(edge, i) in $page.allThreadsList.edges"
            :key="i"
            xs12
            md4
          >
            <v-card
              class="ma-4 pa-3"
              outlined
              rounded
              color="primary"
              style="
                -webkit-box-shadow: 10px 10px 0px 0px #000000;
                box-shadow: 10px 10px 0px 0px #000000;
              "
              @click="$router.push({ path: '/blog/' + edge.node.id })"
            >
              <h3 class="my-1">{{ edge.node.title }}</h3>
              <p>{{ edge.node.content[0].text }}</p>
              <v-layout class="px-0" justify-space-between>
                <span> {{ edge.node.content.length }} Tarjetas </span>
                <i> por {{ edge.node.author }} </i>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout> -->
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
  metaInfo() {
    return {
      title: "Posts",
    };
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
      const xoffset = 10 + step * block.offsetHeight * 0.2;

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

    document.getElementsByClassName("scroller")[0].onscroll = moveCamera;
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

.scroller {
  position: absolute;
  z-index: 99;
  max-height: 100vh;
  width: 100vw;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
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
}
</style>
