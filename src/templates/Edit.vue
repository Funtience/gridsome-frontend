<template>
  <Layout>
    <div style="min-height: 600px">
      <el-card shadow="never" style="margin-bottom: 20px">
        <el-form
          ref="form"
          :model="form"
          label-width="80px"
          :rules="ruleValidate"
        >
          <el-form-item label="标题" prop="title">
            <el-input v-model="form.title" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="简要说明" prop="description">
            <el-input v-model="form.description" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="博客正文" prop="content">
            <mavon-editor
              @imgAdd="imgAdd"
              style="max-height: 500px"
              ref="md"
              v-model="form.content"
              :subfield="false"
              :toolbars="mavonEditorToolbars"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="onSubmit"
              :loading="submitButton.loading"
              :disabled="submitButton.disabled"
              >修改</el-button
            >
            <el-button @click="$router.push('/blog/main')">返回</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </Layout>
</template>

<page-query>
query($id: ID!){
  blog:strapiBlog(id:$id){
    id
    title
    description
    content
  }
}
</page-query>
<script>
import axios from 'axios'
export default {
  name: 'EditPage',
  data() {
    return {
      form: {
        id: '',
        title: '',
        description: '',
        content: '',
      },
      ruleValidate: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          {
            type: 'string',
            max: 32,
            message: '标题长度不大于32字符',
            trigger: 'change',
          },
        ],
        description: [
          { required: true, message: '请输入博客描述', trigger: 'blur' },
        ],
        content: [
          { required: true, message: '请输博客入正文', trigger: 'blur' },
        ],
      },
      submitButton: {
        loading: false,
        disabled: false,
      },
      mavonEditorToolbars: {
        bold: true,
        italic: true,
        header: true,
        underline: true,
        strikethrough: true,
        mark: true,
        superscript: true,
        subscript: true,
        quote: true,
        ol: true,
        ul: true,
        link: true,
        imagelink: true,
        code: true,
        table: true,
        htmlcode: true,
        trash: true,
        alignleft: true,
        aligncenter: true,
        alignright: true,
        preview: true,
      },
    }
  },
  created() {
    this.form.id = this.$page.blog.id
    this.form.title = this.$page.blog.title
    this.form.description = this.$page.blog.description
    this.form.content = this.$page.blog.content
  },
  computed: {
    token() {
      return this.$store.state.token
    },
  },
  methods: {
    imgAdd(pos, file) {
      this.$refs.md.$img2Url(pos, file.miniurl)
    },
    onSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.submitButton.loading = true
          this.submitButton.disabled = true

          axios
            .put(
              'http://localhost:1337/blogs/' + this.$page.blog.id,
              this.form,
              {
                headers: {
                  Authorization: `Bearer ${this.token}`,
                },
              }
            )
            .then((response) => {
              let result = response.data
              this.$message({
                message: '发表成功',
                type: 'success',
              })
              this.$router.push('/blog/detail/' + result.id)
            })
            .then(() => {
              this.submitButton.loading = false
              this.submitButton.disabled = false
            })
        }
      })
    },
  },
}
</script>

<style></style>
