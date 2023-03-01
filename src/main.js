import {
  createApp
} from 'vue'
import microApp from '@micro-zoe/micro-app'
import {
  createPinia
} from 'pinia'
import App from './App.vue'
import 'unidev-micro-core/style/global.less'
// import 'unidev-micro-core/appBaseConfig/global-params'
import {testparams} from 'unidev-micro-core/appBaseConfig/test-params'
import {workparams} from 'unidev-micro-core/appBaseConfig/work-params'
window.STATIC_PARAMS = document.domain.indexOf('test') === -1 ? workparams : testparams
import router from 'unidev-micro-core/router'
import routerIntercept from './permission'
import uppcv from '@up/uppcv_libs_basic'
import "@/assets/imgs";
import {
  SvgIcon
} from "unidev-micro-core/components";
// 引入组件库样式
import '@up/uppcv_libs_basic/dist/uppcv_libs_basic.css'
window.contextPath = process.env.BASE_URL

microApp.start({
  'disable-memory-router': 'true',
  // 预加载的子应用
  // preFetchApps: [
  //   { name: 'my-app', url: 'http://localhost:8087/micro/child/' },
  //   { name: 'approval', url: 'http://localhost:8088/micro/secondchild/' }
  // ],
  plugins: {
    global: [{
      scopeProperties: ['we'], // 可选
      // escapeProperties: ['childname'], // 可选
      // excludeChecker: (url) => ['/foo.js', '/bar.css'].some(item => url.includes(item)), // 可选
      // options: 配置项, // 可选
      // loader(code, url, options, info) { // 可选
      //   console.log('全局插件')
      //   return code
      // },
      // processHtml(code, url, options, info) { // 可选
      //   console.log('每个子应用 HTML 都会传入')
      //   return code
      // },
    }],
  }
})
let app = null
routerIntercept(router)
app = createApp(App)

microApp.router.setBaseAppRouter(router)
// console.log('microApp.router.setBaseAppRouter(router)',JSON.parse(JSON.stringify(router.options.routes)));
app.component("svg-icon", SvgIcon);
app.use(createPinia())
app
  .use(uppcv)
  .use(router)
  .mount('#app')
