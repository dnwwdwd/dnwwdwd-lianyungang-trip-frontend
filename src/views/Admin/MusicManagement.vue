<template>
  <a-button type="primary" class="editable-add-btn" style="margin-bottom: 8px; margin-top: 12px" @click="handleAdd">
    添加音乐
  </a-button>
  <a-modal v-model:open="open" title="添加音乐" @ok="handleOk" cancelText="取消" okText="确认添加">
    音乐名称：
    <a-input v-model:value="formModal.name" class="a-input"/>
    图片：
    <a-input v-model:value="formModal.imgUrl" class="a-input"/>
    音乐类别：
    <a-input v-model:value="formModal.type" class="a-input"/>
    音乐描述：
    <a-input v-model:value="formModal.description" class="a-input"/>
    音乐链接：
    <a-input v-model:value="formModal.url" class="a-input"/>
    时长：
    <a-input v-model:value="formModal.duration" class="a-input"/>
    <div style="margin-top: 5px">
      歌手：
      <a-select v-model:value="formModal.singerId">
        <a-select-option v-for="id in singerIds" :key="id" :value="id">{{ id }}</a-select-option>
      </a-select>
    </div>
  </a-modal>
  <a-table :columns="columns" :data-source="dataSource" bordered>
    <template #bodyCell="{ column, text, record }">
      <template v-if="['name', 'imgUrl', 'type', 'description', 'duration'].includes(column.dataIndex)">
        <div>
          <a-input
              v-if="editableData[record.key]"
              v-model:value="editableData[record.key][column.dataIndex]"
              style="margin: -5px 0"
          />
          <template v-else>
            <template v-if="column.dataIndex === 'imgUrl'">
              <a-image :src="text" :height="150" :width="150" />
            </template>
            <template v-else>
              {{ text }}
            </template>
          </template>
        </div>
      </template>

      <template v-else-if="column.dataIndex === 'singerId'">
        <div>
          <a-select
              v-if="editableData[record.key]"
              v-model:value="editableData[record.key][column.dataIndex]"
              style="width: 100%"
          >
            <a-select-option v-for="id in singerIds" :key="id" :value="id">
              {{ id }}
            </a-select-option>
          </a-select>
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>

      <template v-else-if="column.dataIndex === 'url'">
        <div class="url-cell" title={text}>
          {{ text }}
        </div>
      </template>

      <template v-else-if="column.dataIndex === 'operation'">
        <div class="editable-row-operations">
        <span v-if="editableData[record.key]">
          <a-typography-link @click="save(record.key)">确定</a-typography-link>
          <a-popconfirm title="你确定取消吗？" @confirm="cancel(record.key)" ok-text="确定" cancel-text="取消">
            <a>取消</a>
          </a-popconfirm>
        </span>
          <span v-else>
          <a @click="edit(record.key)">修改</a>
          <a-popconfirm title="你确定删除吗？" @confirm="onDelete(record.key)" ok-text="确定" cancel-text="取消">
            <a>删除</a>
          </a-popconfirm>
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
    title: '音乐名称',
    dataIndex: 'name',
    width: '5%',
  },
  {
    title: '图片',
    dataIndex: 'imgUrl',
    width: '10%',
  },
  {
    title: '类别',
    dataIndex: 'type',
    width: '10%',
  },
  {
    title: '音乐描述',
    dataIndex: 'description',
    width: '5%',
  },
  {
    title: '音乐链接',
    dataIndex: 'url',
    width: '10%',
    ellipsis: true,
  },
  {
    title: '时长',
    dataIndex: 'duration',
    width: '10%',
  },
  {
    title: '歌手 ID',
    dataIndex: 'singerId',
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

const open = ref(false);

// 编辑函数，点击编辑按钮时调用
const edit = (key) => {
  editableData[key] = cloneDeep(dataSource.value.find(item => item.key === key));
};

const save = async (key) => {
  // 编辑保存后的新值
  const editedData = editableData[key];
  // 请求后端更新数据
  const item = dataSource.value.find(item => item.key === key);
  const res = await myAxios.post(`/music/update/${item.id}`, editedData);
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
  const res = await myAxios.post(`/music/delete/${item.id}`, {
    id: item.id,
  });
  if (res.code === 0) {
    dataSource.value = dataSource.value.filter(item => item.key !== key);
    message.success('删除成功');
  } else {
    message.error('删除失败');
  }
};

const formModal = ref({
  name: '',
  imgUrl: '',
  type: '',
  description: '',
  url: '',
  duration: '',
  singerId: '',
});

// 添加表格项
const handleAdd = () => {
  open.value = true;
};

const singerIds = ref([]);

const handleOk = async () => {
  // 请求后端，添加表格项
  const result = await myAxios.post('/music/add', formModal.value);
  if (result.code == 0) {
    message.success('添加成功');
    open.value = false;
  } else {
    message.error('添加失败');
  }
  // 重新加载表格数据
  loadData();
};

const loadData = async () => {
  const res = await myAxios.get('/music');
  if (res.code === 0) {
    dataSource.value = res.data.map((item, index) => ({
      ...item,
      key: index,
    }));
  }
  const result = await myAxios.get('/singer/list/id');
  if (res.code === 0) {
    singerIds.value = result.data;
    console.log(singerIds.value)
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

.url-cell {
  white-space: normal;  /* 允许文本换行 */
  word-wrap: break-word;  /* 允许长单词换行 */
  overflow-wrap: break-word;  /* 支持不同的浏览器 */
  max-width: 150px;  /* 限制单元格的最大宽度 */
}
</style>
