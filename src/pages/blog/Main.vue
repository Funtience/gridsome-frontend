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
        <el-button
          @click="$share('/blog/details/' + blog.id)"
          style="margin-left: 10px"
          icon="el-icon-share"
          type="warning"
          plain
          circle
        ></el-button>
        <el-button
          v-if="token"
          type="primary"
          icon="el-icon-edit"
          round
          plain
          style="float: right;"
          @click="$router.push('/blog/add')"
          >写博文</el-button
        >
      </el-card>

      <div v-if="blogs && blogs.length > 0">
        <el-card
          shadow="hover"
          v-for="(blog, index) in blogs"
          :key="'p' + index"
          style="margin-bottom: 20px"
          v-if="!blog.hide"
        >
          <div slot="header">
            <el-row>
              <el-col :span="16">
                <span>
                  <a
                    style="text-decoration:none;cursor:pointer"
                    @click="$router.push('/blog/detail/' + blog.id)"
                  >
                    <i class="el-icon-edit-outline"></i>&nbsp;&nbsp;
                    {{ blog.title }}
                  </a>
                </span>
              </el-col>
              <el-col :span="8">
                <div style="text-align: right;">
                  <el-button
                    @click="$share('/blog/details/' + blog.id)"
                    style="padding: 3px 0"
                    type="text"
                    icon="el-icon-share"
                  ></el-button>
                  <el-button
                    v-if="token"
                    @click="deleteBlog(blog.id, index)"
                    style="padding: 3px 0"
                    type="text"
                    icon="el-icon-delete"
                  ></el-button>
                </div>
              </el-col>
            </el-row>
          </div>
          <div style="font-size: 0.9rem;line-height: 1.5;color: #606c71;">
            最近更新 {{ $utils.utcToLocal(blog.updated_at) }}
          </div>
          <div
            style="font-size: 1.1rem;line-height: 1.5;color: #303133;padding: 10px 0px 0px 0px"
          >
            {{ blog.description }}
          </div>
        </el-card>
        <div style="text-align: center">
          <Pager
            :info="$page.blogs.pageInfo"
            linkClass="pager"
            activeLinkClass="active"
          />
        </div>
      </div>

      <el-card
        shadow="never"
        style="margin-bottom: 20px;padding: 20px 0px 20px 0px;text-align: center"
        v-if="!blogs || blogs.length == 0"
      >
        <font style="font-size: 30px;color:#dddddd ">
          <b>还没有博客 (╯°Д°)╯︵ ┻━┻</b>
        </font>
      </el-card>
    </div>
  </Layout>
</template>
<page-query>
query($page: Int){
  blogs: allStrapiBlog(perPage:2, page: $page) @paginate{
    pageInfo{
      totalPages
      currentPage
    }
    totalCount
    edges{
      node{
        id
        title
        description
        updated_at
      }
    }
  }
}
</page-query>

<script>
import Pager from '@/components/Pagination'
import axios from 'axios'
export default {
  metaInfo: {
    title: 'Hello, world!',
  },
  components: { Pager },
  data() {
    return {
      searchKey: '',
    }
  },
  computed: {
    token() {
      return this.$store.state.token
    },
    blogs() {
      return this.$page.blogs.edges.map((edge) => {
        return {
          hide: false,
          ...edge.node,
        }
      })
    },
  },
  methods: {
    search() {
      let edges = this.$page.blogs.edges
      for (let i = 0; i < edges.length; i++) {
        edges.splice(i, 1, {
          node: Object.assign(edges[i].node, {
            hide: edges[i].node.title.indexOf(this.searchKey) < 0,
          }),
        })
      }
    },
    deleteBlog(id, index) {
      this.$confirm('是否永久删除该博客?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        axios
          .delete(this.GRIDSOME_API_URL + '/blogs/' + id, {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          })
          .then((response) => {
            this.$message({
              message: '删除成功',
              type: 'success',
            })
            this.blogs.splice(index, 1)
          })
      })
    },
  },
}
</script>
