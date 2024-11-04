<template>
  <div id="watermark" :data-content="watermarkContent" style="border: 1px solid #e8e8e8;
    border-radius: 5px; background-color: #f9f9f9;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); padding: 20px;
    margin: 0 auto;
    width: 1000px; display: flex">
    <div style="width: 500px;">
      <div style="height: 160px; display: flex; flex-direction: column">
        <span style="font-size: 30px;">{{ reserveVO.scenic.name }}</span>
        <span style="color: lightslategrey; margin-top: 5px; margin-bottom: 5px">景区地点：{{
            reserveVO.scenic.address
          }}</span>
        <span style="color: lightslategrey; margin-top: 5px; margin-bottom: 5px">开放时间：{{
            reserveVO.scenic.openTime
          }}</span>
        <span style="color: lightslategrey; margin-top: 5px; margin-bottom: 5px">官方电话：{{
            reserveVO.scenic.phone
          }}
        </span>
        <div>
          <a-tag
              style="margin-top: 10px"
              v-for="(tag, index) in reserveVO.scenic.tags"
              :key="index"
              :color="colors[index % colors.length]"
          >
            {{ tag }}
          </a-tag>
        </div>
      </div>
      <div style="display: flex; flex-direction: column; gap: 10px">
        <span style="margin-left: 2px">预约人：{{ reserveVO.user.nickname }}</span>
        <span>预约时间：{{ reserveVO.reserveTime }}</span>
        <span>上次预约时间：{{ reserveVO.lastReserveTime }}</span>
        <a-button type="primary" style="width: 80px" v-if="reserveVO.evaluation && reserveVO.evaluation.status === 2">评价</a-button>
      </div>
    </div>
    <div style="width: 400px; margin-left: 40px;">
      <a-carousel autoplay style="margin-top: 3px">
        <div v-for="img in reserveVO.scenic.imgs">
          <a-image :src="img" :width="300" :height="240"/>
        </div>
      </a-carousel>
    </div>
  </div>
</template>

<script setup lang="js">
import {ref} from "vue";
import myAxios from "../../plugins/myAxios.js";

// const id = route.params.id;

const colors = ref(["pink", "red", "orange", "green", "blue"]);

const watermarkContent = ref('预约完成');

const reserveVO = ref({
  scenic: {
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
    phone: '14u4u492',
  },
  user: {
    nickname: '汉堡',
    avatarUrl: 'https://hejiajun-img-bucket.oss-cn-wuhan-lr.aliyuncs.com/hm/56e55a4c-90d4-49c7-99e0-54a600f7afdd.jpg'
  },
  reserveTime: '2024-05-05 14:00:00',
  lastReserveTime: '2024-05-05 14:00:00',
  evaluation: {
    content: ''
  }
});

// if (res.data.status === 0) {
//   watermarkContent.value = '等待参观';
// }
// if (res.data.status === 1) {
//   watermarkContent.value = '已完成参观';
// }
// if (res.data.status === 2) {
//   watermarkContent.value = '等待评价';
// }
// if (res.data.status === 3) {
//   watermarkContent.value = '已评价';
// }

</script>

<style scoped>
#watermark {
  position: relative;
  padding: 20px;
}

/* 使用 data-content 属性设置动态水印内容 */
#watermark::before {
  content: attr(data-content); /* 动态显示 data-content 属性的值 */
  position: absolute;
  top: 50%;
  left: 40%;
  transform: translate(-50%, -50%);
  font-size: 30px;
  color: rgba(0, 0, 0, 0.1);
  pointer-events: none;
  white-space: nowrap;
  z-index: 1;
}
</style>