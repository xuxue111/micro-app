import {
  globalStore
} from 'unidev-micro-core/store/global'
import {
  useTitle
} from '@vueuse/core'
import {
  notification
} from '@up/uppcv_libs_basic'
import router from 'unidev-micro-core/router'
// 路由跳转
async function forward(to, from, next) {
  if (to.matched.length === 0) { // 未匹配到路由
    useTitle('无法找到页面')
    window.location.href = '/exception/404'
    next(false)
  } else {
    globalStore().getUserInfo({
      token: localStorage.getItem('LOGIN_TOKEN')
    }).then(() => {
      next()
    }).catch(err =>{
      notification.error({
        message: '错误',
        description: '请求用户信息失败，请重试'
      })
      globalStore()
      .ycblogout()
      .then(() => {
        router.push("/user/login");
      });
      console.log(err);
    })
  }
}

// 获取用户信息
// async function getUserInfo (next) {
//   return new Promise((resolve) => {
//     userStore().GetInfo().then(() => {
//       next()
//       resolve()
//     })
//   }).catch((error) => {
//     console.error(error)
//     next({ path: '/user/login' })
//   })
// }

export {
  forward
}