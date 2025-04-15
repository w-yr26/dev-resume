import LeftMenu from './components/LeftMenu'
import RightMenu from './components/RightMenu'
import Materials from './components/Materials'
import configStyle from '@/config/templates'
import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.scss'
import { useDevStore } from '@/store'
import { pxToMm } from '@/utils'
import Setting from './components/Setting'
import BottomBar from './components/BottomBar'
import Render from '../Render'
import uiSchema from '../Render/test.json'

const Dev = () => {
  const dataSource = useDevStore((state) => state.devSchema.dataSource)
  const resumeRef = useRef<HTMLDivElement>(null)
  const mainRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const pageWidth = 794
  const pageHeight = 1120
  const [dragging, setDragging] = useState(false)
  const [wheel, setWheel] = useState(0.7)
  const [translateX, setTranslateX] = useState(pageWidth / 2)
  const [translateY, setTranslateY] = useState(pageHeight / 2)
  const [lineShow, setLineShow] = useState(false)

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

  // 滚动至具体位置
  const handleScroll = (position: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: position,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className={styles['dev-container']}>
      <div
        style={{
          display: 'flex',
          width: '30%',
          backgroundColor: '#f8f8f9',
        }}
      >
        <LeftMenu iconClick={handleScroll} />
        <Materials ref={scrollRef} />
      </div>
      <main className={styles['main-container']}>
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
              <Render dataContext={dataSource} node={uiSchema} />
            </div>
            {lineShow && (
              <div className={styles['page-line']}>
                <span>分页线</span>
              </div>
            )}
          </div>
        </div>
      </main>
      <div
        style={{
          display: 'flex',
          width: '30%',
        }}
      >
        <Setting></Setting>
        <RightMenu></RightMenu>
      </div>
      <BottomBar upWheel={upWheel} reduceWheel={reduceWheel}></BottomBar>
    </div>
  )
}

export default Dev
