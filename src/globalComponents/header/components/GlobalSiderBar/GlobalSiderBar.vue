<script setup>
// import { throttle } from 'lodash'
// import IconCustomer from '../assets/svg/customer.svg?inline'
// import IconMyCase from '../assets/svg/my-case.svg?inline'
// import IconMyPrepare from '../assets/svg/my-prepare.svg?inline'
// import IconMyWaitCase from '../assets/svg/my-wait-case.svg?inline'
// import Iconmyworked from '../assets/svg/my-worked.svg?inline'
// import IconDrift from '../assets/svg/drift.svg?inline'
// import IconNewuse from '../assets/svg/newuse.svg?inline'
// import IconTop from '../assets/svg/top.svg?inline'
// import IconHomeClose from '../assets/svg/homeclose.svg?inline'
// import { InfoAPI } from '@/api'
// import { SERVICE_TYPE } from '@/config'
// import { mapGetters, mapState } from 'vuex'
import { onMounted, watchEffect,reactive,ref,defineEmits } from 'vue';

const mouseObj = reactive({
  doThing: '',
  commission: '',
  draft: '',
  common: '',
  survey: '',
  smart: ''
})
const approveCount = ref(0)
const showDrift = ref(true)
const mouseenter = (key)=> {
  mouseObj.doThing = ''
  mouseObj.commission = ''
  mouseObj.draft = ''
  mouseObj.common = ''
  mouseObj.smart = ''
  mouseObj[key] = 'enter'
}
const mouseleave = (key)=> {
  mouseObj[key] = ''
}
const getApproveCount = ()=> {
  // const params = {
  //   webId: window.STATIC_PARAMS.WEB_ID,
  //   auth: this.userInfo?.insRoles,
  //   instCode: this.userInfo?.instCode,
  //   token: this.$l_store.get('LOGIN_TOKEN')
  // }
  // InfoAPI.findApproveCount(params).then(res => {
  //   if (res.success) {
  //     approveCount.value = res.data?.unHandleCount || 0
  //   } else {
  //     approveCount.value = 0
  //   }
  // })
}
const homeClose = ()=>{
  showDrift.value = false
}
const homeOpen = ()=>{
  showDrift.value = true
}
const intoUserCenterManager = (listType, flag)=>{
  if (flag) {
    if (flag === 'drift') {
      window.location.href = '/we/home'
      // window.location.href = 'https://portal.unionpay.com/sso/login'
      // window.location.href = '/user-center-my-draft'
    } else if (flag === 'prepare') {
      window.location.href = '/user-center-my-nearly'
    }
  } else {
    window.location.href = '/user-center-my-todo'
  }
}
const intoSurvey = ()=> {
  // 预发布
  // window.open('/ycb/pcweb/wjdc/QB/index.html')
  // 生产
  window.open('/ycb/pcweb/dywj/QB/index.html')
}
const emit = defineEmits(['changeStatus'])
const openCustomer = ()=> {
  // this.$emit('changeStatus', true)
  if (window.location.href.indexOf('one-things-step') !== -1 && this.getIsInfoRobot === 'yes') {
    window.open(window.STATIC_PARAMS.ZNKF_URL2)
  } else {
    // this.$emit('changeStatus', true)
    emit('changeStatus', true)
  }
}
watchEffect(()=>{
  // if(true){
    getApproveCount()
  // } else {
    approveCount.value = 0
  // }
})
onMounted(()=>{
  window.onscroll = function () { scrollFunction() }
  function scrollFunction () {
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
      document.getElementById('myBtn').style.display = 'flex'
    } else { document.getElementById('myBtn').style.display = 'none' }
  }

  // function topFunction () { document.body.scrollTop = 0; document.documentElement.scrollTop = 0 }
})
</script>

<template>
  <div>
    <div class="leftImg" @click="homeClose" v-if="showDrift">
      <img style="width:8px;height:12px;margin-top:14px;margin-left:5px" src="@/assets/png/homeopen.png">
    </div>
    <transition>
      <div class="drift" :class="showDrift?'openDrift':'closeDrift'" id="drift" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <div class="mores">
          <a
              @mouseenter="mouseenter('doThing')"
              @mouseleave="mouseleave('doThing')"
              style="display: flex;flex-flow: column;align-items: center;justify-content: center"
              target="_self"
              @click="intoUserCenterManager('1','prepare')"
              class="activeClass">
            <!--            <span>-->
            <!--              <a-icon :component="IconMyWaitCase" :style="{'font-size':'24px'}"></a-icon>-->
            <!--            </span>-->
            <img v-show="!mouseObj.doThing" style="width: 24px; height: 24px" src="@/assets/png/banjian_b.png" alt="">
            <img v-show="mouseObj.doThing" style="width: 24px; height: 24px" src="@/assets/png/banjian_w.png" alt="">
            <span class="backTopTit" :style="{color: mouseObj.doThing!=='enter'?'#666':'white'}">我的办件</span>
          </a>
          <a
              @mouseenter="mouseenter('commission')"
              @mouseleave="mouseleave('commission')"
              style="display: flex;flex-flow: column;align-items: center;justify-content: center"
              target="_self"
              @click="intoUserCenterManager('1')"
              class="activeClass">
            <img v-show="!mouseObj.commission" style="width: 24px; height: 24px" src="@/assets/png/daiban_b.png" alt="">
            <img v-show="mouseObj.commission" style="width: 24px; height: 24px" src="@/assets/png/daiban_w.png" alt="">
            <span class="backTopTit" :style="{color: mouseObj.commission!=='enter'?'#666':'white'}">我的待办</span>
          </a>
          <a
              @mouseenter="mouseenter('draft')"
              @mouseleave="mouseleave('draft')"
              style="display: flex;flex-flow: column;align-items: center;justify-content: center"
              @click="intoUserCenterManager('2','drift')"
              class="activeClass">
            <img v-show="!mouseObj.draft" style="width: 24px; height: 24px" src="@/assets/png/caogao_b.png" alt="">
            <img v-show="mouseObj.draft" style="width: 24px; height: 24px" src="@/assets/png/caogao_w.png" alt="">
            <span class="backTopTit" :style="{color: mouseObj.draft!=='enter'?'#666':'white'}">办件草稿</span>
          </a>
          <a
              @mouseenter="mouseenter('common')"
              @mouseleave="mouseleave('common')"
              style="display: flex;flex-flow: column;align-items: center;justify-content: center"
              @click="newUse()"
              class="activeClass">
            <img v-show="!mouseObj.common" style="width: 24px; height: 24px" src="@/assets/png/changyong_b.png" alt="">
            <img v-show="mouseObj.common" style="width: 24px; height: 24px" src="@/assets/png/changyong_w.png" alt="">
            <span class="backTopTit" :style="{color: mouseObj.common!=='enter'?'#666':'white'}">常用服务</span>
          </a>
          <a
              @mouseenter="mouseenter('survey')"
              @mouseleave="mouseleave('survey')"
              style="display: flex;flex-flow: column;align-items: center;justify-content: center"
              @click="intoSurvey"
              class="activeClass">
            <img v-show="!mouseObj.survey" style="width: 24px; height: 24px" src="@/assets/png/diaoyan_b.png" alt="">
            <img v-show="mouseObj.survey" style="width: 24px; height: 24px" src="@/assets/png/diaoyan_w.png" alt="">
            <span class="backTopTit" :style="{color: mouseObj.survey!=='enter'?'#666':'white'}">调研问卷</span>
          </a>
          <a
              @mouseenter="mouseenter('smart')"
              @mouseleave="mouseleave('smart')"
              style="display: flex;flex-flow: column;align-items: center;justify-content: center"
              @click="openCustomer"
              class="activeClass">
            <img v-show="!mouseObj.smart" style="width: 24px; height: 24px" src="@/assets/png/kefu_b.png" alt="">
            <img v-show="mouseObj.smart" style="width: 24px; height: 24px" src="@/assets/png/kefu_w.png" alt="">
            <span class="backTopTit" :style="{color: mouseObj.smart!=='enter'?'#666':'white'}">智能客服</span>
          </a>
          <span class="back-top-box" id="myBtn">
            <!--            <button onclick="topFunction()" id="myBtn" class="myBtn" title="返回顶部" style="display: block;"><img src="/cms_files/filemanager/1708704992/picture/20228/bcb1144d2f4d4461a383f4ad82314468.png"></button>-->
            <a-back-top style="position: relative; bottom: auto; right: auto;">
              <img style="width: 18px; height: 15px" src="@/assets/png/zhiding.png">
              <!--              <div class="ant-back-top-inner">-->
              <!--                <a-icon :component="IconTop" :style="{'font-size':'24px',padding:'10px 10px 0 10px'}"></a-icon>-->
              <!--                <span class="backTopTit">置顶</span>-->
              <!--              </div>-->
            </a-back-top>
          </span>
        </div>
      </div>
    </transition>
    <div @click="homeOpen" class="openIcon" :style="{display:showDrift?'none':'block'}">
      <img style="width:8px;height:12px;transform:rotate(180deg);margin-top:14px;margin-left:5px" src="@/assets/png/homeopen.png">
    </div>
  </div>
</template>

<style scoped lang="less">
.leftImg {
  width:18px;
  height:40px;
  background: #FFFFFF;
  box-shadow: 0 2px 10px 0 rgba(153,153,153,0.30);
  cursor: pointer;
  position: fixed;
  right: 70px;
  z-index: 999;
  top: calc(48%);
}
.closeDrift {
  transform:translate(70px,-50%);
  transition: all 0.1s;
}
.openDrift {
  transform: translate(0,-50%);
}
.iconOpenDrift {
  transform:translate(-70px,-50%);
  transition: all 0.1s;
}
.openIcon {
  width:18px;
  height:40px;
  background: #FFFFFF;
  box-shadow: 0 2px 10px 0 rgba(153,153,153,0.30);
  cursor: pointer;
  z-index: 999;
  position: fixed;
  right: -2px;
  top: calc(50% - 20px);
}
.drift {
  position: fixed;
  right: 0%;
  top: 50%;
  height: 420px;
  z-index: 1;
  .mores{
    background-color: #fff;
    background-clip: padding-box;
    border: 0;
    box-shadow: 0 4px 12px rgba(0,0,0,.2);
    pointer-events: auto;
    width: 70px;
    em{
      display: block;
      width: 24px;
      height: 24px;
      margin: 0 auto;
      background-size: 24px;
    }
    a{
      display: block;
      width: 70px;
      height: 70px;
    }
    .back-top-box{
      //width: 70px;
      //// height: 60px;
      //padding-left: 15px;
      width: 70px;
      height: 25px;
      border: none;
      //background: #C4D6EA;
      background-color: #C4D6EA;
      transition: all 0.2s ease-out 0s;
      display: none;
    }
  }
  span{
    display: inline-block;
    width: 100%;
    color: #333333;
    text-align: center;
    display: flex;
    justify-content: center;
  }
  img {
    display: block;
    //border-radius: 50%;
    transition: box-shadow 0.3s ease;
    margin: 5px 10px 10px 10px;
    //&:hover {
    //  box-shadow: 3px 4px 5px 0 #e8e8e8;
    //  transition: box-shadow 0.3s ease;
    //}
  }

  .a {
    color: #000;
    &:hover {
      color: #fff;
    }
  }
  .activeClass{
    cursor: pointer;
    font-size: 12px;
    .anticon{
      padding-top: 15px;
    }
    .span{
      color:#333333;
    }
    //&:hover{
    //  span,svg{
    //    color: #333;
    //  }
    //  background-color: #E7F1FF;
    //};
  }
  .activeClass:hover{
    background-color: #0062D0;
    color: white;
  }
  /deep/.ant-badge-count, .ant-badge-dot, .ant-badge .ant-scroll-number-custom-component{
    top: 15px !important;
    right: 17px !important;
  }
  .backTopTit{
    display: block;
    font-size: 14px;
    color: #666666;
    letter-spacing: 0;
    text-align: center;
    font-weight: 400;
    //margin-top: 8px;
  }
}
</style>
