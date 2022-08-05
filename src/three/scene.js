import * as THREE from "three";

// 场景
let scene = new THREE.Scene();

// 添加天空盒
const skyBoxLoader = new THREE.CubeTextureLoader().setPath("./skyBox/");

const skyBox = skyBoxLoader.load([
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
]);

scene.background = skyBox;
scene.environment = skyBox;

export default scene;
