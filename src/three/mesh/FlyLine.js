import * as THREE from "three";
import gsap from "gsap";

export default class FlyLine {
  /**
   *
   * @param {*} startPosition
   * @param {*} endPosition
   */
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

    // 根据曲线生成几何体
    let __cureOption__ = [this.lineCurve, 100, 1, 2, false];
    this.geomerey = new THREE.TubeBufferGeometry(...__cureOption__);

    // 创建材质
    this.texture = new THREE.TextureLoader().load("./arrowTexture/z_11.png");
    this.texture.repeat.set(1, 2);
    this.texture.wrapS = THREE.RepeatWrapping;
    this.texture.wrapT = THREE.MirroredRepeatWrapping;

    this.material = new THREE.MeshBasicMaterial({
      map: this.texture,
      transparent: true,
    });
    this.material.repea;

    // 创建几何体
    this.mesh = new THREE.Mesh(this.geomerey, this.material);

    gsap.to(this.texture.offset, {
      x: -1,
      duration: 1,
      ease: "none",
      repeat: -1,
    });
  }
}
