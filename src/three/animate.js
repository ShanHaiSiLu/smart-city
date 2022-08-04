import * as THREE from "three";
import scene from "./scene";
import camera from "./camera";
import renderer from "./renderer";
import controls from "./controls";

// 时钟
let clock = new THREE.Clock();

// 渲染函数
function animate() {
  const elapsedTime = clock.getElapsedTime();
  renderer.render(scene, camera);
  controls.update();
  requestAnimationFrame(animate);
}

export default animate;
