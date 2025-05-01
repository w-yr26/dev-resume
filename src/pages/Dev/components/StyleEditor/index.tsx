import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import type { DrawerClassNames } from 'antd/es/drawer/DrawerPanel'
import Editor from '@monaco-editor/react'
import styles from './index.module.scss'
import { Drawer, Tree } from 'antd'
import { useUIStore } from '@/store'
import type { drawerMethods } from '@/types/materials'
import type { nodeType, treeDateType } from '@/types/ui'

// 转换树形结构数据
const mapToAntdTreeData = (
  node: nodeType,
  path: string = '0'
): treeDateType => {
  return {
    key: path,
    nodeKey: node.nodeKey,
    title: node.tag || node.type,
    cssStyle: node.style || {},
    rawNode: node,
    children: (node.children || []).map((child: nodeType, index: number) =>
      mapToAntdTreeData(child, `${path}-${index}`)
    ),
  }
}

const StyleEditor = forwardRef<drawerMethods>((props, ref) => {
  const uiSchema = useUIStore((state) => state.uiSchema)
  const updateUISchema = useUIStore((state) => state.updateUISchema)
  const [cssOpen, setCssOpen] = useState(false)
  const handleOpen = () => setCssOpen(true)
  useImperativeHandle(ref, () => ({
    handleOpen,
  }))

  const classNames: DrawerClassNames = {
    body: styles['customer-drawer-body'],
  }

  const [styleTree, setStyleTree] = useState<treeDateType>()
  const [currentStyle, setCurrentStyle] = useState('') // 当前选中的节点的 style
  const [currentId, setCurrentId] = useState('') // 当前选中的节点的key
  const [isEditing, setIsEditing] = useState(false) // 当前是否为编辑状态(区分选中树节点)
  // const [keyPath, setKeyPath] = useState<number[]>([]) // 当前选中的节点的访问路径(在传入Tree之前递归实现的，与 uiSchema 本身无关)

  const handleSelectNode = (selectedKeys: any, e: any) => {
    if (e) {
      setIsEditing(false)
      const selectedStyle = e.node.cssStyle
      // const currentPath = e.node.key
      //   .split('-')
      //   .map((i: string) => Number(i))
      //   .splice(1)
      // 设置当前选中节点的key，用于结构化处理
      setCurrentId(e.node.nodeKey)
      // setKeyPath(currentPath)
      setCurrentStyle(JSON.stringify(selectedStyle, null, 2))
    }
  }

  const handleEditorBlur = (newVal: string) => {
    setIsEditing(true)
    setCurrentStyle(newVal)
  }

  useEffect(() => {
    if (uiSchema && currentStyle && isEditing) {
      // 根据"方案一"虽然可以达到类似的样式修改效果、且耗时差不多(复杂结构时未测)，但是注意，根据 setUiSchema({ ...uiSchema }) 也只是修改了最顶层的数据引用
      // 而 <Render /> 内部执行的是递归渲染(遍历children递归渲染)此时的这种方案就无法保证每一层/每一次递归传给<Render />的属性的引用都发生了变化
      // 当 <Render />使用memo包裹时，就会出现不执行/不更新的情况
      // 方案一:沿着路径修改对应的样式
      // const start = performance.now()
      // let currentSchema: nodeType | null = uiSchema
      // // 重置css样式
      // keyPath.forEach((position: number) => {
      //   currentSchema = currentSchema?.children?.[position] || null
      // })
      // currentSchema.style = JSON.parse(currentStyle)
      // setUiSchema({ ...uiSchema })
      // requestAnimationFrame(() => {
      //   const end = performance.now()
      //   console.log('页面渲染完成，耗时:', end - start, 'ms')
      // })

      // 方案二:结构共享
      // TODO：1. 如果当前失焦后的currentStyle与之前的一致，不需要更新；2. 当前选中树节点的时候，currentId和currentStyle会变，导致这里多执行一次
      // const start = performance.now()
      updateUISchema(uiSchema, currentId, (node) => ({
        ...node,
        style: JSON.parse(currentStyle),
      }))
      // requestAnimationFrame(() => {
      //   const end = performance.now()
      //   console.log('页面渲染完成，耗时:', end - start, 'ms')
      // })
    }
  }, [currentStyle, currentId, isEditing])

  useEffect(() => {
    if (uiSchema) {
      const treeData = mapToAntdTreeData(uiSchema)
      setStyleTree(treeData)
      console.log('tree', treeData)
    }
  }, [uiSchema])

  return (
    <div>
      <Drawer
        title="开发者模式"
        placement="right"
        width={'50%'}
        onClose={() => setCssOpen(false)}
        open={cssOpen}
        classNames={classNames}
      >
        <div className={styles['tree-container']}>
          {styleTree ? (
            <Tree
              blockNode
              showIcon
              defaultSelectedKeys={['0']}
              defaultExpandedKeys={['0']}
              treeData={[styleTree]}
              onSelect={handleSelectNode}
            />
          ) : null}
        </div>
        <div className={styles['editor-container']}>
          <Editor
            width="100%"
            defaultLanguage="json"
            defaultValue={JSON.stringify({}, null, 2)}
            value={currentStyle}
            onMount={(editor) => {
              editor.onDidBlurEditorText(() => {
                const value = editor.getValue()
                handleEditorBlur(value)
                // 在这里做失焦后的处理，比如保存
              })
            }}
          />
        </div>
      </Drawer>
    </div>
  )
})

export default StyleEditor
