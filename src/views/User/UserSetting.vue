<template>
  <div style="display: flex; justify-content: center; align-items: center; margin-top: 60px">
    <div style="width: 900px; height: 500px; margin-left: 40px">
      <div style="border: 1px solid #e8e8e8; width: 100%; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      height: 90%; padding: 12px; display: flex; align-items: center; justify-content: center">
        <div>
          <div style="display: flex; flex-direction: column; justify-content: center; align-items: center">
            <img :src="user.avatarUrl"
                 style="border-radius: 50%; height: 200px; width: 200px"/>
            <span style="font-size: 30px; color: deepskyblue; margin-top: 15px">{{ user.nickname }}</span>
          </div>
        </div>
        <div style="margin-left: 20px">
          <div class="input-div">
          <span class="label-text">
            昵称：
          </span>
            <a-input style="width: 300px;" class="input" v-model:value="user.nickname"/>
          </div>
          <div class="input-div">
          <span class="label-text">
            邮箱：
          </span>
            <a-input style="width: 300px;" class="input" v-model:value="user.email"/>
          </div>
          <div class="input-div">
          <span class="label-text">
            头像：
          </span>
            <a-input style="width: 300px;" class="input" v-model:value="user.avatarUrl"/>
          </div>
          <div class="input-div">
          <span class="label-text">
            手机号：
          </span>
            <a-input style="width: 300px;" class="input" v-model:value="user.phone"/>
            <a-popconfirm
                title="你确认要修改个人信息吗？"
                ok-text="确认"
                cancel-text="取消"
                @confirm="confirm"
            >
              <a-button style="color: #31C27C; margin-left: 20px">修改信息</a-button>
            </a-popconfirm>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import {onMounted, ref} from "vue";
import myAxios from "../../plugins/myAxios.js";
import {message} from "ant-design-vue";
import {getCurrentUser} from "../../services/user.js";

const user = ref({});

const loadData = async () => {
  const res = await getCurrentUser();
  console.log(res);
  if (res) {
    user.value = res;
  }
};

onMounted(() => {
  loadData();
});

const confirm = async (e) => {
  const res = await myAxios.post('/user/update', {
    ...user.value,
    id: user.value.id,
  });
  if (res.code === 0) {
    message.success('修改成功');
    loadData();
  } else {
    message.error('修改失败');
  }
};


</script>

<style scoped>
.input-div {
  display: flex;
  align-items: center;
  padding: 10px;
  width: 100%;
  color: #1E90FF
}

.label-text {
  display: inline-block;
  white-space: nowrap;
  margin-right: 10px;
  font-size: 16px;
}
</style>
