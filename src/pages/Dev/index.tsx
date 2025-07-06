import LeftMenu from './components/LeftMenu'
import RightMenu from './components/RightMenu'
import Materials from './components/Materials'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styles from './index.module.scss'
import { useDevStore, useStyleStore, useUIStore, useUserStore } from '@/store'
import Setting from './components/Setting'
import BottomBar from './components/BottomBar'
import Render from '../Render'
import StyleEditor from './components/StyleEditor'
import type { drawerMethods, ButtonPanelPosition } from '@/types/materials'
import { message, Spin } from 'antd'
import Icon from '@ant-design/icons'
import commentSVG from '@/assets/svg/dev/comment.svg?react'
import ChatSideBar from './components/ChatSideBar'
import { getResumeDetailsAPI } from '@/apis/resume'
import { useParams, useSearchParams } from 'react-router-dom'
import type { layoutMapType, nodeType, templateListType } from '@/types/ui'
import { getTemplatesAPI } from '@/apis/template'
import InvalidHoc from './components/InvalidHoc'
import AuthorizationHoc from './components/AuthorizationHoc'
import QASideBar from './components/QASideBar'
import { createLink2Download, getAllStyleText, sleep } from '@/utils'
import { BASE_URL } from '@/utils/request'
import PDFModal from './components/PDFModal'

const Dev = () => {
  const userId = useUserStore((state) => state.info.id)
  const userToken = useUserStore((state) => state.info.token)
  const dataSource = useDevStore((state) => state.devSchema.dataSource)
  const setDataSource = useDevStore((state) => state.setDataSource)
  const setResumeId = useDevStore((state) => state.setResumeId)
  const setTemplateId = useDevStore((state) => state.setTemplateId)
  const resetGlobalInfo = useDevStore((state) => state.resetGlobalInfo)
  const uiSchema = useUIStore((state) => state.uiSchema)
  const setUiSchema = useUIStore((state) => state.setUiSchema)
  const setPageKeyToStyle = useStyleStore((state) => state.setPageKeyToStyle)
  const layoutMap = useUIStore((state) => state.layoutMap)

  const resumeRef = useRef<HTMLDivElement>(null)
  // 页面删除的时候，数组原先的位置会变成null，但是在执行生成pdf的时候，已经对null的情况做了判断，故此处不处理
  const mainRefs = useRef<(HTMLDivElement | null)[]>([]) // 存储所有 ref
  // 更新 ref 数组
  const setMainRef = (el: HTMLDivElement | null, index: number) => {
    mainRefs.current[index] = el
  }

  const leftScrollRef = useRef<HTMLDivElement>(null)
  const rightScrollRef = useRef<HTMLDivElement>(null)
  const drawerRef = useRef<drawerMethods>(null)

  const pageWidth = 794
  const pageHeight = 1120
  const [loading, setLoading] = useState<boolean>(false)
  const [dragging, setDragging] = useState(false)
  const [wheel, setWheel] = useState(0.5)
  const [translateX, setTranslateX] = useState(pageWidth / 2)
  const [translateY, setTranslateY] = useState(pageHeight / 2)
  // const [lineShow, setLineShow] = useState(false)
  const [isLeftUnExpand, setisLeftUnExpand] = useState(false)
  const [isRightUnExpand, setisRightUnExpand] = useState(false)
  const [temList, setTemList] = useState<templateListType[]>([])
  // 当前是否为阅读模式
  const [isReadMode, setIsReadMode] = useState(false)
  // 导出pdf对话框
  const [isModalOpen, setISModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [mouseMode, setMouseMode] = useState<'pan' | 'scale'>('pan')
  const startX = useRef(0)
  const startY = useRef(0)
  const startTranslateX = useRef(translateX)
  const startTranslateY = useRef(translateY)
  const params = useParams()

  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  const isOrigin = useMemo(() => {
    return !searchParams.get('token')
  }, [searchParams])

  useEffect(() => {
    const getDetail = async () => {
      if (params.randomId) {
        setLoading(true)
        const { data } = await getResumeDetailsAPI(params.randomId)
        const {
          data: { templateList, diyTemplateList },
        } = await getTemplatesAPI(userId)
        // const [
        //   { data },
        //   {
        //     data: { templateList, diyTemplateList },
        //   },
        // ] = await Promise.all([
        //   getResumeDetailsAPI(params.randomId),
        //   getTemplatesAPI(userId),
        // ])
        setTemList([...templateList, ...diyTemplateList])
        // const { data } = await getResumeDetailsAPI(params.randomId)
        setDataSource({
          ...data.content,
          // 前后沟通有误，导致初始化时结构不一致，此处做特殊处理(不太提倡)
          SKILL_LIST: {
            ...data.content.SKILL_LIST,
            visible: true,
            info: data.content.SKILL_LIST.info
              ? data.content.SKILL_LIST.info
              : [],
          },
          HEART_LIST: {
            ...data.content.HEART_LIST,
            visible: true,
            info: data.content.HEART_LIST.info
              ? data.content.HEART_LIST.info
              : [],
          },
        })
        setTemplateId(data.templateId)
        // fetch('/test2.json')
        //   .then((response) => {
        //     if (!response.ok) {
        //       throw new Error('Network response was not ok')
        //     }
        //     return response.json() // 如果是JSON文件
        //   })
        //   .then(async (data) => {
        //     console.log(data) // 处理获取到的数据
        //     setUiSchema(data)
        //     await initGlobalStyle(data)
        //   })
        const { code, temSchema } = await fetchUISchema(data.templateId, [
          ...templateList,
          ...diyTemplateList,
        ])
        if (code) {
          setUiSchema(temSchema)
          await initGlobalStyle(temSchema)
        } else {
          return message.error('未找到对应的模板')
        }
        setLoading(false)
      }
    }
    setResumeId(params.randomId || 'unknow-randonId')
    getDetail()

    return () => {
      resetGlobalInfo()
    }
  }, [])

  // 适配对应的uiSchema
  const fetchUISchema = useCallback(
    (
      templateId: string,
      temList: templateListType[]
    ): Promise<{
      code: 0 | 1
      temSchema: any | null
    }> => {
      return new Promise((resolve, reject) => {
        const temSchema = temList.find((tem) => tem.id === templateId)
        if (temSchema)
          resolve({
            code: 1,
            temSchema: temSchema.style_config,
          })
        else
          reject({
            code: 0,
            temSchema: null,
          })
      })
    },
    []
  )

  const initGlobalStyle = (uiSchemaRes: any): Promise<string> => {
    return new Promise((resolve) => {
      const {
        configStyle: {
          pagePadding,
          modulePadding,
          lineHeight,
          fontSize,
          fontColor,
          bgColor,
          mainColor,
          borderStyle,
        },
      } = uiSchemaRes
      setPageKeyToStyle('pagePadding', pagePadding)
      setPageKeyToStyle('modulePadding', modulePadding)
      setPageKeyToStyle('lineHeight', lineHeight)
      setPageKeyToStyle('fontSize', fontSize)
      setPageKeyToStyle('fontColor', fontColor)
      setPageKeyToStyle('bgColor', bgColor)
      setPageKeyToStyle('mainColor', mainColor)
      setPageKeyToStyle('borderStyle', borderStyle)
      resolve('success')
    })
  }

  const upWheel = () => {
    if (wheel >= 1) return
    setWheel((prev) => prev + 0.1)
  }

  const reduceWheel = () => {
    if (wheel <= 0.3) return
    setWheel((prev) => prev - 0.1)
  }

  // 重置缩放
  const resetWheel = () => {
    if (wheel === 0.5) return
    setWheel(0.5)
  }

  const startDrag = (e: React.MouseEvent<Element>) => {
    if (isReadMode) return
    e.preventDefault()
    setDragging(true)

    startX.current = e.pageX
    startY.current = e.pageY
    startTranslateX.current = translateX
    startTranslateY.current = translateY
  }

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    // 滚轮操作时为"平移"模式下不处理缩放，处理滚动
    if (mouseMode === 'pan') {
      // 根据滚轮方向调整 translateY（上下滚动）或 translateX（Shift + 滚轮左右滚动）
      if (e.shiftKey) {
        // Shift + 滚轮 → 水平移动
        setTranslateX((prev) => prev + e.deltaY)
      } else {
        // 普通滚轮 → 垂直移动
        setTranslateY((prev) => prev + e.deltaY)
      }
      return
    }

    const zoomSpeed = 0.1
    // const oldWheel = wheel
    // 放大
    if (e.deltaY < 0) {
      setWheel(Math.min(wheel + zoomSpeed, 1))
    } else {
      // 缩小
      setWheel(Math.max(wheel - zoomSpeed, 0.3))
    }
  }

  useEffect(() => {
    const onDragging = (e: MouseEvent) => {
      if (!dragging) return

      const delayX = e.pageX - startX.current
      const delayY = e.pageY - startY.current
      setTranslateX(startTranslateX.current - delayX)
      setTranslateY(startTranslateY.current - delayY)
    }

    const endDrag = () => {
      setDragging(false)
    }

    if (dragging) {
      window.addEventListener('mousemove', onDragging)
      window.addEventListener('mouseup', endDrag)
    } else {
      window.removeEventListener('mousemove', onDragging)
      window.removeEventListener('mouseup', endDrag)
    }

    return () => {
      window.removeEventListener('mousemove', onDragging)
      window.removeEventListener('mouseup', endDrag)
    }
  }, [dragging])

  // 滚动至具体位置
  const handleLeftScroll = useCallback((position: number) => {
    if (leftScrollRef.current) {
      leftScrollRef.current.scrollTo({
        top: position,
        behavior: 'smooth',
      })
    }
  }, [])

  const handleRightScroll = useCallback((position: number) => {
    if (rightScrollRef.current) {
      rightScrollRef.current.scrollTo({
        top: position,
        behavior: 'smooth',
      })
    }
  }, [])

  // 模式切换
  const handleModeSwitch = () => {
    drawerRef.current?.handleOpen()
  }

  const [isLoading, setIsLoading] = useState(false)

  const [hoveredEl, setHoveredEl] = useState<HTMLElement | null>(null)
  const [selectedEl, setSelectedEl] = useState<HTMLElement | null>(null)
  const [panelPos, setPanelPos] = useState<ButtonPanelPosition | null>(null)
  const [currentNodeKey, setCurrentNodeKey] = useState('')
  const [currentText, setCurrentText] = useState('')
  const panelRef = useRef<HTMLDivElement>(null)
  // Hover 事件监听
  useEffect(() => {
    if (!isReadMode || !resumeRef.current) return
    const container = resumeRef.current
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (panelRef.current?.contains(target)) return // 避免 hover 到面板本身
      setHoveredEl(target)
    }

    const handleMouseOut = () => {
      setHoveredEl(null)
    }

    container.addEventListener('mouseover', handleMouseOver, true)
    container.addEventListener('mouseout', handleMouseOut, true)

    return () => {
      container.removeEventListener('mouseover', handleMouseOver, true)
      container.removeEventListener('mouseout', handleMouseOut, true)
    }
  }, [isReadMode])

  // Click 事件监听
  useEffect(() => {
    if (!isReadMode || !resumeRef.current) return
    // const container = resumeRef.current
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (panelRef.current?.contains(target)) return // 避免点击面板时消失
      // 选中目标区域外的元素
      if (!resumeRef.current?.contains(target)) {
        setSelectedEl(null)
        setPanelPos({
          left: -9999,
          top: -999,
        })
        return
      }
      setSelectedEl(target)
      setPanelPos({
        top: e.clientY + 8,
        left: e.clientX + 8,
      })

      e.preventDefault()
      // e.stopPropagation()
    }

    document.body.addEventListener('click', handleClick, true)

    return () => {
      document.body.removeEventListener('click', handleClick, true)
    }
  }, [isReadMode])

  // 添加高亮样式
  useEffect(() => {
    if (!isReadMode) return
    if (hoveredEl) {
      hoveredEl.style.outline = '2px solid #9b59b6'
    }
    return () => {
      if (hoveredEl) {
        hoveredEl.style.outline = ''
      }
    }
  }, [hoveredEl, isReadMode])

  // 添加选中的元素的样式
  useEffect(() => {
    if (selectedEl) {
      selectedEl.style.backgroundColor = '#fef6d5'
      // 获取自定义属性 node-key，用于标识当前被评论的简历内容\
      // 项目已替换成自定义md编辑器，生成的每一个标签都已使用uuid生成随机id
      const currentNodeKey = selectedEl.getAttribute('data-node-key')
      // 记录当前评论节点的id
      setCurrentNodeKey(currentNodeKey || 'not_node_key')
      // 记录当前评论节点的内容
      setCurrentText(selectedEl.innerText)
    }
    return () => {
      if (selectedEl) selectedEl.style.backgroundColor = ''
    }
  }, [selectedEl])

  // 当前页面
  const pageArr = useMemo(() => [...layoutMap.keys()], [layoutMap])

  const getPageUiSchema = useCallback(
    (
      pageKey: string,
      uiSchema: nodeType,
      layoutMap: layoutMapType
    ): nodeType | null => {
      // console.log('uiSchema==', uiSchema, pageKey)
      const deepUiSchema = JSON.parse(JSON.stringify(uiSchema))
      const pageModules = layoutMap.get(pageKey)?.main.map((i) => i.key)
      const newChildren: (nodeType | null)[] = []
      pageModules?.forEach((module, index) => {
        newChildren[index] =
          deepUiSchema?.children?.find((i: nodeType) => i.bind === module) ||
          null
      })
      return {
        ...deepUiSchema,
        bind: deepUiSchema?.bind || '',
        children: newChildren.filter(Boolean) as nodeType[],
      }
    },
    []
  )

  // 浏览器打印
  const iframePrint = async () => {
    try {
      const iframe = document.createElement('iframe')
      iframe.style.position = 'absolute'
      iframe.style.width = '0'
      iframe.style.height = '0'
      iframe.style.border = 'none'
      iframe.style.left = '-9999px'

      // 先添加到DOM再设置内容
      document.body.appendChild(iframe)

      await new Promise((resolve) => {
        iframe.onload = resolve

        // 设置空白文档触发load事件
        iframe.srcdoc = '<!DOCTYPE html><html><head></head><body></body></html>'
      })

      const iframeDoc = iframe.contentDocument
      if (!iframeDoc) throw new Error('无法访问iframe文档')

      // 收集样式 - 考虑限制范围
      const styles = Array.from(
        document.querySelectorAll('style, link[rel="stylesheet"]')
      )
        .map((node) => node.outerHTML)
        .join('\n')

      // 处理打印内容
      const elementsToPrint = mainRefs.current
        ?.filter((el): el is HTMLDivElement => el !== null)
        .map((el) => {
          const existingStyle = el.getAttribute('style') || ''
          el.setAttribute(
            'style',
            `${existingStyle}; page-break-after: always;`
          )
          return el.outerHTML
        })
        .join('')

      const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print</title>
          ${styles}
          <style>
            body { margin: 0; padding: 0; }
            @page { size: auto; margin: 0; }
          </style>
        </head>
        <body>
          ${elementsToPrint}
        </body>
      </html>
    `

      iframeDoc.open()
      iframeDoc.write(html)
      iframeDoc.close()

      await sleep() // 确保内容渲染完成

      iframe.contentWindow?.focus()
      iframe.contentWindow?.print()
    } catch (error) {
      console.error('打印出错:', error)
    } finally {
      // 延迟移除iframe以确保打印完成
      const iframe = document.querySelector('iframe[style*="left: -9999px"]')
      if (iframe && iframe.parentNode) {
        iframe.parentNode.removeChild(iframe)
      }
    }
  }

  // 生成打印目标的html交由无头浏览器
  const generatorTargetHTMLStr = () => {
    const html = resumeRef.current?.outerHTML || ''
    const styleText = getAllStyleText()

    return `
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>简历导出</title>
      ${styleText}
    </head>
    <body>
      ${html}
    </body>
    </html>
  `
  }

  // 无头浏览器打印
  const headlessBrowserExportPDF = async () => {
    const html = generatorTargetHTMLStr()
    // 此处不再使用封装的request，因为此处接口返回的数据格式是特殊情况，而request中对返回的数据格式做了强校验
    const response = await fetch(`${BASE_URL}/resume/pdf/export`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: userToken,
      } as any,
      body: JSON.stringify({
        html,
        resumeId: params.randomId!,
      }),
    })

    if (!response.ok) {
      throw new Error('生成 PDF 失败')
    }

    const blob = await response.blob()
    await createLink2Download(blob, params.randomId)
  }

  const handleExportPDF = async () => {
    setISModalOpen(false)
    setIsLoading(true)
    if (activeTab === 0) {
      await headlessBrowserExportPDF()
    } else if (activeTab === 1) {
      await iframePrint()
    }
    setIsLoading(false)
  }
  return (
    <>
      <InvalidHoc token={token}>
        <div className={styles['dev-container']}>
          <AuthorizationHoc permission={3} isOrigin={isOrigin}>
            <LeftMenu
              iconClick={handleLeftScroll}
              isLeftUnExpand={isLeftUnExpand}
              setisLeftUnExpand={setisLeftUnExpand}
            />
            <Materials ref={leftScrollRef} isLeftUnExpand={isLeftUnExpand} />
          </AuthorizationHoc>

          <main
            className={`${styles['main-container']} ${
              isLeftUnExpand && isRightUnExpand ? styles['not-edit'] : ''
            }`}
          >
            <div
              className={`${styles['preview-container']} resume-target`}
              onWheel={(e) => handleWheel(e)}
              onMouseDown={(e) => startDrag(e)}
            >
              <div
                className={`${styles['resume-container']} resume-inner`}
                style={{
                  transform: `translate(-${translateX}px, -${translateY}px) scale(${wheel})`,
                  cursor: isReadMode
                    ? ''
                    : mouseMode === 'pan'
                    ? 'move'
                    : dragging
                    ? 'grabbing'
                    : 'grab',
                  gridTemplateColumns: `repeat(${pageArr.length} 1fr)`,
                }}
                ref={resumeRef}
              >
                <span className={`${styles['scale-tooltip-box']} resume-miss`}>
                  缩放比例: {wheel.toFixed(2)}
                </span>
                {pageArr.map((page, index) => (
                  <div
                    className={`${styles['preview-content']} page-break`}
                    key={page}
                    ref={(el) => setMainRef(el, index)}
                    style={{
                      width: pageWidth,
                      height: pageHeight,
                    }}
                  >
                    {uiSchema && !loading ? (
                      <Render
                        dataContext={dataSource}
                        node={getPageUiSchema(page, uiSchema, layoutMap)}
                        wheel={wheel}
                      />
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </main>

          {isLoading ? (
            <div className={styles['loading-box']}>
              <Spin />
            </div>
          ) : null}

          <AuthorizationHoc permission={3} isOrigin={isOrigin}>
            <Setting
              ref={rightScrollRef}
              isRightUnExpand={isRightUnExpand}
              isOrigin={isOrigin}
              temList={temList}
              fetchUISchema={fetchUISchema}
            />
            <RightMenu
              iconClick={handleRightScroll}
              isRightUnExpand={isRightUnExpand}
              setisRightUnExpand={setisRightUnExpand}
            />
          </AuthorizationHoc>

          <BottomBar
            isReadMode={isReadMode}
            isOrigin={isOrigin}
            mouseMode={mouseMode}
            setMouseMode={setMouseMode}
            setIsReadMode={setIsReadMode}
            upWheel={upWheel}
            reduceWheel={reduceWheel}
            handleModeSwitch={handleModeSwitch}
            resetWheel={resetWheel}
            setisLeftUnExpand={setisLeftUnExpand}
            setisRightUnExpand={setisRightUnExpand}
            savePDF={() => setISModalOpen(true)}
          />

          <StyleEditor ref={drawerRef} />
          {panelPos && (
            <div
              ref={panelRef}
              style={{
                top: panelPos.top + 'px',
                left: panelPos.left + 'px',
              }}
              className={styles['panel-box']}
            >
              {/* 功能按钮面板 */}
              <Icon component={commentSVG} />
            </div>
          )}
          {isReadMode ? (
            <ChatSideBar
              resumeId={params.randomId!}
              selectedNodeKey={currentNodeKey}
              currentText={currentText}
              setCurrentText={setCurrentText}
            />
          ) : null}

          {isReadMode ? <QASideBar /> : null}
        </div>
      </InvalidHoc>

      {/* 选择下载选项的对话框 */}
      <PDFModal
        activeTab={activeTab}
        isModalOpen={isModalOpen}
        setIsModalOpen={setISModalOpen}
        setActiveTab={setActiveTab}
        handleExportPDF={handleExportPDF}
      />
    </>
  )
}

export default Dev
