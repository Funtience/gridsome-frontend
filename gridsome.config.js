// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Gridsome',
  plugins: [
    {
      use: '@gridsome/source-strapi',
      options: {
        apiURL: process.env.GRIDSOME_API_URL,
        queryLimit: 1000, // Defaults to 100
        contentTypes: ['blog', 'project', 'user'],
        // typeName:'Strapi'
        singleTypes: ['general'],
        // Possibility to login with a Strapi user,
        // when content types are not publicly available (optional).
        loginData: {
          identifier: '769558413@qq.com',
          password: 'Pxf769558413',
        },
      },
    },
  ],
  templates: {
    StrapiBlog: [
      {
        name: 'blog',
        path: '/blog/detail/:id',
        component: './src/templates/Blog.vue',
      },
    ],
    StrapiProject: [
      {
        path: '/project/detail/:id',
        component: './src/templates/Project.vue',
      },
    ],
    StrapiUser: [
      {
        path: '/social/detail/:id',
        component: './src/templates/Fans.vue',
      },
    ],
  },
}
