<script setup>
import { ConfigProvider } from "@up/uppcv_libs_basic";
import zhCN from "@up/uppcv_libs_basic/es/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";

dayjs.locale(zhCN.locale);
</script>

<template>
  <config-provider :locale="zhCN">
    <div id="app">
      <div id="app-main" @drop.stop.prevent>
        <router-view />
      </div>
    </div>
  </config-provider>
</template>

<style>
#app {
  height: 100%;
  color: #2c3e50;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#app-main {
  height: 100%;
  background-color: #f0f2f5;
}
html,
body {
  width: 100%;
  height: 100%;
}
input::-ms-clear,
input::-ms-reveal {
  display: none;
}
*,
*::before,
*::after {
  box-sizing: border-box;
}
html {
  font-family: sans-serif;
  line-height: 1.15;

  -ms-overflow-style: scrollbar;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
}
body {
  margin: 0;
  color: rgba(0, 0, 0, 0.85);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-feature-settings: "tnum";
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5715;
  background-color: #fff;
}
</style>
