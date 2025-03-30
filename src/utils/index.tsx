import convert from 'css-unit-converter'
/**
 * px -> mm
 * @param px 像素大小
 */
const pxToMm = (px: number) => convert(px, 'px', 'mm', 2)

export { pxToMm }
