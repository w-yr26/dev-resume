import { useRef } from 'react'
import { useDrag } from 'react-dnd'
import type { uiType } from '@/types/ui'

const DraggableBox = ({
  children,
  id,
  nodeType,
  desUISchema,
}: {
  children: React.ReactNode
  id: string
  nodeType: uiType
  desUISchema: any
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [{ isDragging }, drag] = useDrag(() => ({
    type: nodeType,
    item: { id, desUISchema },
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
        width: '100%',
        textAlign: 'center',
        marginBottom: '8px',
      }}
    >
      {children}
    </div>
  )
}

export default DraggableBox
