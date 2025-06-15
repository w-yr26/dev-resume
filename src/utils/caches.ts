// import { registerSW } from 'virtual:pwa-register'

import { BASE_URL } from './request'

// let updateSWFn: (reloadPage?: boolean) => void = () => {}

// export function setupPWA() {
//   updateSWFn = registerSW({
//     onNeedRefresh() {
//       console.log('[PWA] 检测到缓存需要更新')
//       // 你可以在这里弹出提示：“有新模板可用，请点击刷新”
//     },
//     onOfflineReady() {
//       console.log('[PWA] 当前页面可离线使用')
//     },
//   })
// }

// // 提供统一的 updateSW 调用方式
// export function updateSW(reload = true) {
//   updateSWFn?.(reload)
// }

export const handleSaveTemplate = async () => {
  // 1. 先保存模板到后端
  // await api.saveTemplate(...);

  // 2. 手动清除缓存，确保下次请求获取最新数据
  if ('caches' in window) {
    const cache = await caches.open('template-cache-v1')
    await cache.delete('http://2f7d4220.r39.cpolar.top/resume/templates/getAll')
    console.log('模板缓存已清除，下次请求将重新获取最新数据')
  }

  // 3. （可选）立即重新请求数据，避免用户看到旧数据
  // fetchTemplates();
}

/**
 * 读取缓存的数据
 */
export const getCachesData = async (userId: string) => {
  return new Promise((resolve, reject) => {
    // 查找缓存中的响应
    caches.open('template-cache-v1').then((handler) => {
      handler
        .match(`${BASE_URL}/resume/templates/getAll/${userId}`)
        .then(async (cachedResponse) => {
          if (cachedResponse) {
            const data = await cachedResponse.json()
            console.log('Cached data:', data)
            resolve(data)
          } else {
            console.log('No cached data found')
            resolve(null)
          }
        })
        .catch((err) => {
          reject(err)
        })
    })
  })
}

/**
 * 删除缓存的数据
 */
export const delCachesData = async (userId: string) => {
  const handler = await caches.open('template-cache-v1')
  await handler.delete(`	/resume/templates/getAll/${userId}`)
}
