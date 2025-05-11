import { uiType } from '@/types/ui'
import { useRef } from 'react'
import { useDrop } from 'react-dnd'

const DropTarget = ({
  onDrop,
  children,
  nodeType,
  nodeKey,
}: {
  children: React.ReactNode
  nodeType: uiType
  nodeKey: string
  onDrop: (id: string, targetKey: string, desUISchema: any) => any
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const targetKey = useRef('')
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept:
      nodeType === 'root'
        ? 'module'
        : ['container', 'md', 'text', 'section', 'image'],
    drop: (item: any) => {
      // 此处可拿的id是因为在 <DraggableBox /> 中传了id字段
      onDrop(item.id, targetKey.current, item.desUISchema)
    },
    hover: () => {
      // 记录当前选中的、目标存放的元素
      targetKey.current = nodeKey
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }))

  const isActive = canDrop && isOver
  let backgroundColor = '#f0f0f0'
  if (isActive) {
    backgroundColor = '#d4edda'
  } else if (canDrop) {
    backgroundColor = '#f8f9fa'
  }

  drop(ref)

  return (
    <div
      ref={ref}
      style={{
        backgroundColor,
        transition: 'background-color 0.3s',
      }}
    >
      {children}
    </div>
  )
}

export default DropTarget
