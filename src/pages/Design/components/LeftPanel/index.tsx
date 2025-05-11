import DraggableBox from '../DraggableBox'
import Icon from '@ant-design/icons'
import arrayBoxSVG from '@/assets/svg/design/arrayBox.svg?react'
import mdBoxSVG from '@/assets/svg/design/mdBox.svg?react'
import threeColumnSVG from '@/assets/svg/design/threeColumn.svg?react'
import textBlockSVG from '@/assets/svg/design/textBlock.svg?react'
import imageSVG from '@/assets/svg/design/image.svg?react'
import normalBoxSVG from '@/assets/svg/design/normalBox.svg?react'
import styles from './index.module.scss'
import { v4 as uuidv4 } from 'uuid'
import type { uiType } from '@/types/ui'

const LeftPanel = () => {
  const draggableList = [
    {
      label: '容器组件',
      menu: [
        {
          svg: normalBoxSVG,
          title: '模块容器',
          sub: '用于定义单个模块',
          // JSON描述信息
          desUISchema: {
            type: 'module',
            isNested: true,
            layout: 'horizontal',
            style: {},
            bind: '',
            tag: '',
            nodeKey: uuidv4(),
            children: [],
          },
        },
      ],
    },
    {
      label: '模块组件',
      menu: [
        {
          svg: arrayBoxSVG,
          title: '列表容器',
          sub: '用于定义列表数据',
          desUISchema: {
            type: 'section',
            isNested: true,
            // layout: 'vertical',
            style: {},
            bind: '',
            tag: '',
            nodeKey: uuidv4(),
            children: [],
          },
        },
        {
          svg: mdBoxSVG,
          title: 'md容器',
          sub: '用于定义md数据',
          desUISchema: {
            type: 'md',
            isNested: false,
            // layout: 'vertical',
            style: {},
            bind: '',
            tag: '',
            nodeKey: uuidv4(),
            // children: [],
          },
        },
        {
          svg: textBlockSVG,
          title: '文本块',
          sub: '用于定义单行文本',
          desUISchema: {
            type: 'text',
            isNested: false,
            // layout: 'vertical',
            style: {},
            bind: '',
            tag: '',
            nodeKey: uuidv4(),
            // children: [],
          },
        },
        {
          svg: imageSVG,
          title: '图片',
          sub: '用于定义图片',
          desUISchema: {
            type: 'image',
            isNested: false,
            // layout: 'vertical',
            style: {},
            bind: '',
            tag: '',
            nodeKey: uuidv4(),
            // children: [],
          },
        },
        {
          svg: threeColumnSVG,
          title: '两列布局',
          sub: '用于定义多栏布局',
          desUISchema: {
            type: 'container', // 对于多栏布局，由于原先Render的时候没有对应的type，先写成container
            isNested: true,
            // layout: 'vertical',
            style: {},
            bind: '',
            tag: '',
            nodeKey: uuidv4(),
            children: [],
          },
        },
        {
          svg: threeColumnSVG,
          title: '三列布局',
          sub: '用于定义多栏布局',
          desUISchema: {
            type: 'container', // 对于多栏布局，由于原先Render的时候没有对应的type，先写成container
            isNested: true,
            // layout: 'vertical',
            style: {},
            bind: '',
            tag: '',
            nodeKey: uuidv4(),
            children: [],
          },
        },
      ],
    },
  ]

  return (
    <aside className={styles['materiel-container']}>
      {draggableList.length
        ? draggableList.map((listItem, index) => (
            <div className={styles['module-box']} key={index}>
              <h4>{listItem.label}</h4>
              <div className={styles['materiel-list']}>
                {listItem.menu.length
                  ? listItem.menu.map((item) => (
                      // 这里的id后续在拖放进target容器时会读取到，应该是使用uuid
                      <DraggableBox
                        id={item.desUISchema.nodeKey}
                        key={item.desUISchema.nodeKey}
                        desUISchema={item.desUISchema}
                        nodeType={item.desUISchema.type as uiType}
                      >
                        <div className={styles['module-item']}>
                          <div className={styles['top']}>
                            <Icon component={item.svg} />
                            <span>{item.title}</span>
                          </div>
                          <div className={styles['footer']}>{item.sub}</div>
                        </div>
                      </DraggableBox>
                    ))
                  : null}
              </div>
            </div>
          ))
        : null}
    </aside>
  )
}

export default LeftPanel
