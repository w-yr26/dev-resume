import Icon from '@ant-design/icons'
import dataSVG from '@/assets/svg/design/database.svg?react'
import themeSVG from '@/assets/svg/dev/theme.svg?react'
import SettingSVG from '@/assets/svg/setting.svg?react'
import {
  Cascader,
  ColorPicker,
  ConfigProvider,
  Input,
  Radio,
  Select,
  Slider,
  Tag,
} from 'antd'
import type { CheckboxGroupProps } from 'antd/es/checkbox'
import styles from './index.module.scss'
import { useDesignStore } from '@/store'
import { useMemo } from 'react'
import CustomRaw from '../CustomRaw'

interface Option {
  value: string
  label: string
  children?: Option[]
  disabled?: boolean
}

const cascaderOptions: Option[] = [
  {
    value: 'EDU_BG',
    label: '教育背景',
    children: [
      {
        value: 'label',
        label: '模块文本',
      },
      {
        value: 'bg',
        label: '学历',
      },

      {
        value: 'school',
        label: '院校',
      },
      {
        value: 'date',
        label: '时间',
      },
    ],
  },
  {
    value: 'WORK_EXP',
    label: '实习/工作经历',
    children: [
      {
        value: 'label',
        label: '模块文本',
      },
      {
        value: 'company',
        label: '公司',
      },

      {
        value: 'position',
        label: '职位',
      },
      {
        value: 'date',
        label: '时间',
      },
      {
        // 这里插个眼，现有的方案中，“项目描述”是会作为label存在的，但是此处未定义给用户
        value: 'overview',
        label: '项目描述',
      },
      {
        value: 'output',
        label: '实习产出',
      },
    ],
  },
  {
    value: 'PROJECT_EXP',
    label: '项目经历',
    children: [
      {
        value: 'label',
        label: '模块文本',
      },
      {
        value: 'name',
        label: '项目名称',
      },

      {
        value: 'position',
        label: '团队位置',
      },
      {
        value: 'date',
        label: '时间',
      },
      {
        value: 'overview',
        label: '项目描述',
      },
      {
        value: 'output',
        label: '实习产出',
      },
    ],
  },
  {
    value: 'SKILL_LIST',
    label: '技能特长',
    children: [
      {
        value: 'label',
        label: '模块文本',
      },
      {
        value: 'info',
        label: '技能特长描述',
      },
    ],
  },
  {
    value: 'HEART_LIST',
    label: '兴趣爱好',
    children: [
      {
        value: 'label',
        label: '模块文本',
      },
      {
        value: 'info',
        label: '爱好描述',
      },
    ],
  },
]

const RightPanel = ({ prevBind }: { prevBind: string }) => {
  // const currentSelectedKey = useDesignStore((state) => state.currentSelectedKey)
  // const currentUISchema = useDesignStore((state) => state.currentUISchema)
  console.log('prevBind', prevBind)

  const setConfig = useDesignStore((state) => state.setConfig)
  const changeStyle = useDesignStore((state) => state.changeStyle)
  const selectedSchema = useDesignStore((state) => state.selectedSchema)
  const singleNode = selectedSchema()
  console.log('singleNode', singleNode)

  const options: CheckboxGroupProps<string>['options'] = [
    { label: '水平', value: 'horizontal' },
    { label: '垂直', value: 'vertical' },
  ]

  const moduleOptions = [
    { value: 'BASE_INFO', label: '基础信息' },
    { value: 'EDU_BG', label: '教育背景' },
    { value: 'WORK_EXP', label: '实习/工作经历' },
    { value: 'PROJECT_EXP', label: '项目经历' },
    { value: 'SKILL_LIST', label: '技能特长' },
    // { value: 'AWARD_LIST', label: '荣誉奖项' },
    { value: 'HEART_LIST', label: '兴趣爱好' },
  ]

  // 不属于当前模块的子项都进行禁用
  const filterCascaderOptions = useMemo(() => {
    return cascaderOptions.map((item) => {
      if (item.value === prevBind) return item
      else
        return {
          ...item,
          disabled: true,
        }
    })
  }, [prevBind])

  return (
    <aside className={styles['property-container']}>
      <div className={styles['property-header']}>
        <Icon component={SettingSVG} />
        <h4>属性设置</h4>
      </div>
      <div className={styles['tabs-menu']}>
        <div className={`${styles['tab-item']} ${styles['tab-active']}`}>
          <Icon
            component={dataSVG}
            style={{
              marginLeft: 0,
            }}
          />
          <span>数据</span>
        </div>
        <div className={styles['tab-item']}>
          <Icon
            component={themeSVG}
            style={{
              marginLeft: 0,
            }}
          />
          <span>样式</span>
        </div>
        <div className={styles['tab-item']}>
          <Icon component={SettingSVG} />
          <span>事件</span>
        </div>
      </div>
      <div className={styles['setting-container']}>
        <div
          className={`${styles['component-info']} ${styles['custom-setting-box']}`}
        >
          <CustomRaw label="组件信息">
            <Tag>{singleNode?.type}</Tag>
          </CustomRaw>
          <CustomRaw label="ID">
            <Input disabled value={singleNode?.nodeKey} />
          </CustomRaw>
          <CustomRaw label="名称">
            <Input
              placeholder="请输入文本信息(可选)"
              value={singleNode?.tag}
              onChange={(e) => {
                if (singleNode)
                  setConfig(singleNode.nodeKey, 'tag', e.target.value)
              }}
            />
          </CustomRaw>
        </div>
        {singleNode?.type === 'root' ? null : (
          <div
            className={`${styles['data-bind-container']} ${styles['custom-setting-box']}`}
          >
            {singleNode?.type === 'module' ? (
              <CustomRaw label="布局结构">
                <Radio.Group
                  block
                  options={options}
                  value={singleNode?.layout}
                  defaultValue="vertical"
                  optionType="button"
                  onChange={(e) => {
                    if (singleNode)
                      setConfig(singleNode.nodeKey, 'layout', e.target.value)
                  }}
                />
              </CustomRaw>
            ) : null}
            {singleNode?.type === 'module' ? (
              <CustomRaw label="绑定字段(模块)">
                <Select
                  defaultValue="BASE_INFO"
                  value={singleNode?.bind}
                  style={{
                    width: '100%',
                  }}
                  options={moduleOptions}
                  onSelect={(bind) => {
                    if (singleNode) setConfig(singleNode.nodeKey, 'bind', bind)
                  }}
                />
              </CustomRaw>
            ) : null}
            {singleNode?.type !== 'module' &&
            singleNode?.type !== 'container' ? (
              <CustomRaw label="绑定字段(模块内)">
                <Cascader
                  style={{
                    width: '100%',
                  }}
                  value={[singleNode?.bind || '']}
                  options={filterCascaderOptions}
                  onChange={(e) => {
                    if (singleNode)
                      setConfig(singleNode.nodeKey, 'bind', e[e.length - 1])
                  }}
                  placeholder="选择绑定字段"
                />
              </CustomRaw>
            ) : null}
          </div>
        )}

        <div
          className={`${styles['style-container']} ${styles['custom-setting-box']}`}
        >
          <CustomRaw label="字体大小">
            <ConfigProvider
              theme={{
                components: {
                  Select: {
                    activeBorderColor: '#d9d9d9',
                    hoverBorderColor: '#d9d9d9',
                  },
                },
              }}
            >
              <Select
                style={{ width: '100%' }}
                options={[
                  { value: '13px', label: '13px' },
                  { value: '14px', label: '14px' },
                  { value: '15px', label: '15px' },
                  { value: '16px', label: '16px' },
                ]}
                value={singleNode?.style.fontSize}
                onChange={(newFontSize) => {
                  if (singleNode)
                    changeStyle(singleNode.nodeKey, 'fontSize', newFontSize)
                }}
              />
            </ConfigProvider>
          </CustomRaw>
          <CustomRaw label="字体粗细">
            <ConfigProvider
              theme={{
                components: {
                  Select: {
                    activeBorderColor: '#d9d9d9',
                    hoverBorderColor: '#d9d9d9',
                  },
                },
              }}
            >
              <Select
                style={{ width: '100%' }}
                options={[
                  { value: 400, label: 400 },
                  { value: 500, label: 500 },
                  { value: 600, label: 600 },
                  { value: 700, label: 700 },
                ]}
                value={singleNode?.style.fontWeight}
                onChange={(newFontWeight) => {
                  if (singleNode)
                    changeStyle(singleNode.nodeKey, 'fontWeight', newFontWeight)
                }}
              />
            </ConfigProvider>
          </CustomRaw>
          <CustomRaw label="字体颜色">
            <ColorPicker
              value={singleNode?.style.color}
              defaultValue="red"
              onChange={(_, color) => {
                if (singleNode) changeStyle(singleNode.nodeKey, 'color', color)
              }}
            />
          </CustomRaw>
        </div>
      </div>
    </aside>
  )
}

export default RightPanel
