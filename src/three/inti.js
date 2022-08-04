import camera from "./camera";
import renderer from "./renderer";

window.addEventListener("resize", () => {
  // 更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight;
  // 更新摄像机投影矩阵
  camera.updateProjectionMatrix();

  // 更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 更新渲染器像素比
  renderer.setPixelRatio(window.devicePixelRatio);
});
