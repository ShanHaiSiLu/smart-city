<template>
  <div class="home">
    <Scene :eventList="eventList" />
    <BigScreen :dataInfo="dataInfo" :eventList="eventList" />
  </div>
</template>

<script setup>
// @ is an alias to /src
import Scene from "@/components/Scene";
import BigScreen from "@/components/bigScreen";

import { onMounted, reactive, ref } from "vue";
import { getSmartCityInfo, getSmartCityList } from "@/api/api.js";
import gsap from "gsap";

const dataInfo = reactive({
  iot: { number: 0 },
  event: { number: 0 },
  power: { number: 0 },
  test: { number: 0 },
});

onMounted(async () => {
  changeInfo();
  getEventList();
  setInterval(() => {
    changeInfo();
    getEventList();
  }, 10000);
});

const changeInfo = async () => {
  let res = await getSmartCityInfo();

  for (let key in dataInfo) {
    dataInfo[key].name = res.data.data[key].name;
    dataInfo[key].unit = res.data.data[key].unit;
    gsap.to(dataInfo[key], {
      number: res.data.data[key].number,
      duration: 1,
    });
  }
};

const eventList = ref([]);
const getEventList = async () => {
  let result = await getSmartCityList();
  eventList.value = result.data.list;
  // console.log(eventList.value);
};
</script>
