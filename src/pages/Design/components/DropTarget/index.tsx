import { uiType } from '@/types/ui'
import { useRef } from 'react'
import { useDrop } from 'react-dnd'

const DropTarget = ({
  onDrop,
  children,
  nodeType,
  nodeKey,
  parentBind,
  isParentNeed,
  isNestedAgain,
}: {
  children: React.ReactNode
  nodeType: uiType
  nodeKey: string
  parentBind: string
  isParentNeed: boolean
  isNestedAgain: boolean
  onDrop: (
    id: string,
    targetKey: string,
    desUISchema: any,
    parentBind: string,
    isParentNeed: boolean,
    isNestedAgain: boolean
  ) => any
}) => {
  // ableBind是物料配置限制的，无需考虑"闭包快照"问题
  // TODO: parentBind 的闭包快照问题
  const parentBindRef = useRef(parentBind)
  parentBindRef.current = parentBind // 每次渲染时更新值
  const ref = useRef<HTMLDivElement>(null)
  const targetKey = useRef('')
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept:
      nodeType === 'root'
        ? 'module'
        : nodeType === 'module'
        ? ['section', 'text', 'container', 'image']
        : ['container', 'md', 'text', 'image', 'label', 'columns', 'field'],
    drop: (item: any) => {
      // 此处可拿的id是因为在 <DraggableBox /> 中传了id字段
      onDrop(
        item.id,
        targetKey.current,
        item.desUISchema,
        parentBindRef.current,
        isParentNeed,
        isNestedAgain
      )
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
  let backgroundColor = '#f8fafc'
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
        width: '100%',
        transition: 'background-color 0.3s',
      }}
    >
      {children}
    </div>
  )
}

export default DropTarget
