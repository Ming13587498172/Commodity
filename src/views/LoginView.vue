<template>
  <div class="login-box">
    <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="80px" class="demo-ruleForm">
      <h2>巴拉巴拉小魔仙</h2>
      <el-form-item label="账号：" prop="username">
        <el-input v-model="ruleForm.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button class="loginBtn" type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
        <el-button class="loginBtn" @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
import { LoginData } from '@/type/login'
import { getData } from '@/api/login'
import { useRouter } from 'vue-router'

const { ruleForm } = reactive(new LoginData())
const rules = reactive({
  username: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 3, max: 10, message: '长度3-10', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 3, max: 10, message: '长度3-10', trigger: 'blur' },
  ],
})

const ruleFormRef = ref<FormInstance>()
const router = useRouter()

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      try {
        const res = await getData(ruleForm)
        ElMessage.success(res.data.msg)
        localStorage.setItem('token',res.data.token)
        router.push('/')
      } catch (err: any) {
        ElMessage.error(err)
      }
    } else {
      ElMessage.error('账号或密码格式不正确！')
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style scoped lang="scss">
.login-box {
  width: 100%;
  height: 100%;
  background: url('@/assets/bg.jpg') no-repeat center/cover;
  text-align: center;
  overflow: hidden;

  .demo-ruleForm {
    margin: 200px auto;
    padding: 40px;
    width: 500px;
    background: #fff;
    border-radius: 20px;
  }

  .loginBtn {
    width: 48%;
  }

  h2 {
    margin: 0 0 4% 0;
  }
}
</style>
