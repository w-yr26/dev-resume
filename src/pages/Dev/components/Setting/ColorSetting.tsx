import CustomLayout from '@/components/CustomLayout'
import Header from '@/components/Header'
import Icon from '@ant-design/icons'
import ColorFillSVG from '@/assets/svg/dev/color-fill.svg?react'
import { ColorPicker, Select } from 'antd'
import styled from './index.module.scss'
import CustomField from './components/CustomField'
import { useStyleStore } from '@/store'

const themeColorList = [
  'rgb(71, 85, 105)',
  '#57534e',
  '#dc2626',
  '#ea580c',
  '#d97706',
  '#ca8a04',
  '#65a30d',
  '#16a34a',
  '#059669',
  '#0d9488',
  '#0891b2',
  '#0284c7',
  '#2563eb',
  '#4f46e5',
  '#7c3aed',
  '#9333ea',
  '#c026d3',
  '#db2777',
  '#e11d48',
]

const ColorSetting = () => {
  const fontColor = useStyleStore((state) => state.fontColor)
  const mainColor = useStyleStore((state) => state.mainColor)
  const bgColor = useStyleStore((state) => state.bgColor)
  const borderStyle = useStyleStore((state) => state.borderStyle)
  const setPageKeyToStyle = useStyleStore((state) => state.setPageKeyToStyle)
  return (
    <CustomLayout>
      <Header label="主题" svg={<Icon component={ColorFillSVG} />} />
      <CustomField title="主题色">
        <div className={styled['theme-color-container']}>
          {themeColorList.map((color) => (
            <div key={color} className={`styled['color-item']`}>
              <div
                style={{
                  backgroundColor: color,
                }}
                className={`${styled['radio-box']} ${
                  color === mainColor ? styled['active'] : ''
                }`}
                onClick={() => setPageKeyToStyle('mainColor', color)}
              />
            </div>
          ))}
        </div>
      </CustomField>
      <div className={styled['color-picker-box']}>
        <div className={styled['picker-item']}>
          <span className={styled['color-name']}>次要色</span>
          <ColorPicker defaultValue="#1677ff" />
        </div>
        <div className={styled['picker-item']}>
          <span className={styled['color-name']}>背景色</span>
          <ColorPicker
            value={bgColor}
            onChange={(_, color) => setPageKeyToStyle('bgColor', color)}
          />
        </div>
        <div className={styled['picker-item']}>
          <span className={styled['color-name']}>文本色</span>
          <ColorPicker
            value={fontColor}
            defaultFormat={'hex'}
            onChange={(_, color) => setPageKeyToStyle('fontColor', color)}
          />
        </div>
      </div>
      <CustomField title="分页线样式">
        <Select
          value={borderStyle}
          onChange={(val) => setPageKeyToStyle('borderStyle', val)}
          style={{ width: '100%', margin: '12px 0' }}
          options={[
            { value: 'solid', label: '———————' },
            { value: 'dashed', label: '-----------------' },
            { value: 'dotted', label: '·······························' },
          ]}
        />
      </CustomField>
    </CustomLayout>
  )
}

export default ColorSetting
