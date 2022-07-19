const THREE = require("three");
const GLTFLoader = require("three/examples/jsm/loaders/GLTFLoader.js").GLTFLoader;
const { RoundedBoxGeometry } = require("three/examples/jsm/geometries/RoundedBoxGeometry.js");

const loader = new GLTFLoader();

const loadImage = function (src, width, height) {
  const planeGeometry = new THREE.PlaneGeometry(width, height, 1, 1);
  const texture = new THREE.TextureLoader().load(src);
  const planeMaterial = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
  });

  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;

  return plane;
};

const loadVideo = function (src, width, height) {
  const video = document.getElementById(src);
  video.play()
  const planeGeometry = new THREE.PlaneGeometry(width, height, 1, 1);
  const videoTexture = new THREE.VideoTexture(video);
  const videoMaterial = new THREE.MeshBasicMaterial({ map: videoTexture, side: THREE.FrontSide, toneMapped: false });

  const plane = new THREE.Mesh(planeGeometry, videoMaterial);
  plane.receiveShadow = true;

  return plane;
};

const loadPlanet = function (src, radius) {
  const sphereGeometry = new THREE.SphereGeometry(radius, 10, 25);
  const texture = new THREE.TextureLoader().load(src);
  const sphereMaterial = new THREE.MeshBasicMaterial({
    map: texture,
  });

  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.receiveShadow = true;

  return sphere;
};

const load3DModel = function (src, scale, callback) {
  loader.load(
    src,
    function (gltf) {
      gltf.scene.children[0].scale.set(scale, scale, scale);
      callback(gltf.scene.children[0])
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );
}

const loadPhone = function (src, width, height, thick, color, { x, y, z }, isVideo = false) {
  const phone = new THREE.Group();
  loader.load(
    "/phone/scene.gltf",
    function (gltf) {
      console.log(gltf);
      const scale = 5
      const phonematerial = new THREE.MeshPhysicalMaterial({
        color: color,
        emissive: color,
        roughness: 0.2,
        metalness: 1,
        reflectivity: 0.8,
      });
      const buttonsmaterial = new THREE.MeshPhysicalMaterial({
        color: 0x1c1c1c,
        emissive: 0x1c1c1c,
        roughness: 0.5,
        metalness: 1,
        reflectivity: 0.8,
      });
      const glassmaterial = new THREE.MeshPhysicalMaterial({
        color: 0x1c1c1c,
        emissive: 0x1c1c1c,
        roughness: 0,
        metalness: 1,
        reflectivity: 0.8,
      });
      gltf.scene.children[0].material = buttonsmaterial
      gltf.scene.children[1].material = buttonsmaterial
      gltf.scene.children[2].material = buttonsmaterial
      gltf.scene.children[3].children[0].material = phonematerial
      gltf.scene.children[3].children[1].material = glassmaterial
      gltf.scene.scale.set(scale, scale * 0.98, scale);
      gltf.scene.position.z -= 0.12
      gltf.scene.rotation.y = THREE.MathUtils.degToRad(-90)
      phone.add(gltf.scene)
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );
  phone.position.x = x;
  phone.position.z = z;
  phone.position.y = y;

  // phone.position.x -= 45
  // phone.position.y += 30
  // phone.position.z += 60
  // phone.rotation.z = THREE.MathUtils.degToRad(15);
  // phone.rotation.y = THREE.MathUtils.degToRad(-50);



  let olimaps = null
  if (!isVideo) {
    olimaps = loadImage(src, width * 0.92, height * 0.95);
  } else {
    olimaps = loadVideo(src, width * 0.92, height * 0.95);
  }
  phone.add(olimaps);
  // olimaps.position.x = -3;
  // olimaps.position.y = 1.8;
  olimaps.position.z = 0.51 * thick;

  return phone;
};

export {
  loadImage,
  loadPlanet,
  load3DModel,
  loadPhone
}