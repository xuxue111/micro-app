import{ axios }from'unidev-micro-core/utils'

const prefix = '/jpaas-uir-web-server/front/'

export const api = {
  getThemeTreeList: prefix + 'theme/find-theme-details', // 查询场景详情树数据
}

export function getThemeTreeList (params) {
  return axios({
    url:api.getThemeTreeList,
    method:'get',
    params:params
  })
}