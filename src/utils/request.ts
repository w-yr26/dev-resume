import { message } from 'antd'
import axios, { type AxiosError, type Method } from 'axios'
import router from '@/router'
import { useUserStore } from '@/store'
import { postRefreshTokenAPI } from '@/apis/user'

// 路由白名单
const WHITE_LIST = [
  '/resume/user/login', // 登录
  '/resume/user/register', // 注册
  '/resume/user/RegisterCode', // 获取注册的验证码
  '/resume/user/gitee/callback', // gitee授权回调
  '/resume/user/refreshToken', // 无感刷新
  '/resume/user/forgot-password', // 忘记密码
  '/resume/user/sendCode', // 找回密码
]

export const BASE_URL = 'http://47.121.143.89/api'

// 请求实例
const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
})

// 请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前校验token令牌，并在请求头添加token
    const store = useUserStore.getState()
    const token = store.info.token

    if (token && !WHITE_LIST.includes(config.url || '')) {
      config.headers.Authorization = token
    }

    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数
    // 注意，请求状态码!==业务状态码
    const { code, msg, data } = response.data

    // 业务统一状态码出错
    if (code !== 1) {
      // 如果是刷新token的请求出现业务状态码错误，需要拦截到登录页
      if (response.config.url === '/resume/user/refreshToken') {
        const { setLastRoute } = useUserStore.getState()
        // 记录最新一次的路由
        const lastRoute = window.location.pathname + window.location.search
        setLastRoute(lastRoute)
        jumpToLogin()
        return
      }
      message.error(msg || '请求出错, 请稍后再试')
      return Promise.reject({
        code,
        msg,
        data,
      })
    }

    // 数据剥离
    return response.data
  },
  async function (error: AxiosError) {
    const { status, config } = error
    // 401错误
    if (status === 401) {
      // refreshToken过期，说明真的要重新登陆了
      if (config?.url === '/resume/user/refreshToken') {
        jumpToLogin()
      } else {
        // 无感刷新
        if (!config) {
          jumpToLogin()
          return
        }
        const store = useUserStore.getState()
        const refreshToken = store.info.refreshToken
        // 更新token的接口如果请求状态码也出错，会被新的响应错误拦截器拦截；如果业务状态码出错，会被新的响应成功拦截器拦截
        const { data } = await postRefreshTokenAPI(refreshToken || '')
        // 更新token
        store.info.token = data.token
        store.info.refreshToken = data.refreshToken
        localStorage.setItem('token', data.token)
        localStorage.setItem('refreshToken', data.refreshToken)
        return instance(config!)
      }
    } else {
      message.error(JSON.stringify(error))
    }

    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

// 跳转登录
// TODO: 根据历史栈，在登录成功之后回跳到上次访问的页面
const jumpToLogin = () => {
  message.warning('当前登录状态有误, 请重新登录')
  router.navigate('/login', {
    replace: true,
  })
}

export type Data<T> = {
  data: T
  code: string | number
  msg: string | null
}

/**
 * @param url 接口地址
 * @param method 请求方法(默认为GET)
 * @param submitData 请求数据(可选)
 * @returns
 */
export const request = <T>(
  url: string,
  method: Method = 'GET',
  submitData?: object
) => {
  return instance.request<any, Data<T>>({
    url,
    method,
    [method.toUpperCase() === 'GET' ? 'params' : 'data']: submitData,
  })
}
