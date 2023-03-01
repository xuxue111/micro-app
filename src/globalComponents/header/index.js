import GlobalHeader from './BasicLayouts.vue'
import {
  createApp
} from 'vue'
import {
  createPinia
} from 'pinia'
import 'unidev-micro-core/style/global.less'
import {
  testparams
} from 'unidev-micro-core/appBaseConfig/test-params'
import {
  workparams
} from 'unidev-micro-core/appBaseConfig/work-params'
window.STATIC_PARAMS = document.domain.indexOf('test') === -1 ? workparams : testparams
import uppcv from '@up/uppcv_libs_basic'
import "@/assets/imgs";
import {
  SvgIcon
} from "unidev-micro-core/components";
// 引入组件库样式
import '@up/uppcv_libs_basic/dist/uppcv_libs_basic.css'
let app = null
app = createApp(GlobalHeader)


const headerComponents = document.createElement('div')
headerComponents.id = 'header'
headerComponents.style.height = '100%'
document.body.insertBefore(headerComponents, document.body.firstChild)

app.component("svg-icon", SvgIcon);
app.use(createPinia())
  .use(uppcv)
  .mount('#header')