import React from 'react'

export type uiType =
  | 'root'
  | 'container'
  | 'module'
  | 'section'
  | 'image'
  | 'text'
  | 'label'
  | 'md'
  | 'columns'

export type layoutType = 'vertical' | 'horizontal' | 'grid'

export type nodeType = {
  bind: string
  layout: layoutType
  type: uiType
  style: React.CSSProperties
  nodeKey: string
  configStyle?: Record<string, any>
  label?: string
  tag?: string
  children?: nodeType[]
}

export type uiStoreType = {
  isHorizontal: boolean
  uiSchema: nodeType | null
  setUiSchema: (newUISchema: nodeType | null) => void
  setIsHorizontal: (arg: boolean) => void
  updateUISchema: (
    node: nodeType,
    id: string,
    updater: (node: nodeType) => nodeType
  ) => void
}

// style编辑器树形结构的数据类型
export type treeDateType = {
  key: string
  nodeKey: string
  title: string
  children: treeDateType[]
  cssStyle: React.CSSProperties
  rawNode: nodeType
}

// 接口返回的模板列表的数据结构
export type temDataType = {
  diyTemplateList: templateListType[]
  templateList: templateListType[]
}
export type templateListType = {
  id: string
  style_config: nodeType
  templateName?: string
  name?: string
  isDefault: boolean
  fastPhoto: string
  updateTime: string
  createTime: string
}

// ====== 以下与简历模板设计有关 ===
export type singleNode = {
  constraints: {
    ableBind: boolean // 当前容器是否允许绑定字段
    ableDel: boolean // 当前容器是否允许删除操作
    isNestedAgain: boolean // 当前容器是否支持再嵌套
    maxChildren?:number // children允许的数量
  }
  type: uiType
  layout: layoutType
  bind: string
  tag: string
  nodeKey: string
  style: React.CSSProperties
  configStyle?: any
  children: singleNode[]
  path?: string
}

export type designStoreType = {
  currentUISchema: singleNode
  currentSelectedKey: string
  setCurUISchema: (val: singleNode) => void
  insertNode: (nodeKey: string, targetKey: string, desUISchema: any) => void
  delNode: (prevKey: string, nodeKey: string) => void
  setCurrentSelectedKey: (key: string) => void
  selectedSchema: () => singleNode | null
  setConfig: <T extends keyof singleNode>(
    nodeKey: string,
    key: T,
    val: singleNode[T]
  ) => void
  changeStyle: (
    nodeKey: string,
    styleKey: keyof React.CSSProperties,
    newCssStyle: any
  ) => void
  changeChildWidth: (nodeKey: string, idx: number, proportion: string) => void
  setRootStyle: (key: string, val: any) => void
}

// 获取模板详情返回的数据结构
export type temDetailRespType = {
  createTime: string
  updateTime: string
  fastPhoto: string
  id: string
  isDelete: 0 | 1
  name: string
  style_config: singleNode
  userId: string
}
