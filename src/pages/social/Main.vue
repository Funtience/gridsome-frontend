<template>
  <Layout>
    <el-card
      shadow="never"
      style="min-height: 400px;margin-bottom: 20px;padding: 0px 0px 20px 0px"
    >
      <el-tabs v-model="activeTab" type="card" @tab-click="onSelect">
        <el-tab-pane
          :label="'粉丝 ' + $page.users.followeds.length"
          name="followers"
          style="padding: 5px"
        >
          <div>
            <div v-if="$page.users.followeds.length">
              <el-row style="min-height: 200px; ">
                <el-col
                  :span="8"
                  v-for="(fans, index) in $page.users.followeds"
                  :key="'followers' + index"
                  style="padding: 10px"
                >
                  <el-card
                    shadow="hover"
                    style="font-size: 13px;color: #606266;line-height: 20px"
                  >
                    <i class="el-icon-star-off"></i>&emsp;
                    <a
                      @click="$router.push(`/social/detail/${fans.id}`)"
                      style=" text-decoration:none;cursor:pointer"
                      >{{ fans.username }}</a
                    >
                    <br />
                    <i class="el-icon-message"></i>&emsp;
                    <a
                      :href="`https://github.com/${fans.username}`"
                      target="_blank"
                      style=" text-decoration:none;cursor:pointer"
                      >TA的主页</a
                    >
                    <br />
                    <img
                      :src="
                        fans.avatar && `${GRIDSOME_API_URL}${fans.avatar.url}`
                      "
                      style="width: 100%;border-radius:5px;margin-top: 5px"
                    />
                  </el-card>
                </el-col>
              </el-row>
              <div style="text-align: center;margin-top: 10px">
                <!-- <el-pagination
                  @current-change="onSelect"
                  background
                  layout="prev, pager, next"
                  :current-page.sync="followers.query.page"
                  :page-size="followers.query.pageSize"
                  :total="followers.query.pageNumber * followers.query.pageSize"
                >
                </el-pagination> -->
              </div>
            </div>
            <div
              style="min-height: 300px;margin-bottom: 20px;padding: 20px 0px 20px 0px;text-align: center"
              v-else
            >
              <font style="font-size: 30px;color:#dddddd ">
                <b>(￢_￢) 没有一个粉丝</b>
              </font>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane
          :label="'关注 ' + $page.users.followings.length"
          name="following"
          style="padding: 5px"
        >
          <div>
            <div v-if="$page.users.followings.length">
              <el-row style="min-height: 200px; ">
                <el-col
                  :span="8"
                  v-for="(noticer, index) in $page.users.followings"
                  :key="'following' + index"
                  style="padding: 10px"
                >
                  <el-card
                    shadow="hover"
                    style="font-size: 13px;color: #606266;line-height: 20px"
                  >
                    <i class="el-icon-star-off"></i>&emsp;
                    <a
                      @click="$router.push(`/social/detail/${noticer.id}`)"
                      style=" text-decoration:none;cursor:pointer"
                      >{{ noticer.username }}</a
                    >
                    <br />
                    <i class="el-icon-message"></i>&emsp;
                    <a
                      :href="`https://github.com/${noticer.username}`"
                      target="_blank"
                      style=" text-decoration:none;cursor:pointer"
                      >TA的主页</a
                    >
                    <br />
                    <img
                      :src="
                        noticer.avatar &&
                          `${GRIDSOME_API_URL}${noticer.avatar.url}`
                      "
                      style="width: 100%;border-radius:5px;margin-top: 5px"
                    />
                  </el-card>
                </el-col>
              </el-row>
              <div style="text-align: center;margin-top: 10px">
                <!-- <el-pagination
                  @current-change="onSelect"
                  background
                  layout="prev, pager, next"
                  :current-page.sync="following.query.page"
                  :page-size="following.query.pageSize"
                  :total="following.query.pageNumber * following.query.pageSize"
                >
                </el-pagination> -->
              </div>
            </div>
            <div
              style="min-height: 300px;margin-bottom: 20px;padding: 20px 0px 20px 0px;text-align: center"
              v-else
            >
              <font style="font-size: 30px;color:#dddddd ">
                <b>(￢_￢) 还没有关注一个人</b>
              </font>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </Layout>
</template>
<page-query>
query{
  users:strapiUser(id:1){
    followeds{
      id
      username
      avatar{
        url
      }
      blog_link
    }
    followings{
      id
      username
      avatar{
        url
      }
      blog_link
    }
  }
}
</page-query>
<script>
export default {
  data() {
    return {
      activeTab: 'followers',
      followers: {
        query: {
          page: 1,
          pageSize: 9,
          pageNumber: 1,
        },
        loading: false,
        list: [],
      },
      following: {
        query: {
          page: 1,
          pageSize: 9,
          pageNumber: 1,
        },
        loading: false,
        list: [],
      },
    }
  },
  mounted() {
    this.onSelect()
  },
  methods: {
    onSelect() {
      switch (this.activeTab) {
        case 'followers':
          this.listFollowers()
          break
        case 'following':
          this.listFollowing()
          break
        default:
          break
      }
    },
    listFollowers() {
      // this.followers.loading = true
      // UserApi.followers(this.followers.query).then((response) => {
      //     let result = response.data
      //     let pageNumber = this.$util.parseHeaders(response.headers)
      //     if (pageNumber) {
      //         this.followers.query.pageNumber = pageNumber
      //     }
      //     this.followers.list = []
      //     for (let i = 0; i < result.length; i++) {
      //         let data = {}
      //         data.name = result[i]['login']
      //         data.avatarUrl = result[i]['avatar_url']
      //         data.htmlUrl = result[i]['html_url']
      //         this.followers.list.push(data)
      //     }
      // }).then(() => this.followers.loading = false)
    },
    listFollowing() {
      // this.following.loading = true
      // UserApi.following(this.following.query).then((response) => {
      //     let result = response.data
      //     let pageNumber = this.$util.parseHeaders(response.headers)
      //     if (pageNumber) {
      //         this.following.query.pageNumber = pageNumber
      //     }
      //     this.following.list = []
      //     for (let i = 0; i < result.length; i++) {
      //         let data = {}
      //         data.name = result[i]['login']
      //         data.avatarUrl = result[i]['avatar_url']
      //         data.htmlUrl = result[i]['html_url']
      //         this.following.list.push(data)
      //     }
      // }).then(() => this.following.loading = false)
    },
  },
}
</script>
