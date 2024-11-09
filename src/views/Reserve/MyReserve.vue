<template>
  <div style="width: 80%; margin: 0 auto">
    <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="listData" bordered>
      <template #renderItem="{ item }">
        <a-list-item :key="item.title" @click="router.push(`/myReServe/${item.id}`)">
          <template #extra>
            <img
                width="200"
                height="140"
                alt="logo"
                :src="item.scenic.imgs[0]"
            />
          </template>
          <a-list-item-meta :description="item.scenic.address">
            <template #title>
              <a :href="item.href">{{ item.scenic.name }}</a>
            </template>
            <template #avatar>
              <a-avatar :src="item.user.avatarUrl"/>
            </template>
          </a-list-item-meta>
          预约时间：{{ item.reserveTime }}
          <br/>
          开放时间：{{ item.scenic.openTime }}
          <br/>
          <span v-if="item.lastResereTime">上次预约：{{ item.lastResereTime}}</span>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script setup lang="js">
import {onMounted, ref} from 'vue'
import {useRouter} from "vue-router";
import myAxios from "../../plugins/myAxios.js";

const router = useRouter();

const listData = ref([]);


const pagination = {
  pageSize: 3,
  onChange: async (page) => {
    const res = await myAxios.get(`/reserve/get/my`, {
      params: {
        pageSize: pagination.pageSize,
        page: page,
      }
    });
    if (res.code === 0) {
      listData.value = res.data;
    }
  },
  total: 15,
};

onMounted(async () => {
  const res = await myAxios.get(`/reserve/get/my`, {
    params: {
      pageSize: 10,
      page: 1,
    }
  });
  if (res.code === 0) {
    listData.value = res.data;
  }


});


</script>

<style scoped>

</style>