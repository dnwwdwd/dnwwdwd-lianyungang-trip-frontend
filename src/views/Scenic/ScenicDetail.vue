<template>
  <div style="border: 1px solid #e8e8e8;
    border-radius: 5px; background-color: #f9f9f9;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); padding: 20px;
    margin: 0 auto;
    width: 1000px">
    <div style="height: 140px; display: flex; flex-direction: column">
      <span style="font-size: 30px;">{{ scenic.name }}</span>
      <span style="color: lightslategrey; margin-top: 5px; margin-bottom: 5px">{{ scenic.address }}</span>
      <span style="color: lightslategrey; margin-top: 5px; margin-bottom: 5px">开放时间：{{ scenic.openTime }}</span>
      <span style="color: lightslategrey; margin-top: 5px; margin-bottom: 5px">官方电话：{{ scenic.phone }}</span>
      <div style="display: flex; align-items: center; margin-top: 2px">
        <div>
          <img src="../../assets/star.png" width="20" height="20"/>
          <span style="margin-left: 2px">{{ scenic.star }}</span>
        </div>
        <div>
          <img src="../../assets/ticket.png" width="20" height="15" style="margin-left: 8px"/>
          <span style="margin-left: 2px">{{ scenic.ticket }}</span>
        </div>
        <div>
          <img src="../../assets/score.png" width="20" height="18" style="margin-left: 8px"/>
          <span style="margin-left: 2px">{{ scenic.score }}</span>
        </div>
      </div>
    </div>

    <a-carousel autoplay style="margin-top: 3px">
      <div v-for="img in scenic.imgs">
        <a-image :src="img" :width="800" :height="420"/>
      </div>
    </a-carousel>

    <div>
      <a-tag
          style="margin-top: 10px"
          v-for="(tag, index) in scenic.tags"
          :key="index"
          :color="colors[index % colors.length]"
      >
        {{ tag }}
      </a-tag>
      <a-button style="background: #FF5C00; margin-left: 10px; color: white" @click="reserve(scenic.id)">
        预约
      </a-button>
    </div>
  </div>
</template>

<script setup lang="js">
import {ref} from "vue";
import myAxios from "../../plugins/myAxios.js";

// const id = route.params.id;

const colors = ref(["pink", "red", "orange", "green", "blue"]);

const scenic = ref({
  id: 1,
  name: '你好',
  imgs: ['https://res.klook.com/image/upload/c_fill,w_627,h_470/q_80/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/ycgfaxmc6waeborzsmba.webp',
    'https://res.klook.com/image/upload/c_fill,w_627,h_470/q_80/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/nt4wkvl6tcdi9t3sv0jv.webp'],
  price: 80,
  address: '连云港赣榆区',
  star: 19,
  tags: ["热卖", "促销", "轻松预约"],
  ticket: 10,
  score: 4.5,
  openTime: '08:30-18:00开放',
  phone: '14u4u492'
});

const reserve = async (id) => {
  // const res = await myAxios.post(`/reserve/add/`, {
  //   id: id
  // });
  // if (res.code === 0) {
  //
  // }
};

</script>

<style scoped>

</style>