import React, { useEffect, useRef, useState } from 'react'
import { RefsContext } from './context'
import { Tour, type TourProps } from 'antd'
const RefsProvider = ({ children }: { children: React.ReactNode }) => {
  const ref1 = useRef<HTMLDivElement>(null)
  const ref2 = useRef<HTMLDivElement>(null)
  const ref3 = useRef<HTMLDivElement>(null)
  const ref4 = useRef<HTMLDivElement>(null)
  const ref5 = useRef<HTMLButtonElement>(null)

  const [open, setOpen] = useState<boolean>(false)

  const steps: TourProps['steps'] = [
    {
      title: 'Step 1',
      description: '将模块容器拖放至编辑区',
      target: () => ref1.current!,
    },
    {
      title: 'Step 2',
      description: '选择模块标题',
      target: () => ref2.current!,
    },
    {
      title: 'Step 3',
      description: '相关数据视图组件需放置在数据容器中',
      target: () => ref3.current!,
    },
    {
      title: 'Step 4',
      description: '设置模块/字段相关属性',
      target: () => ref4.current!,
    },
    {
      title: 'Step 5',
      description: '开发者模式，查看并修改对应模版json数据结构',
      target: () => ref5.current!,
    },
  ]

  useEffect(() => {
    setOpen(localStorage.getItem('isShowGuide') !== 'true')
  }, [])

  const handleClose = () => {
    setOpen(false)
    const val = localStorage.getItem('isShowGuide')
    if (!val) {
      localStorage.setItem('isShowGuide', 'true')
    }
  }

  return (
    <RefsContext.Provider value={{ ref1, ref2, ref3, ref4, ref5 }}>
      {children}
      <Tour open={open} onClose={handleClose} steps={steps} />
    </RefsContext.Provider>
  )
}

export default RefsProvider
