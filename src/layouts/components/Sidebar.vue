<template>
  <div>
    <el-card shadow="never">
      <ul role="menubar" class="el-menu">
        <li
          role="menuitem"
          tabindex="-1"
          :class="[
            'el-menu-item',
            { 'is-active': $route.path.startsWith('/new') },
          ]"
          style="padding-left: 20px;"
        >
          <i class="el-icon-star-off"></i>
          <router-link tag="span" to="/new/main">最新动态</router-link>
        </li>
        <li
          role="menuitem"
          tabindex="-1"
          :class="[
            'el-menu-item',
            { 'is-active': $route.path.startsWith('/social') },
          ]"
          style="padding-left: 20px;"
        >
          <i class="el-icon-mobile-phone"></i>
          <router-link tag="span" to="/social/main">社交圈</router-link>
        </li>
        <li
          role="menuitem"
          tabindex="-1"
          :class="[
            'el-menu-item',
            { 'is-active': $route.path.startsWith('/blog') },
          ]"
          style="padding-left: 20px;"
        >
          <i class="el-icon-edit-outline"></i>
          <router-link tag="span" to="/blog/main">博客列表</router-link>
        </li>
        <li
          role="menuitem"
          tabindex="-1"
          :class="[
            'el-menu-item',
            { 'is-active': $route.path.startsWith('/project') },
          ]"
          style="padding-left: 20px;"
        >
          <i class="el-icon-service"></i>
          <router-link tag="span" to="/project/main">开源项目</router-link>
        </li>
        <li
          role="menuitem"
          tabindex="-1"
          :class="[
            'el-menu-item',
            { 'is-active': $route.path.startsWith('/helper') },
          ]"
          style="padding-left: 20px;"
        >
          <i class="el-icon-printer"></i>
          <router-link tag="span" to="/helper/main">使用帮助</router-link>
        </li>
        <li
          role="menuitem"
          tabindex="-1"
          :class="[
            'el-menu-item',
            { 'is-active': $route.path.startsWith('/readme') },
          ]"
          style="padding-left: 20px;"
        >
          <i class="el-icon-document"></i>
          <router-link tag="span" to="/readme/main">README.md</router-link>
        </li>
      </ul>
    </el-card>

    <el-card shadow="never" style="margin-top: 20px;text-align: center">
      <div
        v-if="!token"
        style="font-size: 0.9rem;line-height: 1.5;color: #606c71;"
      >
        <el-tag type="danger" size="small">&nbsp;</el-tag>&nbsp;&nbsp;
        用户未登录&nbsp;&nbsp;
        <el-button type="text" @click="openLoginDialog">登录</el-button>
      </div>
      <div
        v-if="token"
        style="font-size: 0.9rem;line-height: 1.5;color: #303133;"
      >
        <el-tag type="success" size="small">&nbsp;</el-tag>&nbsp;&nbsp;
        用户已登录&nbsp;&nbsp;
        <el-button type="text" @click="cancellation">注销</el-button>
      </div>
      <div style="margin-top: 10px;text-align: left">
        <el-alert
          title="Token获取"
          type="info"
          description="在 github-> settings-> developerSettings-> personalAccessTokens 勾选gist权限,获取Token. 详情参考README.md"
          :closable="false"
        >
        </el-alert>
      </div>
    </el-card>
    <login-dialog ref="loginDialog"></login-dialog>
  </div>
</template>

<script>
import LoginDialog from '@/components/LoginDialog.vue'
export default {
  components: { LoginDialog },
  data() {
    return {
      active: '',
      parentUrl: '',
    }
  },
  mounted() {
    let arr = this.$route.path.split('/')
    this.active = '/' + arr[1] + '/' + arr[2]
  },
  computed: {
    token() {
      return this.$store.state.token
    },
  },
  methods: {
    onSelect(index) {
      this.$router.push(index)
    },
    openLoginDialog() {
      this.$refs.loginDialog.open(() => {})
    },
    cancellation() {
      this.$store.commit('changeToken', '')
      this.$message({
        message: '注销成功',
        type: 'success',
      })
    },
  },
}
</script>
