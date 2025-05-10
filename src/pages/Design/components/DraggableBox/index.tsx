import { useRef } from 'react'
import { useDrag } from 'react-dnd'
// 拖拽项类型常量
const ItemTypes = {
  BOX: 'box',
}
const DraggableBox = ({
  children,
  id,
}: {
  children: React.ReactNode
  id: string
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))
  drag(ref)
  return (
    <div
      ref={ref}
      style={{
        cursor: 'move',
        opacity: isDragging ? 0.5 : 1,
        border: '1px solid #ccc',
        borderRadius: '4px',
        width: '100px',
        textAlign: 'center',
      }}
    >
      {children}
    </div>
  )
}

export default DraggableBox
