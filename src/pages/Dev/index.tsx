import LeftMenu from './components/LeftMenu'
import RightMenu from './components/RightMenu'
import Materials from './components/Materials'
import configStyle from '@/config/templates'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import styles from './index.module.scss'
import { useDevStore, useStyleStore, useUIStore, useUserStore } from '@/store'
import { pxToMm } from '@/utils'
import Setting from './components/Setting'
import BottomBar from './components/BottomBar'
import Render from '../Render'
import StyleEditor from './components/StyleEditor'
import type { drawerMethods, ButtonPanelPosition } from '@/types/materials'
import { useExportPDF } from '@/hooks/useExportPDF'
import { message, Spin } from 'antd'
import Icon from '@ant-design/icons'
import commentSVG from '@/assets/svg/dev/comment.svg?react'
import ChatSideBar from './components/ChatSideBar'
import { getResumeDetailsAPI, getTemplatesAPI } from '@/apis/resume'
import { useParams } from 'react-router-dom'
import { templateListType } from '@/types/ui'

const Dev = () => {
  const userId = useUserStore((state) => state.info.id)
  const dataSource = useDevStore((state) => state.devSchema.dataSource)
  const setDataSource = useDevStore((state) => state.setDataSource)
  const setResumeId = useDevStore((state) => state.setResumeId)
  const setTemplateId = useDevStore((state) => state.setTemplateId)
  const uiSchema = useUIStore((state) => state.uiSchema)
  const setUiSchema = useUIStore((state) => state.setUiSchema)
  const setPagePadding = useStyleStore((state) => state.setPagePadding)
  const setModulePadding = useStyleStore((state) => state.setModulePadding)
  const setLineHeight = useStyleStore((state) => state.setLineHeight)
  const setFontSize = useStyleStore((state) => state.setFontSize)
  const setFontColor = useStyleStore((state) => state.setFontColor)
  const setMainColor = useStyleStore((state) => state.setMainColor)
  const setBgColor = useStyleStore((state) => state.setBgColor)
  const setBorderStyle = useStyleStore((state) => state.setBorderStyle)
  const setSidebarProportions = useStyleStore(
    (state) => state.setSidebarProportions
  )
  const resumeRef = useRef<HTMLDivElement>(null)
  const mainRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const drawerRef = useRef<drawerMethods>(null)

  const pageWidth = 794
  const pageHeight = 1120
  const [loading, setLoading] = useState<boolean>(false)
  const [dragging, setDragging] = useState(false)
  const [wheel, setWheel] = useState(0.7)
  const [translateX, setTranslateX] = useState(pageWidth / 2)
  const [translateY, setTranslateY] = useState(pageHeight / 2)
  const [lineShow, setLineShow] = useState(false)
  const [isLeftUnExpand, setisLeftUnExpand] = useState(false)
  const [isRightUnExpand, setisRightUnExpand] = useState(false)
  const [temList, setTemList] = useState<templateListType[]>([])
  const startX = useRef(0)
  const startY = useRef(0)
  const startTranslateX = useRef(translateX)
  const startTranslateY = useRef(translateY)
  const params = useParams()
  useEffect(() => {
    const getDetail = async () => {
      if (params.randomId) {
        setLoading(true)
        const [
          { data },
          {
            data: { templateList },
          },
        ] = await Promise.all([
          getResumeDetailsAPI(params.randomId),
          getTemplatesAPI(userId),
        ])

        // console.log('temList', temList)
        setTemList(templateList)
        // const { data } = await getResumeDetailsAPI(params.randomId)
        setDataSource(data.content)
        setTemplateId(data.templateId)
        const { code, temSchema } = await fetchUISchema(
          data.templateId,
          templateList
        )
        if (code) {
          setUiSchema(temSchema)
          // const res = await fetch('/test.json')
          // const uiSchemaRes = await res.json()
          // setUiSchema(uiSchemaRes)
          await initGlobalStyle(temSchema)
        } else {
          return message.error('未找到对应的模板')
        }
        setLoading(false)
      }
    }
    setResumeId(params.randomId || 'unknow-randonId')
    getDetail()
  }, [])

  // 适配对于的uiSchema
  const fetchUISchema = (
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
  }

  // useEffect(() => {
  //   const getUiSchema = async () => {
  //     try {
  //       setLoading(true)
  //       const res = await fetch('/custom.json')
  //       if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
  //       const uiSchemaRes = await res.json()
  //       console.log('uiSchemaRes', uiSchemaRes)

  //       setUiSchema(uiSchemaRes)

  //       await initGlobalStyle(uiSchemaRes)
  //     } catch (error) {
  //       console.log('err', error)
  //       setUiSchema(null)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }
  //   getUiSchema()
  // }, [])

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
          sidebarProportions,
        },
      } = uiSchemaRes
      setPagePadding(pagePadding)
      setModulePadding(modulePadding)
      setLineHeight(lineHeight)
      setFontSize(fontSize)
      setFontColor(fontColor)
      setBgColor(bgColor)
      setMainColor(mainColor)
      setBorderStyle(borderStyle)
      setSidebarProportions(sidebarProportions)
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
    if (wheel === 0.7) return
    setWheel(0.7)
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
  const handleScroll = (position: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: position,
        behavior: 'smooth',
      })
    }
  }

  // 模式切换
  const handleModeSwitch = () => {
    drawerRef.current?.handleOpen()
  }

  const { savePDF, isLoading } = useExportPDF(mainRef, setWheel)

  // 监听分页线
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const { height } = entry.contentRect
        const mmHeight = pxToMm(height)
        if (mmHeight > 297) {
          setLineShow(true)
        } else {
          setLineShow(false)
        }
      })
    })

    if (mainRef.current) {
      observer.observe(mainRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // 当前是否为阅读模式
  const isReadMode = useMemo(() => {
    return isLeftUnExpand && isRightUnExpand
  }, [isLeftUnExpand, isRightUnExpand])

  const [hoveredEl, setHoveredEl] = useState<HTMLElement | null>(null)
  const [selectedEl, setSelectedEl] = useState<HTMLElement | null>(null)
  const [panelPos, setPanelPos] = useState<ButtonPanelPosition | null>(null)
  const [currentNodeKey, setCurrentNodeKey] = useState('')
  const [currentText, setCurrentText] = useState('')
  const [sidebarOpened, setSidebarOpened] = useState(false)
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

  return (
    <div className={styles['dev-container']}>
      <LeftMenu
        iconClick={handleScroll}
        isLeftUnExpand={isLeftUnExpand}
        setisLeftUnExpand={setisLeftUnExpand}
      />
      <Materials ref={scrollRef} isLeftUnExpand={isLeftUnExpand} />
      <main
        className={`${styles['main-container']}
        ${isLeftUnExpand && isRightUnExpand && styles['not-edit']}
        `}
      >
        <div
          className={styles['preview-container']}
          onWheel={(e) => handleWheel(e)}
          onMouseDown={(e) => startDrag(e)}
        >
          <div
            className={styles['resume-container']}
            style={{
              ...configStyle['commonStyle'],
              width: pageWidth,
              height: pageHeight,
              transform: `translate(-${translateX}px, -${translateY}px) scale(${wheel})`,
              cursor: dragging ? 'grabbing' : isReadMode ? '' : 'grab',
            }}
            ref={resumeRef}
          >
            <div className={styles['preview-content']} ref={mainRef}>
              {uiSchema && !loading && top ? (
                <Render dataContext={dataSource} node={uiSchema} />
              ) : null}
            </div>
            {lineShow && (
              <div className={styles['page-line']}>
                <span>分页线</span>
              </div>
            )}
            {isLoading ? (
              <div className={styles['loading-box']}>
                <Spin />
              </div>
            ) : null}
          </div>
        </div>
      </main>
      <Setting isRightUnExpand={isRightUnExpand} temList={temList} />
      <RightMenu
        isRightUnExpand={isRightUnExpand}
        setisRightUnExpand={setisRightUnExpand}
      />
      <BottomBar
        upWheel={upWheel}
        reduceWheel={reduceWheel}
        handleModeSwitch={handleModeSwitch}
        resetWheel={resetWheel}
        isLeftUnExpand={isLeftUnExpand}
        isRightUnExpand={isRightUnExpand}
        isReadMode={isReadMode}
        setisLeftUnExpand={setisLeftUnExpand}
        setisRightUnExpand={setisRightUnExpand}
        savePDF={savePDF}
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
          onClick={() => setSidebarOpened(true)}
        >
          {/* 功能按钮面板 */}
          <Icon component={commentSVG} />
        </div>
      )}
      <ChatSideBar
        selectedNodeKey={currentNodeKey}
        currentText={currentText}
        sidebarOpened={sidebarOpened}
        setSidebarOpened={setSidebarOpened}
        setCurrentText={setCurrentText}
      />
    </div>
  )
}

export default Dev
