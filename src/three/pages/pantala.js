const THREE = require("three");
const TWEEN = require("@tweenjs/tween.js");

let phone;

const { loadPhone, loadImage } = require("@/three/functions")

const loadCarpet = (src, width, height, thick) => {
  const geometry = new THREE.BoxGeometry(width, height, thick);
  const texture = new THREE.TextureLoader().load(src);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(8, 4);
  const planeMaterial = new THREE.MeshStandardMaterial({
    map: texture,
  });

  const plane = new THREE.Mesh(geometry, planeMaterial);
  plane.receiveShadow = true;

  return plane
}

const loadBox = (size) => {
  const geometry = new THREE.BoxGeometry(size, size, size,);
  const texture = new THREE.TextureLoader().load("/textures/cardboard.jpeg");
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

  phone = loadPhone("videoPantala", 20, 35, 2, 0x2c2c2c, {
    x: -10,
    y: 23.5,
    z: -3,
  }, true)

  pantala.add(
    phone
  );

  const carpet = loadCarpet("/textures/carpet.jpeg", 550, 400, 5)
  carpet.position.y = 1
  carpet.rotation.x = THREE.MathUtils.degToRad(-90)

  carpet.scale.set(0.15, 0.15, 0.15)
  pantala.add(carpet)

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

  let clothes = {}

  const clothingStack = loadImage("/clothes/clothing-stack.png", 300, 300);
  clothes.blueDress = loadImage("/clothes/blue-dress.png", 300, 300);
  clothes.brownJacket = loadImage("/clothes/brown-jacket.png", 300, 300);
  clothes.greenJacket = loadImage("/clothes/green-jacket.png", 300, 300);
  clothes.pants = loadImage("/clothes/pants.png", 300, 300);
  clothes.pinkDress = loadImage("/clothes/pink-dress.png", 300, 300);
  clothes.pinkDress2 = loadImage("/clothes/pink-dress.png", 300, 300);
  clothes.purpleTshirt = loadImage("/clothes/purple-tshirt.png", 300, 300);
  clothes.redDress = loadImage("/clothes/red-dress.png", 300, 300);
  clothes.yellowTshirt = loadImage("/clothes/yellow-tshirt.png", 300, 300);

  for (const key in clothes) {
    clothes[key].scale.set(0.08, 0.08, 0.08)
    clothes[key].visible = false
  }

  clothings[0].add(clothes.blueDress)
  clothings[0].add(clothes.brownJacket)
  clothings[0].add(clothes.greenJacket)
  clothings[1].add(clothes.pinkDress2)
  clothings[1].add(clothes.pants)
  clothings[1].add(clothes.purpleTshirt)
  clothings[2].add(clothes.redDress)
  clothings[2].add(clothes.yellowTshirt)
  clothings[2].add(clothes.pinkDress)

  pantala.add(clothingStack)
  clothingStack.scale.set(0.04, 0.04, 0.04)
  clothingStack.position.y = 10
  clothingStack.position.x = -22
  clothingStack.position.z = 5
  clothingStack.rotation.y = THREE.MathUtils.degToRad(-45)

  const box_tower = new THREE.Group();
  const boxes = [loadBox(8), loadBox(8), loadBox(8)]
  box_tower.position.y += 15
  box_tower.position.z -= 2
  box_tower.position.x += 5.5

  box_tower.add(boxes[0])
  box_tower.add(boxes[1])
  box_tower.add(boxes[2])

  pantala.add(box_tower)
  boxes[0].rotation.y = THREE.MathUtils.degToRad(-45)
  boxes[1].position.y += 8
  boxes[1].position.x += 1
  boxes[1].position.z += 1
  boxes[2].rotation.y = THREE.MathUtils.degToRad(-25)
  boxes[2].position.y += 16
  boxes[2].position.x -= 1
  boxes[2].position.z -= 1

  let i = 0
  setInterval(() => {
    const nextPos = (i + 1) % 3
    clothings[0].children[i].visible = false
    clothings[0].children[nextPos].visible = true
    clothings[1].children[i].visible = false
    clothings[1].children[nextPos].visible = true
    clothings[2].children[i].visible = false
    clothings[2].children[nextPos].visible = true

    i = nextPos
  }, 2000)

  return pantala
}

const hover = function () {
  const targetPosition = new THREE.Vector3(phone.position.x - 45, phone.position.y + 30, phone.position.z + 60)
  const tweenPosition = new TWEEN.Tween(phone.position).to(targetPosition, 500);
  const tweenRotation = new TWEEN.Tween(phone.rotation).to({ x: THREE.MathUtils.degToRad(-20), y: THREE.MathUtils.degToRad(-45), z: THREE.MathUtils.degToRad(-12) }, 500);
  tweenPosition.start();
  tweenRotation.start();
}
const unhover = function () {
  const targetPosition = new THREE.Vector3(-10, 23.5, -3)
  const tweenPosition = new TWEEN.Tween(phone.position).to(targetPosition, 500);
  const tweenRotation = new TWEEN.Tween(phone.rotation).to({ x: 0, y: THREE.MathUtils.degToRad(0), z: 0 }, 500);
  tweenPosition.start();
  tweenRotation.start();
}

let t = 0

const animate = function (time) {
  t += 0.05;

  if (clothings) {
    clothings[0].position.y += 0.05 * Math.sin(t);
    clothings[1].position.y += 0.05 * Math.sin(t + 0.8);
    clothings[2].position.y += 0.05 * Math.sin(t + 0.16);
  }

  TWEEN.update(time);

}

export {
  load, animate, hover, unhover
}