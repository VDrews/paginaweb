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
  const video = document.getElementById('video');
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
  const geometry = new RoundedBoxGeometry(width, height, thick, 3, 1, 1);
  const phoneMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    emissive: color,
    roughness: 0.5,
    metalness: 1,
    reflectivity: 0.8,
  });
  const phone = new THREE.Mesh(geometry, phoneMaterial);
  phone.position.x = x;
  phone.position.z = z;
  phone.position.y = y;

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