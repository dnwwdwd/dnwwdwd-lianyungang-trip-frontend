<template>
  <div style="border: 1px solid #e8e8e8;
    border-radius: 5px; background-color: #f9f9f9;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); height: 500px; width: 1200px; padding: 20px; margin: 0 auto">
    <div style="display: flex; align-items: flex-start;">
      <div style="width: 550px;">
        <a-carousel autoplay v-if="strategyVO.imgs">
          <div v-for="img in strategyVO.imgs" :key="img">
            <a-image :src="img" :width="536" :height="420" style="border-radius: 10px;"/>
          </div>
        </a-carousel>
<!--        <a-image v-else :src="strategyVO.imgs[0]" :width="536" :height="410" style="border-radius: 5px;"/>-->
        <img :src="strategyVO.user.avatarUrl" style="border-radius: 50%; margin-top: 2px" width="35" height="35"/>
        <span style="margin-left: 3px">{{ strategyVO.user.nickname }}</span>
        <a-button v-if="show" style="background: #FD5B04; color: white; margin-left: 12px" type="primary"
                  @click="star">收藏
        </a-button>
        <a-button v-if="!show" style="background: #FD5B04; color: white" type="primary" @click="star_delete">
          取消收藏
        </a-button>
      </div>
      <div style="margin-left: 12px; display: flex; flex-direction: column; align-items: flex-start; padding: 0; height: 460px;
      gap: 10px">
        <span style="font-size: 30px; margin: 0;" class="span-span">{{ strategyVO.name }}</span>
        <span style="color: slategrey; margin: 0;" class="span-span">地址：{{ strategyVO.address }}</span>
        <span style="color: slategrey; margin: 0;" class="span-span">描述：{{ strategyVO.description }}</span>
        <span style="color: black; margin: 0; color: #1a1a1a; font-size: 18px" class="span-span">{{strategyVO.content }}</span>
      </div>
    </div>
  </div>

</template>

<script setup>
import {onMounted, ref} from "vue";
import myAxios from "../../plugins/myAxios.js";
import {useRoute} from "vue-router";
import {message} from "ant-design-vue";

const strategyVO = ref({
  user: {
  }
});

const route = useRoute();

const id = route.params.id;

const show = ref(true);

onMounted(async () => {
  const res = await myAxios.get(`/strategy/${id}`);
  if (res.code === 0) {
    strategyVO.value = res.data;
  }
  const result = await myAxios.get(`/strategy_starred`, {
    params: {
      strategyId: id
    }
  });
  if (result.data) {
    show.value = false;
  }
});

const star = async () => {
  console.log(id)
  const res = await myAxios.post(`/strategy_star/add`, {
    strategyId: id
  })
  if (res.code === 0 && res.data) {
    message.success('收藏成功');
    show.value = false;
  }
};

const star_delete = async () => {
  const res = await myAxios.post(`/strategy_star/delete`, {
    strategyId: id
  })
  if (res.code === 0 && res.data) {
    message.success('取消收藏');
    show.value = true;
  }
}

</script>

<style scoped>
.span-span {
  margin-top: 10px;
}
</style>