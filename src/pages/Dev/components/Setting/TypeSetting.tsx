import Icon from '@ant-design/icons'
import ThemeFillSVG from '@/assets/svg/dev/theme-fill.svg?react'
import { Slider, Switch } from 'antd'
import CustomLayout from '@/components/CustomLayout'
import CustomField from './components/CustomField'
import Header from '@/components/Header'
import styled from './index.module.scss'
import { useStyleStore } from '@/store'
const TypeSetting = () => {
  const lineHeight = useStyleStore((state) => state.lineHeight)
  const fontSize = useStyleStore((state) => state.fontSize)
  const setPageKeyToStyle = useStyleStore((state) => state.setPageKeyToStyle)

  return (
    <CustomLayout>
      <Header label="排版" svg={<Icon component={ThemeFillSVG} />} />
      <CustomField title="字号">
        <Slider
          min={10}
          max={20}
          value={fontSize}
          onChange={(val: number) => setPageKeyToStyle('fontSize', val)}
        />
      </CustomField>
      <CustomField title="行高">
        <Slider
          step={0.1}
          min={1.2}
          max={2}
          value={lineHeight}
          onChange={(val: number) => setPageKeyToStyle('lineHeight', val)}
        />
      </CustomField>
      <CustomField title="设置">
        <div className={styled['custom-line']}>
          <span className={styled['setting-label']}>下划线链接</span>
          <Switch />
        </div>
      </CustomField>
    </CustomLayout>
  )
}

export default TypeSetting
