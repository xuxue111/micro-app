<template>
  <div class="box" v-drag>
    <div class="content">
      <div class="top-control" style="position:relative">
        <img class="top-img" src="@/assets/png/ke_fu.png"/>
        <img style="position:absolute;right:48px;width:30px;height:30px;cursor:pointer;top:20px" @click="openCustomer" src="@/assets/png/small.png" />
        <img @click="close" class="close-img" src="@/assets/png/close.png" />
      </div>
      <div class="aaa"></div>
      <!-- https://ossp.unionpay.com/occ/im/text/1JEE10 -->
      <iframe
        :src="controlUrl"
        frameborder="0"
        scrolling="no"
        style="width: 720px; min-height: 500px;"
        name="kefuFrame"
        id="kefuFrame"
      ></iframe>
    </div>
  </div>
</template>

<script>
// import { mapState } from 'pinia'

export default {
  name: 'CustomBox',
  data () {
    return {
      controlUrl: window.STATIC_PARAMS.ZNKF_URL
    }
  },
  computed: {
    // ...mapState({
    //   userInfo: state => state.global.userInfo
    // })
  },
  props: {
  },
  watch: {
    controlUrl () {
      const iframe = document.querySelector('#kefuFrame')
      var that = this
      if (iframe.attachEvent) {
        iframe.attachEvent('onload', function () {
          window.frames['kefuFrame'].postMessage(that.userInfo, '*')
        })
      } else {
        iframe.onload = function () {
          window.frames['kefuFrame'].postMessage(that.userInfo, '*')
        }
      }
    }
  },
  mounted () {
    const iframe = document.querySelector('#kefuFrame')
    var that = this
    if (iframe.attachEvent) {
      iframe.attachEvent('onload', function () {
        window.frames['kefuFrame'].postMessage(that.userInfo, '*')
      })
    } else {
      iframe.onload = function () {
        window.frames['kefuFrame'].postMessage(that.userInfo, '*')
      }
    }
  },
  methods: {
    openCustomer () {
      this.$emit('changeStatus', false)
      this.$emit('showNarrow', false)
    },
    close (e) {
      this.$emit('hideNarrow', true)
      e.stopPropagation()
    }
  },
  directives: {
    drag: function (el) {
      const dragBox = el // ??????????????????
      dragBox.onmousedown = e => {
        e.preventDefault()
        // ?????????????????????????????????
        const disX = e.clientX - dragBox.offsetLeft
        const disY = e.clientY - dragBox.offsetTop
        // if (e.preventDefault) {
        //   e.preventDefault()
        // } else {
        //   e.preventDefault = false // ??????????????????????????????
        // }
        const zdleft = document.documentElement.clientWidth - dragBox.clientWidth // ??????????????????-box??????????????? = left??????????????? // ??????top????????????
        const zdtop = document.documentElement.clientHeight - dragBox.clientHeight
        document.onmousemove = e => {
          // ???????????????????????????????????????????????????????????????????????????
          let left = e.clientX - disX
          let top = e.clientY - disY
          if (left > zdleft) {
            left = zdleft - 5
          } else if (left <= 0) {
            left = 5
          }

          if (top > zdtop) {
            top = zdtop - 5
          } else if (top <= 0) {
            top = 5
          }

          // ??????????????????
          dragBox.style.left = left + 'px'
          dragBox.style.top = top + 'px'
          // console.log(dragBox.offsetTop + 130, 'dragBox.offsetTop + 140)')
          // console.log(e.clientY, 'e.clientY')
          if (e.clientY > (dragBox.offsetTop + 130)) {
            document.onmousemove = null
          }
        }
        document.onmouseup = (e) => {
          e.preventDefault()
          // ????????????????????????????????????
          document.onmousemove = null
          // ???????????????????????????????????????????????????????????????????????????????????????
          document.onmouseup = null
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.box{
  // width: 100%;
  // height: 100%;
  position: fixed;
  left: calc(50% - 360px);
  top: 23%;
  // background: rgba(0,0,0,0.6);
  z-index: 999;
}
.content{
  position: relative;
  width: 720px;
  min-height: 520px;
  // background: #fff;
  margin: 0 auto;
  .aaa {
    width: 715px;
    height: 60px;
    // background-color: pink;
    border-radius: 8px 8px 0 0;
    position: absolute;
    top: 72px;
    margin: 0 2px;
    left: 0;
    opacity:0;
  }
  .top-control{
  display: flex;
  justify-content: space-between;
  align-items: center;
  .top-img{
    width: 60px;
    height: 70px;
    margin-left: 15px;
  }
  .close-img{
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
 }
}

</style>
