const THREE = require("three");
const TWEEN = require("@tweenjs/tween.js");

const { loadPhone } = require("@/three/functions")
let phone

const load = function (xoffset = 0) {


  const pickalook = new THREE.Group();

  pickalook.position.x = xoffset

  phone = loadPhone("videoPantala", 20, 35, 2, 0xe1255e, {
    x: -10,
    y: 23.5,
    z: -3,
  }, true)

  pickalook.add(
    phone
  );


  return pickalook
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
  TWEEN.update(time);

}

export {
  load, animate, hover, unhover
}