const THREE = require("three");
const GLTFLoader = require("three/examples/jsm/loaders/GLTFLoader.js").GLTFLoader;
const { loadPhone, load3DModel } = require("@/three/functions")

const addClothing = function (i, cb) {

  switch (i) {
    case 0:
      load3DModel("/t-shirt/scene.gltf", 0.25, (tshirt) => {
        tshirt.visible = false
        cb(tshirt)
      })
      break;
    case 1:
      load3DModel("/t-shirt1/scene.gltf", 0.031, (tshirt) => {
        tshirt.visible = false
        tshirt.position.y -= 42
        cb(tshirt)
      })
      break;
    case 2:
      load3DModel("/standard_t-shirt/scene.gltf", 0.027, (tshirt) => {
        tshirt.visible = false
        tshirt.position.y -= 35
        cb(tshirt)
      })
      break;
    case 3:
      load3DModel("/polo/scene.gltf", 0.0028, (tshirt) => {
        tshirt.visible = false
        tshirt.position.y -= 35
        cb(tshirt)
      })
      break;
  }
}

const loadCarpet = (src, width, height, thick) => {
  const geometry = new THREE.BoxGeometry(width, height, thick);
  const texture = new THREE.TextureLoader().load(src);
  const planeMaterial = new THREE.MeshStandardMaterial({
    map: texture,
  });

  const plane = new THREE.Mesh(geometry, planeMaterial);
  plane.receiveShadow = true;

  return plane
}

let clothings

const load = function (xoffset = 0) {
  // const moontest = loadPlanet("/moon.jpeg", 20);
  // moontest.position.x = xoffset;
  // moontest.position.y = 15;

  // pantala.add(moontest);

  const pantala = new THREE.Group();

  pantala.position.x = xoffset

  pantala.add(
    loadPhone("/olimaps.png", 20, 35, 2, 0x1c1c1c, {
      x: -10,
      y: 23.5,
      z: -3,
    })
  );

  const carpet = loadCarpet("/textures/carpet.jpeg", 539, 360, 5)
  carpet.position.y = 1
  carpet.rotation.x = THREE.MathUtils.degToRad(-90)

  carpet.scale.set(0.15, 0.15, 0.15)
  pantala.add(carpet)
  const loader = new GLTFLoader();

  clothings = [new THREE.Group(), new THREE.Group(), new THREE.Group()]

  const groupCoordinates = {
    x: 0,
    y: 15,
    z: 20,
    spacing: 20
  }

  clothings[0].position.x = groupCoordinates.x - groupCoordinates.spacing;
  clothings[0].position.y = groupCoordinates.y;
  clothings[0].position.z = groupCoordinates.z;

  clothings[1].position.x = groupCoordinates.x;
  clothings[1].position.y = groupCoordinates.y;
  clothings[1].position.z = groupCoordinates.z;

  clothings[2].position.x = groupCoordinates.x + groupCoordinates.spacing;
  clothings[2].position.y = groupCoordinates.y;
  clothings[2].position.z = groupCoordinates.z;

  // load3DModel("/nike/scene.gltf", 50, (nike) => {

  //   nike.position.x = 0;
  //   nike.position.y = 30;
  //   nike.position.z = -20;
  //   pantala.add(nike)
  // })

  // load3DModel("/new_balance/scene.gltf", 0.05, (tshirt) => {
  //   tshirt.position.x = 0;
  //   tshirt.position.y = 30;
  //   tshirt.position.z = -20;
  //   pantala.add(tshirt)
  // })

  // load3DModel("/nike_air/scene.gltf", 10, (tshirt) => {
  //   pantala.add(tshirt)
  // })

  pantala.add(clothings[0])
  pantala.add(clothings[1])
  pantala.add(clothings[2])

  let hidedClothing = null

  addClothing(0, (tshirt) => {
    clothings[0].add(tshirt)
    tshirt.visible = true
  })
  addClothing(3, (tshirt) => {
    clothings[0].add(tshirt)
    hidedClothing = tshirt
  })
  addClothing(1, (tshirt) => {
    clothings[1].add(tshirt)
    tshirt.visible = true
  })
  addClothing(2, (tshirt) => {
    clothings[2].add(tshirt)
    tshirt.visible = true
  })

  // Añadir prenda a la posicion siguiente
  // Eliminar prenda de la prenda con la posicion anterior
  // Visualizar nueva de la posicion anterior
  // Actualizar posicion

  let slotPos = 0
  let clothingPos = 0

  setInterval(() => {

    const nextPos = (slotPos + 1) % 3

    addClothing(clothingPos, (tshirt) => {
      clothings[nextPos].add(tshirt)
      clothings[slotPos].remove(clothings[slotPos].children[0])
      hidedClothing.visible = true
      hidedClothing = tshirt
      slotPos = nextPos
      clothingPos = (clothingPos + 1) % 4
    })


  }, 4000)

  return pantala
}

let t = 0

const animate = function () {
  t += 0.05;

  if (clothings) {
    clothings[0].position.y += 0.05 * Math.sin(t);
    clothings[1].position.y += 0.05 * Math.sin(t + 0.8);
    clothings[2].position.y += 0.05 * Math.sin(t + 0.16);
  }

}

export {
  load, animate
}