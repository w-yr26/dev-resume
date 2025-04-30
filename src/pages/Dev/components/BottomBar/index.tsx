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

type barType = {
  upWheel: () => void
  reduceWheel: () => void
  handleModeSwitch: () => void
  resetWheel: () => void
  isDev: boolean
  setIsDev: (valk: boolean) => void
}

const BottomBar = ({
  reduceWheel,
  upWheel,
  handleModeSwitch,
  resetWheel,
  isDev,
  setIsDev,
}: barType) => {
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
      icon: <Icon component={pdfSVG} />,
      label: '下载pdf',
      callback: () => {},
    },
    {
      icon: <Icon component={cssSVG} />,
      label: 'CSS编辑',
      callback: handleModeSwitch,
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
