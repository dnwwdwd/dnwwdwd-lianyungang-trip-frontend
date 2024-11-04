<template>
  <div style="border: 1px solid #e8e8e8;
    border-radius: 5px; background-color: #f9f9f9;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); height: 500px; width: 1200px; padding: 20px; margin: 0 auto">
    <div style="display: flex; align-items: flex-start;">
      <div style="width: 550px;">
        <a-carousel autoplay>
          <div v-for="img in strategyVO.imgs" :key="img">
            <a-image :src="img" :width="536" :height="420" style="border-radius: 10px;" />
          </div>
        </a-carousel>
        <img :src="strategyVO.user.avatarUrl" style="border-radius: 50%; margin-top: 2px" width="35" height="35"/>
        <span style="margin-left: 3px">{{ strategyVO.user.nickname}}</span>
        <a-button type="primary" @click="star(strategyVO.id)" style="margin-left: 12px">收藏</a-button>
        <a-button type="primary" @click="star_delete(strategyVO.id)">取消收藏</a-button>
      </div>
      <div style="margin-left: 12px; display: flex; flex-direction: column; align-items: flex-start; padding: 0; height: 460px;
      gap: 10px">
        <span style="font-size: 30px; margin: 0;" class="span-span">{{ strategyVO.name }}</span>
        <span style="color: slategrey; margin: 0;" class="span-span">地址：{{ strategyVO.address }}</span>
        <span style="color: slategrey; margin: 0;" class="span-span">描述：{{ strategyVO.description }}</span>
        <span style="color: black; margin: 0; color: #1a1a1a; font-size: 18px" class="span-span">{{ strategyVO.content }}</span>
      </div>
    </div>
  </div>

</template>

<script setup>
import {ref} from "vue";

const strategyVO = ref({
  content: '连云港海州湾海洋乐园总占地面积约4万平方米，建筑面积约1.2万平方米，是集科普教育、' +
      '旅游观光、主题游乐为一体的大型海洋主题公园，是国内将海洋渔业文化与海洋活体生物展览融为一体的海洋馆，' +
      '江苏沿海地区展示面积大、展示品种全的海洋科普场馆。拥有八大展区：包含海底世界+水母宫+珊瑚世界+海洋精品生物展区' +
      '+海洋动物表演馆+海洋渔业文化展厅；动感5D影院。此外还有儿童城堡、划船、捉小鱼、餐饮部、商品部。海洋乐园馆内海水储量达6000余吨，展出各类海洋生物600余种，10000余尾（只）。在这里，游客可亲密接触海洋动物，观赏动物表演，参与动物喂养、游戏互动、留影纪念。另外，海洋乐园还将配备先进的潜水装备，在专业潜水教练的指导陪同下，可以潜入海底探险。',
  description: '连云港海州湾海洋乐园总占地面积约4万平方米，建筑面积约1.2万平方米，是集科普教育、旅游观光、主题游乐为一体的大型海洋主题公园，' +
      '是国内将海洋渔业文化与海洋活体生物展览融为一体的海洋馆，江苏沿海地区展示面积大、展示品种全的海洋科普场馆。',
  imgs: [
    "https://hejiajun-img-bucket.oss-cn-wuhan-lr.aliyuncs.com/hm/56e55a4c-90d4-49c7-99e0-54a600f7afdd.jpg",
    "https://hejiajun-img-bucket.oss-cn-wuhan-lr.aliyuncs.com/hm/56e55a4c-90d4-49c7-99e0-54a600f7afdd.jpg"],
  user: {
    avatarUrl: "https://hejiajun-img-bucket.oss-cn-wuhan-lr.aliyuncs.com/hm/56e55a4c-90d4-49c7-99e0-54a600f7afdd.jpg",
    nickname: "汉堡",
  },
  type: 0,
  address: '江苏省连云港市海州区海头镇海口路',
  name: '海州湾度假区'
});

const star = async (id) => {

};

const star_delete = async (id) => {

}

</script>

<style scoped>
.span-span{
  margin-top: 10px;
}
</style>