import LeftMenu from './components/LeftMenu'
import RightMenu from './components/RightMenu'
import Materials from './components/Materials'
import configStyle from '@/config/templates'
import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.scss'
import { useDevStore, useStyleStore, useUIStore } from '@/store'
import { pxToMm } from '@/utils'
import Setting from './components/Setting'
import BottomBar from './components/BottomBar'
import Render from '../Render'
import StyleEditor from './components/LeftMenu/StyleEditor'
import type { drawerMethods } from '@/types/materials'

const Dev = () => {
  const dataSource = useDevStore((state) => state.devSchema.dataSource)
  const setUiSchema = useUIStore((state) => state.setUiSchema)
  const uiSchema = useUIStore((state) => state.uiSchema)
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
  const [dragging, setDragging] = useState(false)
  const [wheel, setWheel] = useState(0.7)
  const [translateX, setTranslateX] = useState(pageWidth / 2)
  const [translateY, setTranslateY] = useState(pageHeight / 2)
  const [lineShow, setLineShow] = useState(false)
  const [isDev, setIsDev] = useState(false)

  const startX = useRef(0)
  const startY = useRef(0)
  const startTranslateX = useRef(translateX)
  const startTranslateY = useRef(translateY)

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

  // 监听分页线
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const { height } = entry.contentRect
        const mmHeight = pxToMm(height)
        if (mmHeight > 297) {
          setLineShow(true)
        }
      })
    })

    if (mainRef.current) {
      observer.observe(mainRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const [loading, setLoading] = useState<boolean>(false)
  useEffect(() => {
    const getUiSchema = async () => {
      try {
        setLoading(true)
        const res = await fetch('/test.json')
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
        const uiSchemaRes = await res.json()
        setUiSchema(uiSchemaRes)

        await initGlobalStyle(uiSchemaRes)
      } catch (error) {
        console.log('err', error)
        setUiSchema(null)
      } finally {
        setLoading(false)
      }
    }
    getUiSchema()
  }, [])

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

  return (
    <div className={styles['dev-container']}>
      <LeftMenu iconClick={handleScroll} />
      <Materials ref={scrollRef} isDev={isDev} />
      <main
        className={`${styles['main-container']}
        ${isDev && styles['not-edit']}
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
              cursor: dragging ? 'grabbing' : 'grab',
            }}
            ref={resumeRef}
          >
            <div className={styles['preview-content']} ref={mainRef}>
              {/* {comList.map((item, index) => {
                const Com = comMap[item]
                return Com ? <Com key={index}></Com> : null
              })} */}
              {uiSchema && !loading ? (
                <Render dataContext={dataSource} node={uiSchema} />
              ) : null}
            </div>
            {lineShow && (
              <div className={styles['page-line']}>
                <span>分页线</span>
              </div>
            )}
          </div>
        </div>
      </main>
      <Setting isDev={isDev} />
      <RightMenu />
      <BottomBar
        upWheel={upWheel}
        reduceWheel={reduceWheel}
        handleModeSwitch={handleModeSwitch}
        resetWheel={resetWheel}
        isDev={isDev}
        setIsDev={(val) => setIsDev(val)}
      />
      <StyleEditor ref={drawerRef} />
    </div>
  )
}

export default Dev
