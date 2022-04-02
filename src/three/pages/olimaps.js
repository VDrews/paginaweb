const THREE = require("three");
const GLTFLoader = require("three/examples/jsm/loaders/GLTFLoader.js").GLTFLoader;
const { loadPhone, loadPlanet, loadImage } = require("@/three/functions")

let planet = null
let t = 0;
const load = function (scene, xOffset = 0) {
  scene.add(
    loadPhone("video", 20, 35, 2, 0x1c1c1c, {
      x: -10,
      y: 23.5,
      z: -3,
    }, true)
  );

  const loader = new GLTFLoader();

  // loader.load(
  //   "/scene.gltf",
  //   function (gltf) {
  //     gltf.scene.scale.set(0.4, 0.4, 0.4);
  //     gltf.scene.children[0].position.x = -30;
  //     gltf.scene.children[0].position.y = 15;
  //     scene.add(gltf.scene);
  //   },
  //   undefined,
  //   function (error) {
  //     console.error(error);
  //   }
  // );

  const waves = loadImage("/waves.png", 300, 300);
  scene.add(waves);
  waves.scale.set(0.35, 0.35, 0.35);
  // waves.postiion.x = 0;
  // waves.postiion.y = 0;
  waves.position.z = 4;
  waves.position.y = 1;
  waves.rotation.x = THREE.MathUtils.degToRad(-90);
  waves.rotation.z = THREE.MathUtils.degToRad(225);

  loader.load(
    "/little_planet_earth/scene.gltf",
    function (gltf) {
      gltf.scene.children[0].scale.set(0.03, 0.03, 0.03);
      var box = new THREE.Box3().setFromObject(gltf.scene.children[0]);
      box.center(gltf.scene.children[0].position); // this re-sets the mesh position
      gltf.scene.children[0].position.multiplyScalar(-1);
      var pivot = new THREE.Group();
      scene.add(pivot);
      pivot.add(gltf.scene.children[0]);

      planet = pivot;
      planet.position.z = 15;
      planet.position.y = 15;

      const locations = [];

      for (let i = 0; i < 5; i += 1) {
        const planeGeometry = new THREE.PlaneGeometry(2, 2, 1, 1);
        const texture = new THREE.TextureLoader().load("/location.png");
        const planeMaterial = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
        });

        locations[i] = new THREE.Mesh(planeGeometry, planeMaterial);
        locations[i].receiveShadow = true;

        pivot.add(locations[i]);

        // locations[i].rotation.z = THREE.MathUtils.degToRad(-90);
      }

      locations[0].position.x = 0;
      locations[0].position.y = 0;
      locations[0].position.z = 15.5;

      locations[1].position.x = 5;
      locations[1].position.y = 8;
      locations[1].position.z = 12.29;

      locations[2].position.x = 0;
      locations[2].position.y = -8;
      locations[2].position.z = 13.27;

      locations[3].position.x = -8;
      locations[3].position.y = 13;
      locations[3].position.z = 2.69;

      locations[4].position.x = 0;
      locations[4].position.y = -3;
      locations[4].position.z = -15.2;

      let posts = [];
      // posts.push(
      //   loadPhone("/countries/chicago.jpeg", 6, 3.7, 0.25, 0xffffff, {
      //     x: -13,
      //     y: 8,
      //     z: 7.48,
      //   })
      // );

      // posts.push(
      //   loadPhone("/countries/granada.jpeg", 4.8, 6, 0.25, 0xffffff, {
      //     x: 0,
      //     y: 6.5,
      //     z: 15.9,
      //   })
      // );

      // posts.push(
      //   loadPhone("/countries/japan.jpeg", 6, 3.89, 0.25, 0xffffff, {
      //     x: 15,
      //     y: 6,
      //     z: -5.29,
      //   })
      // );

      // posts.push(
      //   loadPhone("/countries/la.jpeg", 6, 4, 0.25, 0xFFFFFF, {
      //     x: 12,
      //     y: 10,
      //     z: -10.81,
      //   })
      // );
      // posts.push(
      //   loadPhone("/countries/london.jpeg", 4.76, 6, 0.25, 0xFFFFFF, {
      //     x: 12,
      //     y: 10,
      //     z: -10.81,
      //   })
      // );
      // posts.push(
      //   loadPhone("/countries/ny.jpeg", 6, 4, 0.25, 0xFFFFFF, {
      //     x: 12,
      //     y: 10,
      //     z: -10.81,
      //   })
      // );
      // posts.push(
      //   loadPhone("/countries/thailand.jpeg", 6, 4, 0.25, 0xFFFFFF, {
      //     x: 12,
      //     y: 10,
      //     z: -10.81,
      //   })
      // );

      // posts.forEach((post) => {
      //   var normal = new THREE.Vector3();
      //   var position = new THREE.Vector3();
      //   normal
      //     .subVectors(post.position, new THREE.Vector3(0, 0, 0))
      //     .normalize();
      //   console.log(normal);
      //   var up = new THREE.Vector3(0, 1, 0);
      //   var axis = new THREE.Vector3().crossVectors(up, normal).normalize();
      //   var radians = Math.acos(normal.dot(up));
      //   var matrix = new THREE.Matrix4().makeRotationAxis(axis, radians);
      //   post.rotation.setFromRotationMatrix(matrix);
      //   pivot.add(post);
      // });

      const moon = loadPlanet("/moon.jpeg", 2);
      moon.position.x = 30;
      pivot.add(moon);

      planet.rotation.z = -0.26;

      scene.add(planet);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );
}

const animate = function () {
  t += 0.05;
  if (planet) {
    planet.rotation.y -= 0.01;
    planet.position.y += 0.05 * Math.sin(t);
    planet.children.forEach((locator, index) => {
      if (index > 0 && index < 6) {
        locator.rotation.y += 0.01;
      }
    });
  }
}

export {
  load, animate
}