module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
     ['import', { 'libraryName': 'ant-design-vue', 'libraryDirectory': 'es' }], // 按需加载和全局引入冲突
   
 

  ]
}
