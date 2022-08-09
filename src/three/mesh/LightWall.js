import * as THREE from "three";
import gsap from "gsap";

import vertex from "@/shader/LightWall/vertex.glsl";
import fragment from "@/shader/LightWall/fragment.glsl";

export default class LightWall {
  constructor(
    radius = 5,
    length = 2,
    position = { x: 0, z: 0 },
    color = 0xff0000
  ) {
    this.geometry = new THREE.CylinderGeometry(radius, radius, 5, 32, 32, true);
    // 计算边界矩形
    this.geometry.computeBoundingBox();

    let {
      max: { y: yt },
      min: { y: yb },
    } = this.geometry.boundingBox;

    this.material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: {
        uHeight: {
          value: yt - yb,
        },
      },
      side: THREE.DoubleSide,
      transparent: true,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(position.x, 0, position.z);

    gsap.to(this.mesh.scale, {
      x: length,
      z: length,
      duration: 1.3,
      repeat: -1,
      ease: "none",
      yoyo: true,
    });
  }
  remove() {
    this.mesh.remove();
    this.mesh.removeFromParent();
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
  }
}
