const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭eslint语法检测
  lintOnSave: false,
  // webpack的配置项
  devServer: {
    // 使项目自动在浏览器打开
    host: 'localhost',
    open: true,
    // 代理跨域
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
        // pathRewrite: {'^/api:': ''}
      }
    }
  }
})
