<template>
 <div class="footer-wrap">
      <div class="foot_box m-center">
        <div class="footer-left-wrap">
          <div class="footer-left-one friend">
            <div class="title">
              友情链接
            </div>
            <a data-v-fd296c06="" href="" target="_blank" class="description" style="margin-right: 40px;"> 银联官网 </a>
            <a data-v-fd296c06="" href="" target="_blank" class="description" style="margin-right: 0px;"> 银联开放平台 </a>
          </div>
          <div class="helper">
            <div class="title">客服电话</div>
            <div class="description" style="margin-right: 40px;"><span>咨询电话:</span><span data-v-fd296c06=""
                style="margin-left: 22px;">4008695516</span></div>
            <div class="description" style="margin-right: 0px;"><span>工作时间:</span><span
                style="margin-left: 22px;">工作日09:00～18:00</span></div>
          </div>
        </div>
        <div class="copyright">
          <span class="copyright-text">
            ©中国银联 版权所有
          </span>
          <span class="copyright-text" style="margin-left: 35px;">
            <a href="" target="_blank">
              沪ICP备07032180号-2
            </a>
          </span>
          <span class="copyright-text" style="margin-left: 44px; vertical-align: text-bottom;">

          </span>
          <span class="copyright-number">
            <a href="" target="_blank">
              沪公网安备31011502002335号
            </a>
          </span>
        </div>
      </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.footer-wrap {
  text-align: left;
  font-family: Microsoft Yahei;
  width: 100%;
  min-height: 240px;
  background-color: #38455e;
  position: relative;

  .foot_box {
    width: 1200px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    position: relative;
    margin: auto;

    .copyright {
      width: 100%;
      border-top: 1px solid #6c7073;
      padding-top: 22px;
      margin-top: 20px;

      a {
        color: #9fa3a6;
      }

      .copyright-text {
        font-family: Microsoft Yahei;
        font-size: 14px;
        color: #9fa3a6;
        letter-spacing: 0;
        padding-right: 12px;

      }
    }

    .footer-right-wrap {
      flex: 20%;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: end;
      -ms-flex-pack: end;
      justify-content: flex-end;

      .footer-right-right {
        width: 100px;
        margin-top: 27px;

        .footer-attach {
          width: 96.43px;
          height: 96.43px;
        }

        .footer-attach-text {
          font-family: Microsoft Yahei;
          font-size: 14px;
          color: #9fa3a6;
          margin-top: 8px;
        }
      }
    }

    .footer-left-wrap {
      flex: 80%;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      margin-top: 32px;

      .footer-left-one {
        .description {
          display: inline-block;
          font-family: Microsoft Yahei;
          font-size: 14px;
          color: #9fa3a6;
          margin: 8px 0;
          margin-top: 15px;
        }

        .title {
          font-family: Microsoft Yahei;
          font-size: 16px;
          color: #fff;
          margin-bottom: 8px;
        }
      }

      .helper {
        margin-left: 128px;

        .title {
          font-family: Microsoft Yahei;
          font-size: 16px;
          color: #fff;
          margin-bottom: 8px;
        }

        .description {
          display: inline-block;
          font-family: Microsoft Yahei;
          font-size: 14px;
          color: #9fa3a6;
          margin: 8px 0;
          margin-top: 15px;
        }
      }
    }
  }
}
</style>
