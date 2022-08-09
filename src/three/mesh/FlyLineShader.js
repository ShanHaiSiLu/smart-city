import * as THREE from "three";
import gsap from "gsap";

import vertex from "@/shader/flyLine/vertex.glsl";
import fragment from "@/shader/flyLine/fragment.glsl";

export default class FlyLineShader {
  /**
   *
   * @param {THREE.Position} startPosition 起点位置，仅配置X和Z
   * @param {THREE.Position} endPosition 终点位置，仅配置X和Z
   * @param {THREE.Color} color 飞线颜色，受到颜色叠加影响，核心区域几乎全部为白色，边缘区域有比较明显的颜色差异
   * @param {int} length 飞线的长度，一个在0 - 1000之间的整数，数值越大则飞线越长（这个1000来自于曲线上的点的数量，也就是lineCurve.getPoints()的参数）
   * @param {float} radius 飞线的半径，0-1之间的浮点数，数值越大则飞线越粗
   */
  constructor(
    startPosition = { x: 0, z: 0 },
    endPosition = { x: 0, z: 0 },
    color = 0xff00ff,
    length = 150,
    radius = 0.5
  ) {
    const { x: x1, z: z1 } = startPosition;
    const { x: x2, z: z2 } = endPosition;
    // 创建点
    let linePoints = [
      new THREE.Vector3(x1, 0, z1),
      new THREE.Vector3((x1 + x2) / 2, 5, (z1 + z2) / 2),
      new THREE.Vector3(x2, 0, z2),
    ];

    // 创建曲线
    this.lineCurve = new THREE.CatmullRomCurve3(linePoints);

    // 获取曲线上的点
    let points = this.lineCurve.getPoints(1000);

    // 根据点生成几何体
    this.geometry = new THREE.BufferGeometry().setFromPoints(points);

    // 设置点的大小
    let pointSizeList = new Float32Array(points.length);
    for (let i = 0; i < points.length; i++) {
      pointSizeList[i] = i;
    }
    this.geometry.setAttribute(
      "aSize",
      new THREE.BufferAttribute(pointSizeList, 1)
    );

    // 创建着色器材质
    this.shaderMaterial = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: {
        uTime: {
          value: 0,
        },
        uColor: {
          value: new THREE.Color(color),
        },
        uLength: {
          value: points.length,
        },
        uLineLength: {
          value: length,
        },
        uRadius: {
          value: radius,
        },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    // 创建点mesh
    this.mesh = new THREE.Points(this.geometry, this.shaderMaterial);

    gsap.to(this.shaderMaterial.uniforms.uTime, {
      value: 1000,
      duration: 3,
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
