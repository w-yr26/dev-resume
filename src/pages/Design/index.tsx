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
import React from 'react'

const typeToComponentName: Record<uiType, string> = {
  container: '模块容器',
  module: '模块容器',
  root: '根容器',
  md: 'md容器',
  section: '列表容器',
  image: '图片',
  text: '文本块',
  label: 'label',
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
  const insertNode = useDesignStore((state) => state.insertNode)
  const handleDrop = (nodeKey: string, targetKey: string, desUISchema: any) => {
    insertNode(nodeKey, targetKey, desUISchema)
  }

  const renderTemplate = (uiSchema: singleNode) => {
    return (
      <>
        <fieldset>
          <legend>
            <Icon component={typeToSVG[uiSchema.type]} />
            <span
              style={{
                marginLeft: '8px',
              }}
            >
              {typeToComponentName[uiSchema.type]}
            </span>
          </legend>

          {uiSchema.children?.length
            ? uiSchema.children.map((nestedChild: singleNode) => (
                <React.Fragment key={nestedChild.nodeKey}>
                  {renderTemplate(nestedChild)}
                </React.Fragment>
              ))
            : null}

          {uiSchema.isNested ? (
            <DropTarget
              onDrop={handleDrop}
              nodeType={uiSchema.type}
              nodeKey={uiSchema.nodeKey}
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
              {renderTemplate(currentUISchema)}
            </div>
          </main>
          <RightPanel />
        </div>
      </div>
    </DndProvider>
  )
}

export default Design
