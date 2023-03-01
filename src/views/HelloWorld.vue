<template>
  <div class="hello">
    <h1>我是基座应用首页</h1>
    <a-modal v-model:visible="visible" title="Basic Modal" >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-modal>
  </div>
</template>

<script setup>
import {ref} from 'vue'
const visible = ref(true)
</script>


<style lang="less" scoped>
.hello {
  text-align: center;
}
</style>
