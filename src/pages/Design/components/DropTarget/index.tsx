import { useRef } from 'react'
import { useDrop } from 'react-dnd'
// 拖拽项类型常量
const ItemTypes = {
  BOX: 'box',
}
const DropTarget = ({
  onDrop,
  children,
}: {
  children: React.ReactNode
  onDrop: (id: string) => any
}) => {
  const ref = useRef<HTMLDivElement>(null)

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.BOX,
    drop: (item: any) => onDrop(item.id),
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
