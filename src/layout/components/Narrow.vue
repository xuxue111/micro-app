<template>
  <div class="narrow" v-drag>
    <img class="narrow-img" src="../assets/png/zhi_neng_ke_fu.png" />
    <div class="tips">智能客服，聊天中...</div>
    <div class="ml15" @click="showBox">
      <a-icon :component="IconOpen" class="color"></a-icon>
      <span class="icon-tops">展开</span>
    </div>
    <div class="ml15" @click="closeAll">
      <a-icon :component="IconClose" class="color"></a-icon>
      <span class="icon-tops">关闭</span>
    </div>
  </div>
</template>

<script>
import IconOpen from '../assets/svg/open.svg?inline'
import IconClose from '../assets/svg/close.svg?inline'
export default {
  name: 'Narrow',
  data () {
    return {
      IconOpen,
      IconClose
    }
  },
  methods: {
    showBox () {
      this.$emit('changeStatus', true)
    },
    closeAll () {
      this.$emit('hideNarrow', true)
    }
  },
  directives: {
    drag: function (el) {
      const dragBox = el // 获取当前元素
      dragBox.onmousedown = e => {
        e.preventDefault()
        // 算出鼠标相对元素的位置
        const disX = e.clientX - dragBox.offsetLeft
        const disY = e.clientY - dragBox.offsetTop
        const zdleft = document.documentElement.clientWidth - dragBox.clientWidth // 可视区的宽度-box盒子的宽度 = left最大偏移量 // 计算top也是同理
        const zdtop = document.documentElement.clientHeight - dragBox.clientHeight
        document.onmousemove = e => {
          // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
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
          // 移动当前元素
          dragBox.style.left = left + 'px'
          dragBox.style.top = top + 'px'
        }
        document.onmouseup = e => {
          e.preventDefault()
          // 鼠标弹起来的时候不再移动
          document.onmousemove = null
          // 预防鼠标弹起来后还会循环（即预防鼠标放上去的时候还会移动）
          document.onmouseup = null
        }
      }
    }
  }

}
</script>

<style lang="less" scoped>
.narrow{
  position: fixed;
  width: 420px;
  height: 60px;
  left: 10%;
  bottom: 10%;
  background: #F2F6FE;
  border-radius: 30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: move;
  z-index: 999999;
  // margin-top: 60px;
  .narrow-img{
    width: 55px;
    height: 55px;
    object-fit: cover;
  }
  .tips{
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #333;
    margin-left: 20px;
  }
  .ml15{
    margin-left: 30px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .color{
    color: #0062D0 ;
    font-size: 14px;
  }
  .icon-tops{
    color: #0062D0 ;
    font-size: 14px;
    margin-left: 10px;
  }
}
</style>
