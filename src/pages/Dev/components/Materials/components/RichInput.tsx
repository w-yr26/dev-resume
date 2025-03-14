import '@wangeditor/editor/dist/css/style.css' // 引入 css

import React, { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import {
  IDomEditor,
  IEditorConfig,
  IToolbarConfig,
  DomEditor,
} from '@wangeditor/editor'

const RichInput = () => {
  // editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null)

  // 编辑器内容
  const [html, setHtml] = useState('<p>hello</p>')

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
    if (editor) {
      const toolbar = DomEditor.getToolbar(editor)
      console.log('toolBar', toolbar?.getConfig())
    }

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
          value={html}
          onCreated={setEditor}
          onChange={(editor) => setHtml(editor.getHtml())}
          mode="simple"
          style={{ height: '150px' }}
        />
      </div>
      {/* <div style={{ marginTop: '15px' }}>{html}</div> */}
    </>
  )
}

export default RichInput
