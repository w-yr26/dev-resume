// 物料区头部
export type HeaderType = {
  label: string
  icon: React.ForwardRefExoticComponent<
    Omit<AntdIconProps, 'ref'> & React.RefAttributes<HTMLSpanElement>
  >
}

export type CustomIptType = {
  placeholder: string
  label: string
}

export type AddItemType = {
  value: string
  label: string
  id: number
}
