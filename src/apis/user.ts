import { request } from '@/utils'
import type {
  loginInfoType,
  LoginResponse,
  refreshLoginResp,
} from '@/types/user'

/**
 * 表单登录
 */
export const loginAPI = (data: loginInfoType) => {
  return request<LoginResponse>('/resume/user/login', 'POST', data)
}

/**
 * 获取验证码 - 重置密码
 */
export const getVerificationCodeAPI = (email: string) => {
  return request<null>(`/resume/user/sendCode`, 'POST', {
    email,
  })
}

/**
 * 修改密码
 */
export const postNewPwdAPI = (data: {
  email: string
  password: string
  verificationCode: string
}) => {
  return request<null>('/resume/user/forgot-password', 'POST', data)
}

/**
 * 获取邮箱验证码 - 注册
 */
export const postRegisterCodeAPI = (email: string) => {
  return request<null>(`/resume/user/RegisterCode`, 'POST', {
    email,
  })
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
 * 无感刷新
 */
export const postRefreshTokenAPI = (refreshToken: string) => {
  return request<refreshLoginResp>('/resume/user/refreshToken', 'POST', {
    refreshToken,
  })
}

/**
 * 单文件上传
 * category resume、avatar、template
 */
export const postUploadOneAPI = (data: FormData, category: string) => {
  return request<string>(
    `/user/common/upload?category=${category}`,
    'POST',
    data
  )
}

/**
 * 删除文件
 */
export const delFileAPI = (url: string, category: string) => {
  return request(`/user/common/delete?category=${category}&fileUrl=${url}`)
}
