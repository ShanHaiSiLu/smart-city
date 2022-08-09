import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import scene from "../scene";
import modifyCityMaterial from "../modify/modifyCityMaterial";
import FLyLine from "./FlyLine";
import FlyLineShader from "./FlyLineShader";
import MeshLine from "./MeshLine";
import LightWall from "./LightWall";
import LightRadar from "./LightRadar";
import AlarmSprite from "./AlarmSprite";

export default function createCity() {
  const gltfLoader = new GLTFLoader();
  gltfLoader.load("./model/city.glb", (gltf) => {
    scene.add(gltf.scene);

    gltf.scene.traverse((item) => {
      if (item.isMesh) {
        const cityMaterial = new THREE.MeshBasicMaterial({
          color: 0x0c0e6f,
          side: THREE.DoubleSide,
        });

        item.material = cityMaterial;

        modifyCityMaterial(item);
      }
      if (item.name === "Layerbuildings") {
        let lineMesh = new MeshLine(item.geometry);
        scene.add(lineMesh.mesh);

        const scaleSize = item.scale.x * 1.001;
        lineMesh.mesh.scale.set(scaleSize, scaleSize, scaleSize);
      }
    });

    // 添加飞线
    // const flyLine = new FLyLine({ x: 0, y: 0, z: 0 }, { x: 10, y: 0, z: 0 });
    // scene.add(flyLine.mesh);

    // 添加着色器飞线
    // const flyLineShader = new FlyLineShader(
    //   { x: 0, y: 0, z: 0 },
    //   { x: -10, y: 0, z: 0 }
    // );
    // scene.add(flyLineShader.mesh);

    // 添加光墙
    // const lightWall = new LightWall({ x: 10, z: -10 });
    // scene.add(lightWall.mesh);

    // // 添加雷达
    // const lightRadar = new LightRadar({ x: -11, y: 0, z: 8 });
    // scene.add(lightRadar.mesh);

    // 添加警告标识
    // const alarmAprite = new AlarmSprite({ x: 3.5, z: 10 });
    // scene.add(alarmAprite.mesh);
    // alarmAprite.onClick((e) => {
    //   console.log("参数为：", e);
    //   console.log(
    //     `%c  $报警 `,
    //     "font-size:13px; background:pink; color:#bf2c9f;"
    //   );
    // });
    // alarmAprite.onClick((e) => {
    //   console.log(
    //     `%c  $报警回调2 `,
    //     "font-size:13px; background:skyblue; color:red;"
    //   );
    // });
  });
}
