<template>
  <div class="scene" ref="sceneDiv"></div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import * as THREE from "three";
import gsap from "gsap";

// 初始化一些配置
import "@/three/inti";
// 导入GUI对象
import gui from "@/three/gui";
// 导入场景
import scene from "@/three/scene";
// 导入相机
import camera from "@/three/camera";
// 导入渲染器
import renderer from "@/three/renderer";
// 导入辅助坐标轴
import axesHelper from "@/three/axesHelper";
// 导入控制器
// import controls from "@/three/controls";
// 导入创建物体
import createMesh from "@/three/createMesh";
// 导入帧动画
import animate from "@/three/animate";
// 导入报警精灵图
import AlarmSprite from "@/three/mesh/AlarmSprite";
import LightWall from "@/three/mesh/LightWall";
import FlyLineShader from "@/three/mesh/FlyLineShader";
import LightRadar from "@/three/mesh/LightRadar";

// 事件列表
const props = defineProps(["eventList"]);
const tagList = [];
watch(
  () => props.eventList,
  (newVal) => {
    // 清空之前的图标
    tagList.forEach((item) => item.remove());

    newVal.forEach((item) => {
      const posiiton = {
        x: item.position.x / 5 - 10,
        z: item.position.y / 5 - 10,
      };
      // 创建新报警图标
      const alarmSprite = new AlarmSprite(posiiton, item.name);
      scene.add(alarmSprite.mesh);
      tagList.push(alarmSprite);
      alarmSprite.onClick((e) => {
        console.log(
          `%c  $报警回调 `,
          "font-size:13px; background:skyblue; color:red;"
        );
      });

      // 将报警类型映射为各种图标
      if (mapFn[item.name]) mapFn[item.name](posiiton);
    });
  }
);

// 场景元素div
let sceneDiv = ref(null);

// 场景中添加相机
scene.add(camera);
camera.lookAt(scene.position);

// 场景中添加辅助坐标轴
// scene.add(axesHelper);

// 创建物体
createMesh();

onMounted(() => {
  sceneDiv.value.appendChild(renderer.domElement);
  animate();
});

// 映射函数，将不同类型的报警映射为不同类型的图表
// 火警创建光墙，治安使用飞线，电力使用雷达
const mapFn = {
  火警: (position) => {
    let lightWall = new LightWall(1, 3, position);
    scene.add(lightWall.mesh);
    tagList.push(lightWall);
  },
  治安: (position) => {
    let color = new THREE.Color(
      Math.random(),
      Math.random(),
      Math.random()
    ).getHex();
    const flyLineShader = new FlyLineShader(
      { x: 0, z: 0 },
      position,
      color,
      200,
      0.3
    );
    scene.add(flyLineShader.mesh);
    tagList.push(flyLineShader);
  },
  电力: (position) => {
    let color = new THREE.Color(
      Math.random(),
      Math.random(),
      Math.random()
    ).getHex();
    const lightRadar = new LightRadar(Math.random() * 2 + 1, position, color);
    scene.add(lightRadar.mesh);
    tagList.push(lightRadar);
  },
};
</script>

<style>
.scene {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
}
</style>
