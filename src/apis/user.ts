import { request } from '@/utils'
import type { loginInfoType } from '@/types/user'

export const loginAPI = (data: loginInfoType) => {
  return request('/resume/user/login', 'POST', data)
}
