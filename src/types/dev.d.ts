import type { Dayjs } from 'dayjs'
import React from 'react'

// 自定义局部布局
export type LayoutPropsType = {
  children: React.ReactNode
}

// 物料区头部
export type HeaderType = {
  label: string
  svg?: React.ReactNode
  opMenu?: false
  children?: React.ReactNode
  isEdit?: boolean
  handleChange?: (val: string) => void
  handleBlur?: () => void
}

export type CustomIptType = {
  placeholder: string
  label: string
  value?: any
  onChange?: (val: any) => void
}

export type AddItemType = {
  value: string
  label: string
  id: number
}

export type BaseInfoType = {
  avatar: string
  user_name: string
  position: string
  phone: string
  email: string
  blob: string
  gender: 0 | 1
  age: number | undefined
  visible: boolean
}

export type EduBgType = {
  school: string
  bg: string
  id: string
  visible: boolean
  date: [Dayjs, Dayjs]
}

export type WorkExpItemType = {
  company: string
  position: string
  date: [Dayjs, Dayjs]
  overview: string
  output: string
  tecStack: string
  id: string
  visible: boolean
}

export type PeojectExpItemType = Pick<
  WorkExpItemType,
  'id' | 'date' | 'position' | 'overview' | 'output' | 'visible'
> & {
  name: string
}

export type AwardItemType = {
  id: string
  award: string
  date: [Dayjs, Dayjs]
  describe: string
  visible: boolean
}

export type SkillType = {
  skill: string
}

export type HeartType = {
  heart: string
}

export type optionalCom =
  | 'BASE_INFO'
  | 'EDU_BG'
  | 'WORK_EXP'
  | 'PROJECT_EXP'
  | 'AWARD_LIST'
  | 'SKILL_LIST'
  | 'HEART_LIST'

export type headMenuType = {
  label: string
  key: string
  icon: React.ForwardRefExoticComponent<
    Omit<AntdIconProps, 'ref'> & React.RefAttributes<HTMLSpanElement>
  >
  callback?: () => void
}

// 以下是dev模块和store相关的数据类型声明
export type devInitType = {
  dataSource: {
    BASE_INFO: {
      info: BaseInfoType[]
      visible: boolean
      label?: string
    }
    EDU_BG: {
      info: EduBgType[]
      visible: boolean
      label?: string
    }
    WORK_EXP: {
      info: WorkExpItemType[]
      visible: boolean
      label?: string
    }
    PROJECT_EXP: {
      info: PeojectExpItemType[]
      visible: boolean
      label?: string
    }
    AWARD_LIST: {
      info: AwardItemType[]
      visible: boolean
      label?: string
    }
    SKILL_LIST: {
      info: string
      visible: boolean
      label?: string
    }
    HEART_LIST: {
      info: string
      visible: boolean
      label?: string
    }
  }
  componentList: optionalCom[]
  curTemplate: string // 当前使用的简历模板id
}

// 这个Map存放info为数组的字段
export type InfoArrTypeMap = {
  WORK_EXP: WorkExpItemType
  PROJECT_EXP: PeojectExpItemType
  AWARD_LIST: AwardItemType
  EDU_BG: EduBgType
}

// 这个Map存放info为string的字段
export type InfoStrTypeMap = {
  EDU_BG: string
  SKILL_LIST: string
  HEART_LIST: string
}

export type devState = {
  devSchema: devInitType
  immerBaseInfo: (newVal: string, key: string) => void
  immerRichInfo: (newVal: string, key: keyof InfoStrTypeMap) => void
  immerVisible: (id: string, key: keyType) => void
  immerDel: (id: string, key: keyType) => void
  addInfoList: (data: any, key: keyType) => void
  updateInfo: (data: any, id: string, key: keyType) => void
  changeItemVisible: (key: allKeyType) => void
  resetInfo: (key: allKeyType) => void
  changeLabel: (key: allKeyType, value: string) => void
}

export type keyType = keyof InfoArrTypeMap
export type allKeyType =
  | 'WORK_EXP'
  | 'PROJECT_EXP'
  | 'AWARD_LIST'
  | 'EDU_BG'
  | 'SKILL_LIST'
  | 'HEART_LIST'
  | 'BASE_INFO'
