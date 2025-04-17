import CustomLayout from '@/components/CustomLayout'
import Header from '@/components/Header'
import { BgColorsOutlined } from '@ant-design/icons'
import { ConfigProvider, Slider, Splitter, Switch } from 'antd'
import CustomField from './components/CustomField'
import styled from './index.module.scss'

const TypeSetting = () => {
  return (
    <CustomLayout>
      <Header label="排版" icon={BgColorsOutlined} />
      <CustomField title="页边距">
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
      <CustomField title="模块边距">
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
      <CustomField title="主侧比例">
        <Splitter
          style={{
            margin: '12px 0',
            height: 80,
            width: '100%',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Splitter.Panel defaultSize="40%" min="20%" max="70%">
            侧栏
          </Splitter.Panel>
          <Splitter.Panel>主内容</Splitter.Panel>
        </Splitter>
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
