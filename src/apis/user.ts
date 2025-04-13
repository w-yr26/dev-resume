import { request } from '@/utils'
import type { loginInfoType, LoginResponse } from '@/types/user'

export const loginAPI = (data: loginInfoType) => {
  return request<LoginResponse>('/resume/user/login', 'POST', data)
}

// 和密码相关password.ts
export const getVerificationCodeAPI = (email: string) => {
  return request(
    `/resume/user/sendCode?email=${encodeURIComponent(email)}`,
    'POST'
  )
}

export const postNewPwdAPI = (data: {
  email: string
  password: string
  verificationCode: string
}) => {
  return request<null>('/resume/user/forgot-password', 'POST', data)
}
