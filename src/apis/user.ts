import { request } from '@/utils'
import type { loginInfoType, LoginResponse } from '@/types/user'

export const loginAPI = (data: loginInfoType) => {
  return request<LoginResponse>('/resume/user/login', 'POST', data)
}

// 和密码相关password.ts
export const getVerificationCodeAPI = (email: string) => {
  return request<null>(`/resume/user/sendCode`, 'POST', {
    email,
  })
}

export const postNewPwdAPI = (data: {
  email: string
  password: string
  verificationCode: string
}) => {
  return request<null>('/resume/user/forgot-password', 'POST', data)
}

/**
 * 获取邮箱验证码
 * @param email
 * @returns
 */
export const postRegisterCodeAPI = (email: string) => {
  return request<null>(`/resume/user/RegisterCode?email=${email}`, 'POST')
}

/**
 * 用户注册
 * @param data
 * @returns
 */
export const postRegisterAPI = (data: {
  avatar?: string
  email: string
  password: string
  username: string
  verificationCode: string
}) => {
  return request<any>('/resume/user/register', 'POST', data)
}

/**
 * Gitee三方登录
 * @param code gitee授权的code
 */
export const getOauthGiteeAPI = (code: string) => {
  return request<LoginResponse>(`/resume/user/gitee/callback?code=${code}`)
}

/**
 * 单文件上传
 */
export const postUploadOneAPI = (data: FormData) => {
  return request<any>('/user/common/uploadOne', 'POST', data)
}
