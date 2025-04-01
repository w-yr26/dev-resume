import { create } from 'zustand'
import type { devInitType, devState } from '@/types/dev'

const initialData: devInitType = {
  dataSource: {
    BASE_INFO: {
      info: {
        avatar: 'https://www.src.jpg',
        user_name: '张柯林',
        gender: 1,
        age: 21,
        position: '前端开发实习生',
        phone: '18026086011',
        email: '18026086011@163.com',
        blob: 'https://juejin.cn/user/4479833607519512/posts',
      },
      visible: true,
    },
    EDU_BG: {
      info: '',
      visible: true,
    },
    WORK_EXP: {
      info: [
        {
          company: '腾讯',
          position: '前端开发实习生',
          tecStack: 'Vue2、Vue3',
          id: '001',
          output:
            '<p>基于 canvas 和 video，生成视频海报图和缩略图，实现按视频总时长动态均分时间点、生成视频缩略图(雪碧图)，实现在进度条预览内容</p><p>异步顺序执行，结合 reduce 实现 mergePromise 方法，确保缩略图绘制按时间点顺序执行，避免异步执行速度的不确定性导致渲染顺序问题</p><p>基于 FFmpeg.wasm 实现视频字幕烧制功能</p><p>使用 BroadcaseChannel 进行页面通信，显示视频处理进度</p><p>使用 indexDB 缓存所需字体文件，提升二次构建速度</p><p>基于 EventBus 埋入对应事件的监听，并通过维护用户操作快照记录，实现撤销、重做功能</p>',
          overview:
            '一款致力于制作流量推广业务的素材的平台，面向司内设计人员，实现流量推广小游戏素材快速换皮、研发和制作，为游戏侧服务',
          date: '2025-03-16',
        },
      ],
      visible: true,
    },
    PROJECT_EXP: {
      info: [
        {
          date: '2025/02',
          id: new Date().getDate() + '',
          name: 'mini-vue',
          position: '前端开发人员',
          overview:
            'Vue3 简化版，实现 reactivity、runtime-core、runtime-dom 模块，该项目模拟了Vue3的基本功能，如 ref、reactive、computed、provide-inject、nextTick 等',
          output:
            '<p>1. 实现 ref/reactive，基于 Proxy 进行数据拦截，并使用 weakMap、Map、Set 实现Dep依赖收集及后续通知依赖更新</p><p>2. 引入虚拟 DOM 概念，通过 processComponent、processELement 等实现视图的创建更新流程，并通过diff算法优化视图更新</p><p>3. 实现 runtime-dom 模块，对 runtime-core 进一步解耦，实现 runtime-core 的跨平台支持(如 Canvas 平台)</p><p>4. 通过 Object.create() 寄生式继承，实现祖孙组件之间通过 provide-inject 进行通信；完成props、emits父子组件通信</p><p>5. 借助 Promise.then() 实现虚拟 DOM 的异步更新，实现 nextTick</p><p>6. 使用 pnpm + monorepo 实现单一代码库管理多模块等</p>',
        },
      ],
      visible: true,
    },
    AWARD_LIST: {
      info: [],
      visible: true,
    },
    SKILL_LIST: {
      info: '<ul><li>掌握Web开发基础，掌握 HTML，CSS，JavaScript</li><li>熟悉 Vue2、Vue3 及全家桶，有实际项目开发经验</li><li>掌握 ES6 新特性；擅长 flex 布局，理解 Promise、原型链、事件循环等</li><li>熟悉 HTTP 协议，DNS/CDN 等网络相关知识</li><li>掌握基本的 git 命令进行代码版本管理</li><li>掌握Web开发基础，掌握 HTML，CSS，JavaScript</li><li>熟悉 Vue2、Vue3 及全家桶，有实际项目开发经验</li><li>掌握 ES6 新特性；擅长 flex 布局，理解 Promise、原型链、事件循环等</li><li>熟悉 HTTP 协议，DNS/CDN 等网络相关知识</li><li>掌握基本的 git 命令进行代码版本管理</li></ul>',
      visible: true,
    },
    HEART_LIST: {
      info: '',
      visible: true,
    },
  },
  componentList: [
    'BASE_INFO',
    'EDU_BG',
    'WORK_EXP',
    'PROJECT_EXP',
    'AWARD_LIST',
    'SKILL_LIST',
    'HEART_LIST',
  ],
  curTemplate: '01',
  num: 10,
}

const useDevStore = create<devState>((set) => {
  return {
    devSchema: initialData,
    changeBaseInfo: (newVal: string, key: string) => {
      return set((state) => {
        return {
          devSchema: {
            ...state.devSchema,
            dataSource: {
              ...state.devSchema.dataSource,
              BASE_INFO: {
                ...state.devSchema.dataSource.BASE_INFO,
                info: {
                  ...state.devSchema.dataSource.BASE_INFO.info,
                  [key]: newVal,
                },
              },
            },
          },
        }
      })
    },
  }
})

export default useDevStore
