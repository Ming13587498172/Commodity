<template>
  <div>
    <el-button type="primary" size="small" :icon="CirclePlus" @click="handleAdd">添加角色</el-button>
    <el-table :data="data.list" border style="width: 100%">
      <el-table-column prop="roleId" label="ID" />
      <el-table-column prop="roleName" label="姓名" />
      <el-table-column prop="authority" label="权限">
        <template #default="{ row }">
          <el-tag v-for="item in row.authority" :key="item" class="role-tag">
            {{ item }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button type="success" size="small" :icon="Search" @click="handleClick(row, '查看')">查看</el-button>
          <el-button type="primary" size="small" :icon="Edit" @click="handleEdit(row, '编辑')">编辑</el-button>
          <el-button type="primary" size="small" :icon="EditPen" @click="handleAuth(row)">修改权限</el-button>
          <el-button type="danger" size="small" :icon="Delete" @click="handleDel">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 对话框 -->
    <el-dialog v-model="data.isShow" :title="textChange === '查看' ? '' : '编辑'" :before-close="handleClose">
      <el-descriptions title="信息" v-if="textChange === '查看'">
        <el-descriptions-item label="ID：">{{ roleId }}</el-descriptions-item>
        <el-descriptions-item label="姓名：">{{ roleName }}</el-descriptions-item>
        <el-descriptions-item label="角色：">
          <el-tag v-for="item in authority as any" :key="item" class="role-tag">
            {{ item }}
          </el-tag>
        </el-descriptions-item>
      </el-descriptions>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="data.isShow = false">{{ textChange === '查看' ? '关闭' : '取消' }}</el-button>
          <el-button type="primary" @click="handleSure" v-if="textChange === '编辑'">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { getRoleList } from '@/api/role';
import { InitData, ListInt } from '@/type/role'
import { Delete, Edit, Search, EditPen, CirclePlus } from '@element-plus/icons-vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useRouter } from 'vue-router';

const router = useRouter()
const data = reactive(new InitData)
let textChange = ref('')
let authority = ref([])
let roleId = ref(null)
let roleName = ref('')

onMounted(() => {
  getData()
})

// 获取角色列表
const getData = async () => {
  try {
    const res = await getRoleList()
    data.list = res.data
  } catch (err) {
    console.log(err)
  }
}

// 添加角色
const handleAdd = () => {
  ElMessageBox.prompt('请输入角色名称', '添加', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputValidator: (value: any) => {
      if (value === null) {
        return false
      } else {
        return true
      }
    },
    inputErrorMessage: '不能为空！',
  })
    .then(({ value }) => {
      data.list.push({
        roleId: data.list.length + 1,
        roleName: value,
        authority: []
      })
      ElMessage({
        type: 'success',
        message: `${value}角色添加成功！`,
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消添加',
      })
    })
}

// 查看
const handleClick = (row: any, text: string) => {
  textChange.value = text
  authority = row.authority
  roleId = row.roleId
  roleName = row.roleName
  data.isShow = true
}

// 编辑
const handleEdit = (row: ListInt, text: string) => {
  textChange.value = text
  data.EditForm = {
    roleId: row.roleId,
    roleName: row.roleName,
  }
  data.isShow = true
}

// 修改权限
const handleAuth = (row: any) => {
  console.log(row,'row')
  router.push({
    path: 'authority',
    query: {
      id: row.roleId,
      authority: row.authority
    }
  })
}

// 删除
const handleDel = () => {
  ElMessageBox.confirm('是否删除?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    ElMessage.success('删除成功!')
  }).catch(() => {
    ElMessage.info('已取消删除!')
  })
}

// 确定
const handleSure = () => {
  console.log(1)
}

// 关闭对话框
const handleClose = (done: () => void) => {
  ElMessageBox.confirm('确认关闭？')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}

</script>

<style scoped lang="scss">
.el-table {
  margin: 2% 0 0 0;
}
.role-tag {
  margin: 1% 1%;
}

</style>
