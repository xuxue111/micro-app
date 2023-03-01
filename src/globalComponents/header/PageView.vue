<template>
  <layout-content>
    <div class="pageview">
      {{msg}}
    </div>
  </layout-content>
</template>

<script setup>
import { LayoutContent } from '@up/uppcv_libs_basic'
import {ref} from 'vue'
const msg = ref(document.getElementById('pageview')?document.getElementById('pageview').innerHTML:'默认内容')

</script>

<style lang="less" scoped>
.ant-layout-content{
  padding: 0;
  text-align: left;
}
</style>
