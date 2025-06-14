const TEMPLATE_CACHE_NAME = 'template-cache'
// const TEMPLATE_UPDATE_KEY = 'template-last-update'
const TEMPLATE_UPDATE_INTERVAL = 1000 * 60 * 5 // 5 分钟

// 用于存储更新时间（IndexedDB 或 global Map 更安全，简单起见用 globalThis）
const updateTimeMap = {}

// TODO：
// 1. 非目标页面调用接口，应该是缓存获取的数据，另外，需要根据请求间隔时间、最大请求次数做限制
// 2. 目标页面调用接口，无非就是缓存拿不到数据了，此时才应该是正常返回数据 & 更新缓存
// 3. 模板更新/创建页面，则应该是强制刷新缓存
// 使用应用的整个生命周期中，第一次命中的是注册事件，此后才是命中fetch事件
self.addEventListener('fetch', (event) => {
  const req = event.request
  const url = new URL(req.url)

  if (url.pathname.startsWith('/resume/templates/getAll/')) {
    const userId = url.pathname.split('/').pop() || 'default'
    console.log('userId', userId, req)
    console.log(req.headers.get('X-Pre-Load'))

    const preLoad = req.headers.get('X-Pre-Load') === 'true'

    event.respondWith(
      caches.open(TEMPLATE_CACHE_NAME).then(async (cache) => {
        const cacheKey = req
        // const now = Date.now()
        // const lastUpdate = updateTimeMap[userId] || 0

        // if (forceUpdate) {
        //   const shouldUpdate = now - lastUpdate > TEMPLATE_UPDATE_INTERVAL

        //   if (shouldUpdate) {
        //     try {
        //       const netResp = await fetch(req)
        //       cache.put(cacheKey, netResp.clone())
        //       // 更新最新一次调用接口的时间记录
        //       updateTimeMap[userId] = now
        //       console.log(`[SW] 模板缓存已更新 userId=${userId}`)
        //       return netResp
        //     } catch (_) {
        //       console.warn(`[SW] 模板请求失败，使用旧缓存`)
        //       const cachedResp = await cache.match(cacheKey)
        //       return cachedResp || Response.error()
        //     }
        //   } else {
        //     console.log(`[SW] 模板缓存更新时间间隔未达标，跳过更新`)
        //     const cachedResp = await cache.match(cacheKey)
        //     return cachedResp || fetch(req) // fallback
        //   }
        // }

        // 非 force-update 的正常 fetch，优先返回缓存

        // 非目标页面进行预加载
        if (preLoad) {
          try {
            const resp = await fetch(req)
            // 缓存数据
            cache.put(cacheKey, resp.clone())
            // 预请求数据的页面并不真正消费该数据，没必要重复发起请求
            return new Response(null, { status: 204 })
          } catch (error) {
            // 预加载失败，返回null，不影响页面b
            return new Response(null, { status: 200 })
          }
        } else {
          // 目标页面被worker拦截，优先从缓存读取
          const cachedResp = await cache.match(cacheKey)
          if (cachedResp) {
            console.log('缓存命中')
            return cachedResp
          }
          console.log('缓存不命中，发起网络请求')

          // 缓存读取不到，则发起请求
          const netResp = await fetch(req)
          cache.put(cacheKey, netResp.clone())
          return netResp
        }
      })
    )
  }
})
