import React from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import type { RGBAData } from 'jspdf'
import { sleep } from '@/utils'

export function useExportPDF(
  mainRef: React.RefObject<HTMLDivElement | null>,
  setWheel: (wheel: number) => void
) {
  const dom2Canvas = async () => {
    if (mainRef.current) {
      const canvas = await html2canvas(mainRef.current, {
        useCORS: true, // 允许图片跨域，后续换掉
        scale: window.devicePixelRatio * 2, // 这里可以设置清晰度(放大后锯齿的明显程度)
      })
      const { width, height } = canvas
      const base64URL = canvas.toDataURL('image/jpeg', 1) // 第二个参数quality: 生成的图片质量
      return {
        base64URL,
        width,
        height,
      }
    }
  }

  const addImage = (
    _x: number,
    _y: number,
    pdfInstance: jsPDF,
    base_data:
      | string
      | HTMLImageElement
      | HTMLCanvasElement
      | Uint8Array
      | RGBAData,
    _width: number,
    _height: number
  ) => {
    pdfInstance.addImage(base_data, 'JPEG', _x, _y, _width, _height)
  }

  const savePDF = async () => {
    setWheel(1)
    await sleep()
    const {
      base64URL,
      height: canvasHeight,
      width: canvasWidth,
    } = (await dom2Canvas()) || {}
    console.log(base64URL, canvasHeight, canvasWidth)
    const pdfInstance = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: 'a4',
    })
    if (!base64URL || !canvasHeight || !canvasWidth) return
    const pageWidth = pdfInstance.internal.pageSize.getWidth()

    // 计算等比缩放后的尺寸
    const scale = pageWidth / canvasWidth
    const imgHeight = canvasHeight * scale
    addImage(0, 0, pdfInstance, base64URL, pageWidth, imgHeight)
    pdfInstance.save(`resume-${new Date().getTime()}`)
  }

  return {
    dom2Canvas,
    savePDF,
  }
}
