import service from '@/utils/request'

export function getAuthorityList () {
  return service ({
    url: '/getAuthorityList',
    method: 'get'
  })
}
