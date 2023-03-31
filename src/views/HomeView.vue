<template>
  <div class="home">
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="4"><img src="@/assets/logo.png" alt="" class="logo"></el-col>
          <el-col :span="16">
            <h2>巴啦啦能量 -------- 古娜拉黑暗之神</h2>
          </el-col>
          <el-col :span="4" class="userInfo">
            <el-dropdown>
              <span class="el-dropdown-link">
                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                <el-icon class="el-icon--right">
                  <!-- <arrow-down /> -->
                </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>个人信息</el-dropdown-item>
                  <el-dropdown-item>更换头像</el-dropdown-item>
                  <el-dropdown-item>退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo" default-active="2"
            text-color="#fff" router>
            <el-menu-item :index="item.path" v-for="item in list" :key="item.path">
              <span>{{ item.meta.title }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

  const router = useRouter()
  const list = router.getRoutes().filter(item => item.meta.isShow)
  

</script>

<style lang="scss" scoped>
.el-header {
  height: 80px;
  background-color: #666;

  .logo {
    height: 80px;
  }

  h2 {
    height: 80px;
    line-height: 80px;
    text-align: center;
    color: #fff;
  }

  .userInfo {
    position: relative;

    .el-dropdown {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

}
.el-aside {
  .el-menu {
    height: calc(100vh - 80px);
  }
}
</style>
