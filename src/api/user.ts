import service from "@/utils/request"

// 用户列表
export function getUserList () {
  return service({
    url: '/getUserList',
    method: 'get'
  })
}

// 角色列表
export function getRoleList () {
  return service({
    url: '/getRoleList',
    method: 'get'
  })
}
