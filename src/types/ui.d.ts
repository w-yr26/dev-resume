import React from 'react'

export type uiType =
  | 'root'
  | 'container'
  | 'module'
  | 'section'
  | 'image'
  | 'text'
  | 'label'
  | 'html'

export type layoutType = 'vertical' | 'horizontal' | 'grid'

export type nodeType = {
  bind: string
  layout: layoutType
  type: uiType
  style: React.CSSProperties
  configStyle?: Record<string, any>
  label?: string
  children?: nodeType[]
}

export type uiStoreType = {
  isHorizontal: boolean
  uiSchema: nodeType | null
  setUiSchema: (newUISchema: nodeType | null) => void
  setIsHorizontal: (arg: boolean) => void
}
