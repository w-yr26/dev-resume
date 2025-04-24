import type { ColorPickerProps, GetProp } from 'antd'
type Color = GetProp<ColorPickerProps, 'value'>

export type styleInitType = {
  pagPadding: number
  modulePadding: number
  lineHeight: number
  fontSize: number
  mainColor: strign
  fontColor: string
  bgColor: string
  sidebarProportions: number[]
  borderStyle: 'solid' | 'dashed' | 'dotted' | none
  setPagePadding: (val: number) => void
  setModulePadding: (val: number) => void
  setLineHeight: (val: number) => void
  setFontSize: (val: number) => void
  setMainColor: (val: string) => void
  setFontColor: (val: string) => void
  setBgColor: (val: string) => void
  setBorderStyle: (val: 'solid' | 'dashed' | 'dotted' | none) => void
  setSidebarProportions: (val: number[]) => void
}
