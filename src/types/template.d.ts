// 保存模板的数据类型

export type addTemplateType = {
  name: string
  styleConfig: string
  fastPhoto?: string
  userId: number
  isDefault: boolean
}

export type editTemplateType = Omit<addTemplateType, 'isDefault'> & {
  id: number
}
