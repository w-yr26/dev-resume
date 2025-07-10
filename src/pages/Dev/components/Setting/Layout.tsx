import CustomLayout from '@/components/CustomLayout'
import Header from '@/components/Header'
import { useElementPosition } from '@/hooks/useElementPosition'
import Icon, { PlusOutlined } from '@ant-design/icons'
import layoutSVG from '@/assets/svg/dev/layout.svg?react'
import DeleteSVG from '@/assets/svg/delete.svg?react'
import DragSVG from '@/assets/svg/dev/drag.svg?react'
import { useMemo, useRef } from 'react'
import { useUIStore } from '@/store'
import { Button, Card } from 'antd'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd'
import styles from './index.module.scss'

export type DropContainerType = 'main' | 'side'

const Layout = () => {
  const layoutMap = useUIStore((state) => state.layoutMap)
  const updateLayoutMap = useUIStore((state) => state.updateLayoutMap)
  const addPage = useUIStore((state) => state.addPage)
  const delPage = useUIStore((state) => state.delPage)
  const layoutRef = useRef<HTMLDivElement>(null)
  useElementPosition(layoutRef, 'layout')

  const pageArr = useMemo(() => [...layoutMap.keys()], [layoutMap])

  const onDragEnd = (e: DropResult) => {
    const { destination, source } = e
    // 1. 检查无效拖拽
    if (!destination) return
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return

    // 2. 多个页面之间的数据更改
    // 拖拽前Item所出的页面位置以及主侧轴位置
    const prevPage = source.droppableId.split('-')[1]
    const prevPosition = source.droppableId.split('-')[0] as DropContainerType
    const nextPage = destination.droppableId.split('-')[1]
    const nextPosition = destination.droppableId.split(
      '-'
    )[0] as DropContainerType
    const prevLayout = { ...layoutMap.get(prevPage) } // { main: Item[], side: Item[] }
    const nextLayout = { ...layoutMap.get(nextPage) } // { main: Item[], side: Item[] }
    // 浅拷贝处理
    const shallowPrevLayout = { ...prevLayout }
    const shallowNextLayout = { ...nextLayout }
    // console.log(
    //   'shallowPrevLayout',
    //   shallowPrevLayout,
    //   source.index,
    //   prevPosition,
    //   prevPage,
    //   'shallowNextLayout',
    //   shallowNextLayout,
    //   destination.index,
    //   nextPosition,
    //   nextPage
    // )

    // 获取源列表数据
    const sourceList = [...(shallowPrevLayout[prevPosition] || [])]
    // 获取目标列表数据，此处要做判断：如果拖拽前后位于同一个Page、同一个position，那么他的值应该与sourceList的地址相同
    let targetList
    if (prevPage === nextPage && prevPosition === nextPosition) {
      targetList = sourceList
    } else {
      targetList = [...(shallowNextLayout[nextPosition] || [])]
    }

    // 4. 执行移动操作——先在源列表剪切、再在目标列表粘贴当前元素(注意splice的用法，可删可粘)
    const [movedItem] = sourceList.splice(source.index, 1)
    targetList.splice(destination.index, 0, movedItem)
    console.log('splice', movedItem, sourceList, targetList)

    // 5. 更新状态（更新整个Map）
    const newModuleLayout = new Map(layoutMap)
    // 处理操作前后对应Page、对应主侧轴的值
    newModuleLayout.set(prevPage, {
      ...newModuleLayout.get(prevPage)!,
      [prevPosition]: sourceList,
    })

    newModuleLayout.set(nextPage, {
      ...newModuleLayout.get(nextPage)!,
      [nextPosition]: targetList,
    })

    updateLayoutMap(newModuleLayout)
  }

  return (
    <CustomLayout ref={layoutRef}>
      <Header
        label="布局"
        svg={<Icon component={layoutSVG} />}
        toolTip="当前暂无支持侧轴排列的模板"
      />
      <DragDropContext onDragEnd={onDragEnd}>
        {pageArr.map((pageKey, index) => {
          const { main = [], side = [] } = layoutMap.get(pageKey) || {}
          return (
            <Card
              key={pageKey}
              title={'Page ' + (index + 1)}
              style={{
                marginBottom: '8px',
              }}
              extra={
                index > 0 ? (
                  <span
                    className={styles['del-extra-box']}
                    onClick={() => delPage(pageKey)}
                  >
                    <Icon component={DeleteSVG} />
                  </span>
                ) : null
              }
            >
              <div className={styles['main-side-bar']}>
                <div className={styles['main-bar']}>
                  <div className={styles['bg-box']} />
                  <div className={styles['content-box']}>
                    <div className={styles['bar-title']}>主页面</div>
                    <Droppable droppableId={'main-' + index}>
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
                                    <Icon component={DragSVG} />
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
                    <Droppable droppableId={'side-' + index}>
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
                                    <Icon component={DragSVG} />
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
              </div>
            </Card>
          )
        })}
      </DragDropContext>
      <div className={styles['add-btn-box']}>
        <Button icon={<PlusOutlined />} onClick={addPage}>
          添加一页
        </Button>
      </div>
    </CustomLayout>
  )
}
export default Layout
