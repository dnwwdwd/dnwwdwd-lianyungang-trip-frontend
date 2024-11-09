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
              v-for="(tag, index) in reserveVO.imgs"
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
        <span v-if="reserveVO.lastReserveTime">上次预约时间：{{ reserveVO.lastReserveTime }}</span>
        <a-button style="width: 80px; color: white; background: #FD5B04"
                  v-if="reserveVO.status === 2" @click="open=true">
          评价
        </a-button>
        <a-modal v-model:open="open" title="请给好评吧" cancelText="取消" okText="确认评价" @ok="handleOK">
          评分；
          <a-rate v-model:value="formModal.score" allow-half/>
          <div>
            评价：
            <a-textarea v-model:value="formModal.content" :rows="4" placeholder="请输入评价"/>
          </div>
        </a-modal>
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
import {onMounted, ref} from "vue";
import myAxios from "../../plugins/myAxios.js";
import {useRoute} from "vue-router";
import {message} from "ant-design-vue";

const route = useRoute();

const id = route.params.id;

const colors = ref(["pink", "red", "orange", "green", "blue"]);

const watermarkContent = ref('预约完成');

const reserveVO = ref({
  scenic: {},
  user: {}
});

const open = ref(false);

onMounted(async () => {
  const res = await myAxios.get(`/reserve/${id}`);
  if (res.code === 0) {
    reserveVO.value = res.data;
  }
  if (res.data.status === 0) {
    watermarkContent.value = '等待参观';
  }
  if (res.data.status === 1) {
    watermarkContent.value = '已完成参观';
  }
  if (res.data.status === 2) {
    watermarkContent.value = '等待评价';
  }
  if (res.data.status === 3) {
    watermarkContent.value = '已评价';
  }
});

const formModal = ref({
  score: 0,
  content: ''
});

const handleOK = async () => {
  const res = await myAxios.post('/evaluation/add', {
    score: formModal.value.score,
    content: formModal.value.content,
    reserveId: id
  });
  if (res.code === 0) {
    message.success('评价成功');
    open.value = false;
  }
}

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