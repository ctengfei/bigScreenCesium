const { defineConfig } = require('@vue/cli-service')
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = defineConfig({
  transpileDependencies: true
})

const BASE_URL = process.env.NODE_ENV === 'production' ? '/bigScreen/' : './';
module.exports = {
  lintOnSave:false, // 修改成false 就是不检查了
  publicPath: BASE_URL,
  //outputDir: 'wygq-dp', //设置打包后的项目目录名称
  productionSourceMap: false,
  chainWebpack: config => {
      config
      .plugin('html')
      .tap(args => {
          args[0].title = '数字孪生王英水库综合监管平台'
          return args
      })
      // .cur文件处理器
    // config.module
    // .rule('url-loader')
    // .test(/\.(cur)$/)
    // .use('url-loader')
    // .loader('url-loader')
    // .end()

  },
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin([
          { from: 'node_modules/@liveqing/liveplayer/dist/component/crossdomain.xml'},
          { from: 'node_modules/@liveqing/liveplayer/dist/component/liveplayer.swf'},
          { from: 'node_modules/@liveqing/liveplayer/dist/component/liveplayer-lib.min.js', to: 'js/'},
      ])
    ]
  }
}