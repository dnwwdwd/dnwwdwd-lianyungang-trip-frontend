<template>
  <a-layout class="layout" style="min-height: 100vh; display: flex; flex-direction: column;">
    <a-layout-header :style="{ background: '#fff', display: 'flex', alignItems: 'center', marginBottom: '24px' }">
      <img src="../assets/logo.png" alt="Logo" style="height: 40px; margin-right: 20px"/>
      <span style="font-size: 15px; color: #1E90FF">连云港旅游网站的设计与实现</span>
      <!-- 动态高亮菜单项 -->
      <a-menu
          :selectedKeys="selectedKeys"
          theme="light"
          mode="horizontal"
          :style="{ lineHeight: '64px', flexGrow: 1 }"
      >
        <a-menu-item key="1">
          <router-link to="/">首页</router-link>
        </a-menu-item>
        <a-menu-item key="2">
          <router-link to="/trip/strategy">旅游攻略</router-link>
        </a-menu-item>
        <a-menu-item key="3">
          <router-link to="/my/reserve">我的预约</router-link>
        </a-menu-item>
        <a-menu-item key="4">
          <router-link to="/setting">个人设置</router-link>
        </a-menu-item>
        <a-menu-item key="5" v-if="isSuperAdmin || isScenicAdmin">
          <router-link to="/admin/scenicManagement">景区管理</router-link>
        </a-menu-item>
        <a-menu-item key="6" v-if="isSuperAdmin || isScenicAdmin">
          <router-link to="/admin/reserveManagement">预约管理</router-link>
        </a-menu-item>
        <a-menu-item key="7" v-if="isSuperAdmin || isAdmin">
          <router-link to="/admin/strategyManagement">攻略管理</router-link>
        </a-menu-item>
        <a-menu-item key="8" v-if="isSuperAdmin || isAdmin">
          <router-link to="/admin/userManagement">用户管理</router-link>
        </a-menu-item>
      </a-menu>

      <a-button style="background: #FD5B04; color: white; margin-right: 10px" @click="showModal">发布攻略</a-button>
      <a-modal v-model:open="open" title="发布攻略" cancelText="取消" okText="发布" @ok="handleOk">
        图片：
        <a-input placeholder="请输入图片链接，按下回车输入下一个链接（不按回车不会存储）" class="a-input"
                 v-model:value="image"
                 @keydown.enter="uploadImage"/>
        攻略描述：
        <a-input v-model:value="formModal.description" placeholder="请输入攻略描述" class="a-input"/>
        攻略内容：
        <a-input v-model:value="formModal.content" placeholder="请输入攻略内容" class="a-input"/>
        攻略类型：
        <a-select v-model:value="formModal.type" style="width: 100px; margin-top: 10px; margin-bottom: 10px">
          <a-select-option value="1">旅游攻略</a-select-option>
          <a-select-option value="2">天气预报</a-select-option>
          <a-select-option value="3">交通信息</a-select-option>
          <a-select-option value="4">推荐小吃</a-select-option>
        </a-select>
        <br/>
        景区/店铺/地点名称：
        <a-input v-model:value="formModal.name" placeholder="请输入景区/店铺/地点" class="a-input"/>
        地点：
        <a-input v-model:value="formModal.address" placeholder="请输入地点" class="a-input"/>
      </a-modal>
      <a-dropdown style="margin-left: auto">
        <a-avatar
            shape="circle"
            :src="user.avatarUrl"
        />
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <router-link to="/user/login" @click="userLogout">退出登录</router-link>
            </a-menu-item>
            <a-menu-item>
              <router-link to="/scenic/star">景区收藏</router-link>
            </a-menu-item>
            <a-menu-item>
              <router-link to="/trip/strategy/star">攻略收藏</router-link>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </a-layout-header>

    <a-layout-content style="padding: 0 50px; height: 600px;">
      <router-view/>
    </a-layout-content>
  </a-layout>
</template>

<script lang="js" setup>
import {onMounted, ref, watchEffect} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import myAxios from "../plugins/myAxios.js";
import {message} from "ant-design-vue";
import {getCurrentUser} from "../services/user.js";

const selectedKeys = ref([]);

const image = ref('');

const route = useRoute();
const isAdmin = ref(false);
const isScenicAdmin = ref(false);
const isSuperAdmin = ref(false);
const user = ref({});

const uploadImage = () => {
  formModal.value.imgs.push(image.value)
  image.value = ''
  message.info('图片存储成功，输入链接可继续传输图片')
};

onMounted(async () => {
  if (!route.path.includes('/user/login') && !route.path.includes('/user/register')) {
    const res = await getCurrentUser();
    if (res) {
      user.value = res;
      isAdmin.value = user.value.role === "admin";
      isScenicAdmin.value = user.value.role === 'scenic_admin';
      isSuperAdmin.value = user.value.role === 'super_admin';
    }
  }
});


watchEffect(() => {
  switch (route.path) {
    case '/':
      selectedKeys.value = ['1'];
      break;
    case '/trip/strategy':
      selectedKeys.value = ['2'];
      break;
    case '/my/reserve':
      selectedKeys.value = ['3'];
      break;
    case '/setting':
      selectedKeys.value = ['4'];
      break;
    case '/admin/scenicManagement':
      selectedKeys.value = ['5'];
      break;
    case '/admin/reserveManagement':
      selectedKeys.value = ['6'];
      break;
    case '/admin/strategyManagement':
      selectedKeys.value = ['7'];
      break;
    case '/admin/userManagement':

    default:
      selectedKeys.value = [];
  }
});

const userLogout = async () => {
  const res = await myAxios.post('/user/logout');
  message.success('退出成功');
};

const open = ref(false);

const petForumOpen = ref(false);

const formModal = ref({
  imgs: [],
  description: '',
  content: '',
  type: '',
  name: '',
  address: '',
});

const showModal = () => {
  open.value = true;
};

const showPetForumModal = () => {
  petForumOpen.value = true;
};

const handleOk = async () => {
  const res = await myAxios.post('/strategy/add', formModal.value);
  if (res.code === 0) {
    // open.value = false;
    window.location.reload();
  }
};


</script>

<style scoped>

</style>
