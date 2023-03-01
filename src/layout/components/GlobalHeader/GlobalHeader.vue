<template>
  <div :style="{marginBottom:'64px'}" id="appHeader">
    <div :class="{'header-wrap':true,boxShow:true}">
      <div class="header">
        <div class="nav-list mainNavFont">
          <!-- 顶部导航 -->
          <div class="navBox" > <span class="nav-title" @click="gotohome">首页</span></div>
          <div :class="{navBox:true,currentNav:index===currentIndex}" v-for="(item,index) in navList" :key="index" @click="currentIndex = index">
            <span class="nav-title">
              <span @click="gotomicro(item)">{{ item.name }}</span>
            </span>
          </div>
        </div>
        <div class="login-tips " style="text-align:center">
          <!-- 登陆信息 -->
          <button @click="logout">退出</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref,reactive,getCurrentInstance} from 'vue'
import { globalStore } from 'unidev-micro-core/store/global'
import router from 'unidev-micro-core/router'
const currentIndex = ref(0)
const navList = reactive([
        {
          name: '子应用1',
          appcode: 'child',
           baseurl:'/micro/child/'
        },
        {
          name: '子应用2',
          appcode: 'secondchild',
          baseurl:'/micro/secondchild/'

        },
        {
          name: '商户入网平台',
          path: '/help',
          disabled: true
        },
        {
          name: '产品介绍',
          path: '/product',
          disabled: true
        },
        {
          name: '信息动态',
          path: '/info',
          disabled: true
        },
        {
          name: '帮助中心',
          path: '/helpcenter',
          disabled: true
        }
      ])
function gotomicro(val) {
   if(val.name === '子应用1'){
          window.location.href = `/ycb/front/we/`
      }
}
function gotohome() {
    router.push('/')
}
function logout() {
  globalStore()
    .ycblogout()
    .then(() => {
      router.push("/user/login");
    });
}
const vm =  getCurrentInstance()
currentIndex.value = navList.findIndex(item => item.path === vm.proxy.$root.$route?.path)

</script>

<style lang="less" scoped>
.login-tips{
      height: 40px;
    text-align: center;
    line-height: 40px;
    color: #000;
}
.checkall{
  font-size: 16px;
  color: #0062d0;
  border-bottom: 1px solid #eee;
}
.popoverTitle{
  color: #0062d0;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 40px;
}
.boxShow{
  box-shadow: 0 2px 10px 0 #ccc;
}
.el-header{
height: auto!important;
min-height: 64px;
    padding: 0;

    color: #333;
    text-align: center;
}

.header-wrap{
      background-color: #fff;
    z-index: 100;
    width: 100%;
    height: 64px;
    top: 0;
    left: 0;
    position: fixed;
    font-family: Microsoft Yahei;
    .header{
      position: relative;
      overflow: hidden;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      margin: 0 auto;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      width: 1200px;
      height: 64px;
      background-color: #fff;
     .logo-wrap{
       width: 301px;
      // font-size: 64px;
     }
     .login-tips{
       cursor: pointer;
       .login-btn {
 display: inline-block;
 height: 40px;
 line-height: 40px;
    user-select: none;
    cursor: pointer;
    color: #fff;
    width: 73px;

    background-position: 50%;
    background-repeat: no-repeat;
}
     }
     .nav-list{
           position: relative;
    -webkit-box-flex: 3;
    -ms-flex: 3;
    flex: 3;
    height: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    text-align: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    .currentNav{
          color: #0062d0;
    position: relative;
    border-bottom: 4px solid #0062d0;
    }
    .navBox{
      margin-left: 60px;
    height: 100%;
    line-height: 64px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    cursor: pointer;

    .nav-title{
      height: 100%;
    color: #232323;
     font-size: 18px;
    display: inline-block;
    letter-spacing: .26px;

    }
    }
     }
    }
}
</style>
