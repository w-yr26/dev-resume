const TEMPLATE_CACHE_NAME = 'template-cache'
const INVALIDATE_TEMPLATE_CACHE = 'INVALIDATE_TEMPLATE_CACHE'
// const TEMPLATE_UPDATE_KEY = 'template-last-update'
const TEMPLATE_UPDATE_INTERVAL = 1000 * 60 * 5 // 5 分钟
const MAX_COUNT = 3
// 用于存储更新时间（IndexedDB 或 global Map 更安全，简单起见用 globalThis）
const updateTimeMap = {}

// 使用应用的整个生命周期中，第一次命中的是注册事件，此后才是命中fetch事件
self.addEventListener('fetch', (event) => {
  const req = event.request
  const url = new URL(req.url)

  if (url.pathname.startsWith('/api/resume/templates/getAll/')) {
    // const userId = url.pathname.split('/').pop() || 'default'
    const preLoad = req.headers.get('X-Pre-Load') === 'true'
    const count = req.headers.get('X-Max-Count')

    event.respondWith(
      caches.open(TEMPLATE_CACHE_NAME).then(async (cache) => {
        const cacheKey = req
        // 非目标页面进行预加载
        if (preLoad) {
          // 小于最大请求次数，允许调用接口预请求数据
          if (count < MAX_COUNT) {
            try {
              const resp = await fetch(req)
              // 缓存数据
              cache.put(cacheKey, resp.clone())
              // 预请求数据的页面并不真正消费该数据，没必要重复发起请求
              return new Response(null, { status: 204 })
            } catch (error) {
              // 预加载失败，返回null，不影响页面b
              console.log('sw error')
              return new Response(null, { status: 200 })
            }
          } else {
            console.log('已达最大请求次数')
            const cachedResp = await cache.match(cacheKey)
            if (cachedResp) {
              console.log('缓存命中')
              return cachedResp
            }
            console.log('缓存不命中，发起网络请求，并将结果缓存')

            // 缓存读取不到，则发起请求
            const netResp = await fetch(req)
            cache.put(cacheKey, netResp.clone())
            return netResp
          }
        } else {
          // 目标页面被worker拦截，优先从缓存读取
          const cachedResp = await cache.match(cacheKey)
          if (cachedResp) {
            console.log('缓存命中')
            return cachedResp
          }
          console.log('缓存不命中，发起网络请求，并将结果缓存')

          // 缓存读取不到，则发起请求
          const netResp = await fetch(req)
          cache.put(cacheKey, netResp.clone())
          return netResp
        }
      })
    )
  }
})

self.addEventListener('message', (event) => {
  console.log(event)
  const {
    data: { type, userId },
  } = event

  // 更新caches缓存
  if (type === INVALIDATE_TEMPLATE_CACHE) {
    caches.open(TEMPLATE_CACHE_NAME).then((cache) => {
      cache.keys().then((requests) => {
        requests.forEach((request) => {
          const url = new URL(request.url)
          if (url.pathname.includes(`/resume/templates/getAll/${userId}`)) {
            cache.delete(request)
          }
        })
      })
    })
  }
})
