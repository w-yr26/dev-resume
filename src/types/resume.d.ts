import { allKeyType } from './dev'

export type resumeItem = {
  id: string
  randomId: string
  slug: string
  title: string
  createTime: string
  updateTime: string
  templateId: string
  userId: string
  isDeleted: 0 | 1 | 2
  snapshot?: string
}

export type resumeListResp = {
  total: number
  records: resumeItem[]
}

export type moduleDataType = {
  info: any[]
  label: string
  visible: boolean
}

export type resumeDetailType = {
  content: Record<allKeyType, moduleDataType>
  resumeId: string
  templateId: string
  userId: string
}

export type addModuleType = {
  content: any
  resumeId: string
  type: allKeyType
  userId: string
}