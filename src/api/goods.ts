import service from '@/utils/request'

export function getGoodsList () {
  return service ({
    url: '/getGoodsList',
    method: 'get'
  })
}
