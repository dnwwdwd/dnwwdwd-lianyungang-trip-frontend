<template>
  <a-flex wrap="wrap" gap="small">
    <a-card hoverable style="width: 240px" @click="toScenicDetail(scenic.id)" v-for="scenic in scenicList">
      <template #cover>
        <img alt="example" :src="scenic.imgs[0]"
             height="180"/>
      </template>
      <a-card-meta :title="scenic.name">
        <template #description>
          <div>
            <span style="color: #F09B08; margin-right: 8px">{{ scenic.score }}</span>
            <img src="../../assets/star.png" width="20" height="20"/>
            {{ scenic.star }}
            <br/>
            <span style="margin-bottom: 2px">$ {{ scenic.price }}</span>
            <br/>
            <a-tag
                v-for="(tag, index) in scenic.tags"
                :key="index"
                :color="colors[index % colors.length]"
            >
              {{ tag }}
            </a-tag>
          </div>
        </template>
      </a-card-meta>
    </a-card>
  </a-flex>
  <div v-if="!listData || listData.length < 1" style="margin-top: 160px">
    <a-empty v-if="!scenicList || scenicList.length < 1" description="暂无收藏"/>
  </div>
</template>

<script setup lang="js">
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import myAxios from "../../plugins/myAxios.js";

const scenicList = ref([]);

const router = useRouter();

const colors = ref(["pink", "red", "orange", "green", "blue"]);

onMounted(async () => {
  const res = await myAxios.get(`/scenic_star/list/my`);
  if (res.code === 0) {
    scenicList.value = res.data.flatMap(item => item.scenic);
  }
});

const toScenicDetail = (id) => {
  router.push(`/scenicDetail/${id}`);
};

</script>

<style scoped>

</style>