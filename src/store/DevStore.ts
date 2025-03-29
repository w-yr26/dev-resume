import { create } from 'zustand'
import type { devInitType, devState } from '@/types/dev'

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
    },
    WORK_EXP: {
      info: [
        {
          company: '腾讯',
          position: '前端开发实习生',
          tecStack: 'Vue2、Vue3',
          id: '001',
          output: '实习产出',
          overview: '项目总结',
          date: '2025-03-16',
        },
      ],
      visible: true,
    },
    PROJECT_EXP: {
      info: [],
      visible: true,
    },
    AWARD_LIST: {
      info: [],
      visible: true,
    },
    SKILL_LIST: {
      info: '',
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

const useDevStore = create<devState>(() => {
  return {
    devSchema: initialData,
  }
})

export default useDevStore
