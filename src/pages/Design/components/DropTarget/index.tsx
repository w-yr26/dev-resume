import { uiType } from '@/types/ui'
import { useRef } from 'react'
import { useDrop } from 'react-dnd'

const DropTarget = ({
  onDrop,
  children,
  nodeType,
  nodeKey,
  deep,
}: {
  children: React.ReactNode
  nodeType: uiType
  nodeKey: string
  deep: number
  onDrop: (id: string, targetKey: string, desUISchema: any, deep: number) => any
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const targetKey = useRef('')
  const deepRef = useRef(0)
  deepRef.current = deep
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept:
      nodeType === 'root'
        ? 'module'
        : nodeType === 'module'
        ? ['section', 'text']
        : ['container', 'md', 'text', 'image', 'label', 'columns'],
    drop: (item: any) => {
      // 此处可拿的id是因为在 <DraggableBox /> 中传了id字段
      console.log('deepRef.current', deepRef.current)

      onDrop(item.id, targetKey.current, item.desUISchema, deepRef.current)
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
  let backgroundColor = '#fff'
  if (isActive) {
    backgroundColor = '#e9e8e8'
  } else if (canDrop) {
    backgroundColor = '#fafafa'
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
