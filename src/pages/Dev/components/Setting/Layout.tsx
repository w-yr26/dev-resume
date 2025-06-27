import CustomLayout from '@/components/CustomLayout'
import Header from '@/components/Header'
import { useElementPosition } from '@/hooks/useElementPosition'
import Icon from '@ant-design/icons'
import OutputSVG from '@/assets/svg/dev/output.svg?react'
import { useRef, useState } from 'react'
import { useUIStore } from '@/store'
import { Card } from 'antd'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd'
import styles from './index.module.scss'
import type { layoutItem } from '@/types/ui'

export type DropContainerType = 'main' | 'side'

const Layout = () => {
  const layoutMap = useUIStore((state) => state.layoutMap)
  const updateLayoutMap = useUIStore((state) => state.updateLayoutMap)
  const updateSchema = useUIStore((state) => state.updateSchema)
  const [pageArr] = useState(() => [...layoutMap.keys()])
  const layoutRef = useRef<HTMLDivElement>(null)
  useElementPosition(layoutRef, 'layout')

  const onDragEnd = (e: DropResult) => {
    const { destination, source } = e

    // 1. 检查无效拖拽
    if (!destination) return
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return

    // 2. 获取当前页面数据（假设第一个页面）
    // TODO: 抽象到多个页面之间的更改
    const currentPageKey = pageArr[0]
    const currentLayout = { ...layoutMap.get(currentPageKey) }

    // 3. 浅拷贝当前列表（避免直接修改原数组）
    const sourceList = [
      ...(currentLayout[source.droppableId as DropContainerType] || []),
    ]
    const destList =
      source.droppableId === destination.droppableId
        ? sourceList
        : [
            ...(currentLayout[destination.droppableId as DropContainerType] ||
              []),
          ]

    // 4. 执行移动操作——先在源列表剪切、再在目标列表粘贴当前元素(注意splice的用法，可删可粘)
    const [movedItem] = sourceList.splice(source.index, 1)
    destList.splice(destination.index, 0, movedItem)

    // 5. 更新状态（只更新受影响的页面）
    const newLayout = {
      ...currentLayout,
      [source.droppableId]: sourceList,
      [destination.droppableId]: destList,
    } as Record<'main' | 'side', layoutItem[]>

    updateLayoutMap(newLayout, 'page1')
    updateSchema(sourceList.map((i) => i.key))
  }

  return (
    <CustomLayout ref={layoutRef}>
      <Header label="布局" svg={<Icon component={OutputSVG} />} />
      <DragDropContext onDragEnd={onDragEnd}>
        {pageArr.map((pageKey, index) => {
          const { main = [], side = [] } = layoutMap.get(pageKey) || {}
          return (
            <Card key={pageKey} title={'Page ' + (index + 1)}>
              <div className={styles['main-side-bar']}>
                <div className={styles['main-bar']}>
                  <div className={styles['bg-box']} />
                  <div className={styles['content-box']}>
                    <div className={styles['bar-title']}>主页面</div>
                    <Droppable droppableId="main">
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={styles['bar-list']}
                        >
                          {main.map((item, index) => (
                            <Draggable
                              key={item.key}
                              draggableId={item.key}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={styles['bar-item']}
                                >
                                  <span className={styles['left-icon']}>
                                    <Icon component={OutputSVG} />
                                  </span>
                                  <div className={styles['label-right']}>
                                    {item.label}
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </div>
                </div>

                <div className={styles['side-bar']}>
                  <div className={styles['bg-box']} />
                  <div className={styles['content-box']}>
                    <div className={styles['bar-title']}>侧栏</div>
                    <Droppable droppableId="side">
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={styles['bar-list']}
                        >
                          {side.map((item, index) => (
                            <Draggable
                              key={item.key}
                              draggableId={item.key}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={styles['bar-item']}
                                >
                                  <span className={styles['left-icon']}>
                                    <Icon component={OutputSVG} />
                                  </span>
                                  <div className={styles['label-right']}>
                                    {item.label}
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                    {/* <div className={styles['bar-list']}>
                      {side.map((item, index) => (
                        <div className={styles['bar-item']}>
                          <span className={styles['left-icon']}>
                            <Icon component={OutputSVG} />
                          </span>
                          <div className={styles['label-right']}>
                            {item.label}
                          </div>
                        </div>
                      ))}
                    </div> */}
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </DragDropContext>
    </CustomLayout>
  )
}
export default Layout
