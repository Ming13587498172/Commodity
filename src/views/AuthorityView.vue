<template>
  <div>
    <el-tree ref="treeRef" :data="data.list" show-checkbox node-key="roleId" accordion :check-strictly="true" :default-checked-keys="data.authority"
      :props="defaultProps" />
    <el-button type="primary" size="small" @click="handleChange">确定修改</el-button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router';
import { getAuthorityList } from '@/api/authority'
import { InitData } from '@/type/authority'

const defaultProps = {
  children: 'roleList',
  label: 'name',
}

const route = useRoute()
const params: any = route.query
const data = reactive(new InitData(params.id, params.authority))
data.treeRef = params.authority
const treeRef = ref()

onMounted(() => {
  getData()
})

const getData = async () => {
  try {
    const res = await getAuthorityList()
    data.list = res.data
  } catch (err) {
    console.log(err)
  }
}

// 确定修改
const handleChange = () => {
  console.log(treeRef.value.getCheckedKeys().sort((a:number, b:number) => {return a - b}))
  
}


</script>

<style scoped lang="scss">
</style>
