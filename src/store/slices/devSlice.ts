import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { devInitType } from '@/types/dev'

const initialState: devInitType = {
  dataSource: {
    BASE_INFO: {
      info: {
        avatar: '',
        user_name: '',
        position: '',
        phone: '',
        email: '',
        blob: '',
        gender: 1,
        age: undefined,
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

const devSlice = createSlice({
  name: 'dev',
  initialState,
  reducers: {
    addNum(state, action: PayloadAction<number>) {
      state.num += action.payload
    },
  },
})

export const { addNum } = devSlice.actions

export default devSlice.reducer
