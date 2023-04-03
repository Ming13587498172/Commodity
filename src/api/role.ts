import service from "@/utils/request";

// 角色列表
export function getRoleList () {
  return service({
    url: '/getRoleList',
    method: 'get'
  })
}
