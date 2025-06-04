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
import { Collapse } from 'antd'
import Item from './Item'

const LeftPanel = () => {
  // 说明：tag字段仅仅是用来描述模块，而不是每个字段都要描述，但是bind就是每个字段都要绑定
  const draggableList = [
    {
      label: '容器组件',
      children: [
        {
          svg: normalBoxSVG,
          label: '模块容器',
          sub: '用于定义单个模块',
          // JSON描述信息
          desUISchema: {
            type: 'module',
            layout: 'vertical',
            style: {},
            bind: '',
            tag: '',
            nodeKey: uuidv4() + '?module',
            children: [],
            constraints: {
              ableDel: true,
              ableBind: true,
              isNestedAgain: true,
            },
          },
        },
        {
          svg: normalBoxSVG,
          label: '普通容器',
          sub: '用于定义container',
          // JSON描述信息
          desUISchema: {
            type: 'container',
            layout: 'vertical',
            style: {},
            bind: '',
            tag: '',
            nodeKey: uuidv4() + '?container',
            children: [],
            constraints: {
              ableDel: true,
              ableBind: false,
              isNestedAgain: true,
            },
          },
        },
      ],
    },
    {
      label: '模块组件',
      children: [
        {
          svg: textBlockSVG,
          label: '模块标题',
          sub: '用于定义模块标题',
          desUISchema: {
            type: 'text',
            layout: 'vertical',
            style: {
              fontSize: '14px',
              fontWeight: 500,
              color: '#333',
            },
            bind: '',
            tag: '',
            nodeKey: uuidv4() + '?text',
            children: [],
            constraints: {
              ableDel: true,
              ableBind: true,
              isNestedAgain: false,
            },
          },
        },
        {
          svg: arrayBoxSVG,
          label: '数据容器',
          sub: '用于定义模块数据区域',
          desUISchema: {
            type: 'section',
            layout: 'vertical', // 列表容器也只能是垂直
            style: {
              padding: 0,
            },
            bind: 'info',
            tag: '',
            nodeKey: uuidv4() + '?section',
            children: [],
            constraints: {
              ableDel: true,
              ableBind: true,
              isNestedAgain: true,
            },
          },
        },
      ],
    },
    {
      label: '数据视图组件',
      children: [
        {
          svg: mdBoxSVG,
          label: '表单项',
          sub: '用于定义表单项数据',
          desUISchema: {
            type: 'container',
            layout: 'vertical', // 不支持嵌套的话，layout布局也没啥存在的必要
            style: {
              padding: 0,
            },
            bind: '',
            tag: '',
            nodeKey: uuidv4() + '?md',
            children: [],
            constraints: {
              ableDel: true,
              ableBind: true,
              isNestedAgain: false,
            },
          },
        },
        {
          svg: mdBoxSVG,
          label: 'md容器',
          sub: '用于定义md数据',
          desUISchema: {
            type: 'md',
            layout: 'vertical', // 不支持嵌套的话，layout布局也没啥存在的必要
            style: {
              padding: 0,
            },
            bind: '',
            tag: '',
            nodeKey: uuidv4() + '?md',
            children: [],
            constraints: {
              ableDel: true,
              ableBind: true,
              isNestedAgain: false,
            },
          },
        },
        {
          svg: textBlockSVG,
          label: '普通文本',
          sub: '用于定义文本内容',
          desUISchema: {
            type: 'text',
            layout: 'vertical',
            style: {
              fontSize: '14px',
              fontWeight: 400,
              color: '#333',
            },
            bind: '',
            tag: '',
            nodeKey: uuidv4() + '?text',
            children: [],
            constraints: {
              ableDel: true,
              ableBind: true,
              isNestedAgain: false,
            },
          },
        },
        {
          svg: imageSVG,
          label: '图片',
          sub: '用于定义图片',
          desUISchema: {
            type: 'image',
            layout: 'vertical',
            style: {},
            bind: '',
            tag: '',
            nodeKey: uuidv4() + '?image',
            children: [],
            constraints: {
              ableDel: true,
              ableBind: true,
              isNestedAgain: false,
              allowedParentBind: ['BASE_INFO'],
            },
          },
        },
        {
          svg: threeColumnSVG,
          label: '三列布局',
          sub: '用于定义三列文本',
          desUISchema: {
            type: 'columns', // 对于多栏布局，由于原先Render的时候没有对应的type，先写成container(目前Render中对于三栏布局，父盒子的type也是container)
            layout: 'horizontal', // 既然是行内多列布局，layout也不再支持选择
            style: {
              justifyContent: 'space-between',
            },
            bind: '', // 不需要(TODO:但是不需要绑定的条件是啥呢？type === 'container'?)
            tag: '', // 不需要
            nodeKey: uuidv4() + '?columns',
            children: [
              // {
              //   ableDel: false,
              //   type: 'text',
              //   isNestedAgain: false,
              //   layout: 'horizontal',
              //   style: {
              //     flex: 1,
              //     fontSize: '14px',
              //     fontWeight: 400,
              //     color: '#333',
              //   },
              //   bind: '',
              //   tag: '', // 不需要
              //   nodeKey: uuidv4() + '?text',
              // },
              // {
              //   ableDel: false,
              //   type: 'text',
              //   isNestedAgain: false,
              //   layout: 'horizontal',
              //   style: {
              //     flex: 1,
              //     fontSize: '14px',
              //     fontWeight: 400,
              //     color: '#333',
              //   },
              //   bind: '',
              //   tag: '', // 不需要
              //   nodeKey: uuidv4() + '?text',
              // },
              // {
              //   ableDel: false,
              //   type: 'text',
              //   isNestedAgain: false,
              //   layout: 'horizontal',
              //   style: {
              //     flex: 1,
              //     fontSize: '14px',
              //     fontWeight: 400,
              //     color: '#333',
              //   },
              //   bind: '',
              //   tag: '', // 不需要
              //   nodeKey: uuidv4() + '?text',
              // },
            ],
            constraints: {
              ableDel: true,
              ableBind: false,
              isNestedAgain: true,
              maxChildren: 3,
            },
          },
        },
      ],
    },
  ]

  const collapseItems = draggableList.map((group, index) => ({
    key: String(index + 1),
    label: group.label,
    children: (
      <div className={styles['draggable-group']}>
        {group.children.map((item) => (
          <DraggableBox
            key={item.desUISchema.nodeKey}
            id={item.desUISchema.nodeKey}
            desUISchema={item.desUISchema}
            nodeType={item.desUISchema.type as uiType}
          >
            <Item
              svg={<Icon component={item.svg} />}
              label={item.label}
              sub={item.sub}
              nodeType={item.desUISchema.type as uiType}
            />
          </DraggableBox>
        ))}
      </div>
    ),
  }))

  return (
    <aside className={styles['materiel-container']}>
      {draggableList.length ? (
        <Collapse defaultActiveKey={['1']} items={collapseItems} />
      ) : null}
    </aside>
  )
}

export default LeftPanel
