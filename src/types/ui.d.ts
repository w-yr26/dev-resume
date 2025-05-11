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

// 树形结构的数据类型
export type treeDateType = {
  key: string
  nodeKey: string
  title: string
  children: treeDateType[]
  cssStyle: React.CSSProperties
  rawNode: nodeType
}

// ====== 以下与简历模板设计有关 ===
export type singleNode = {
  type: uiType
  isNested: boolean
  layout: layoutType
  bind: string
  tag: string
  nodeKey: string
  style: object
  children?: singleNode[]
}

export type designStoreType = {
  currentUISchema: singleNode
  currentSelectedKey: string
  insertNode: (nodeKey: string, targetKey: string, desUISchema: any) => void
  setCurrentSelectedKey: (key: string) => void
  selectedSchema: () => singleNode | null
  setConfig: <T extends keyof singleNode>(
    nodeKey: string,
    key: T,
    val: singleNode[T]
  ) => void
}
