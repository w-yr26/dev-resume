import type { Dayjs } from 'dayjs'
import React from 'react'
// 物料区头部
export type HeaderType = {
  label: string
  icon: React.ForwardRefExoticComponent<
    Omit<AntdIconProps, 'ref'> & React.RefAttributes<HTMLSpanElement>
  >
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
}

export type EduBgType = {
  bg: string
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
  'id' | 'date' | 'position' | 'overview' | 'output'
> & {
  name: string
}

export type AwardItemType = {
  id: string
  award: string
  date: string
  describe: string
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
      info: BaseInfoType
      visible: boolean
      label?: string
    }
    EDU_BG: {
      info: string
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

export type devState = {
  devSchema: devInitType
  immerBaseInfo: (newVal: string, key: string) => void
  immerVisible: (id: string, key: keyType) => void
  immerDel: (id: string, key: keyType) => void
  addInfoList: (data: any, key: keyType) => void
  updateInfo: (data: any, id: string, key: keyType) => void
  changeItemVisible: (key: keyType) => void
  resetInfo: (key: keyType) => void
  changeLabel: (key: keyType, value: string) => void
}

export type keyType = 'WORK_EXP'
