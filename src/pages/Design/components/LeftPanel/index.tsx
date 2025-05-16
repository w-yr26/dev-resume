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
  // 说明：tag字段仅仅是用来描述模块，而不是每个字段都要描述，但是bind就是每个字段都要绑定
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
            ableDel: true,
            type: 'module',
            isNestedAgain: true,
            layout: 'vertical',
            style: {},
            bind: '',
            tag: '',
            nodeKey: uuidv4() + '?module',
            children: [],
          },
        },
        {
          svg: normalBoxSVG,
          title: '普通容器',
          sub: '用于定义container',
          // JSON描述信息
          desUISchema: {
            ableDel: true,
            type: 'container',
            isNestedAgain: true,
            layout: 'vertical',
            style: {},
            bind: '',
            tag: '',
            nodeKey: uuidv4() + '?container',
            children: [],
          },
        },
      ],
    },
    {
      label: '模块组件',
      menu: [
        {
          svg: textBlockSVG,
          title: '模块标题',
          sub: '用于定义模块标题',
          desUISchema: {
            ableDel: true,
            type: 'text',
            isNestedAgain: false,
            layout: 'vertical',
            style: {
              fontSize: '14px',
              fontWeight: 500,
              color: '#333',
            },
            bind: '',
            tag: '',
            nodeKey: uuidv4() + '?text',
            // children: [],
          },
        },
        {
          svg: arrayBoxSVG,
          title: '数据容器',
          sub: '用于定义模块数据区域',
          desUISchema: {
            ableDel: true,
            type: 'section',
            isNestedAgain: true,
            layout: 'vertical', // 列表容器也只能是垂直
            style: {
              padding: 0,
            },
            bind: 'info',
            tag: '',
            nodeKey: uuidv4() + '?section',
            children: [],
          },
        },
      ],
    },
    {
      label: '数据视图组件',
      menu: [
        {
          svg: mdBoxSVG,
          title: 'md容器',
          sub: '用于定义md数据',
          desUISchema: {
            ableDel: true,
            type: 'md',
            isNestedAgain: false,
            layout: 'vertical', // 不支持嵌套的话，layout布局也没啥存在的必要
            style: {
              padding: 0,
            },
            bind: '',
            tag: '',
            nodeKey: uuidv4() + '?md',
            // children: [],
          },
        },
        {
          svg: textBlockSVG,
          title: '普通文本',
          sub: '用于定义文本内容',
          desUISchema: {
            ableDel: true,
            type: 'text',
            isNestedAgain: false,
            layout: 'vertical',
            style: {
              fontSize: '14px',
              fontWeight: 400,
              color: '#333',
            },
            bind: '',
            tag: '',
            nodeKey: uuidv4() + '?text',
            // children: [],
          },
        },
        {
          svg: imageSVG,
          title: '图片',
          sub: '用于定义图片',
          desUISchema: {
            ableDel: true,
            type: 'image',
            isNestedAgain: false,
            layout: 'vertical',
            style: {},
            bind: '',
            tag: '',
            nodeKey: uuidv4() + '?image',
            // children: [],
          },
        },
        {
          svg: threeColumnSVG,
          title: '三列布局',
          sub: '用于定义三列文本',
          desUISchema: {
            ableDel: true,
            type: 'columns', // 对于多栏布局，由于原先Render的时候没有对应的type，先写成container(目前Render中对于三栏布局，父盒子的type也是container)
            isNestedAgain: false,
            layout: 'horizontal', // 既然是行内多列布局，layout也不再支持选择
            style: {
              justifyContent: 'space-between',
            },
            bind: '', // 不需要(TODO:但是不需要绑定的条件是啥呢？type === 'container'?)
            tag: '', // 不需要
            nodeKey: uuidv4() + '?columns',
            children: [
              {
                ableDel: false,
                type: 'text',
                isNestedAgain: false,
                layout: 'horizontal',
                style: {
                  flex: 1,
                  fontSize: '14px',
                  fontWeight: 400,
                  color: '#333',
                },
                bind: '',
                tag: '', // 不需要
                nodeKey: uuidv4() + '?text',
              },
              {
                ableDel: false,
                type: 'text',
                isNestedAgain: false,
                layout: 'horizontal',
                style: {
                  flex: 1,
                  fontSize: '14px',
                  fontWeight: 400,
                  color: '#333',
                },
                bind: '',
                tag: '', // 不需要
                nodeKey: uuidv4() + '?text',
              },
              {
                ableDel: false,
                type: 'text',
                isNestedAgain: false,
                layout: 'horizontal',
                style: {
                  flex: 1,
                  fontSize: '14px',
                  fontWeight: 400,
                  color: '#333',
                },
                bind: '',
                tag: '', // 不需要
                nodeKey: uuidv4() + '?text',
              },
            ],
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
