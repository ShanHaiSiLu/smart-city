import * as THREE from "three";
import camera from "../camera";

export default class AlarmSprite {
  constructor({ x, z }, type = "火警", color = 0x00ffff) {
    // 不同类型的报警对应不同类型的图标
    const typeObj = {
      火警: "./textures/tag/fire.png",
      治安: "./textures/tag/jingcha.png",
      电力: "./textures/tag/e.png",
    };
    const map = new THREE.TextureLoader().load(typeObj[type]);
    this.material = new THREE.SpriteMaterial({
      map,
      color,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthTest: false,
    });

    this.mesh = new THREE.Sprite(this.material);
    this.mesh.position.set(x, 5, z);

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

  remove() {
    this.mesh.remove();
    this.mesh.removeFromParent();
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
  }
}
