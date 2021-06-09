module.exports = {
  devServer: {
    proxy: {
      '/api/blogs': {
        target: 'http://106.75.18.179:1337',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
      '/api/auth': {
        target: 'http://106.75.18.179:1337',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
}
