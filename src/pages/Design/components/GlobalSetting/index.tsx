import { useDesignStore } from '@/store'
import ModuleLayout from '../RightPanel/ModuleLayout'
import styles from './index.module.scss'
import CustomField from '@/pages/Dev/components/Setting/components/CustomField'
import { Slider } from 'antd'
import { RefsContext } from '../RefsProvider/context'
import { useContext } from 'react'

const GlobalSetting = () => {
  const { pagePadding, modulePadding, lineHeight, fontSize } = useDesignStore(
    (state) => state.currentUISchema.configStyle
  )
  const setRootStyle = useDesignStore((state) => state.setRootStyle)
  const context = useContext(RefsContext)

  return (
    <div
      className={styles['global-container']}
      ref={context?.ref4 as React.RefObject<HTMLDivElement>}
    >
      <ModuleLayout title="全局设置">
        <CustomField
          title="页面内边距"
          style={{
            color: '#999',
            fontSize: '13px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '22px',
            marginBottom: '8px',
          }}
        >
          <Slider
            min={0}
            max={25}
            value={pagePadding}
            onChange={(val: number) => setRootStyle('pagePadding', val)}
          />
        </CustomField>
        <CustomField
          title="模块内边距"
          style={{
            color: '#999',
            fontSize: '13px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '22px',
            marginBottom: '8px',
          }}
        >
          <Slider
            min={1}
            max={20}
            value={modulePadding}
            onChange={(val: number) => setRootStyle('modulePadding', val)}
          />
        </CustomField>

        <CustomField title="字号">
          <Slider
            min={10}
            max={20}
            value={fontSize}
            onChange={(val: number) => setRootStyle('fontSize', val)}
          />
        </CustomField>
        <CustomField title="行高">
          <Slider
            step={0.1}
            min={1.2}
            max={2}
            value={lineHeight}
            onChange={(val: number) => setRootStyle('lineHeight', val)}
          />
        </CustomField>
      </ModuleLayout>
    </div>
  )
}

export default GlobalSetting
