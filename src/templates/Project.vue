<template>
  <Layout>
    <div style="min-height: 600px">
      <el-card shadow="never" style="min-height: 400px">
        <div slot="header">
          <el-row>
            <el-col :span="12">
              <span>{{ $page.project.title }}</span>
            </el-col>
            <el-col :span="12">
              <div style="text-align: right;">
                <el-button
                  ref="shareBtn"
                  style="padding: 3px 0"
                  type="text"
                  icon="el-icon-share"
                  >分享</el-button
                >
                <el-button
                  @click="goGithub($page.project.title)"
                  style="padding: 3px 0"
                  type="text"
                  icon="el-icon-back"
                  >前往GitHub</el-button
                >
                <el-button
                  @click="$router.push('/project/main')"
                  style="padding: 3px 0"
                  type="text"
                  icon="el-icon-more-outline"
                  >更多项目</el-button
                >
              </div>
            </el-col>
          </el-row>
        </div>
        <div style="font-size: 0.9rem;line-height: 1.5;color: #606c71;">
          发布 {{ $utils.utcToLocal($page.project.created_at) }} <br />
          更新 {{ $utils.utcToLocal($page.project.updated_at) }}
        </div>
        <div
          style="font-size: 1.1rem;line-height: 1.5;color: #303133;padding: 20px 0px 0px 0px"
        >
          {{ $page.project.description }}
        </div>
        <div
          style="font-size: 1.1rem;color: #303133;padding: 15px 0px 15px 0px;border-bottom: 1px solid #E4E7ED;"
        >
          <el-row>
            <el-col :span="16" style="padding-top: 5px">
              <el-tooltip
                effect="dark"
                :content="'star ' + $page.project.star"
                placement="bottom"
              >
                <i class="el-icon-star-off" style="margin: 0px 5px 0px 0px"></i>
              </el-tooltip>
              {{ $page.project.star }}
              <el-tooltip
                effect="dark"
                :content="'watch ' + $page.project.watch"
                placement="bottom"
              >
                <i class="el-icon-view" style="margin: 0px 5px 0px 15px"></i>
              </el-tooltip>
              {{ $page.project.watch }}
              <el-tooltip
                effect="dark"
                :content="'fork ' + $page.project.fork"
                placement="bottom"
              >
                <i class="el-icon-bell" style="margin: 0px 5px 0px 15px"></i>
              </el-tooltip>
              {{ $page.project.fork }}
            </el-col>
            <el-col :span="8" style="text-align: right">
              <el-tag size="small" type="danger" v-if="$page.project.license">{{
                $page.project.license
              }}</el-tag>
              <el-tag
                size="small"
                type="success"
                v-for="tag in $page.project.tags"
                :key="tag.id"
                >{{ tag.title }}</el-tag
              >
            </el-col>
          </el-row>
        </div>
        <div
          v-html="mdToHtml($page.project.content)"
          v-if="$page.project.content"
          class="markdown-body"
          style="padding-top: 20px"
        ></div>
        <div
          v-if="!$page.project.content"
          style="padding: 20px 0px 20px 0px;text-align: center"
        >
          <font style="font-size: 30px;color:#dddddd ">
            <b>还没有介绍 (╯°Д°)╯︵ ┻━┻</b>
          </font>
        </div>
      </el-card>
    </div>
  </Layout>
</template>
<page-query>
query($id: ID!){
  project: strapiProject(id:$id){
    title
    license
    id
    description
    content
    star
    watch
    fork
    created_at
    updated_at
    tags{
      id
      title
    }
  }
}
</page-query>
<script>
import MarkdownIt from 'markdown-it'
export default {
  data() {
    return {
      project: {
        name: '',
      },
      loading: false,
    }
  },
  computed: {},
  mounted() {
    this.$refs.shareBtn.$el.addEventListener('click', () => {
      this.$share(this.$refs.shareBtn.$attrs['share-id'])
    })
  },
  methods: {
    mdToHtml(markdown) {
      markdown = markdown.replace(
        '/uploads/',
        `${this.GRIDSOME_API_URL}/uploads/`
      )
      const md = new MarkdownIt()
      return md.render(markdown)
    },
    goGithub(url) {
      window.open('https://github.com/funtience/' + url)
    },
  },
}
</script>

<style></style>
