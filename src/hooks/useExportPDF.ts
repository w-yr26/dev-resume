import React, { useState } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import type { RGBAData } from 'jspdf'
import { sleep } from '@/utils'

/**
 * @param mainRefs 多个待转换为PDF的容器（数组）
 * @param setWheel 重置缩放大小函数（可选）
 */
export function useExportPDF(
  mainRefs: React.RefObject<(HTMLDivElement | null)[]>,
  setWheel: (wheel: number) => void
) {
  const [isLoading, setIsLoading] = useState(false)

  // 生成单个容器的 Canvas
  const dom2Canvas = async (element: HTMLDivElement) => {
    const canvas = await html2canvas(element, {
      useCORS: true,
      scale: window.devicePixelRatio * 2,
    })
    return {
      base64URL: canvas.toDataURL('image/jpeg', 1),
      width: canvas.width,
      height: canvas.height,
    }
  }

  // 添加图片到 PDF
  const addImage = (
    pdfInstance: jsPDF,
    base_data:
      | string
      | HTMLImageElement
      | HTMLCanvasElement
      | Uint8Array
      | RGBAData,
    width: number,
    height: number,
    x: number = 0,
    y: number = 0
  ) => {
    pdfInstance.addImage(base_data, 'JPEG', x, y, width, height)
  }

  // 导出 PDF
  const savePDF = async () => {
    if (!mainRefs.current) return
    setIsLoading(true)

    setWheel(1)
    await sleep()

    const pdfInstance = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: 'a4',
    })

    // 遍历所有容器，每页一个
    for (let index = 0; index < mainRefs.current.length; index++) {
      const ref = mainRefs.current[index]
      if (!ref) continue // 跳过空引用

      const {
        base64URL,
        width: canvasWidth,
        height: canvasHeight,
      } = await dom2Canvas(ref)
      if (!base64URL || !canvasWidth || !canvasHeight) continue

      const pageWidth = pdfInstance.internal.pageSize.getWidth()
      const pageHeight = pdfInstance.internal.pageSize.getHeight()

      // 计算缩放比例（保持宽高比）
      const scale = pageWidth / canvasWidth
      const scaledHeight = canvasHeight * scale

      // 如果是第一页，直接添加；否则新增一页
      if (index >= 1) {
        pdfInstance.addPage('a4', 'portrait')
      }

      // 将内容居中（可选）
      const yPos = (pageHeight - scaledHeight) / 2
      addImage(pdfInstance, base64URL, pageWidth, scaledHeight, 0, yPos)
    }

    pdfInstance.save(`resume${new Date().getTime()}`)
    setIsLoading(false)
  }

  return {
    isLoading,
    savePDF,
  }
}
