// 物料区头部
export type HeaderType = {
  label: string
  icon: React.ForwardRefExoticComponent<
    Omit<AntdIconProps, 'ref'> & React.RefAttributes<HTMLSpanElement>
  >
  opMenu?: false
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

export type WorkExpItemType = {
  company: string
  position: string
  date: string
  overview: string
  output: string
  tecStack: string
  id: string
}

export type ExperienceItemType = Pick<
  WorkExpItemType,
  'id' | 'date' | 'position' | 'overview' | 'output'
> & {
  name: string
}

export type AwardItemType = {
  id: string
  award: string
  date: string
  describe: string
}
