import * as THREE from "three";

// 相机
let _cameraOption = [75, window.innerWidth / window.innerHeight, 0.0001, 50000];
let camera = new THREE.PerspectiveCamera(..._cameraOption);
camera.position.set(0, 10, 10);

export default camera;
