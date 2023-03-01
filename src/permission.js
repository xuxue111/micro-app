import BasicLayout from '@/layout/BasicLayouts.vue'
import hello from '@/views/HelloWorld.vue'
import about from '@/views/about.vue'
import {
  useTitle
} from '@vueuse/core'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
// import {
//   forward
// } from './forward'
import {
  globalStore
} from 'unidev-micro-core/store/global'
// import Cookies from 'js-cookie'
// 获取子应用信息
let apps = [{
    name: '子应用1',
    appcode: 'we',
  },
  {
    name: '子应用2',
    appcode: 'secondchild',
  },
  {
    name: '子应用3',
    appcode: 'react',
  }
]
NProgress.configure({
  showSpinner: false
})
// const whiteList = ['login','loginreload'] // 白名单
// 终止前一页的请求
function cancelRequest() {
  globalStore().requestCancels.forEach(cancel => {
    cancel && cancel()
  })
  globalStore().requestCancels = []
}
export default function (router) {
  // 添加路由
  router.addRoute({
    name: 'index',
    path: '/',
    component: BasicLayout,
    redirect: '/portalhome',
    meta: {
      title: '首页'
    }
  })
  router.addRoute(
    'index', {
      name: 'portalhome',
      path: '/portalhome',
      component: hello,
      meta: {
        title: '首页'
      }
    }
  )
  apps.map(item => {
    router.addRoute(
      'index', {
        name: item.name,
        path: `/${item.appcode}/:page*`,
        meta:{title:item.name},
        component: about,
        hidden: true
      }
    )
  })
  // 前置守卫
  router.beforeEach((to, from, next) => {
    NProgress.start()
    if (to.path === from.path) {
      next();
      return;
    }
    if (from.fullPath.startsWith('/')) {
      //micro-app -修改回退失效
      if (window.history.state) {
        window.history.state.current = from.fullPath;
      }
    }
    // 解决子应用是vue-router3 与 vue-router4冲突
    if (!history ?.state ?.current) {
      Object.assign(history.state, {
        current: from.fullPath
      });
    }
    cancelRequest() // 终止进行中的请求
    to.meta && (typeof to.meta.title !== 'undefined' && useTitle(to.meta.title)) // 设置网页标题
    let accessToken = globalStore().loginToken
    // const isLogin = Cookies.get('isLogin') || false
    if (accessToken === null && localStorage.getItem('LOGIN_TOKEN')) {
      accessToken = localStorage.getItem('LOGIN_TOKEN')
      if (accessToken) {
        globalStore().SET_LOGIN_TOKEN(accessToken)
      }
    }
    // 本地调试关闭路由守卫
     next()
    // if (whiteList.includes(to.name)) {
    //   // 在免登录白名单，直接进入
    //   next()
    // } else if (accessToken) {
    //   if (isLogin) {
    //     if (to.fullPath === '/login-merchant') {
    //       next()
    //     } else {
    //       forward(to, from, next)
    //     }
    //   } else {
    //     const loginPath = {
    //       path: '/user/login',
    //       name: 'login'
    //     }
    //     if (to.fullPath !== '/') {
    //       loginPath.query = {
    //         redirect: to.fullPath
    //       }
    //     }
    //     next(loginPath)
    //   }
    // } else {
    //   const loginPath = {
    //     path: '/user/login',
    //     name: 'login'
    //   }
    //   if (to.fullPath !== '/') {
    //     loginPath.query = {
    //       redirect: to.fullPath
    //     }
    //   }
    //   next(loginPath)
    // }
  })
  // 后置守卫
  router.afterEach(() => {
    NProgress.done()
  })
}