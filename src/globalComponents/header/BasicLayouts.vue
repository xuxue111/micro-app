<template>
  <layout class="portal" style="minHeight:100%">
    <layout-header>
      <!-- <GlobalHeader></GlobalHeader> -->
      <TestHeader></TestHeader>
    </layout-header>
    <GlobalSiderBar
      @changeStatus="changeStatus"
      @showNarrow="showNarrow"
      @hideNarrow="hideNarrow"
    />
    <CustomBox
      @changeStatus="changeStatus"
      @showNarrow="showNarrow"
      @hideNarrow="hideNarrow"
      v-show="isShow"
    />
    <page-view></page-view>
    <layout-footer>
      <GlobalFooter></GlobalFooter>
    </layout-footer>
  </layout>
</template>

<script setup>
import { ref } from 'vue';
import { Layout, LayoutHeader, LayoutFooter, } from '@up/uppcv_libs_basic'
// import GlobalHeader from './components/GlobalHeader/GlobalHeader.vue'
import TestHeader from './componentsTest/TestHeader.vue'
import PageView from './PageView.vue'
import GlobalFooter from './components/GlobalFooter/GlobalFooter.vue'
import GlobalSiderBar from '@/layout/components/GlobalSiderBar/GlobalSiderBar';
import CustomBox from '@/layout/components/CustomBox';
const isShow = ref(false)
const changeStatus = (val)=> {
  // if (val2 === 'isInfoRobot') {
  //   this.isInfoRobot = val2
  // }
  isShow.value = val
  // this.isHide = false
}
const showNarrow = ()=> {
  // this.isHide = true
}
const hideNarrow = ()=> {
  isShow.value = false
  // this.isHide = false
}
</script>
<style>

.portal .ant-layout-footer {
  line-height: 1.5;
  padding: 0;
}
.portal .ant-layout-header {
  background: #fff;
  padding: 0;
}
.portal .ant-layout-content {
  min-height: 120px;
  background: #fff;
}
</style>
