<template>
  <div>
    <el-dialog title="博主登录" :visible.sync="show" width="500px">
      <el-form :model="user" ref="loginForm" label-width="100px">
        <el-form-item
          label="用户名/邮箱"
          prop="identifier"
          :rules="[
            { required: true, message: '请输入用户名/邮箱', trigger: 'blur' },
          ]"
        >
          <el-input
            v-model="user.identifier"
            placeholder="请输入用户名/邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="password"
          label="密码"
          :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]"
        >
          <el-input
            v-model="user.password"
            placeholder="请输入密码"
            type="password"
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="show = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      show: false,
      handleClose: null,
      user: {
        identifier: 'Little Fun',
        password: 'Pxf769558413',
      },
    }
  },
  methods: {
    ...mapActions(['loginGetToken']),
    open(handleClose) {
      this.handleClose = handleClose
      this.show = true
    },
    onSubmit() {
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          //   this.$store.dispatch('Authentication', this.loginForm.token)
          //   if (typeof this.handleClose == 'function') {
          //     this.handleClose()
          //   }
          this.loginGetToken(this.user)
        }
      })
      this.show = false
    },
  },
}
</script>
