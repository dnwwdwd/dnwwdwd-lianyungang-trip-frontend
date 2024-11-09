<template>
  <a-modal v-model:open="open" title="查看用户评价" cancelText="取消" okText="确定">
    评分：
    <a-rate v-model:value="formModal.score" :allow-half="true" :disabled="true"></a-rate>
    <div>
    评价：
    <a-textarea v-model:value="formModal.content" disabled :auto-size="{ minRows: 2, maxRows: 6 }" style="margin-top: 10px"></a-textarea>
    </div>
  </a-modal>
  <a-table :columns="columns" :data-source="dataSource" bordered>
    <template #bodyCell="{ column, text, record }">
      <template v-if="[''].includes(column.dataIndex)">
        <div>
          <a-input
              v-if="editableData[record.key]"
              v-model:value="editableData[record.key][column.dataIndex]"
              style="margin: -5px 0"
          />
          <template v-else>
            <template v-if="column.dataIndex === 'evaluationId'">
              <span v-if="text">{{text}}</span>
              <span v-else>该用户暂时未评价</span>
            </template>
            <template v-else>
              {{ text }}
            </template>
          </template>
        </div>
      </template>

      <!-- 对 operation 字段显示编辑/保存/取消/删除操作 -->
      <template v-else-if="column.dataIndex === 'operation'">
        <div class="editable-row-operations">
          <span v-if="editableData[record.key]">
            <a-typography-link @click="save(record.key)">确定</a-typography-link>
            <a-popconfirm title="你确定取消吗？" @confirm="cancel(record.key)" ok-text="确定" cancel-text="取消">
              <a>取消</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a @click="showEvaluation(record.key)">展示用户评价</a>
          </span>
        </div>
      </template>
    </template>
  </a-table>
</template>

<script setup>
import {cloneDeep} from 'lodash-es';
import {onMounted, reactive, ref} from 'vue';
import myAxios from "../../plugins/myAxios.js";
import {message} from "ant-design-vue";

// 表格列定义
const columns = [
  {
    title: '预约人 ID',
    dataIndex: 'userId',
    width: '10%',
  },
  {
    title: '景区 ID',
    dataIndex: 'scenicId',
    width: '10%',
  },
  {
    title: '预约时间',
    dataIndex: 'reserveTime',
    width: '10%',
  },
  {
    title: '评论 ID',
    dataIndex: 'evaluationId',
    width: '10%',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '10%'
  },
];

// 响应式数据源
const dataSource = ref([]);
const editableData = reactive({});
const image = ref('');
const tag = ref('');

const open = ref(false);

// 编辑函数，点击编辑按钮时调用
const edit = (key) => {
  editableData[key] = cloneDeep(dataSource.value.find(item => item.key === key));
};


const save = async (key) => {
  // 编辑保存后的新值
  const editedData = editableData[key];
  const item = dataSource.value.find(item => item.key === key);
  // 请求后端更新数据
  const res = await myAxios.post(`/reserve/update/${item.id}`, editedData);
  if (res.code === 0) {
    Object.assign(dataSource.value.find(item => item.key === key), editedData);
    message.success('修改成功');
  } else {
    message.error('修改失败');
  }
  delete editableData[key];
};

// 取消函数，点击取消按钮时调用
const cancel = (key) => {
  delete editableData[key];
};

// 删除函数，点击删除按钮时调用
const onDelete = async (key) => {
  const item = dataSource.value.find(item => item.key === key);
  // 请求后端删除数据
  const res = await myAxios.post(`/reserve/delete/${item.id}`);
  if (res.code === 0) {
    dataSource.value = dataSource.value.filter(item => item.key !== key);
    message.success('删除成功');
  } else {
    message.error('删除失败');
  }
};

const showEvaluation = async (key) => {
  const item = dataSource.value.find(item => item.key === key);
  if (!item.evaluationId) {
    message.info('该用户暂时未评价')
  }
  // 请求后端删除数据
  const res = await myAxios.get(`/evaluation/${item.evaluationId}`);
  if (res.code === 0) {
    open.value = true
    formModal.value.content = res.data.content;
    formModal.value.score = res.data.score;
  } else {
    message.error('获取评价失败');
  }
}

const formModal = ref({
  score: '',
  content: '',
});

const loadData = async () => {
  const res = await myAxios.get('/reserve/get/all');
  if (res.code === 0) {
    dataSource.value = res.data.map((item, index) => ({
      ...item,
      key: index,
    }));
  }
};

onMounted(async () => {
  loadData();
});
</script>

<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}

.editable-add-btn {
  margin-bottom: 8px;
}
</style>
