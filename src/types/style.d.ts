import type { ColorPickerProps, GetProp } from 'antd'
type Color = GetProp<ColorPickerProps, 'value'>

export type styleInitType = {
  pagePadding: number
  modulePadding: number
  lineHeight: number
  fontSize: number
  mainColor: strign
  fontColor: string
  bgColor: string
  borderStyle: 'solid' | 'dashed' | 'dotted' | none
  setPageKeyToStyle: (
    key:
      | 'pagePadding'
      | 'modulePadding'
      | 'lineHeight'
      | 'fontSize'
      | 'mainColor'
      | 'fontColor'
      | 'bgColor'
      | 'borderStyle',
    val: any
  ) => void
}
