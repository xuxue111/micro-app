<template>
  <div class="header-wrap">
    <div class="header">
      <!-- 头部 中国银联图标 -->
      <div class="logo-wrap">
        <svg-icon
          icon-class="logo"
          class-name="logo"
          @click="clickSvg"
        ></svg-icon>
      </div>
      <!-- ① -->
      <div class="nav-list">
        <!-- <div class="navBox">
          <a-button @click="portalHome">基座首页</a-button>
        </div>
        <div class="navBox">
          <a-button @click="micro">子应用1</a-button>
        </div> -->
        <div
          class="navBox"
          v-for="item in navList"
          :key="item.key"
          @click="navFn(item)"
          :class="item.key === navIndex ? 'nav-titleblue' : ''"
          :style="
            item.key == 3
              ? 'pointer-events: none; cursor: default;'
              : 'cursor: pointer;'
          "
        >
          <!-- 办事中心 - 按钮时渲染（弹框） -->
          <a-popover
            @visibleChange="handleHoverChange"
            :overlayStyle="{ padding: '0px', margin: '0px', width: '100%' }"
            trigger="hover"
            :visible="hovered"
            overlayClassName="userpopver"
            v-if="item.key === 2"
          >
            <!-- 弹框内容 -->
            <template #content>
              <div class="outbox">
                <div
                  style="
                    height: 480px;
                    background: rgb(245, 245, 247);
                    width: 200px;
                    overflow: hidden;
                  "
                  @click="getLeTwoMenu($event)"
                >
                  <p class="firstLelMenu active" @click="firstLelItemClick(0)">
                    <svg-icon
                      v-if="popIndex !== 0"
                      icon-class="business"
                      class-name="business"
                    ></svg-icon>
                    <svg-icon
                      v-if="popIndex === 0"
                      icon-class="businessAct"
                      class-name="businessAct"
                    ></svg-icon>
                    业务产品
                  </p>
                  <p class="firstLelMenu" @click="firstLelItemClick(1)">
                    <svg-icon
                      v-if="popIndex !== 1"
                      icon-class="operating"
                      class-name="operating"
                    ></svg-icon>
                    <svg-icon
                      v-if="popIndex === 1"
                      icon-class="operatingAct"
                      class-name="operatingAct"
                    ></svg-icon>
                    运营服务
                  </p>
                  <p class="firstLelMenu" @click="firstLelItemClick(2)">
                    <svg-icon
                      v-if="popIndex !== 2"
                      icon-class="platform"
                      class-name="platformAct"
                    ></svg-icon>
                    <svg-icon
                      v-if="popIndex === 2"
                      icon-class="platformAct"
                      class-name="platformAct"
                    ></svg-icon>
                    办事平台
                  </p>
                </div>
                <div style="display: flex; justify-content: flex-start">
                  <!-- 二级菜单 -->
                  <div
                    style="
                      width: 220px;
                      height: 480px;
                      border-right: 1px solid #f5f5f5;
                      overflow: hidden;
                    "
                    class="secondMenuContainer"
                    @click="getSecMenu($event)"
                  >
                    <div
                      class="secondLelMenu"
                      style="
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        line-height: 35px;
                      "
                      v-for="(item, index) in menu[popIndex].submenu"
                      :key="index"
                      @click="getThirdMenu(item)"
                    >
                      <p
                        style="
                          margin: 5px 20px 10px 30px;
                          font-size: 14px;
                          transform: scale(1, 1.6);
                        "
                      >
                        >
                      </p>
                      <p :title="item.themeName" style="font-weight: 500">
                        {{ item.themeName }}
                      </p>
                    </div>
                  </div>
                  <!-- 三级菜单 -->
                  <div
                    style="
                      padding: 25px;
                      display: flex;
                      flex-direction: column;
                      width: 710px;
                      flex-wrap: wrap;
                      height: 480px;
                      align-content: flex-start;
                    "
                  >
                    <div
                      v-for="(item, index) in menu[popIndex].childrenList"
                      :key="index"
                      style="
                        width: 33.3%;
                        box-sizing: border-box;
                        height: 32px;
                        display: flex;
                        justify-content: flex-start;
                      "
                    >
                      <div
                        style="
                          overflow: hidden;
                          text-overflow: ellipsis;
                          white-space: nowrap;
                        "
                        :title="item.themeName"
                        class="thirdMenuItem"
                        @click="goThirdMenu(item)"
                        :class="
                          item.isUsable === 'no'
                            ? 'thirdMenuItemFailed'
                            : 'thirdMenuItem'
                        "
                      >
                        {{ item.themeName }}
                      </div>
                      <img
                        src="@/assets/png/hot.png"
                        v-if="item.themeLabel === 'hot'"
                        style="
                          display: inline-block;
                          vertical-align: baseline;
                          margin: 4px 0px 0px 4px;
                          height: 14px;
                        "
                      />
                    </div>
                  </div>
                </div>
              </div>
            </template>

            <span class="nav-title">
              <span v-if="item.title == '办事中心'" class="div_class">{{
                item.title
              }}</span>
              <span v-else-if="item.title == '资讯中心'" class="div_class">{{
                item.title
              }}</span>
              <span v-else-if="item.title == '帮助中心'" class="div_class">{{
                item.title
              }}</span>
              <span v-else>{{ item.title }}</span>
            </span>
          </a-popover>
          <!-- 非 办事中心 按钮时渲染 -->
          <span
            class="nav-title"
            :style="item.key == 3 ? 'color: #bfbfbf;' : 'color:#000'"
          >
            <span v-if="item.title == '办事中心'" class="div_class">{{
              item.title
            }}</span>
            <span v-else-if="item.title == '资讯中心'" class="div_class">{{
              item.title
            }}</span>
            <span v-else-if="item.title == '帮助中心'" class="div_class">{{
              item.title
            }}</span>
            <span v-else>{{ item.title }}</span>
          </span>
        </div>
      </div>
      <!-- <div v-else-if="isOpenAccount" class="nav-list" /> -->
      <!-- <div v-else class="nav-list" /> -->

      <!-- 搜索框和登录按钮组件 -->
      <SearchLogin></SearchLogin>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import * as headerAPI from "@/api/header";
import { navListed } from "@/core/index";
import SearchLogin from "./SearchLogin.vue";
// import router from 'unidev-micro-core/router'
const navList = reactive(navListed);
let navIndex = ref(1);
let hovered = ref(false);
let popIndex = ref(0);
let currentId = ref("");
let menu = reactive([
  {
    key: "1",
    submenu: [
      {
        name: "支付类产品",
        themeName: "支付类产品",
        childList: [
          { isUsable: "yes", themeName: "入网服务", themeLabel: "hot" },
          { isUsable: "yes", themeName: "入网服务卡盒剑肯", themeLabel: "hot" },
          { isUsable: "no", themeName: "入网服务卡盒剑肯", themeLabel: "" },
        ],
      },
      {
        name: "内容类产品",
        themeName: "内容类产品",
        childList: [
          { isUsable: "yes", themeName: "入网服务2", themeLabel: "" },
          { isUsable: "yes", themeName: "入网服3务", themeLabel: "" },
        ],
      },
      {
        name: "数据类产品",
        themeName: "数据类产品",
        childList: [
          { isUsable: "yes", themeName: "入4网服务", themeLabel: "" },
          { isUsable: "yes", themeName: "入网4服务", themeLabel: "" },
        ],
      },
      {
        name: "科技类产品",
        themeName: "科技类产品",
        childList: [
          { isUsable: "yes", themeName: "入网t服务", themeLabel: "" },
          { isUsable: "yes", themeName: "入t网服务", themeLabel: "" },
        ],
      },
      {
        name: "专项工作",
        themeName: "专项工作",
        childList: [
          { isUsable: "yes", themeName: "入h网服务", themeLabel: "" },
          { isUsable: "yes", themeName: "入网g服务", themeLabel: "" },
        ],
      },
    ],
    childrenList: [
      { isUsable: "yes", themeName: "入网服务", themeLabel: "hot" },
      { isUsable: "yes", themeName: "入网服务卡盒剑肯德", themeLabel: "hot" },
      { isUsable: "no", themeName: "入网服务卡盒剑肯", themeLabel: "" },
      { isUsable: "yes", themeName: "入网服务卡盒剑肯德", themeLabel: "" },
      { isUsable: "yes", themeName: "入网服务卡盒剑肯德", themeLabel: "" },
      { isUsable: "yes", themeName: "入网服务卡盒剑肯德", themeLabel: "" },
      { isUsable: "yes", themeName: "入网服务卡盒剑肯德", themeLabel: "" },
      { isUsable: "yes", themeName: "入网服务卡盒剑肯德", themeLabel: "" },
      { isUsable: "yes", themeName: "入网服务卡盒剑肯德", themeLabel: "" },
      { isUsable: "yes", themeName: "入盒剑肯德", themeLabel: "" },
      { isUsable: "yes", themeName: "手动阀", themeLabel: "hot" },
      { isUsable: "yes", themeName: "入网服务卡盒剑肯德", themeLabel: "" },
      { isUsable: "yes", themeName: "入网服务卡盒剑肯德", themeLabel: "" },
      { isUsable: "yes", themeName: "入网服", themeLabel: "" },
      { isUsable: "yes", themeName: "入网服盒剑肯德", themeLabel: "" },
      { isUsable: "yes", themeName: "卡盒剑肯德", themeLabel: "hot" },
      { isUsable: "yes", themeName: "入网服务卡盒剑", themeLabel: "hot" },
      { isUsable: "no", themeName: "入网", themeLabel: "" },
      { isUsable: "no", themeName: "入网服务卡盒是的剑肯德", themeLabel: "" },
      {
        isUsable: "no",
        themeName: "入网服d手动阀务卡盒剑肯德",
        themeLabel: "",
      },
    ],
  },
  {
    key: "2",
    submenu: [
      {
        name: "入网服务",
        themeName: "入网服务",
        childList: [
          { isUsable: "yes", themeName: "入网服务b", themeLabel: "" },
          { isUsable: "yes", themeName: "入网服务", themeLabel: "" },
        ],
      },
      {
        name: "业务变更",
        themeName: "业务变更",
        childList: [
          { isUsable: "yes", themeName: "入网服务1", themeLabel: "" },
          { isUsable: "yes", themeName: "入网服务", themeLabel: "" },
        ],
      },
      {
        name: "测试服务",
        themeName: "测试服务",
        childList: [
          { isUsable: "yes", themeName: "入网服55务", themeLabel: "" },
          { isUsable: "yes", themeName: "入网服务", themeLabel: "" },
        ],
      },
      {
        name: "清算差错",
        themeName: "清算差错",
        childList: [
          { isUsable: "yes", themeName: "入网服33务", themeLabel: "" },
          { isUsable: "yes", themeName: "入网服务", themeLabel: "" },
        ],
      },
      {
        name: "业务查询",
        themeName: "业务查询",
        childList: [
          { isUsable: "yes", themeName: "入网服vff务", themeLabel: "" },
          { isUsable: "yes", themeName: "入网服务", themeLabel: "" },
        ],
      },
    ],
    childrenList: [
      { isUsable: "yes", themeName: "入网服务b", themeLabel: "" },
      { isUsable: "yes", themeName: "入网服务", themeLabel: "" },
    ],
  },
  {
    key: "3",
    submenu: [
      {
        name: "业务类系统",
        themeName: "业务类系统",
        childList: [
          { isUsable: "yes", themeName: "入网服务", themeLabel: "" },
          { isUsable: "yes", themeName: "入网服务", themeLabel: "" },
        ],
      },
      {
        name: "服务类系统",
        themeName: "服务类系统",
        childList: [
          { isUsable: "yes", themeName: "入网服务", themeLabel: "" },
          { isUsable: "yes", themeName: "入网服务", themeLabel: "" },
        ],
      },
    ],
    childrenList: [
      { isUsable: "yes", themeName: "入网服务", themeLabel: "" },
      { isUsable: "yes", themeName: "入网服务", themeLabel: "" },
    ],
  },
]);
// function portalHome(){
//   router.push('/')
// }
// function micro(){
//   // window.location.href='/ycb/front/we/'
//   router.push('/we/')
// }
onMounted(() => {
  getBusinessProds();
  getRunningService();
  getPlatform();
});
function clickSvg() {
  window.location.href = "/ycb/pcweb/index.html";
}
function navFn(item) {
  navIndex.value = item.key;
  console.log(navIndex.value);
  // 跳转页面
  if (navIndex.value === 2) {
    window.location.href = "/ycb/pcweb/bszx/index.html";
  } else if (navIndex.value === 5) {
    window.location.href = "/ycb/pcweb/bzzx/index.html";
  } else if (navIndex.value === 1) {
    window.location.href = "/ycb/pcweb/index.html";
  } else if (navIndex.value === 4) {
    window.location.href = "/ycb/pcweb/zxzx/index.html";
  }
}

// 办事中心-鼠标悬浮弹出导航弹框
function handleHoverChange(visible) {
  hovered.value = visible;
}

// 一级菜单 点击菜单栏样式变化（同一期代码）
function getLeTwoMenu(event) {
  if (event.target.nodeName === "DIV") return;
  const secondMenu = document.getElementsByClassName("secondLelMenu");
  if (secondMenu.length > 0) {
    for (let j = 0; j < secondMenu.length; j++) {
      secondMenu[j].style.backgroundColor = "#fff";
      secondMenu[j].style.color = "#666";
    }
    secondMenu[0].style.backgroundColor = "rgba(22, 119, 255, 0.1)";
    secondMenu[0].style.color = "rgb(22,119,255)";
  }

  const container = event.currentTarget.children;
  for (let i = 0; i < container.length; i++) {
    container[i].style.backgroundColor = "rgb(245,245,247)";
    container[i].style.color = "#666";
  }
  if (event.target.nodeName === "P") {
    event.target.style.backgroundColor = "#fff";
    event.target.style.color = "rgb(22,119,255)";
  }
}
// 二级级菜单 点击菜单栏样式变化（同一期代码）
function getSecMenu(event) {
  if (event.target.className === "secondMenuContainer") return;
  // if (event.target.nodeName === 'DIV') return
  const container = event.currentTarget.children;
  for (let i = 0; i < container.length; i++) {
    container[i].style.backgroundColor = "#fff";
    container[i].style.color = "#666";
  }
  if (event.target.nodeName === "P") {
    event.target.parentNode.style.backgroundColor = "rgba(22, 119, 255, 0.1)";
    event.target.parentNode.style.color = "rgb(22,119,255)";
  } else if (event.target.nodeName === "DIV") {
    event.target.style.backgroundColor = "rgba(22, 119, 255, 0.1)";
    event.target.style.color = "rgb(22,119,255)";
  }
}

// 点击按钮 - 蓝色下划线变化、路由跳转
function firstLelItemClick(item) {
  popIndex.value = item;
  if (item == 0) {
    getBusinessProds();
  } else if (item == 1) {
    getRunningService();
  } else if (item == 2) {
    getPlatform();
  }
}

// 办事中心 - 点击获取二级菜单
function getCookie(name) {
  var allcookies = document.cookie;
  var cookie_pos = allcookies.indexOf(name);
  if (cookie_pos != -1) {
    cookie_pos = cookie_pos + name.length + 1;
    var cookie_end = allcookies.indexOf(";", cookie_pos);
    if (cookie_end == -1) {
      cookie_end = allcookies.length;
    }
    var value = unescape(allcookies.substring(cookie_pos, cookie_end));
  }
  return value;
}
currentId.value = getCookie("themeServiceType")
  ? getCookie("themeServiceType")
  : "mechanism";

function getBusinessProds() {
  // 解决方案menu
  headerAPI
    .getThemeTreeList({
      webId: window.STATIC_PARAMS.WEB_ID,
      themeId: window.STATIC_PARAMS.SENSES_CATEGORY_ID,
      themeServiceType: currentId.value,
      t: Date.now(),
    })
    .then((res) => {
      if (res.success) {
        const tempData = res.data.themeList || [];
        menu[0].submenu = [];
        tempData.forEach((item) => {
          if (item.childList && item.childList.length) {
            item.childList.forEach((subItem) => {
              subItem.name = subItem.themeName;
              // if (subItem.iid === this.categoryId) {
              //   this.openKeys.push(item.iid)
              // }
            });
          }
          menu[0].submenu.push({
            ...item,
            name: item.themeName,
          });
        });
        menu[0].childrenList = tempData[0].childList;
      }
    });
}
function getRunningService() {
  // 运营服务menu
  headerAPI
    .getThemeTreeList({
      webId: window.STATIC_PARAMS.WEB_ID,
      themeId: window.STATIC_PARAMS.DAILY_CATEGORY_ID,
      themeServiceType: currentId.value,
      t: Date.now(),
    })
    .then((res) => {
      if (res.success) {
        const tempData2 = res.data.themeList || [];
        menu[1].submenu = [];
        tempData2.forEach((item) => {
          if (item.childList && item.childList.length) {
            item.childList.forEach((subItem) => {
              subItem.name = subItem.themeName;
              // if (subItem.iid === this.categoryId) {
              //   this.openKeys.push(item.iid)
              // }
            });
          }
          menu[1].submenu.push({
            ...item,
            name: item.themeName,
          });
        });
        menu[1].childrenList = tempData2[0].childList;
      }
    });
}
function getPlatform() {
  // 办事平台menu
  headerAPI
    .getThemeTreeList({
      webId: window.STATIC_PARAMS.WEB_ID,
      themeId: window.STATIC_PARAMS.POWER_CATEGORY_ID,
      themeServiceType: currentId.value,
      t: Date.now(),
    })
    .then((res) => {
      if (res.success) {
        const tempData2 = res.data.themeList || [];
        menu[2].submenu = [];
        tempData2.forEach((item) => {
          if (item.childList && item.childList.length) {
            item.childList.forEach((subItem) => {
              subItem.name = subItem.themeName;
              // if (subItem.iid === this.categoryId) {
              //   this.openKeys.push(item.iid)
              // }
            });
          }
          menu[2].submenu.push({
            ...item,
            name: item.themeName,
          });
        });
        menu[2].childrenList = tempData2[0].childList;
      }
    });
}

// 点击二级菜单
function getThirdMenu(item) {
  menu[popIndex.value].childrenList = item.childList;
}
</script>

<style lang="less" scoped>
::v-deep .ant-popover-content {
  margin-top: -4px !important;
}

.header-wrap {
  background-color: #fff;
  z-index: 100;
  width: 100%;
  height: 64px;
  top: 0;
  left: 0;
  position: relative;
  box-shadow: 0 0 5px 0;
  font-family: Microsoft Yahei;
  box-shadow: 0 2px 10px 0 rgba(153, 153, 153, 0.3);
}

.header {
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
  height: @headerHeight;
  background-color: @pageBg;
}

.logo-wrap {
  width: 301px;
  height: 100%;

  .logo {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
}

.nav-list {
  position: relative;
  flex: 3;
  height: 100%;
  display: flex;
  text-align: center;
  align-items: center;

  .hotNew {
    width: 33px;
    height: 17px;
    position: absolute;
    top: 8px;
    left: 372px;
  }

  // .newicon{
  // position: absolute;
  // top: 8px;
  // left: 374px;

  // }

  .navBox {
    // background-color: aqua;
    margin-left: 20px;
    height: 100%;
    //border-bottom: 4px solid transparent;
    line-height: @headerHeight;
    box-sizing: border-box;
    width: 70px;
    font-size: 16px;

    .nav-title {
      font-size: 16px;
      height: 100%;
      color: #232323;
      font-size: 16px;
      display: inline-block;
      letter-spacing: 0.26px;
    }
  }

  .nav-titleblue {
    color: @color-b;
    position: relative;
    border-bottom: 4px solid @color-b;
  }
}

.outbox {
  width: 1168px;
  display: flex;
  justify-content: flex-start;
  margin: 0 auto;
  // padding:12px 0 12px 14px;
  position: relative;
}

.firstLelMenu:first-child {
  margin-top: 10px;
}

.firstLelMenu {
  padding: 20px;
  text-align: center;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  font-family: "Microsoft Yahei";
  font-size: 16px;
  width: 221px;
  height: 50px;
  line-height: 17px;
  font-weight: 500;
  margin-bottom: 0;

  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    /* IE10+ CSS styles go here */
    .business,
    .businessAct {
      margin: 0px 20px 0px 0px;
    }

    .operating,
    .operatingAct {
      margin: 0px 20px 0px 0px;
    }

    .platform,
    .platformAct {
      margin: 0px 20px 0px 0px;
    }
  }
}

.active {
  background: #fff;
  color: rgb(22, 119, 255);
}

.secondLelMenu:first-child {
  margin-top: 20px;
  background: rgba(22, 119, 255, 0.1);
  color: rgb(22, 119, 255);
}

.secondLelMenu {
  margin-bottom: 0;
  height: 35px;
  line-height: 35px;
  font-size: 14px;
  text-align: left;
  cursor: pointer;
  font-weight: 500;
  font-family: "Microsoft Yahei";
  display: flex;
  justify-content: flex-center;
  align-items: center;
}

.thirdMenuItem {
  font-size: 14px;
  width: 126px;
  cursor: pointer;
  font-family: "Microsoft Yahei";
}

.thirdMenuItemFailed {
  pointer-events: none;
  cursor: default;
  color: #bfbfbf;
}

.thirdMenuItem:hover {
  color: rgb(22, 119, 255);
}

.login-tips {
  .hoverdiv {
    display: inline-block;
    background-color: #fff;
    width: 650px;
    height: 66px;
    position: absolute;
    right: -500px;
    top: -2px;
    z-index: 0;
  }

  .showsearch {
    animation-name: example;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
  }

  @keyframes example {
    from {
      right: -500px;
    }

    to {
      right: 140px;
    }
  }

  .hiddensearch {
    animation-name: exampleto;
    animation-duration: 1s;
    animation-fill-mode: forwards;
  }

  @keyframes exampleto {
    from {
      right: 140px;
    }

    to {
      right: -500px;
    }
  }

  .searchEmo {
    display: inline-block;
    position: absolute;
    right: 40px;
    top: 10px;

    ::v-deep .ant-input {
      visibility: hidden;
      border: none;
      border-bottom: 1px solid #999999;
      border-radius: 0 !important;
    }

    ::v-deep .ant-input:focus {
      box-shadow: none;
    }

    ::v-deep .anticon-search {
      display: none;
    }

    ::v-deep .ant-input-affix-wrapper {
      text-align: left !important;
    }
  }

  & > span {
    z-index: 2;
    display: inline-block;
    position: relative;
    line-height: @headerHeight;
  }

  .login-btn {
    user-select: none;
    cursor: pointer;
    color: @color-w;
    width: 73px;
    background-image: url("../../assets/png/login_btn_bg.png");
    background-position: center;
    background-repeat: no-repeat;
  }

  .shift-btn {
    user-select: none;
    cursor: pointer;
    color: @color-w;
    width: 240px;
    background-image: linear-gradient(270deg, #009bea 0%, #0062d0 100%);
  }

  .menu {
    cursor: pointer;
    display: inline-block;
    position: relative;

    .login-text {
      user-select: none;
      color: @color-23;
      font-size: @fs-sm;
      margin: 0 20px;
    }

    .menu-list {
      position: absolute;
      width: 100%;
      background: #fff;
      z-index: 1;
      border: 1px solid @color-line;
      border-radius: 2px;
      top: 30px;
    }
  }
}
</style>