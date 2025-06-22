// TODO: Tabs切换已经下掉，有些多余的svg资源未进行清理
// import Icon from '@ant-design/icons'
// import dataSVG from '@/assets/svg/design/database.svg?react'
// import themeSVG from '@/assets/svg/dev/theme.svg?react'
// import SettingSVG from '@/assets/svg/setting.svg?react'
import { Cascader, ColorPicker, Input, message, Radio, Select, Tag } from 'antd'
import type { CheckboxGroupProps } from 'antd/es/checkbox'
import styles from './index.module.scss'
import { useDesignStore } from '@/store'
import CustomRaw from './CustomRaw'
// import CustomField from '@/pages/Dev/components/Setting/components/CustomField'
import ModuleLayout from './ModuleLayout'
import { useMemo, useState } from 'react'

interface Option {
  value: string
  label: string
  children?: Option[]
  disabled?: boolean
}

const cascaderOptions: Option[] = [
  {
    value: 'BASE_INFO',
    label: '个人信息',
    children: [
      {
        value: 'info',
        label: '信息',
        children: [
          {
            value: 'avatar',
            label: '头像',
          },
          {
            value: 'userName',
            label: '姓名',
          },
          {
            value: 'gender',
            label: '性别',
          },
          {
            value: 'age',
            label: '年龄',
          },
          {
            value: 'position',
            label: '求职岗位',
          },
          {
            value: 'phone',
            label: '电话',
          },
          {
            value: 'email',
            label: '邮箱',
          },
          {
            value: 'tblob',
            label: '博客',
          },
        ],
      },
    ],
  },
  {
    value: 'EDU_BG',
    label: '教育背景',
    children: [
      {
        value: 'label',
        label: '模块文本',
      },
      {
        value: 'info',
        label: '信息',
        children: [
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
        value: 'info',
        label: '信息',
        children: [
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
            value: 'description',
            label: '项目描述',
          },
          {
            value: 'output',
            label: '实习产出',
          },
        ],
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
        value: 'info',
        label: '信息',
        children: [
          {
            value: 'title',
            label: '项目名称',
          },

          {
            value: 'role',
            label: '团队位置',
          },
          {
            value: 'date',
            label: '时间',
          },
          {
            value: 'description',
            label: '项目描述',
          },
          {
            value: 'output',
            label: '实习产出',
          },
        ],
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
        label: '信息',
        children: [
          {
            value: 'content',
            label: '详细描述',
          },
        ],
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
        label: '信息',
        children: [
          {
            value: 'interest',
            label: '详细描述',
          },
        ],
      },
    ],
  },
  {
    value: 'AWARD_LIST',
    label: '荣誉奖项',
    children: [
      {
        value: 'label',
        label: '模块文本',
      },
      {
        value: 'info',
        label: '信息',
        children: [
          {
            value: 'title',
            label: '荣誉名称',
          },
          {
            value: 'date',
            label: '获奖时间',
          },
          {
            value: 'description',
            label: '相关描述',
          },
        ],
      },
    ],
  },
]

const RightPanel = ({
  currentNodeDeep,
  nodeBind,
}: {
  currentNodeDeep: number
  nodeBind: string
}) => {
  console.log(currentNodeDeep)
  const setConfig = useDesignStore((state) => state.setConfig)
  const changeStyle = useDesignStore((state) => state.changeStyle)
  const selectedSchema = useDesignStore((state) => state.selectedSchema)
  const singleNode = selectedSchema()
  const [isShowModuleBorder, setIsModuleBorder] = useState(false)
  const layoutOptions: CheckboxGroupProps<string>['options'] = [
    { label: '水平布局', value: 'horizontal' },
    { label: '垂直布局', value: 'vertical' },
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

  const columnsOptions: CheckboxGroupProps<string>['options'] = [
    { label: 'center', value: 'center' },
    { label: 'between', value: 'space-between' },
    { label: 'around', value: 'space-around' },
  ]

  const filterOptions = useMemo(() => {
    const nodeBindPath = nodeBind.split('-')

    if (
      nodeBindPath.findIndex((i) => i === 'label') ===
        nodeBindPath.length - 1 ||
      nodeBindPath.findIndex((i) => i === 'info') === nodeBindPath.length - 1
    ) {
      const tempOptions = cascaderOptions.find((i) =>
        nodeBindPath.includes(i.value)
      )?.children

      return tempOptions?.map((item) => ({
        value: item.value,
        label: item.label,
      }))
    } else if (
      nodeBindPath.indexOf('label') === -1 &&
      nodeBindPath.indexOf('info') === -1
    ) {
      const tempOptions = cascaderOptions.find((i) =>
        nodeBindPath.includes(i.value)
      )?.children

      return tempOptions?.map((item) => ({
        value: item.value,
        label: item.label,
      }))
    } else {
      const currentOptions = cascaderOptions.find((i) =>
        nodeBindPath.includes(i.value)
      )

      if (currentOptions?.children) {
        return currentOptions.children.map((i) => {
          if (!nodeBindPath.includes(i.value)) {
            return {
              ...i,
              disabled: true,
            }
          } else return i
        })
      } else return []
    }
  }, [nodeBind])

  return (
    <aside className={styles['property-container']}>
      <div className={styles['setting-container']}>
        <ModuleLayout title="基础信息">
          <CustomRaw label="组件信息">
            <Tag>{singleNode?.type}</Tag>
          </CustomRaw>
          <CustomRaw label="ID">
            <Input disabled value={singleNode?.nodeKey} />
          </CustomRaw>
        </ModuleLayout>
        {singleNode?.type === 'root' ||
        !singleNode?.constraints.ableBind ? null : (
          <ModuleLayout title="模块设置">
            {singleNode?.type === 'module' ? (
              <CustomRaw label="模块字段">
                <Cascader
                  style={{
                    width: '100%',
                  }}
                  value={[singleNode?.bind || '']}
                  options={moduleOptions}
                  onChange={(e) => {
                    if (singleNode)
                      setConfig(singleNode.nodeKey, 'bind', e[e.length - 1])
                  }}
                  placeholder="选择绑定字段"
                />
              </CustomRaw>
            ) : null}
            {singleNode?.type === 'module' ? (
              <CustomRaw label="模块边框">
                <Select
                  style={{ width: '100%' }}
                  options={[
                    { value: true, label: '显示' },
                    { value: false, label: '隐藏' },
                  ]}
                  value={isShowModuleBorder}
                  onChange={(val) => {
                    if (val) {
                      if (singleNode) {
                        changeStyle(
                          singleNode.nodeKey,
                          'borderBottomStyle',
                          'solid'
                        )
                        changeStyle(
                          singleNode.nodeKey,
                          'borderBottomWidth',
                          '1px'
                        )
                      }
                    } else {
                      if (singleNode) {
                        changeStyle(singleNode.nodeKey, 'borderBottomWidth', 0)
                      }
                    }
                    setIsModuleBorder(val)
                  }}
                />
              </CustomRaw>
            ) : null}
            {isShowModuleBorder ? (
              <CustomRaw label="边框颜色">
                <ColorPicker
                  value={singleNode?.style.color}
                  defaultValue="#18181b"
                  onChange={(_, color) => {
                    if (singleNode)
                      changeStyle(
                        singleNode.nodeKey,
                        'borderBottomColor',
                        color
                      )
                  }}
                />
              </CustomRaw>
            ) : null}
            {singleNode?.type !== 'module' ? (
              <CustomRaw label="信息字段">
                <Cascader
                  style={{
                    width: '100%',
                  }}
                  value={[singleNode?.bind || '']}
                  options={filterOptions}
                  onChange={(e) => {
                    if (singleNode) {
                      const curBind = e[e.length - 1]
                      if (
                        singleNode.constraints.allowedBind &&
                        singleNode.constraints.allowedBind.length &&
                        !singleNode.constraints.allowedBind.includes(curBind)
                      ) {
                        return message.warning('当前物料不支持绑定该字段')
                      }
                      setConfig(singleNode.nodeKey, 'bind', e[e.length - 1])
                    }
                  }}
                  placeholder="选择绑定字段"
                />
              </CustomRaw>
            ) : null}
          </ModuleLayout>
        )}

        {/* TODO：这里，grid布局的情况得处理一下 */}
        {singleNode?.type !== 'root' ? (
          <ModuleLayout title="排列设置">
            <div className={styles['custom-title']}></div>
            <CustomRaw label="布局结构">
              <Radio.Group
                block
                style={{
                  height: '28px',
                  width: '100%',
                }}
                options={layoutOptions}
                value={singleNode?.layout}
                defaultValue="vertical"
                optionType="button"
                onChange={(e) => {
                  if (singleNode)
                    setConfig(singleNode.nodeKey, 'layout', e.target.value)
                }}
              />
            </CustomRaw>
            {/* {singleNode &&
            singleNode.layout === 'horizontal' &&
            singleNode.children &&
            singleNode.children?.length > 1 ? (
              <CustomField
                title="宽度分配"
                style={{
                  color: '#999',
                  fontSize: '13px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '22px',
                  marginBottom: '8px',
                }}
              >
                <Splitter
                  style={{
                    height: '28px',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                  }}
                  key={singleNode.children.length}
                  onResizeEnd={(_sizes: any[]) => {
                    console.log('sizes', _sizes)

                    setSizes(_sizes)
                    const sum = _sizes.reduce(
                      (prev, current) => prev + current,
                      0
                    )
                    // 计算各子模块所占比例，并设置到style.width属性中
                    if (singleNode) {
                      singleNode.children?.forEach((_, index) => {
                        changeChildWidth(
                          singleNode.nodeKey,
                          index,
                          Number((_sizes[index] / sum).toFixed(2)) * 100 + '%'
                        )
                      })
                    }
                  }}
                >
                  {singleNode.children.map((child, index) => (
                    <Splitter.Panel
                      key={child.nodeKey}
                      size={sizes[index]}
                      min="15%"
                      max="70%"
                    >
                      {`child-${index}`}
                    </Splitter.Panel>
                  ))}
                </Splitter>
              </CustomField>
            ) : null} */}
            {singleNode?.type === 'columns' ? (
              <CustomRaw label="主轴排列">
                <Radio.Group
                  style={{ width: '100%' }}
                  block
                  options={columnsOptions}
                  defaultValue={singleNode.style.justifyContent}
                  optionType="button"
                  buttonStyle="solid"
                />
              </CustomRaw>
            ) : null}
          </ModuleLayout>
        ) : null}

        {singleNode?.type !== 'root' ? (
          <ModuleLayout title="样式设置">
            <CustomRaw label="字体大小">
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
            </CustomRaw>
            <CustomRaw label="字体粗细">
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
            </CustomRaw>
            <CustomRaw label="字体颜色">
              <ColorPicker
                value={singleNode?.style.color}
                defaultValue="red"
                onChange={(_, color) => {
                  if (singleNode)
                    changeStyle(singleNode.nodeKey, 'color', color)
                }}
              />
            </CustomRaw>
          </ModuleLayout>
        ) : null}
      </div>
    </aside>
  )
}

export default RightPanel
