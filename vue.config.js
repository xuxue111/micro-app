const { defineConfig } = require('@vue/cli-service')
const packageName = require('./package.json').name
const path = require('path')
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
function resolve (dir) {
  return path.join(__dirname, dir)
}

let pages = {}

if(process.env.npm_config_header) {
  console.log('打包header :>> ')

  pages = {
    header: './src/globalComponents/header'
  }
  module.exports = defineConfig({
    pages,
    chainWebpack: (config) => {
      config.resolve.symlinks(true) // 修复热更新失效
      config.resolve.alias
        .set('@', resolve('src'))
        .set('@assets', resolve('src/assets'))
        .set('@components', resolve('src/components'))
        .set('@views', resolve('src/views'))
        .set('@store', resolve('src/store'))
        // 关闭预加载
      config.plugins.delete('prefetch')
      Object.keys(pages).forEach((page) => {
        config.plugins.delete(`prefetch-${page}`)
        config.plugins.delete(`preload-${page}`)
      })
      config.optimization.minimizer('terser').tap((args) => {
        args[0].terserOptions.output = {
          comments: false
        }
        args[0].extractComments = false
        return args
      })
      // svg图标处理
      config.module.rules.delete('svg')
      config.module
        .rule('svg-sprite-loader')
        .test(/\.svg$/)
        .include
        .add(resolve('src/assets/imgs')) // 处理svg目录
        .end()
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({
          symbolId: 'icon-[name]'
        })
        config.module
        .rule('vue')
        .use('vue-loader')
        .tap(options => {
          options.compilerOptions = {
            ...(options.compilerOptions || {}),
            isCustomElement: (tag) => /^micro-app/.test(tag),
          };
          return options
        })
    },
    configureWebpack: {
      // 不打到包里的CDN文件
        externals: [],
        output: {
        // libraryTarget: 'window',
          filename: (pathData) => {
            return pathData.chunk.name === 'header' ? '[name].js' : 'js/[name].js'
          }
        },
        plugins: [
        ]
      },
      css: {
        loaderOptions: {
          // 给 less-loader 传递 Less.js 相关选项
          less: {
            lessOptions: {
              // `globalVars` 定义全局对象，可加入全局变量
              globalVars: {
                primary: '#333'
              },
              javascriptEnabled: true
            }
          }
        }
      },
    pluginOptions: {
      'style-resources-loader': {
        preProcessor: 'less',
        patterns: [resolve( 'src/assets/less/variable.less')]
      }
    },
    transpileDependencies: true,
    productionSourceMap: !IS_PROD,
    publicPath: `./`,
    outputDir:'dist/header',
    assetsDir: undefined,
    parallel: undefined,
    runtimeCompiler: undefined // 是否使用包含运行时编译器的 Vue 构建版本
  })

}else{
  pages = {
    index: {
      template: 'public/index.html',
      entry: 'src/main.js'
    }
  }
  module.exports = defineConfig({
    pages,
    chainWebpack: (config) => {
      config.resolve.symlinks(true) // 修复热更新失效
      config.resolve.alias
        .set('@', resolve('src'))
        .set('@assets', resolve('src/assets'))
        .set('@components', resolve('src/components'))
        .set('@views', resolve('src/views'))
        .set('@store', resolve('src/store'))
      config.optimization.minimizer('terser').tap((args) => {
        args[0].terserOptions.output = {
          comments: false
        }
        args[0].extractComments = false
        return args
      })
      // svg图标处理
      config.module.rules.delete('svg')
      config.module
        .rule('svg-sprite-loader')
        .test(/\.svg$/)
        .include
        .add(resolve('src/assets/imgs')) // 处理svg目录
        .end()
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({
          symbolId: 'icon-[name]'
        })
        config.module
        .rule('vue')
        .use('vue-loader')
        .tap(options => {
          options.compilerOptions = {
            ...(options.compilerOptions || {}),
            isCustomElement: (tag) => /^micro-app/.test(tag),
          };
          return options
        })
    },
    configureWebpack: (config) => {
      if (process.env.NODE_ENV === 'production') { // 为生产环境修改配置...
        config.mode = 'production'
        config.performance = { // 打包文件大小配置
          maxEntrypointSize: 10000000,
          maxAssetSize: 30000000
        }
      }
    },
    css: {
      loaderOptions: {
        // 给 less-loader 传递 Less.js 相关选项
        less: {
          lessOptions: {
            // `globalVars` 定义全局对象，可加入全局变量
            globalVars: {
              primary: '#333'
            },
            javascriptEnabled: true
          }
        }
      }
    },
    pluginOptions: {
      'style-resources-loader': {
        preProcessor: 'less',
        patterns: [resolve( 'src/assets/less/variable.less')]
      }
    },
    transpileDependencies: true,
    productionSourceMap: true,
    
    publicPath: `/ycb/${packageName}/`,
    outputDir:undefined,
    assetsDir: undefined,
    parallel: undefined,
    runtimeCompiler: undefined // 是否使用包含运行时编译器的 Vue 构建版本
  })
}

module.exports.devServer = {
    port: 8001,
    host: 'localhost',
    // 配置允许跨域
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Method': 'GET,POST,PUT,OPTIONS'
    },
    proxy: {
      '/api-gateway/app/permission': {
        target: 'http://192.168.10.55:3000/mock/1582',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api-gateway': ''
        }
      },
      '/api-websocket/common-ucenter-server': {
        target: 'https://jpaasdev2.hanweb.com',
        ws: true,
        changeOrigin: true
        // pathRewrite: {
        //   '^/api-websocket': ''
        // }
      },
      '/api-gateway': {
        target: 'https://jpaasdev2.hanweb.com',
        ws: false,
        changeOrigin: true
        // pathRewrite: {
        //   '^/api-gateway': ''
        // }
      },
      '/ucenter_files': {
        target: 'https://jpaasdev2.hanweb.com',
        ws: false,
        changeOrigin: true
      },
      '/workflow_files': {
        target: 'https://jpaasdev2.hanweb.com',
        ws: false,
        changeOrigin: true
      }
    }
  }

