import * as THREE from "three";
import camera from "../camera";

import warningImg from "@/assets/warning.png";

export default class AlarmSprite {
  constructor({ x, y, z }) {
    const map = new THREE.TextureLoader().load(warningImg);
    this.material = new THREE.SpriteMaterial({ map });

    this.mesh = new THREE.Sprite(this.material);
    this.mesh.position.set(x, y, z);

    this.ray = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    window.addEventListener("click", (e) => {
      // 更新归一化坐标
      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      // 更新射线
      this.ray.setFromCamera(this.mouse, camera);
      // 获取拾取的物体
      const intersects = this.ray.intersectObject(this.mesh);
      // 如果有拾取到的物体，则执行onClick回调
      if (intersects.length) {
        this.clickArr.forEach((fn) => {
          e.mesh = this.mesh;
          e.rayInfo = intersects[0];

          fn(e);
        });
      }
    });

    this.clickArr = [];
  }

  onClick(fn) {
    this.clickArr.push(fn);
  }
}
