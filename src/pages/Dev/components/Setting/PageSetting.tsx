import CustomLayout from '@/components/CustomLayout'
import Header from '@/components/Header'
import { BgColorsOutlined } from '@ant-design/icons'
import { ConfigProvider, Slider, Splitter } from 'antd'
import CustomField from './components/CustomField'
import { useStyleStore } from '@/store'

const TypeSetting = () => {
  const pagPadding = useStyleStore((state) => state.pagPadding)
  const modulePadding = useStyleStore((state) => state.modulePadding)
  const setPagePadding = useStyleStore((state) => state.setPagePadding)
  const setModulePadding = useStyleStore((state) => state.setModulePadding)
  return (
    <CustomLayout>
      <Header label="页面" icon={BgColorsOutlined} />
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
          <Slider
            min={1}
            max={25}
            value={pagPadding}
            onChange={(val: number) => setPagePadding(val)}
          />
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
          <Slider
            min={1}
            max={20}
            value={modulePadding}
            onChange={(val: number) => setModulePadding(val)}
          />
        </ConfigProvider>
      </CustomField>
      <CustomField title="主侧比例">
        <Splitter
          style={{
            margin: '16px 0 0',
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
    </CustomLayout>
  )
}

export default TypeSetting
