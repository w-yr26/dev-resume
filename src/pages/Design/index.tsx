import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Icon from '@ant-design/icons'
import SettingSVG from '@/assets/svg/setting.svg?react'
import normalBoxSVG from '@/assets/svg/design/normalBox.svg?react'
import arrayBoxSVG from '@/assets/svg/design/arrayBox.svg?react'
import mdBoxSVG from '@/assets/svg/design/mdBox.svg?react'
import threeColumnSVG from '@/assets/svg/design/threeColumn.svg?react'
import textBlockSVG from '@/assets/svg/design/textBlock.svg?react'
import imageSVG from '@/assets/svg/design/image.svg?react'
import DragBtn from './components/DragBtn'
import LeftPanel from './components/LeftPanel'
import RightPanel from './components/RightPanel'
import styles from './index.module.scss'
import DropTarget from './components/DropTarget'
import { useDesignStore } from '@/store'
import type { singleNode, uiType } from '@/types/ui'
import React, { useState } from 'react'
import { message } from 'antd'
import GlobalSetting from './components/GlobalSetting'

const typeToComponentName: Record<uiType, string> = {
  container: '模块容器',
  module: '模块容器',
  root: '根容器',
  md: 'md容器',
  section: '列表容器',
  image: '图片',
  text: '文本块',
  label: '模块标题',
}

const typeToSVG: Record<uiType, any> = {
  container: normalBoxSVG,
  module: normalBoxSVG,
  root: normalBoxSVG,
  md: mdBoxSVG,
  section: arrayBoxSVG,
  image: imageSVG,
  text: textBlockSVG,
  label: textBlockSVG,
}

const Design = () => {
  const currentUISchema = useDesignStore((state) => state.currentUISchema)
  const currentSelectedKey = useDesignStore((state) => state.currentSelectedKey)
  const insertNode = useDesignStore((state) => state.insertNode)
  const setCurrentSelectedKey = useDesignStore(
    (state) => state.setCurrentSelectedKey
  )
  const [prevBind, setPrevBind] = useState('root')

  const handleDrop = (
    nodeKey: string,
    targetKey: string,
    desUISchema: any,
    bind: string
  ) => {
    // 如果bind字段仍然为root且此时不是模块容器(也就是说不是第二层ui)，则其上一层还未选择绑定的模块，此时不能插入新的ui
    // 因为单个模块内的各元素的bind字段是通过级联组件筛选的，需要先确定模块的bind字段，才能接着确认模块内部的bind字段
    if (bind === 'root' && desUISchema.type !== 'module') {
      return message.warning('请先标注父元素模块类型')
    }
    insertNode(nodeKey, targetKey, desUISchema)
  }

  const renderTemplate = (uiSchema: singleNode, parentBind: string) => {
    return (
      <>
        <fieldset
          className={`${styles['fieldset-item']} ${
            uiSchema.nodeKey === currentSelectedKey
              ? styles['active-fieldset']
              : ''
          }`}
          onClick={(e) => {
            e.stopPropagation()
            setCurrentSelectedKey(uiSchema.nodeKey)
            setPrevBind(parentBind)
          }}
        >
          <legend>
            <Icon component={typeToSVG[uiSchema.type]} />
            <span
              style={{
                marginLeft: '8px',
              }}
            >
              {typeToComponentName[uiSchema.type]}
              {uiSchema.bind ? (
                <span className={styles['module-name']}> {uiSchema.bind}</span>
              ) : null}
            </span>
          </legend>

          <div
            className={`${
              uiSchema.layout === 'horizontal' ? styles['flex-fieldset'] : ''
            }`}
          >
            {uiSchema.children?.length
              ? uiSchema.children.map((nestedChild: singleNode) => (
                  <React.Fragment key={nestedChild.nodeKey}>
                    {renderTemplate(
                      nestedChild,
                      nestedChild.bind || parentBind
                    )}
                  </React.Fragment>
                ))
              : null}
          </div>
          {uiSchema.isNestedAgain ? (
            <DropTarget
              onDrop={handleDrop}
              nodeType={uiSchema.type}
              nodeKey={uiSchema.nodeKey}
              parentBind={parentBind}
            >
              <DragBtn />
            </DropTarget>
          ) : null}
        </fieldset>
      </>
    )
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles['design-container']}>
        <nav className={styles['design-nav']}>
          <div className={styles['nav-left']}>
            <Icon component={SettingSVG} />
            <span>模板设计器</span>
          </div>
        </nav>

        <div className={styles['design-body']}>
          <LeftPanel />
          <main className={styles['preview-container']}>
            <div className={styles['view-container']}>
              {renderTemplate(currentUISchema, currentUISchema.bind)}
            </div>
          </main>
          {currentSelectedKey ? (
            <RightPanel prevBind={prevBind} />
          ) : (
            <GlobalSetting />
          )}
        </div>
      </div>
    </DndProvider>
  )
}

export default Design
