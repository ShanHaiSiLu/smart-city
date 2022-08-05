import * as THREE from "three";
import gsap from "gsap";

import vertex from "@/shader/LightRadar/vertex.glsl";
import fragment from "@/shader/LightRadar/fragment.glsl";

export default class LightRadar {
  constructor({ x, y, z }) {
    this.geometry = new THREE.PlaneBufferGeometry(4, 4);

    this.material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: {
        uTime: {
          value: 0,
        },
      },
      side: THREE.DoubleSide,
      transparent: true,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(x, y + 0.4, z);
    this.mesh.rotateX(Math.PI / 2);

    gsap.to(this.material.uniforms.uTime, {
      value: 1,
      duration: 1,
      ease: "none",
      repeat: -1,
    });
  }
}
