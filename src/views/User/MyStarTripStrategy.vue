<template>
  <div style="width: 80%; margin: 0 auto;">
    <a-list v-if="listData && listData.length > 0" item-layout="vertical" size="large" :pagination="pagination" :data-source="listData" bordered>
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
  <div v-if="!listData || listData.length < 1" style="margin-top: 160px">
    <a-empty description="暂无任何攻略"/>
  </div>
</template>

<script setup lang="js">
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import {StarOutlined} from "@ant-design/icons-vue";
import myAxios from "../../plugins/myAxios.js";

const router = useRouter();

const listData = ref([]);

const actions = [
  { icon: StarOutlined, text: '156' },
];

const pagination = {
  pageSize: 3,
  onChange: async (page) => {
    const res = await myAxios.get(`/strategy_star/list/my.`, {
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
  const res = await myAxios.get(`/strategy_star/list/my`, {
    params: {
      pageSize: pagination.pageSize,
      page: 1,
    }
  });
  if (res.code === 0) {
    listData.value = res.data.flatMap(item => item.strategy);
  }
});

</script>

<style scoped>

</style>