import '@wangeditor/editor/dist/css/style.css' // 引入 css

import React, { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'

const RichInput: React.FC<{
  value?: string
  onChange?: (value: string) => void
}> = ({ value, onChange }) => {
  // editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null)

  // 编辑器内容
  // const [html, setHtml] = useState(value)

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {}
  toolbarConfig.toolbarKeys = [
    'headerSelect',
    'blockquote',

    'bold',
    'underline',
    'italic',
    'code',

    'color',
    'bgColor',

    'bulletedList',
    'numberedList',

    'insertLink',

    'divider',
    'undo',
    'redo',
  ]

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: '请输入内容...',
  }

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor])

  return (
    <>
      <div
        style={{
          border: '1px solid #e4e4e7',
          zIndex: 100,
        }}
      >
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: '1px solid #e4e4e7' }}
        />
        <Editor
          defaultConfig={editorConfig}
          value={value}
          onCreated={setEditor}
          onChange={(editor) => {
            const newHtml = editor.getHtml()
            // setHtml(newHtml)
            onChange?.(newHtml)
          }}
          mode="simple"
          style={{ height: '150px' }}
        />
      </div>
      {/* <div style={{ marginTop: '15px' }}>{html}</div> */}
    </>
  )
}

export default RichInput
