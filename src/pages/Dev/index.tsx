import LeftMenu from './components/LeftMenu'
import RightMenu from './components/RightMenu'
import Materials from './components/Materials'
import configStyle from '@/config/templates'
import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.scss'
import { useDevStore, useGlobalStore } from '@/store'
import { pxToMm } from '@/utils'

const Dev = () => {
  const comList = useDevStore((state) => state.devSchema.componentList)
  const comMap = useGlobalStore((state) => state.keyToComponentMap)
  const resumeRef = useRef<HTMLDivElement>(null)
  const mainRef = useRef<HTMLDivElement>(null)
  const pageWidth = 794
  const pageHeight = 1120
  const [dragging, setDragging] = useState(false)
  const [wheel, setWheel] = useState(0.6)
  const [translateX, setTranslateX] = useState(pageWidth / 2)
  const [translateY, setTranslateY] = useState(pageHeight / 2)
  const [lineShow, setLineShow] = useState(false)

  const startX = useRef(0)
  const startY = useRef(0)
  const startTranslateX = useRef(translateX)
  const startTranslateY = useRef(translateY)

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

  return (
    <div className={styles['dev-container']}>
      <LeftMenu />
      <main className={styles['main-container']}>
        <Materials></Materials>
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
            }}
            ref={resumeRef}
          >
            <div className={styles['preview-content']} ref={mainRef}>
              {comList.map((item, index) => {
                const Com = comMap[item]
                return Com ? <Com key={index}></Com> : ''
              })}
            </div>
            {lineShow && (
              <div className={styles['page-line']}>
                <span>分页线</span>
              </div>
            )}
          </div>
        </div>
      </main>
      <RightMenu></RightMenu>
    </div>
  )
}

export default Dev
