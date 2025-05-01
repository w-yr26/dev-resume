import convert from 'css-unit-converter'
import { request } from './request'
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
  return Promise.resolve(() => {
    setTimeout(() => {}, delay)
  })
}

export {
  pxToMm,
  request,
  setLocalItem,
  getLocalItem,
  checkRichTextIsEmpty,
  sleep,
}
