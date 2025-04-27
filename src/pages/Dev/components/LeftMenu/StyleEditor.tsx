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
    title: node.bind || node.type,
    cssStyle: node.style || {},
    rawNode: node,
    children: (node.children || []).map((child: nodeType, index: number) =>
      mapToAntdTreeData(child, `${path}-${index}`)
    ),
  }
}

const StyleEditor = forwardRef<drawerMethods>((props, ref) => {
  const uiSchema = useUIStore((state) => state.uiSchema)

  const [cssOpen, setCssOpen] = useState(false)
  const handleOpen = () => setCssOpen(true)
  useImperativeHandle(ref, () => ({
    handleOpen,
  }))

  const classNames: DrawerClassNames = {
    body: styles['customer-drawer-body'],
  }

  const [styleTree, setStyleTree] = useState<treeDateType>()
  const [currentStyle, setCurrentStyle] = useState('')
  const [keyPath, setKeyPath] = useState<number[]>([])

  useEffect(() => {
    if (uiSchema) {
      const treeData = mapToAntdTreeData(uiSchema)
      setStyleTree(treeData)
      console.log('tree', treeData)
    }
  }, [uiSchema])

  const handleSelectNode = (selectedKeys: any, e: any) => {
    if (e) {
      const selectedStyle = e.node.cssStyle
      const currentPath = e.node.key
        .split('-')
        .map((i: string) => Number(i))
        .splice(1)
      console.log('select', currentPath)
      setKeyPath(currentPath)
      setCurrentStyle(JSON.stringify(selectedStyle, null, 2))
    }
  }

  const handleEditorBlur = (val: string) => {
    setCurrentStyle(val)
  }

  useEffect(() => {
    console.log('keyPath', keyPath, currentStyle)
    if (uiSchema) {
      let currentSchema: nodeType | null = uiSchema
      // 重置css样式
      keyPath.forEach((position: number) => {
        currentSchema = currentSchema?.children?.[position] || null
      })

      currentSchema.style = JSON.parse(currentStyle)

      console.log('currentSchema', currentSchema, uiSchema)
    }
  }, [keyPath, currentStyle])

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
              treeData={[styleTree]}
              onSelect={handleSelectNode}
            />
          ) : null}
        </div>
        <div className={styles['editor-container']}>
          <Editor
            width="100%"
            defaultLanguage="json"
            defaultValue={JSON.stringify({ color: 'red' }, null, 2)}
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
