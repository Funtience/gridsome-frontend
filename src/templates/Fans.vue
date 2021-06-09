<template>
  <Layout>
    <div>
      <el-card shadow="never" style="min-height: 400px;margin-bottom: 20px;">
        <div slot="header" class="clearfix">
          <span>{{ $page.user.username }}</span>
          <el-button
            @click="$router.go(-1)"
            style="float: right; padding: 3px 0"
            type="text"
            icon="el-icon-d-arrow-left"
            >返回</el-button
          >
        </div>
        <el-row>
          <el-col :span="9" style="padding: 0px 10px 20px 0px">
            <img
              :src="
                $page.user.avatar &&
                  `${GRIDSOME_API_URL}${$page.user.avatar.url}`
              "
              style="width: 100%;border-radius:5px;"
            />
            <div style="padding: 10px">
              <font style="font-size: 26px;line-height: 40px;font-weight: 600"
                >{{ $page.user.username }}
                <br />
              </font>
              <font
                style="font-size: 20px;font-style: normal;font-weight: 300;line-height: 35px;color: #666;"
                >{{ $page.user.username }}
                <br />
              </font>
              <font
                style="font-size: 14px;line-height: 20px;color:#606266;"
                v-if="$page.user.location"
              >
                <i class="el-icon-location-outline"></i>&nbsp;&nbsp;{{
                  $page.user.location
                }}
                <br />
              </font>
              <font
                style="font-size: 14px;line-height: 20px;color:#606266;"
                v-if="$page.user.email"
              >
                <i class="el-icon-message"></i>&nbsp;&nbsp;{{
                  $page.user.email
                }}
                <br />
              </font>
              <font
                style="font-size: 14px;color:#606266;"
                v-if="$page.user.blog_link"
              >
                <i class="el-icon-edit-outline"></i>&nbsp;&nbsp;
                <a
                  :href="$utils.addHttp($page.user.blog_link)"
                  target="_blank"
                  >{{ $page.user.blog_link }}</a
                >
                <br />
              </font>
            </div>
          </el-col>
          <el-col :span="15" style="padding: 0px 20px 20px 10px">
            <div
              style="width: 100%;min-height: 300px; border-radius:5px; border: 1px solid #EBEEF5;padding: 10px;font-size: 16px;
                    color: #6a737d;"
              v-if="$page.user.bio"
            >
              {{ $page.user.bio }}
            </div>
            <div
              style="width: 100%;min-height: 300px; border-radius:5px; border: 1px solid #EBEEF5;padding: 30px;text-align: center;
                    font-size: 30px;color:#dddddd"
              v-else
            >
              <b>◔ ‸◔？没有简介</b>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </Layout>
</template>
<page-query>
query($id:ID!){
  user:strapiUser(id:$id){
    username
    avatar{
        url
    }
    bio
    email
    blog_link
  }
}
</page-query>
<script>
export default {
  name: 'SocialDetail',
}
</script>

<style></style>
