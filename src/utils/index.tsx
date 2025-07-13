import convert from 'css-unit-converter'
import { request } from './request'
import SHA256 from 'crypto-js/sha256'
/**
 * px -> mm
 * @param px 像素大小
 */
const pxToMm = (px: number) => convert(px, 'px', 'mm', 2)

const setLocalItem = (key: string, val: string) => {
  localStorage.setItem(key, val)
}

const getLocalItem = (key: string) => {
  return localStorage.getItem(key)
}

/**
 * 检查富文本内容是否为空
 * @param richText 富文本内容
 * @returns true/false
 */
const checkRichTextIsEmpty = (richText: string) => {
  if (!richText) return true

  // 去掉常见的空标签（p、br、div、span）和&nbsp;等空白实体
  const stripped = richText
    .replace(/<(\/)?(p|div|br|span)[^>]*>/gi, '') // 去除常见空结构标签
    .replace(/&nbsp;/gi, '') // 去除空白实体
    .replace(/\s|\u200B/g, '') // 去除空格、换行、零宽字符

  return stripped === ''
}

const sleep = (delay = 500) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay) // 延迟后执行 resolve
  })
}

/**
 * 模拟a标签点击下载
 * @param blob blob二进制对象
 * @param fileName 文件名
 */
const createLink2Download = (
  blob: Blob,
  fileName = String(new Date().getTime())
): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `resume_${fileName}.pdf`

      // 确保点击完成后才 resolve
      a.onclick = async () => {
        await sleep(100)
        URL.revokeObjectURL(url)
        resolve()
      }

      a.click()
    } catch (_) {
      reject(new Error('下载创建失败'))
    }
  })
}

/**
 * 添加额外的打印样式
 */
const addPrintStyle = () => {
  // 在你的组件文件顶部添加打印样式
  const printStyles = `
  @media print {
    body, html {
      margin: 0 !important;
      padding: 0 !important;
      background: white !important;
    }

    .resume-target {
      width: 210mm !important; /* A4 宽度 */
      min-height: 297mm !important; /* A4 高度 */
      margin: 0 auto !important;
      padding: 15mm !important; /* 安全打印边距 */
      position: relative;
    }

    .resume-inner {
      display: block !important;
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: 100% !important;
      box-shadow: none !important;
      background: white !important;
      break-inside: avoid;
      page-break-after: always;
      transform: none !important;
    }

    .resume-miss {
      display: none !important;
    }

    /* 处理分页 */
    .page-break {
      page-break-after: always;
    }

    /* 确保链接可读 */
    a {
      color: #000 !important;
      text-decoration: underline !important;
    }

    /* 强制黑白打印 */
    * {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      color-adjust: exact !important;
    }
  }
`
  return printStyles
}

/**
 * hash计算
 * @param str html字符串
 */
const calculateSHA256 = async (str: string) => {
  return SHA256(str).toString()
}

const getAllStyleText = async () => {
  let styleText = ''

  // 1. 获取所有<style>标签内容
  document.querySelectorAll('style').forEach((style) => {
    styleText += style.outerHTML
  })

  // 2. 将<link rel="stylesheet">的内容变成<style>
  const linkNodes = Array.from(
    document.querySelectorAll('link[rel="stylesheet"]')
  )

  for (const link of linkNodes) {
    const href = link.getAttribute('href')
    if (href) {
      try {
        const res = await fetch(href)
        const css = await res.text()
        styleText += `<style>${css}</style>`
      } catch (e) {
        console.warn(`样式加载失败：${href}`, e)
      }
    }
  }

  // 3. 添加打印样式
  styleText += `<style id="pdf-override-styles">${addPrintStyle()}</style>`

  return styleText
}

const isNotEmpty = (value: any) => {
  return value != null && value !== '' && value !== undefined
}

const handleDataSource = (data: Record<string, any>) => {
  const handledObj: Record<string, any> = {}
  Object.keys(data).forEach((key) => {
    handledObj[key] = {
      ...data[key],
      visible: true,
      info: !data[key].info ? [] : data[key].info,
    }
  })
  console.log(handledObj)

  return handledObj
}

export {
  pxToMm,
  request,
  setLocalItem,
  getLocalItem,
  checkRichTextIsEmpty,
  sleep,
  createLink2Download,
  addPrintStyle,
  getAllStyleText,
  calculateSHA256,
  isNotEmpty,
  handleDataSource,
}
