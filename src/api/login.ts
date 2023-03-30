import service from "@/utils/request"

interface LoginData {
  username: string,
  password: string
}

export function getData (data: LoginData) {
  return service({
    url: '/login',
    method: 'post',
    data
  })
}
