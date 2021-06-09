<template>
  <Layout>
    <div style="min-height: 600px">
      <el-card shadow="never" style="margin-bottom: 20px">
        <el-input
          placeholder="请输入关键字"
          v-model="searchKey"
          clearable
          style="width: 300px"
        ></el-input>
        <el-button
          @click="search"
          icon="el-icon-search"
          style="margin-left: 10px"
          circle
          plain
        ></el-button>
        <!-- <el-button
          ref="shareBtn"
          icon="el-icon-share"
          type="warning"
          style="margin-left: 10px"
          plain
          circle
        ></el-button> -->
      </el-card>

      <div v-if="projects && projects.length > 0">
        <el-card
          shadow="hover"
          v-for="(project, index) in projects"
          :key="'pro' + index"
          style="margin-bottom: 20px"
          v-if="!project.hide"
        >
          <div slot="header">
            <el-row>
              <el-col :span="16">
                <span>
                  <a
                    style="text-decoration:none;cursor:pointer"
                    @click="$router.push('/project/detail/' + project.id)"
                  >
                    <i class="el-icon-service"></i>&nbsp;&nbsp;
                    {{ project.title }}
                  </a>
                </span>
              </el-col>
              <el-col :span="8">
                <div style="text-align: right;">
                  <el-button
                    @click="goGithub(project.title)"
                    style="padding: 3px 0"
                    type="text"
                    icon="el-icon-back"
                    >前往GitHub</el-button
                  >
                  <!-- <el-button
                    ref="shareBtn"
                    :share-id="'/project/detail/' + project.id"
                    style="padding: 3px 0"
                    type="text"
                    icon="el-icon-share"
                  ></el-button> -->
                </div>
              </el-col>
            </el-row>
          </div>
          <div style="font-size: 0.9rem;line-height: 1.5;color: #606c71;">
            最近更新 {{ $utils.utcToLocal(project.updated_at) }}
          </div>
          <div
            style="font-size: 1.1rem;line-height: 1.5;color: #303133;padding: 10px 0px 0px 0px"
          >
            {{ project.description }}
          </div>
          <div
            style="font-size: 1.1rem;color: #303133;padding: 10px 0px 0px 0px"
          >
            <el-row>
              <el-col :span="16" style="padding-top: 5px">
                <el-tooltip
                  effect="dark"
                  :content="'star ' + project.star"
                  placement="bottom"
                >
                  <i
                    class="el-icon-star-off"
                    style="margin: 0px 5px 0px 0px"
                  ></i>
                </el-tooltip>
                {{ project.star }}
                <el-tooltip
                  effect="dark"
                  :content="'watch ' + project.watch"
                  placement="bottom"
                >
                  <i class="el-icon-view" style="margin: 0px 5px 0px 15px"></i>
                </el-tooltip>
                {{ project.watch }}
                <el-tooltip
                  effect="dark"
                  :content="'fork ' + project.fork"
                  placement="bottom"
                >
                  <i class="el-icon-bell" style="margin: 0px 5px 0px 15px"></i>
                </el-tooltip>
                {{ project.fork }}
              </el-col>
              <el-col :span="8" style="text-align: right;">
                <el-tag size="small" type="danger" v-if="project.license">{{
                  project.license
                }}</el-tag>
                <el-tag
                  size="small"
                  type="success"
                  v-for="tag in project.tags"
                  :key="tag.id"
                  >{{ tag.title }}</el-tag
                >
              </el-col>
            </el-row>
          </div>
        </el-card>
        <div style="text-align: center">
          <Pager
            :info="$page.projects.pageInfo"
            linkClass="pager"
            activeLinkClass="active"
          />
        </div>
      </div>

      <el-card
        shadow="never"
        style="margin-bottom: 20px;padding: 20px 0px 20px 0px;text-align: center"
        v-if="!projects || projects.length == 0"
      >
        <font style="font-size: 30px;color:#dddddd ">
          <b>还没有开源项目 (╯°Д°)╯︵ ┻━┻</b>
        </font>
      </el-card>
    </div>
  </Layout>
</template>
<page-query>
query($page:Int){
  projects:allStrapiProject(perPage:2, page: $page) @paginate{
    pageInfo{
      totalPages
      currentPage
    }
    edges{
      node{
        id
        title
        content
        description
        star
        fork
        watch
        created_at
        updated_at
        license
         tags{
          id
          title
        }
      }
    }
  }
}
</page-query>
<script>
import Pager from '@/components/Pagination'
export default {
  data() {
    return {
      searchKey: '',
    }
  },
  components: { Pager },
  computed: {
    projects() {
      return this.$page.projects.edges.map((edge) => {
        return {
          hide: false,
          ...edge.node,
        }
      })
    },
  },
  mounted() {
    this.$refs.shareBtn.forEach((btn) =>
      btn.$el.addEventListener('click', () => {
        this.$share(btn.$attrs['share-id'])
      })
    )
  },
  methods: {
    share(message) {
      if (!message && isClient) {
        message = window.location
      } else {
        // let arr = (window.location + '').split('#')
        message = window.location.origin + message
      }

      if (isClient && this.copy(message)) {
        this.$confirm('链接已复制,去分享给好友吧!!', '分享', {
          showCancelButton: false,
          showClose: false,
          type: 'success',
        })
      } else {
        this.$confirm('链接复制失败,可能因为浏览器不兼容', '分享', {
          showCancelButton: false,
          showClose: false,
          type: 'warning',
        })
      }
    },
    copy(message) {
      let doc = document.createElement('input')
      doc.value = message
      document.body.appendChild(doc)
      doc.select()
      let status
      try {
        status = document.execCommand('copy')
      } catch (e) {}
      document.body.removeChild(doc)
      return status
    },
    search() {
      let edge = this.$page.projects.edges
      for (let i = 0; i < edge.length; i++) {
        edge.splice(i, 1, {
          node: Object.assign(edge[i].node, {
            hide: edge[i].node.title.indexOf(this.searchKey) < 0,
          }),
        })
      }
    },
    goGithub(url) {
      window.open('https://github.com/funtience/' + url)
    },
  },
}
</script>

<style></style>
