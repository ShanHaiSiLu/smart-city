import * as THREE from "three";
import gsap from "gsap";

import vertex from "@/shader/LightWall/vertex.glsl";
import fragment from "@/shader/LightWall/fragment.glsl";

export default class LightWall {
  constructor({ x, y, z }) {
    this.geometry = new THREE.CylinderGeometry(5, 5, 5, 32, 32, true);
    // 计算边界矩形
    this.geometry.computeBoundingBox();
    console.log(this.geometry.boundingBox);
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
    this.mesh.position.set(x, y, z);

    gsap.to(this.mesh.scale, {
      x: 0.3,
      z: 0.3,
      duration: 2,
      repeat: -1,
      ease: "none",
      yoyo: true,
    });
  }
}
