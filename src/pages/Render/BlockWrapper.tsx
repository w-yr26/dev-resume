import React, { useLayoutEffect, useRef } from 'react'

const BlockWrapper = ({
  children,
  style,
  data,
  parentTop,
}: {
  children: React.ReactNode
  style: React.CSSProperties
  data: any
  parentTop: number
}) => {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (ref.current) {
      const { top } = ref.current.getBoundingClientRect()
      console.log('parent', parentTop, top)

      console.log('height', parentTop - top, data)
    }
  }, [])

  return (
    <div className="block-wrapper" ref={ref} style={style}>
      {children}
    </div>
  )
}

export default BlockWrapper
