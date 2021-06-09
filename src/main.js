// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import '~/assets/css/index.css'
import util from './utils/util'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vuex from 'vuex'
import axios from 'axios'

export default function(Vue, { router, head, isClient, appOptions }) {
  // Set default layout as a global component
  Vue.prototype.$utils = util
  Vue.component('Layout', DefaultLayout)
  Vue.use(ElementUI)
  Vue.use(Vuex)

  Vue.mixin({
    data() {
      return {
        GRIDSOME_API_URL: process.env.GRIDSOME_API_URL,
      }
    },
  })

  Vue.prototype.$share = function(message) {
    if (!message) {
      message = window.location
    } else {
      message = window.location.origin + message
    }

    if (util.copy(message)) {
      Vue.prototype.$confirm('链接已复制,去分享给好友吧!!', '分享', {
        showCancelButton: false,
        showClose: false,
        type: 'success',
      })
    } else {
      Vue.prototype.$confirm('链接复制失败,可能因为浏览器不兼容', '分享', {
        showCancelButton: false,
        showClose: false,
        type: 'warning',
      })
    }
  }

  appOptions.store = new Vuex.Store({
    state: {
      token: isClient ? window.sessionStorage.jwtToken || '' : '',
    },
    getters: {
      getToken(state) {
        return state.token
      },
    },
    mutations: {
      changeToken(state, token) {
        isClient && window.sessionStorage.setItem('jwtToken', token)
        state.token = token
      },
    },
    actions: {
      loginGetToken({ commit }, user) {
        return axios
          .post(this.GRIDSOME_API_URL + '/api/auth/local', user)
          .then((response) => {
            // Handle success.
            console.log('Well done!')
            console.log('User profile', response.data.user)
            console.log('User token', response.data.jwt)
            commit('changeToken', response.data.jwt)
          })
          .catch((error) => {
            // Handle error.
            console.log('An error occurred:', error.response)
          })
      },
    },
  })
}
