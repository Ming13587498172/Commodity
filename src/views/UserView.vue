<template>
  <div>
    <el-form :inline="true" :model="data.selectData" class="demo-form-inline">
      <el-form-item label="姓名">
        <el-input v-model="data.selectData.nickName" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-model="data.selectData.role" class="m-2" placeholder="请选择">
          <el-option label="全部" :value="0" />
          <el-option v-for="item in data.roleList" :key="item.roleId" :label="item.roleName" :value="item.roleId" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="data.List" border style="width: 100%">
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="nickName" label="姓名" />
      <el-table-column prop="role" label="角色">
        <template #default="{ row }">
          <el-tag v-for="item in row.role" :key="item.roleName" class="role-tag">
            {{ item.roleName }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button type="success" size="small" :icon="Search" @click="handleClick(row, '查看')">查看</el-button>
          <el-button type="primary" size="small" :icon="Edit" @click="handleEdit(row, '编辑')">编辑</el-button>
          <el-button type="danger" size="small" :icon="Delete" @click="handleDel">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 对话框 -->
    <el-dialog v-model="data.isShow" :title="textChange === '查看' ? '' : '编辑'" :before-close="handleClose">
      <el-descriptions title="信息" v-if="textChange === '查看'">
        <el-descriptions-item label="ID：">{{ id }}</el-descriptions-item>
        <el-descriptions-item label="姓名：">{{ nickName }}</el-descriptions-item>
        <el-descriptions-item label="角色：">
          <el-tag v-for="item in role as any" :key="item.roleName" class="role-tag">
            {{ item.roleName }}
          </el-tag>
        </el-descriptions-item>
      </el-descriptions>
      <el-form :model="data.EditForm" label-width="120px" v-else>
        <el-form-item label="姓名：">
          <el-input v-model="data.EditForm.nickName" />
        </el-form-item>
        <el-form-item label="角色：">
          <el-select multiple v-model="data.EditForm.role" class="m-2" placeholder="请选择">
            <el-option v-for="item in data.roleList" :key="item.roleId" :label="item.roleName" :value="item.roleId" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="data.isShow = false">{{ textChange === '查看' ? '关闭' : '取消' }}</el-button>
          <el-button type="primary" @click="updateUser" v-if="textChange === '编辑'">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import { getUserList, getRoleList } from '@/api/user'
import { ListData, ListInt } from '@/type/user'
import { Delete, Edit, Search } from '@element-plus/icons-vue'
import { ElMessageBox, ElMessage } from 'element-plus'

const data = reactive(new ListData())
let textChange = ref('')
let nickName = ref('')
let id = ref(0)
let role = ref([])

onMounted(() => {
  getUser()
  getRole()
})

// 获取用户列表数据
const getUser = async () => {
  try {
    const res = await getUserList()
    data.List = res.data
  } catch (err) {
    console.log(err)
  }
}

// 获取角色列表数据
const getRole = async () => {
  try {
    const res = await getRoleList()
    data.roleList = res.data
  } catch (err) {
    console.log(err)
  }
}

// 查询
const onSubmit = () => {
  let arr:ListInt[] = []
  if(data.selectData.role || data.selectData.nickName) {
    if(data.selectData.nickName) {
      arr = data.List.filter(item => {
        return item.nickName.indexOf(data.selectData.nickName) !== -1
      })
    }
    if(data.selectData.role) {
      arr = (data.selectData.nickName ? arr : data.List).filter(item => {
        return item.role.find(item1 => item1.role === data.selectData.role)
      })
    }
  } else {
    arr = data.List
  }
  data.List = arr
}

// 查看
const handleClick = (row: any, text: string) => {
  textChange.value = text
  id.value = row.id
  nickName.value = row.nickName
  role.value = row.role
  data.isShow = true
}

// 编辑
const handleEdit = (row: ListInt, text: string) => {
  textChange.value = text
  data.EditForm = {
    id: row.id,
    nickName: row.nickName,
    role: row.role.map(val => val.role),
    userName: row.userName
  }
  // data.EditForm.nickName = row.nickName
  // row.role.length > 1 ? data.EditForm.role = 0 : data.EditForm.role = row.role[0].role
  data.isShow = true
}
const updateUser = () => {

  data.isShow = false
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

watch([() => data.selectData.role, () => data.selectData.nickName], () => {
  if(data.selectData.role === 0 || data.selectData.nickName === '') {
    getUser()
  }
})

</script>

<style scoped lang="scss">
.role-tag {
  margin: 0 1%;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
