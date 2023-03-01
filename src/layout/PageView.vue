<template>
  <layout-content>
    <router-view></router-view>
  </layout-content>
</template>

<script setup>
import { LayoutContent } from '@up/uppcv_libs_basic'
</script>

<style lang="less" scoped>
.ant-layout-content{
  padding: 0;
  text-align: left;
}
</style>
