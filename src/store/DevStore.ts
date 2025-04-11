import { create } from 'zustand'
import type {
  devInitType,
  devState,
  InfoArrTypeMap,
  keyType,
} from '@/types/dev'
import { produce } from 'immer'
import dayjs from 'dayjs'

const initialData: devInitType = {
  dataSource: {
    BASE_INFO: {
      info: {
        avatar:
          'data:image/jpeg;base64,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',
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
      label: '教育背景',
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
          date: [dayjs('2025-01-01'), dayjs('2025-03-05')],
          visible: true,
        },
      ],
      visible: true,
      label: '工作/实习经历',
    },
    PROJECT_EXP: {
      info: [
        {
          date: [dayjs('2025-03-05'), dayjs('2025-05-04')],
          id: new Date().getDate() + '',
          name: 'mini-vue',
          position: '前端开发人员',
          overview:
            'Vue3 简化版，实现 reactivity、runtime-core、runtime-dom 模块，该项目模拟了Vue3的基本功能，如 ref、reactive、computed、provide-inject、nextTick 等',
          output:
            '<p>1. 实现 ref/reactive，基于 Proxy 进行数据拦截，并使用 weakMap、Map、Set 实现Dep依赖收集及后续通知依赖更新</p><p>2. 引入虚拟 DOM 概念，通过 processComponent、processELement 等实现视图的创建更新流程，并通过diff算法优化视图更新</p><p>3. 实现 runtime-dom 模块，对 runtime-core 进一步解耦，实现 runtime-core 的跨平台支持(如 Canvas 平台)</p><p>4. 通过 Object.create() 寄生式继承，实现祖孙组件之间通过 provide-inject 进行通信；完成props、emits父子组件通信</p><p>5. 借助 Promise.then() 实现虚拟 DOM 的异步更新，实现 nextTick</p><p>6. 使用 pnpm + monorepo 实现单一代码库管理多模块等</p>',
          visible: true,
        },
      ],
      visible: true,
      label: '项目经历',
    },
    AWARD_LIST: {
      info: [],
      visible: true,
      label: '个人荣誉',
    },
    SKILL_LIST: {
      info: '<ul><li>掌握Web开发基础，掌握 HTML，CSS，JavaScript</li><li>熟悉 Vue2、Vue3 及全家桶，有实际项目开发经验</li><li>掌握 ES6 新特性；擅长 flex 布局，理解 Promise、原型链、事件循环等</li><li>熟悉 HTTP 协议，DNS/CDN 等网络相关知识</li><li>掌握基本的 git 命令进行代码版本管理</li><li>掌握Web开发基础，掌握 HTML，CSS，JavaScript</li><li>熟悉 Vue2、Vue3 及全家桶，有实际项目开发经验</li><li>掌握 ES6 新特性；擅长 flex 布局，理解 Promise、原型链、事件循环等</li><li>熟悉 HTTP 协议，DNS/CDN 等网络相关知识</li><li>掌握基本的 git 命令进行代码版本管理</li></ul>',
      visible: true,
      label: '技能特长',
    },
    HEART_LIST: {
      info: '打球',
      visible: true,
      label: '兴趣爱好',
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
}

const useDevStore = create<devState>((set) => {
  return {
    devSchema: initialData,
    immerBaseInfo: (newVal: string, key: string) =>
      set(
        produce((state: devState) => {
          state.devSchema.dataSource.BASE_INFO.info = {
            ...state.devSchema.dataSource.BASE_INFO.info,
            [key]: newVal,
          }
        })
      ),
    // 此处就包含了“教育背景”、“技能特长”、“兴趣爱好”的info字段的修改(因为这三者都是直接渲染标签内容，无需特殊处理)
    immerRichInfo: (newVal, key) =>
      set(
        produce((state: devState) => {
          state.devSchema.dataSource[key].info = newVal
        })
      ),
    immerVisible: <T extends keyof InfoArrTypeMap>(id: string, key: T) =>
      set(
        produce((state: devState) => {
          const infoList = state.devSchema.dataSource[key]
            .info as InfoArrTypeMap[T][]
          const newInfoList = infoList.map((item) => {
            if (item.id !== id) return item
            return {
              ...item,
              visible: !item.visible,
            }
          })

          ;(state.devSchema.dataSource[key].info as InfoArrTypeMap[T][]) =
            newInfoList
        })
      ),
    immerDel: <T extends keyof InfoArrTypeMap>(id: string, key: T) =>
      set(
        produce((state: devState) => {
          const infoList = state.devSchema.dataSource[key]
            .info as InfoArrTypeMap[T][]
          const newInfoList = infoList.filter((item) => item.id !== id)
          ;(state.devSchema.dataSource[key].info as InfoArrTypeMap[T][]) =
            newInfoList
        })
      ),
    addInfoList: (data: any, key: keyType) =>
      set(
        produce((state: devState) => {
          state.devSchema.dataSource[key].info = [
            ...state.devSchema.dataSource[key].info,
            data,
          ]
        })
      ),
    updateInfo: (data: any, id: string, key: keyType) =>
      set(
        produce((state: devState) => {
          state.devSchema.dataSource[key].info = state.devSchema.dataSource[
            key
          ].info.map((item) => {
            if (item.id === id) {
              return { ...data }
            } else return item
          })
        })
      ),
    changeItemVisible: (key) =>
      set(
        produce((state: devState) => {
          state.devSchema.dataSource[key].visible =
            !state.devSchema.dataSource[key].visible
        })
      ),
    resetInfo: (key) =>
      set(
        produce((state: devState) => {
          state.devSchema.dataSource[key] = {
            info: [],
            visible: true,
          }
        })
      ),
    changeLabel: (key, value) =>
      set(
        produce((state: devState) => {
          state.devSchema.dataSource[key].label = value
        })
      ),
  }
})

export default useDevStore
