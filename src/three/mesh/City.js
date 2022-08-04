import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import scene from "../scene";
import modifyCityMaterial from "../modify/modifyCityMaterial";
import FLyLine from "./FlyLine";
import FlyLineShader from "./FlyLineShader";
import MeshLine from "./MeshLine";
import LightWall from "./LightWall";

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
    const flyLine = new FLyLine({ x: 0, y: 0, z: 0 }, { x: 10, y: 0, z: 0 });
    scene.add(flyLine.mesh);

    // 添加着色器飞线
    const flyLineShader = new FlyLineShader(
      { x: 0, y: 0, z: 0 },
      { x: -10, y: 0, z: 0 }
    );
    scene.add(flyLineShader.mesh);

    // 添加光墙
    const lightWall = new LightWall({ x: 10, y: 0, z: -10 });
    scene.add(lightWall.mesh);
  });
}
