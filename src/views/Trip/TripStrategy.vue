<template>
  <div style="width: 80%; margin: 0 auto;">
    <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="listData" bordered>
      <template #renderItem="{ item }">
        <a-list-item :key="item.title" @click="router.push(`/strategyDetail/${item.id}`)">
          <template #actions>
          <span v-for="{ icon, text } in actions" :key="icon">
            <component :is="icon" style="margin-right: 8px" />
            {{ item.star }}
          </span>
          </template>
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
              <a :href="item.href">{{ item.title }}</a>
            </template>
            <template #avatar>
              <a-avatar :src="item.user.avatarUrl"/>
            </template>
          </a-list-item-meta>
          {{ item.content }}
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script setup lang="js">
import {ref} from "vue";
import {useRouter} from "vue-router";
import {StarOutlined} from "@ant-design/icons-vue";

const router = useRouter();

const listData = ref([
  {
    id: 1,
    imgs: [
      "https://hejiajun-img-bucket.oss-cn-wuhan-lr.aliyuncs.com/hm/56e55a4c-90d4-49c7-99e0-54a600f7afdd.jpg",
      "https://hejiajun-img-bucket.oss-cn-wuhan-lr.aliyuncs.com/hm/56e55a4c-90d4-49c7-99e0-54a600f7afdd.jpg"
    ],
    title: '连云港',
    description: '欢迎来到连云港',
    content: '欢迎来到连云港',
    user: {
      avatarUrl: 'https://hejiajun-img-bucket.oss-cn-wuhan-lr.aliyuncs.com/hm/56e55a4c-90d4-49c7-99e0-54a600f7afdd.jpg'
    },
    star: 18
  },
  {
    id: 2,
    imgs: [
      "https://hejiajun-img-bucket.oss-cn-wuhan-lr.aliyuncs.com/hm/56e55a4c-90d4-49c7-99e0-54a600f7afdd.jpg",
      "https://hejiajun-img-bucket.oss-cn-wuhan-lr.aliyuncs.com/hm/56e55a4c-90d4-49c7-99e0-54a600f7afdd.jpg"
    ],
    title: '连云港',
    description: '欢迎来到连云港',
    content: '欢迎来到连云港',
    user: {
      avatarUrl: 'https://hejiajun-img-bucket.oss-cn-wuhan-lr.aliyuncs.com/hm/56e55a4c-90d4-49c7-99e0-54a600f7afdd.jpg'
    },
    star: 18
  },
  {
    id: 3,
    imgs: [
      "https://hejiajun-img-bucket.oss-cn-wuhan-lr.aliyuncs.com/hm/56e55a4c-90d4-49c7-99e0-54a600f7afdd.jpg",
      "https://hejiajun-img-bucket.oss-cn-wuhan-lr.aliyuncs.com/hm/56e55a4c-90d4-49c7-99e0-54a600f7afdd.jpg"
    ],
    title: '连云港',
    description: '欢迎来到连云港',
    content: '欢迎来到连云港',
    user: {
      avatarUrl: 'https://hejiajun-img-bucket.oss-cn-wuhan-lr.aliyuncs.com/hm/56e55a4c-90d4-49c7-99e0-54a600f7afdd.jpg'
    },
    star: 18
  },
  {
    id: 4,
    imgs: [
      "https://hejiajun-img-bucket.oss-cn-wuhan-lr.aliyuncs.com/hm/56e55a4c-90d4-49c7-99e0-54a600f7afdd.jpg",
      "https://hejiajun-img-bucket.oss-cn-wuhan-lr.aliyuncs.com/hm/56e55a4c-90d4-49c7-99e0-54a600f7afdd.jpg"
    ],
    title: '连云港',
    description: '欢迎来到连云港',
    content: '欢迎来到连云港',
    user: {
      avatarUrl: 'https://hejiajun-img-bucket.oss-cn-wuhan-lr.aliyuncs.com/hm/56e55a4c-90d4-49c7-99e0-54a600f7afdd.jpg'
    },
    star: 18
  },
  {
    id: 5,
    imgs: [
      "https://hejiajun-img-bucket.oss-cn-wuhan-lr.aliyuncs.com/hm/56e55a4c-90d4-49c7-99e0-54a600f7afdd.jpg",
      "https://hejiajun-img-bucket.oss-cn-wuhan-lr.aliyuncs.com/hm/56e55a4c-90d4-49c7-99e0-54a600f7afdd.jpg"
    ],
    title: '连云港',
    description: '欢迎来到连云港',
    content: '欢迎来到连云港',
    user: {
      avatarUrl: 'https://hejiajun-img-bucket.oss-cn-wuhan-lr.aliyuncs.com/hm/56e55a4c-90d4-49c7-99e0-54a600f7afdd.jpg'
    },
    star: 18
  },
  {
    id: 6,
    imgs: [
      "https://hejiajun-img-bucket.oss-cn-wuhan-lr.aliyuncs.com/hm/56e55a4c-90d4-49c7-99e0-54a600f7afdd.jpg",
      "https://hejiajun-img-bucket.oss-cn-wuhan-lr.aliyuncs.com/hm/56e55a4c-90d4-49c7-99e0-54a600f7afdd.jpg"
    ],
    title: '连云港',
    description: '欢迎来到连云港',
    content: '欢迎来到连云港',
    user: {
      avatarUrl: 'https://hejiajun-img-bucket.oss-cn-wuhan-lr.aliyuncs.com/hm/56e55a4c-90d4-49c7-99e0-54a600f7afdd.jpg'
    },
    star: 18
  }
]);

const actions = [
  { icon: StarOutlined, text: '156' },
];


const pagination = {
  onChange: (page) => {
    console.log(page);
  },
  pageSize: 3,
};

</script>

<style scoped>

</style>