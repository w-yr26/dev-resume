import Icon, { BgColorsOutlined } from '@ant-design/icons'
import ThemeFillSVG from '@/assets/svg/dev/theme-fill.svg?react'
import { ConfigProvider, Slider, Switch } from 'antd'
import CustomLayout from '@/components/CustomLayout'
import CustomField from './components/CustomField'
import Header from '@/components/Header'
import styled from './index.module.scss'
const TypeSetting = () => {
  return (
    <CustomLayout>
      <Header
        label="排版"
        icon={BgColorsOutlined}
        svg={<Icon component={ThemeFillSVG} />}
      />
      <CustomField title="字号">
        <ConfigProvider
          theme={{
            components: {
              Slider: {
                railSize: 8,
                handleColor: '#18181b',
                handleActiveColor: '#18181b',
                handleSizeHover: 10,
                handleLineWidthHover: 2,
                trackBg: '#18181b',
                trackHoverBg: '#18181b',
              },
            },
          }}
        >
          <Slider defaultValue={30} />
        </ConfigProvider>
      </CustomField>
      <CustomField title="行高">
        <ConfigProvider
          theme={{
            components: {
              Slider: {
                railSize: 8,
                handleColor: '#18181b',
                handleActiveColor: '#18181b',
                handleSizeHover: 10,
                handleLineWidthHover: 2,
                trackBg: '#18181b',
                trackHoverBg: '#18181b',
              },
            },
          }}
        >
          <Slider defaultValue={30} />
        </ConfigProvider>
      </CustomField>
      <CustomField title="设置">
        <div className={styled['custom-line']}>
          <span className={styled['setting-label']}>下划线链接</span>
          <ConfigProvider
            theme={{
              components: {
                Switch: {
                  colorPrimary: '#18181b',
                  colorPrimaryHover: '#18181b',
                },
              },
            }}
          >
            <Switch />
          </ConfigProvider>
        </div>
        {/* <div className={styled['custom-line']}>
          <span className={styled['setting-label']}>列表样式</span>
          <div>
            <Radio>Disabled</Radio>
            <Radio>Disabled</Radio>
          </div>
        </div> */}
      </CustomField>
    </CustomLayout>
  )
}

export default TypeSetting
