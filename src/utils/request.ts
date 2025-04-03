import { message } from 'antd'
import axios, { type AxiosError, type Method } from 'axios'
import router from '@/router'
import { useUserStore } from '@/store'
const store = useUserStore.getState()

// 请求实例
const instance = axios.create({
  baseURL: 'http://123.207.71.32:8082',
  timeout: 5000,
})

// 请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前校验token令牌，并在请求头添加token
    const token = store.info.token
    if (token) {
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
    const { code } = response.data
    const { authorization } = response.headers
    const token = store.info.token
    const updateInfo = store.updateInfo
    // 无token，则存储
    if (!token) {
      updateInfo('token', authorization)
      localStorage.setItem('token', authorization)
    }

    // 业务统一状态码出错
    if (code !== 1) {
      message.error('请求出错, 请稍后再试')
    }

    // 数据剥离
    return response.data
  },
  function (error: AxiosError) {
    const { status } = error
    // 401错误, token失效
    if (status === 401) {
      message.warning('当前登录状态有误, 请重新登录')
      router.navigate('/login', {
        replace: true,
      })
    }

    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

type Data<T> = {
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
  return instance.request<Data<T>>({
    url,
    method,
    [method.toUpperCase() === 'GET' ? 'params' : 'data']: submitData,
  })
}
