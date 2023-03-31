<template>
  <div>
    <div class="select-box">
      <el-form :inline="true" :model="data.selectData" class="demo-form-inline">
        <el-form-item label="标题">
          <el-input v-model="data.selectData.title" placeholder="请输入关键字" />
        </el-form-item>
        <el-form-item label="详情">
          <el-input v-model="data.selectData.introduce" placeholder="请输入关键字" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="dataList.comList" border style="width: 100%">
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="introduce" label="详情" :show-overflow-tooltip="true" />
    </el-table>
    <el-pagination @size-change="handleSize" @current-change="handleCurrent" layout="prev, pager, next" :total="data.selectData.count" />
  </div>
</template>

<script setup lang="ts">
import { getGoodsList } from '@/api/goods';
import { InitData } from '@/type/goods';
import { computed, reactive } from 'vue';

// let { selectData, listData } = reactive(new InitData())
const data = reactive(new InitData())

// 获取商品列表数据
const getData = async () => {
  try {
    const res = await getGoodsList()
    data.listData = res.data
    data.selectData.count = res.data.length
  } catch (err) {
    console.log(err)
  }
}
getData()

// 分页
const handleSize = (size: number) => {
  console.log(size)
  data.selectData.pagesize = size
}
const handleCurrent = (page: number) => {
  console.log(page)
  data.selectData.page = page
}
const dataList = reactive({
  comList: computed(() => {
    return data.listData.slice((data.selectData.page - 1) * data.selectData.pagesize, data.selectData.page * data.selectData.pagesize)
  }) 
})

// 查询
const onSubmit = () => {
  console.log(data.selectData.title)
  console.log(data.selectData.introduce)
}


</script>

<style lang="scss" scoped>
</style>
