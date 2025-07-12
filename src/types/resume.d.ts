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
  snapshotUrl?: string
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
  snapshotUrl: string | null
}

export type addModuleType = {
  content: any
  resumeId: string
  type: allKeyType
  userId: string
  snapshotUrl?: string
}

export type updateNameType = {
  randomId: string
  title: string
}

// 子评论数据类型
export type subChatItemType = {
  content: string
  createTime: string
  // 被评论的人的id
  replyId: string
  // 被评论的人的用户名称
  replyUsername: string
  // 副评论id
  subCommentId: string
  userAvatar?: string
  // 评论其他评论的用户的id
  userId: string
  username: string
}

// 评论列表数据
export type chatRespType = {
  // 被评论的节点id
  commentMapId: string
  // 评论者的id
  commentatorId: string
  // 评论的内容
  content: string
  // 被评论的简历段落
  nodeText: string
  createTime: string
  // 主评论id
  mainCommentId: string
  resumeRandomId: string
  userAvatar?: string
  username: string
  // 子评论列表
  subCommentVOList: subChatItemType[] | null
}

export type SendChatType = {
  commentMapId: string
  commentatorId: number
  content: string
  isMain: 0 | 1
  nodeText?: string
  mainCommentId?: number
  replyId?: number
  resumeRandomId: string
}

export type shareUserItem = {
  targetType: 'user' | 'email' | 'phone'
  targetValue: string
}

export type createLinkType = {
  accessType: 'public' | 'private'
  expireAt?: string
  maxVisits?: number
  password?: string
  resourceId: string
  resourceType: 'resume' | 'article' | 'project'
  targetList?: shareUserItem[]
  permissions?: string
  userId: number
}

export type shareRespType = {
  share_url: string
}

export type shareTargetType = 'resume' | 'article' | 'project'

export type sharedUserItem = {
  createTime: string
  updateTime: string
  id: number
  isDeleted: 0 | 1
  shareToken: string
  targetType: shareTargetType
  targetValue: string
}

export type shareLinkInfoType = {
  shareLink: linkItem
  targets: sharedUserItem[] | null
  permissions: string
}

export type linkItem = {
  accessType: 'public' | 'private'
  expireAt: string
  maxVisits: number | undefined
  resourceId: string
  userId: number
  visitCount: number // 已访问数量
  createTime: string
  shareToken: string
  isDeleted: number // 是否删除
  isActive: number // 是否活跃
  id: number
  permissions: string // 权限字段
  shareUrl: string
  password?: string
}

export type shareStoreType = {
  permissions: number[]
  targetUsers: sharedUserItem[] | null
  updateTarget: (val: sharedUserItem[] | null) => void
  updatePermissions: (val: number[]) => void
}

export type optionsItem = {
  id: string
  batchId: string
  resumeId: string
  userId: string
  question: string
  focusPoint: string
  followUp: string
  difficulty: string
  followUpList: string[]
  createTime: string
}

export type questionRespItem = {
  batchId: string
  questions: optionsItem[]
}
