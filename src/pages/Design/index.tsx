import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Icon from '@ant-design/icons'
import SettingSVG from '@/assets/svg/setting.svg?react'
import normalBoxSVG from '@/assets/svg/design/normalBox.svg?react'
import DragBtn from './components/DragBtn'
import LeftPanel from './components/LeftPanel'
import RightPanel from './components/RightPanel'
import styles from './index.module.scss'
import DropTarget from './components/DropTarget'

const Design = () => {
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
              <fieldset>
                <legend>
                  <Icon component={normalBoxSVG} />
                  <span
                    style={{
                      marginLeft: '8px',
                    }}
                  >
                    模块容器
                  </span>
                </legend>
                {/* <Skeleton /> */}
                <DragBtn />
              </fieldset>
              <DropTarget onDrop={(id: string) => console.log(id)}>
                <DragBtn />
              </DropTarget>
            </div>
          </main>
          <RightPanel />
        </div>
      </div>
    </DndProvider>
  )
}

export default Design
