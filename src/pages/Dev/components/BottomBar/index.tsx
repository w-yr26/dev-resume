import jsPDF from 'jspdf'
import type { RGBAData } from 'jspdf'
import Icon from '@ant-design/icons'
import cssSVG from '@/assets/svg/dev/css.svg?react'
import centerSVG from '@/assets/svg/dev/center.svg?react'
import zoomInSVG from '@/assets/svg/dev/zoom-in-line.svg?react'
import zoomOutSVG from '@/assets/svg/dev/zoom-out-line.svg?react'
import pdfSVG from '@/assets/svg/dev/pdf.svg?react'
import normalSVG from '@/assets/svg/dev/normal.svg?react'
import codeSVG from '@/assets/svg/dev/code.svg?react'
import styles from './index.module.scss'
import { ConfigProvider, Switch, Tooltip } from 'antd'
import { sleep } from '@/utils'

// type toCanvas = {
//   base64URL: string
//   width: string
//   height: string
// }

type barType = {
  upWheel: () => void
  reduceWheel: () => void
  handleModeSwitch: () => void
  resetWheel: () => void
  isDev: boolean
  setIsDev: (val: boolean) => void
  dom2Canvas: () => Promise<
    | {
        base64URL: string
        width: number
        height: number
      }
    | undefined
  >
  setWheel: (wheel: number) => void
}

const BottomBar = ({
  reduceWheel,
  upWheel,
  handleModeSwitch,
  resetWheel,
  isDev,
  setIsDev,
  dom2Canvas,
  setWheel,
}: barType) => {
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

  const iconArr = [
    {
      icon: <Icon component={centerSVG} />,
      label: '重置缩放',
      callback: resetWheel,
    },
    {
      icon: <Icon component={zoomInSVG} />,
      label: '放大',
      callback: upWheel,
    },
    {
      icon: <Icon component={zoomOutSVG} />,
      label: '缩小',
      callback: reduceWheel,
    },
    {
      icon: <Icon component={cssSVG} />,
      label: 'CSS编辑',
      callback: handleModeSwitch,
    },
    {
      icon: <Icon component={pdfSVG} />,
      label: '下载pdf',
      callback: savePDF,
    },
    {
      icon: (
        <ConfigProvider
          theme={{
            components: {
              Switch: {
                colorPrimary: '#09090b',
                colorPrimaryHover: '#09090b',
                controlHeight: 24,
              },
            },
          }}
        >
          <Switch
            checkedChildren={<Icon component={normalSVG} />}
            unCheckedChildren={<Icon component={codeSVG} />}
            checked={isDev}
            onClick={(val) => setIsDev(val)}
          />
        </ConfigProvider>
      ),
      callback: () => {},
    },
  ]

  return (
    <div className={styles['bar-container']}>
      {iconArr.map((item, index) => {
        return (
          <div key={index} className={styles['utile-box']}>
            {item.label ? (
              <Tooltip title={item.label}>
                <div onClick={item.callback}>{item.icon}</div>
              </Tooltip>
            ) : (
              <div onClick={item.callback}>{item.icon}</div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default BottomBar
