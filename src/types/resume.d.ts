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
