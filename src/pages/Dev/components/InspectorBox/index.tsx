import { memo, useEffect, useRef, useState } from 'react'

type inspectorType = {
  children: React.ReactNode
  isReadMode: boolean
}

type ButtonPanelPosition = {
  top: number
  left: number
}

const InspectorBox = memo<inspectorType>(({ children, isReadMode }) => {
  const [hoveredEl, setHoveredEl] = useState<HTMLElement | null>(null)
  const [_, setSelectedEl] = useState<HTMLElement | null>(null)
  const [panelPos, setPanelPos] = useState<ButtonPanelPosition | null>(null)

  const panelRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  // Hover 事件监听
  useEffect(() => {
    if (!isReadMode || !containerRef.current) return
    const container = containerRef.current
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (panelRef.current?.contains(target)) return // 避免 hover 到面板本身
      setHoveredEl(target)
    }

    const handleMouseOut = () => {
      setHoveredEl(null)
    }

    container.addEventListener('mouseover', handleMouseOver, true)
    container.addEventListener('mouseout', handleMouseOut, true)

    return () => {
      container.removeEventListener('mouseover', handleMouseOver, true)
      container.removeEventListener('mouseout', handleMouseOut, true)
    }
  }, [isReadMode])

  // Click 事件监听
  useEffect(() => {
    if (!isReadMode || !containerRef.current) return
    // const container = containerRef.current
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (panelRef.current?.contains(target)) return // 避免点击面板时消失
      // 选中目标区域外的元素
      if (!containerRef.current?.contains(target)) {
        setSelectedEl(null)
        setPanelPos({
          left: -9999,
          top: -999,
        })
        return
      }
      setSelectedEl(target)

      const rect = target.getBoundingClientRect()
      setPanelPos({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX + rect.width + 8,
      })

      e.preventDefault()
      e.stopPropagation()
    }

    document.body.addEventListener('click', handleClick, true)

    return () => {
      document.body.removeEventListener('click', handleClick, true)
    }
  }, [isReadMode])

  // 添加高亮样式
  useEffect(() => {
    if (!isReadMode) return
    if (hoveredEl) {
      hoveredEl.style.outline = '2px solid #9b59b6'
      hoveredEl.style.backgroundColor = '#f5f5f5'
    }
    return () => {
      if (hoveredEl) {
        hoveredEl.style.outline = ''
        hoveredEl.style.backgroundColor = ''
      }
    }
  }, [hoveredEl, isReadMode])

  if (!isReadMode) return <>{children}</>

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: 'auto',
        height: 'auto',
      }}
    >
      {children}
      {panelPos && (
        <div
          ref={panelRef}
          style={{
            position: 'absolute',
            top: panelPos.top,
            left: panelPos.left,
            zIndex: 9999,
            background: '#fff',
          }}
        >
          {/* 功能按钮面板 */}
          <button>编辑</button>
        </div>
      )}
    </div>
  )
})

export default InspectorBox
