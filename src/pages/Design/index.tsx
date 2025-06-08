import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Icon from '@ant-design/icons'
import normalBoxSVG from '@/assets/svg/design/normalBox.svg?react'
import arrayBoxSVG from '@/assets/svg/design/arrayBox.svg?react'
import mdBoxSVG from '@/assets/svg/design/mdBox.svg?react'
import textBlockSVG from '@/assets/svg/design/textBlock.svg?react'
import threeColumnSVG from '@/assets/svg/design/threeColumn.svg?react'
import imageSVG from '@/assets/svg/design/image.svg?react'
import closeSVG from '@/assets/svg/design/close.svg?react'
import DragBtn from './components/DragBtn'
import LeftPanel from './components/LeftPanel'
import RightPanel from './components/RightPanel'
import styles from './index.module.scss'
import DropTarget from './components/DropTarget'
import { useDesignStore } from '@/store'
import type { singleNode, uiType } from '@/types/ui'
import React, { useEffect, useRef, useState } from 'react'
import { Drawer, message, Tag } from 'antd'
import GlobalSetting from './components/GlobalSetting'
import { Editor } from '@monaco-editor/react'
import { commandManager } from './command/commandManager'
import { register } from './command'
import NavBar from './components/NavBar'
import html2canvas from 'html2canvas'
import { getTemplateSchemaAPI, postTemplatesAPI } from '@/apis/template'
import { useSearchParams } from 'react-router-dom'

const typeToComponentName: Record<uiType, string> = {
  container: '普通容器',
  module: '模块容器',
  root: '根容器',
  md: 'md容器',
  section: '列表容器',
  image: '图片',
  text: '文本块',
  label: '模块标题',
  columns: '多列容器',
  field: '表单项',
}

const typeToSVG: Record<uiType, any> = {
  container: normalBoxSVG,
  columns: threeColumnSVG,
  module: normalBoxSVG,
  root: normalBoxSVG,
  md: mdBoxSVG,
  section: arrayBoxSVG,
  image: imageSVG,
  text: textBlockSVG,
  label: textBlockSVG,
  field: textBlockSVG,
}

const Design = () => {
  const currentUISchema = useDesignStore((state) => state.currentUISchema)
  const currentSelectedKey = useDesignStore((state) => state.currentSelectedKey)
  const setCurUISchema = useDesignStore((state) => state.setCurUISchema)
  const setTemplateName = useDesignStore((state) => state.setTemplateName)
  const insertNode = useDesignStore((state) => state.insertNode)
  const delNode = useDesignStore((state) => state.delNode)
  const setCurrentSelectedKey = useDesignStore(
    (state) => state.setCurrentSelectedKey
  )
  const [nodeDeep, setNodeDeep] = useState(0)
  const [nodeBind, setNodeBind] = useState('root')
  const [isOpened, setIsOpened] = useState(false)
  const [updateTime, setUpdateTime] = useState('')

  const designRef = useRef<HTMLDivElement>(null)
  const [searchParams] = useSearchParams()
  const temId = searchParams.get('temId')
  useEffect(() => {
    const getTemDetail = async () => {
      const { data } = await getTemplateSchemaAPI(Number(temId))
      setCurUISchema(data.style_config)
      setTemplateName(data.name)
      setUpdateTime(data.updateTime)
    }
    if (!temId) return
    getTemDetail()
  }, [])

  const generateShot = async (fileName: string) => {
    return new Promise((resolve, reject) => {
      if (!designRef.current) {
        reject('无法获取快照')
        return
      }
      html2canvas(designRef.current, {
        useCORS: true, // 允许图片跨域，后续换掉
        scale: window.devicePixelRatio * 2, // 这里可以设置清晰度(放大后锯齿的明显程度)
      })
        .then((canvas) => {
          canvas.toBlob(async (blob) => {
            if (!blob) {
              reject('Blob转换失败')
              return
            }
            const file = new File([blob], fileName, {
              type: 'image/jpeg',
            })
            const fd = new FormData()
            fd.append('file', file)
            try {
              const { data } = await postTemplatesAPI(fd)
              resolve(data)
            } catch (_) {
              reject('快照上传失败')
            }
          })
        })
        .catch(() => {
          reject('canvas生成失败')
        })
    })
  }

  const handleDrop = (
    nodeKey: string,
    targetKey: string,
    desUISchema: any,
    parentBind: string, // 当前放置的容器的bind字段
    isParentNeed: boolean // 当前放置的容器是否需要字段绑定
  ) => {
    if (!parentBind && isParentNeed)
      return message.warning('请先绑定父容器数据类型')
    // 当前物料允许父容器的bind类型
    const allowParentBind = desUISchema.constraints
      .allowedParentBind as string[]
    // 如果父容器需要绑定 & 绑定不再当前元素支持范围内，则返回
    if (
      allowParentBind.length !== 0 &&
      !allowParentBind.includes(parentBind) &&
      isParentNeed
    )
      return message.warning('请将正确的物料放置当前容器中')
    // 获取新增命令
    const command = register.create(
      'drop',
      nodeKey,
      targetKey,
      desUISchema,
      delNode,
      insertNode
    )
    commandManager.executeCommand(command)
  }

  // 一旦某个节点的bind字段绑定，这个递归函数就会重新执行，此时的uiSchema.bind就直接有值，不再需要onClick事件获取，此时的根据currentKey找到的Node节点的bind字段有值
  const renderTemplate = (
    uiSchema: singleNode,
    deep: number,
    prevBind: string,
    prevKey: string
  ) => {
    // 是否显示拖拽放置元素(isNestedAgain = true 且当前子元素数量 < 最大子元素数量)
    const isShowDropTarget = uiSchema.constraints.isNestedAgain
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
            // 记录当前选中节点在递归中的层级，用于<RightPanel />中禁用非相关的级联选项
            setNodeDeep(deep)
            setNodeBind(prevBind)
            // 记录当前选中节点的key
            setCurrentSelectedKey(uiSchema.nodeKey)
          }}
        >
          <div
            className={styles['del-box']}
            style={{
              visibility:
                uiSchema.constraints.ableDel &&
                uiSchema.nodeKey === currentSelectedKey
                  ? 'visible'
                  : 'hidden',
            }}
            onClick={() => {
              const prevKeysArr = prevKey.split('&')
              const prev = prevKeysArr[prevKeysArr.length - 2]
              // 获取删除命令
              const command = register.create(
                'delete',
                prev,
                uiSchema.nodeKey,
                currentUISchema,
                delNode,
                insertNode
              )
              commandManager.executeCommand(command)
              // 清空选择的节点id
              setCurrentSelectedKey('')
            }}
          >
            <Icon component={closeSVG} />
          </div>
          <legend>
            <Icon component={typeToSVG[uiSchema.type]} />
            <span
              style={{
                marginLeft: '8px',
              }}
            >
              {typeToComponentName[uiSchema.type]}
              {uiSchema.bind ? <Tag>{uiSchema.bind}</Tag> : null}
            </span>
          </legend>

          <div
            className={`${
              uiSchema.layout === 'horizontal'
                ? styles['flex-fieldset']
                : uiSchema.layout === 'grid'
                ? styles['three-grid-container']
                : ''
            }`}
            style={{
              gridTemplateColumns:
                uiSchema.layout === 'grid'
                  ? `repeat(${uiSchema.constraints.columns}, minmax(0, 1fr))`
                  : '',
            }}
          >
            {uiSchema.children?.length
              ? uiSchema.children.map((nestedChild: singleNode) => (
                  <React.Fragment key={nestedChild.nodeKey}>
                    {/* 这里根据递归的层数拼接bind字段，在后续<RightPanel />中根据拼接路径以及deep层级筛选出所需的bind */}
                    {renderTemplate(
                      nestedChild,
                      deep + 1,
                      prevBind + '-' + nestedChild.bind,
                      prevKey + '&' + nestedChild.nodeKey // 注意，由于nodeKey在生成uuid的时候可能会生成'-'，所以此处使用'&'进行拼接
                    )}
                  </React.Fragment>
                ))
              : null}
          </div>
          {isShowDropTarget ? (
            <DropTarget
              onDrop={handleDrop}
              nodeType={uiSchema.type}
              nodeKey={uiSchema.nodeKey}
              parentBind={uiSchema.bind}
              isParentNeed={uiSchema.constraints.ableBind}
            >
              <DragBtn />
            </DropTarget>
          ) : null}
        </fieldset>
      </>
    )
  }

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div className={styles['design-container']}>
          <NavBar
            temId={temId || ''}
            updateTime={updateTime}
            setIsOpened={setIsOpened}
            generateShot={generateShot}
          />
          <div className={styles['design-body']}>
            <LeftPanel />
            <main
              ref={designRef}
              className={styles['preview-container']}
              onClick={() => setCurrentSelectedKey('')}
            >
              <div className={styles['view-container']}>
                {renderTemplate(
                  currentUISchema,
                  1,
                  currentUISchema.bind,
                  currentUISchema.nodeKey
                )}
              </div>
            </main>
            {currentSelectedKey ? (
              <RightPanel currentNodeDeep={nodeDeep} nodeBind={nodeBind} />
            ) : (
              <GlobalSetting />
            )}
          </div>
        </div>
      </DndProvider>
      <Drawer
        title="JSON"
        closable={{ 'aria-label': 'Close Button' }}
        width="40%"
        open={isOpened}
        onClose={() => setIsOpened(false)}
      >
        <Editor
          width="100%"
          language="json"
          defaultValue={JSON.stringify({}, null, 2)}
          value={JSON.stringify(currentUISchema, null, 2)}
          onMount={(editor) => {
            editor.onDidBlurEditorText(() => {
              // const value = editor.getValue()
              // handleEditorBlur(value)
              // 在这里做失焦后的处理，比如保存
            })
          }}
        />
      </Drawer>
    </>
  )
}

export default Design
