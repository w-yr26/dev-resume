import CustomLayout from '@/components/CustomLayout'
import Header from '@/components/Header'
import Icon from '@ant-design/icons'
import PageSVG from '@/assets/svg/dev/page.svg?react'
import { Slider } from 'antd'
import CustomField from './components/CustomField'
import { useStyleStore } from '@/store'

const TypeSetting = () => {
  const pagePadding = useStyleStore((state) => state.pagePadding)
  const modulePadding = useStyleStore((state) => state.modulePadding)
  const setPageKeyToStyle = useStyleStore((state) => state.setPageKeyToStyle)

  return (
    <CustomLayout>
      <Header label="页面" svg={<Icon component={PageSVG} />} />
      <CustomField title="页边距">
        <Slider
          min={0}
          max={25}
          value={pagePadding}
          onChange={(val: number) => setPageKeyToStyle('pagePadding', val)}
        />
      </CustomField>
      <CustomField title="模块边距">
        <Slider
          min={1}
          max={20}
          value={modulePadding}
          onChange={(val: number) => setPageKeyToStyle('modulePadding', val)}
        />
      </CustomField>
      {/* {isHorizontal ? (
        <CustomField title="主侧比例">
          <Splitter
            style={{
              margin: '16px 0 0',
              height: 80,
              width: '100%',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            }}
            onResizeEnd={handleResize}
          >
            <Splitter.Panel defaultSize="40%" min="30%" max="70%">
              侧栏
            </Splitter.Panel>
            <Splitter.Panel>主内容</Splitter.Panel>
          </Splitter>
        </CustomField>
      ) : null} */}
    </CustomLayout>
  )
}

export default TypeSetting
