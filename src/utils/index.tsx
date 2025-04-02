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

export { pxToMm, request, setLocalItem, getLocalItem }
