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

// String redirectUrl = ""
//         + "?client_id=" + CLIENT_ID
//         + "&redirect_uri=" + URLEncoder.encode("http://localhost:8080/resume/user/gitee/callback", "UTF-8")
//         + "&response_type=code";

// const CLIENT_ID =
//   'f7a79df789b8ae0a5f1fa8d3c64c749fd0ab98008d445c7605fa5a7ceffe62a2'
// const callback = 'http://localhost:8080/resume/user/gitee/callback'
export const postGiteeLoginAPI = () => {
  // return request<any>(
  //   `https://gitee.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${callback}&response_type=code`,
  //   'POST'
  // )

  return request<any>('/resume/user/gitee/redirect')
}
