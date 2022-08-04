import * as THREE from "three";
import gsap from "gsap";

import vertex from "@/shader/flyLine/vertex.glsl";
import fragment from "@/shader/flyLine/fragment.glsl";

export default class FlyLineShader {
  constructor(startPosition, endPosition) {
    const { x: x1, y: y1, z: z1 } = startPosition;
    const { x: x2, y: y2, z: z2 } = endPosition;
    // 创建点
    let linePoints = [
      new THREE.Vector3(x1, y1, z1),
      new THREE.Vector3((x1 + x2) / 2, y1 + y2 + 5, (z1 + z2) / 2),
      new THREE.Vector3(x2, y2, z2),
    ];

    // 创建曲线
    this.lineCurve = new THREE.CatmullRomCurve3(linePoints);

    // 获取曲线上的点
    let points = this.lineCurve.getPoints(1000);

    // 根据点生成几何体
    this.geometry = new THREE.BufferGeometry().setFromPoints(points);

    // 创建着色器材质
    this.shaderMaterial = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
    });

    // 创建点mesh
    this.mesh = new THREE.Points(this.geometry, this.shaderMaterial);
  }
}
