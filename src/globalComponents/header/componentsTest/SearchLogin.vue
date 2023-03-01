<template>
  <!-- 搜索框 -->
  <div class="login-tips" style="z-index: 1">
    <a-input
      style="width: 180px; font-size: 18px; height: 32px"
      ref="inputs"
      size="default"
      v-if="
        !currentPath.startsWith('/login') && currentPath != '/indexSearching'
      "
      v-model:value="searchValue"
      placeholder="请输入"
    >
      <template #suffix>
        <div @click="onSearch">
          <svg-icon icon-class="search" class="search"></svg-icon>
        </div>
      </template>
    </a-input>
    <span
      v-if="!isLogged && !currentPath.startsWith('/login')"
      data-sensors-click
      class="center login-btn"
      style="margin-left: 20px"
      @click="login"
    >
      登录
    </span>
    <!-- 登陆中 -->
    <span
      v-if="isLogin === 1 && route.path.includes('login')"
      class="center shift-btn"
      @click="shiftIns"
    >
      <svg-icon icon-class="qie_huan" style="font-size: 19px"></svg-icon>
      <span style="margin-left: 16px; font-size: 16px">
        {{ isIns ? "切换到 机构登录" : "切换到 个人/商户登录" }}
      </span>
    </span>
    <span
      v-if="false"
      class="center login-btn"
      style="margin-left: 20px"
      @click="back"
    >
      返回
    </span>
    <!-- 已经登录 -->
    <div v-if="isLogged" class="menu">
      <a-popover placement="bottomRight">
        <template #content>
          <a-divider v-if="isLogin === 3" style="margin: 0; height: 0.5px" />
          <div v-if="isLogin === 3" class="menu-one" @click="handleSwitch">
            <svg-icon icon-class="switch2" class-name="user-svg"></svg-icon>
            <span class="userAction">切换账号</span>
          </div>
          <a-divider style="margin: 0; height: 0.5px" />
          <div class="menu-one" @click="handleAction(3)">
            <svg-icon icon-class="login_out" class-name="user-svg"></svg-icon>
            <span class="userAction">退出登录</span>
          </div>
        </template>
        <span class="login-text">
          {{ userInfo.userName }}
        </span>
        <span>
          <svg-icon icon-class="down-arrow" />
        </span>
      </a-popover>
      <span
        style="padding-left: 30px; font-family: 'Microsoft Yahei'; color: #000"
        @click="handleAction(1)"
        >用户中心</span
      >
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { globalStore } from "unidev-micro-core/store/global";
// import router from 'unidev-micro-core/router';
import { storeToRefs } from "pinia";
let searchValue = ref("");
let currentPath = ref("");
const route = useRoute();
const { isLogin, isLogged, userInfo } = storeToRefs(globalStore());

// watch(
//   () => route.path,
//   (newValue) => {
//     currentPath.value = newValue;
//   },
//   { immediate: true }
// );
watch(
  () => route,
  (newValue) => {
    if (newValue && newValue.path) {
      currentPath.value = newValue.path;
    }
  },
  { immediate: true }
);

function onSearch(value) {
  if (value) {
    console.log(value);
  }
}
// 处理操作 1 用户中心 2 账户管理 3登出
function handleAction(type) {
  // 判断是否存在token 如果Token 不存在的时候
  const token = localStorage.getItem("LOGIN_TOKEN");
  if (!token) {
    // router.push({ path: '/user/login' })
    window.location.href = "/ycb/front/user/login";
    return false;
  }
  if (type === 1) {
    // this.$router.push({ path: '/user-center' })
  }
  if (type === 3) {
    globalStore()
      .ycblogout()
      .then(() => {
        // router.push("/user/login");
       window.location.href = "/ycb/front/user/login";
      });
  }
}
// 登录
function login() {
  // router.push({ path: '/user/login' })
  window.location.href = "/ycb/front/user/login";
}
</script>

<style lang="less" scoped>
.search {
  cursor: pointer;
}

.login-tips {
  display: flex;
  align-items: center;

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

  .login-btn {
    user-select: none;
    cursor: pointer;
    text-align: center;
    color: @color-w;
    width: 73px;
    background-image: url("@/assets/png/login_btn_bg.png");
    background-position: center;
    background-repeat: no-repeat;

    z-index: 2;
    display: inline-block;
    position: relative;
    line-height: @headerHeight;
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

.menu-one {
  padding: 8px;
  font-size: @fs-mini;
  color: @color-23;
  cursor: pointer;

  .user-svg {
    font-size: @fs-sm;
    margin-right: 8px;
    margin-left: -8px;
  }
}

.userAction {
  font-size: 14px;
  color: #666666;
}
</style>