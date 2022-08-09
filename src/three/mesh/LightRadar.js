import * as THREE from "three";
import gsap from "gsap";

import vertex from "@/shader/LightRadar/vertex.glsl";
import fragment from "@/shader/LightRadar/fragment.glsl";

export default class LightRadar {
  constructor(radius, position = { x:0, z:0 }, color) {
    this.geometry = new THREE.PlaneBufferGeometry(radius, radius);

    this.material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: {
        uTime: {
          value: 0,
        },
        uColor: {
          value: new THREE.Color(color)
        }
      },
      side: THREE.DoubleSide,
      transparent: true,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(position.x, 2, position.z);
    this.mesh.rotateX(Math.PI / 2);

    gsap.to(this.material.uniforms.uTime, {
      value: 1,
      duration: 1,
      ease: "none",
      repeat: -1,
    });
  }
  remove() {
    this.mesh.remove();
    this.mesh.removeFromParent();
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
  }
}
