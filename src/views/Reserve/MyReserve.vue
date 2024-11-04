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
                :src="item.imgs[0]"
            />
          </template>
          <a-list-item-meta :description="item.description">
            <template #title>
              <a :href="item.href">{{ item.name }}</a>
            </template>
            <template #avatar>
              <a-avatar :src="item.user.avatarUrl"/>
            </template>
          </a-list-item-meta>
          {{ item.content }}
          <br/>
          上次雨预约：{{ item.reserveTime}}
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script setup lang="js">
import {ref} from 'vue'
import {useRouter} from "vue-router";

const router = useRouter();

const listData = ref([
  {
    id: 1,
    name: '海州湾海洋乐园',
    description: '渔湾景区',
    user: {
      avatarUrl: 'https://hejiajun-img-bucket.oss-cn-wuhan-lr.aliyuncs.com/hm/56e55a4c-90d4-49c7-99e0-54a600f7afdd.jpg',
    },
    imgs: [
      'https://hejiajun-img-bucket.oss-cn-wuhan-lr.aliyuncs.com/hm/56e55a4c-90d4-49c7-99e0-54a600f7afdd.jpg',
      'https://hejiajun-img-bucket.oss-cn-wuhan-lr.aliyuncs.com/hm/56e55a4c-90d4-49c7-99e0-54a600f7afdd.jpg',
    ],
    content: 'content',
    reserveTime: '2024.10.12',
  },
  {
    id: 2,
    name: '渔湾景区',
    description: '渔湾景区',
    user: {
      avatarUrl: 'https://hejiajun-img-bucket.oss-cn-wuhan-lr.aliyuncs.com/hm/56e55a4c-90d4-49c7-99e0-54a600f7afdd.jpg',
    },
    imgs: [
      'https://hejiajun-img-bucket.oss-cn-wuhan-lr.aliyuncs.com/hm/56e55a4c-90d4-49c7-99e0-54a600f7afdd.jpg',
      'https://hejiajun-img-bucket.oss-cn-wuhan-lr.aliyuncs.com/hm/56e55a4c-90d4-49c7-99e0-54a600f7afdd.jpg',
    ],
    content: 'content',
    reserveTime: '2024.10.10',
  }
]);

</script>

<style scoped>

</style>