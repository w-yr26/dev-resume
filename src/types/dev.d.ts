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
  toolTip?: string
  handleChange?: (val: string) => void
  handleBlur?: () => void
}

export type CustomIptType = {
  placeholder: string
  label: string
  value?: any
  onChange?: (val: any) => void
  onBlur?: (val: any) => void
}

export type AddItemType = {
  value: string
  label: string
  id: number
}

export type AIBrushType = {
  aiContent?: string
  aiDescription?: string
}

export type BaseInfoType = {
  avatar: string
  userName: string
  position: string
  phone: string
  email: string
  tblob: string | null
  gender: 0 | 1
  age: number | undefined
  visible: boolean
  id: string
}

export type EduBgType = {
  school: string
  bg: string
  id: string
  visible: boolean
  date: string
}

export type WorkExpItemType = {
  company: string
  position: string
  date: string
  description: string
  output: string
  techStack: string
  id: string
  visible: boolean
} & AIBrushType

export type PeojectExpItemType = Pick<
  WorkExpItemType,
  'id' | 'date' | 'description' | 'output' | 'visible'
> & {
  title: string
  role: string
} & AIBrushType

export type AwardItemType = {
  id: string
  award: string
  date: string
  describe: string
  visible: boolean
}

export type SkillType = {
  content: string
  id: string
  visible: boolean
} & AIBrushType

export type HeartType = {
  interest: string
  id: string
  visible: boolean
}

export type AwardType = {
  title: string
  description: string
  date: string
  id: string
  visible: boolean
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
  icon: React.ReactNode
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
      info: SkillType[]
      visible: boolean
      label?: string
    }
    HEART_LIST: {
      info: HeartType[]
      visible: boolean
      label?: string
    }
  }
}

// 这个Map存放info为数组的字段
export type InfoArrTypeMap = {
  WORK_EXP: WorkExpItemType
  PROJECT_EXP: PeojectExpItemType
  AWARD_LIST: AwardItemType
  EDU_BG: EduBgType
}

export type devState = {
  devSchema: devInitType
  resumeId: string // 当前简历的random_id
  templateId: string // 模板id
  setResumeId: (id: string) => void
  setTemplateId: (id: string) => void
  setDataSource: (dataSource: any) => void
  immerBaseInfo: (newVal: number | string, key: string) => void
  immerRichInfo: (newVal: string, key: 'SKILL_LIST' | 'HEART_LIST') => void
  immerVisible: (id: string, key: keyType) => void
  immerDel: (id: string, key: keyType) => void
  addInfoList: (data: any, key: keyType) => void
  updateInfo: (data: any, id: string, key: keyType) => void
  changeItemVisible: (key: allKeyType) => void
  resetInfo: (key: allKeyType) => void
  resetGlobalInfo: () => void
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
