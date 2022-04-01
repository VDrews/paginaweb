const THREE = require("three");


let relX = 0;
let camera = null
const getCamera = function () {
  // const aspectratio = window.innerWidth / window.innerHeight;
  // const width = 50;
  // const height = 50 / aspectratio;
  // camera = new THREE.OrthographicCamera(
  //   -width,
  //   width,
  //   height,
  //   -height,
  //   -500,
  //   500
  // );

  updateAspectRatio()

  camera.position.setY(30);
  camera.position.setZ(30);
  camera.rotation.x = THREE.MathUtils.degToRad(-31);
  camera.rotation.y = THREE.MathUtils.degToRad(-35);
  camera.rotation.z = THREE.MathUtils.degToRad(-20);

  return camera
}

const updateAspectRatio = function () {
  const factor = 15

  const left = -48
  const bottom = -27
  const right = (window.innerWidth / factor) + left
  const top = (window.innerHeight / factor) + bottom

  camera = new THREE.OrthographicCamera(
    left, right, top, bottom,
    - 500,
    500
  );
}

const moveCamera = function () {
  const t = document.getElementsByClassName("scroller")[0].scrollTop;

  // camera.position.z = t * -0.01;
  // console.log(t * -0.2);
  // -162
  relX = 10 + t * 0.2;
  camera.position.x = relX;
  // camera.rotation.y = t * -0.0002;
}

export {
  getCamera, moveCamera, updateAspectRatio
}