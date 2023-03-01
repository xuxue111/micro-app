<template>
  <div>
    <a-spin
      style="width: 100%; margintop: 100px; fontsize: 20px"
      :spinning="loading"
      tip="加载中....."
      size="large"
    >
    </a-spin>
    <a-breadcrumb v-if="!loading" class="breadcrumb" separator=">">    
      <a-breadcrumb-item @click="home" style="cursor: pointer;color: #000;opacity:.6;font-size: 14px;">首页</a-breadcrumb-item>
      <a-breadcrumb-item v-for="(item,index) in breadcrumblist.data" :key="index">{{item.meta.title}}</a-breadcrumb-item>
    </a-breadcrumb>
    <micro-app
      @created="created"
      @beforemount="beforemount"
      @mounted="mounted"
      @unmount="unmount"
      @error="error"
      :name="appname"
      :url="url"
      destroy
      :baseroute="baseroute"
      disable-memory-router
    ></micro-app>
  </div>
</template>

<script>
import { ref,reactive } from "vue";
import microApp from "@micro-zoe/micro-app";
import { globalStore } from "unidev-micro-core/store/global";
import router from 'unidev-micro-core/router'
export default {
  name: "HelloWorlds",

  setup() {
    const appname = ref(null);
    const baseroute = ref("");
    const breadcrumblist = reactive({data:[]})
    var url = ref(null);
    var loading = ref(true);
    let created = () => {
      console.log("micro-app元素被创建");
    };
    let beforemount = () => {
      loading.value = true;
      console.log("即将被渲染");
    };
    let mounted = () => {
      loading.value = false;
      console.log("已经渲染完成");
    };
    let unmount = () => {
      console.log("已经卸载");
    };
    let error = () => {
      console.log("渲染出错");
    };
    let home = () =>{
      router.push('/')
    }
    return {
      baseroute,
      appname,
      url,
      loading,
      created,
      beforemount,
      mounted,
      unmount,
      error,
      home,
      breadcrumblist
    };
  },
  beforeRouteEnter(to, from, next) {  
    console.log(to, from);
    microApp.setGlobalData({
      globalStore: globalStore(),
    });
    next((vm) => {
      vm.breadcrumblist.data = to.matched.filter(item => item.meta.title !== '首页')
      let appcode = to.fullPath.split("/")[1];
      vm.appname = appcode;
      vm.baseroute = `/ycb/micro/${appcode}/`;
      // 线上环境
      vm.url = `${window.location.origin}/ycb/micro/${appcode}/`;
      // if (to.name === "子应用1") {
      //   // 本地调试
      //   vm.url = "http://localhost:8004/ycb/micro/we/";
      // }else{
      //    vm.url = "http://localhost:3000/ycb/micro/react/";
      // }
    });
  },
};
</script>

<style lang="less" scoped>
.breadcrumb{
  width: 1200px;
  margin: 0 auto;
  margin-top: 8px;
    margin-bottom: 24px;
    height: 40px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    border-bottom: 1px dashed #d8d8d8;
}
</style>