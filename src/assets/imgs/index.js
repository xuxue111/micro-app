const req = require.context('./svg', false, /\.svg$/)

// 解析获取的.svg文件的文件名称并返回
const requireAll = (requireContext) => {
  return requireContext.keys().map(requireContext)
}
requireAll(req)
