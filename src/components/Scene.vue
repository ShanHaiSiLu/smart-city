<template>
  <div class="scene" ref="sceneDiv"></div>
</template>

<script setup>
import { onMounted, ref } from "vue";
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
import controls from "@/three/controls";
// 导入创建物体
import createMesh from "@/three/createMesh"
// 导入帧动画
import animate from "@/three/animate";

// 场景元素div
let sceneDiv = ref(null);

// 场景中添加相机
scene.add(camera);
camera.lookAt(scene.position);

// 场景中添加辅助坐标轴
scene.add(axesHelper);

// 创建物体
createMesh();

onMounted(() => {
  sceneDiv.value.appendChild(renderer.domElement);
  animate();
});
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
