<template>
  <div>
    商品列表
  </div>
</template>

<script setup lang="ts">
import { getGoodsList } from '@/api/goods'

try {
  const res = await getGoodsList()
  console.log(res)
} catch (err) {
  console.log(err)
}

</script>

<style lang="scss" scoped>

</style>
