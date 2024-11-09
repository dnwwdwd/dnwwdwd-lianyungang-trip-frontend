<template>
  <div style="border: 1px solid #e8e8e8;
    border-radius: 5px; background-color: #f9f9f9;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); padding: 20px;
    margin: 0 auto;
    width: 1000px; height: auto">
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

    <a-carousel autoplay style="margin-top: 3px" v-if="scenic.imgs">
      <div v-for="img in scenic.imgs">
        <a-image :src="img" :width="800" :height="420"/>
      </div>
    </a-carousel>

    <div>
      <a-tag
          v-if="scenic.tags"
          style="margin-top: 10px"
          v-for="(tag, index) in scenic.tags"
          :key="index"
          :color="colors[index % colors.length]"
      >
        {{ tag }}
      </a-tag>
      <a-button style="background: #FF5C00; margin-left: 10px; color: white" @click="open">
        预约
      </a-button>
      <a-button v-if="isStarred" style="background: #FF5C00; color: white; margin-left: 10px" @click="star">
        收藏
      </a-button>
      <a-button v-else style="background: #FF5C00; color: white; margin-left: 10px" @click="star_delete">
        取消收藏
      </a-button>
      <a-modal v-model:open="show" title="预约" cancelText="取消" okText="确认预约" @ok="reserve(scenic.id)">
        <div>
          <span>请输入预约时间：</span>
          <a-date-picker
              show-time
              style="width: 200px"
              v-model:value="reserveTime"
              :disabled-date="disabledDate"
              placeholder="请输入预约时间"
              @change="onChange" @ok="onOk"
          />
        </div>
      </a-modal>
    </div>
  </div>
</template>

<script setup lang="js">
import {onMounted, ref} from "vue";
import myAxios from "../../plugins/myAxios.js";
import {useRoute} from "vue-router";
import {message} from "ant-design-vue";
import moment from 'moment';

const route = useRoute();
const id = route.params.id;

const colors = ref(["pink", "red", "orange", "green", "blue"]);


const scenic = ref({});
const show = ref(false);
const reserveTime = ref();
const isStarred = ref(true);

const disabledDate = (current) => {
  return current && current < moment().startOf('minute');
};

const onChange = (value, dateString) => {
  console.log('Selected Time: ', value);
  console.log('Formatted Selected Time: ', dateString);
};

const onOk = (value) => {
  reserveTime.value = value;
};

onMounted(async () => {
  const res = await myAxios.get(`/scenic/${id}`);
  if (res.code === 0) {
    scenic.value = res.data;
  }
  const result = await myAxios.get(`/scenic_starred`, {
    params: {
      scenicId: id
    }
  });
  if (result.data) {
    isStarred.value = false;
  }
});

const open = () => {
  show.value = true;
};

const reserve = async (id) => {
  console.log(id)
  const res = await myAxios.post(`/reserve/add`, {
    scenicId: id,
    reserveTime: reserveTime.value,
  });
  if (res.code === 0) {
    show.value = false;
    message.success("预约成功");
  }
};

const star = async () => {
  const res = await myAxios.post('/scenic_star/add', {
    scenicId: id,
  });
  if (res.data) {
    isStarred.value = false;
    message.success('收藏成功');
  }
}

const star_delete = async () => {
  const res = await myAxios.post('/scenic_star/delete', {
    scenicId: id,
  });
  if (res.data) {
    isStarred.value = true;
    message.success('取消收藏成功');
  }
}


</script>

<style scoped>

</style>