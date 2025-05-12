import Icon from '@ant-design/icons'
import dataSVG from '@/assets/svg/design/database.svg?react'
import themeSVG from '@/assets/svg/dev/theme.svg?react'
import SettingSVG from '@/assets/svg/setting.svg?react'
import { Cascader, Input, Radio, Select, Tag } from 'antd'
import type { CheckboxGroupProps } from 'antd/es/checkbox'
import styles from './index.module.scss'
import { useDesignStore } from '@/store'
import { useMemo } from 'react'

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
          <div className={styles['custom-raw']}>
            <div className={styles['raw-left']}>组件信息</div>
            <div className={styles['raw-right']}>
              <Tag>{singleNode?.type}</Tag>
            </div>
          </div>
          <div className={styles['custom-raw']}>
            <div className={styles['raw-left']}>ID</div>
            <div className={styles['raw-right']}>
              <Input disabled value={singleNode?.nodeKey} />
            </div>
          </div>
          <div className={styles['custom-raw']}>
            <div className={styles['raw-left']}>名称</div>
            <div className={styles['raw-right']}>
              <Input
                placeholder="请输入文本信息(可选)"
                value={singleNode?.tag}
                onChange={(e) => {
                  if (singleNode)
                    setConfig(singleNode.nodeKey, 'tag', e.target.value)
                }}
              />
            </div>
          </div>
        </div>
        {singleNode?.type === 'root' ? null : (
          <div
            className={`${styles['data-bind-container']} ${styles['custom-setting-box']}`}
          >
            {singleNode?.type === 'module' ? (
              <div className={styles['custom-raw']}>
                <div className={styles['raw-left']}>布局结构</div>
                <div className={styles['raw-right']}>
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
                </div>
              </div>
            ) : null}
            {singleNode?.type === 'module' ? (
              <div className={styles['custom-raw']}>
                <div className={styles['raw-left']}>绑定字段(模块)</div>
                <div className={styles['raw-right']}>
                  <Select
                    defaultValue="BASE_INFO"
                    value={singleNode?.bind}
                    style={{
                      width: '100%',
                    }}
                    options={moduleOptions}
                    onSelect={(bind) => {
                      if (singleNode)
                        setConfig(singleNode.nodeKey, 'bind', bind)
                    }}
                  />
                </div>
              </div>
            ) : null}
            {singleNode?.type !== 'module' &&
            singleNode?.type !== 'container' ? (
              <div className={styles['custom-raw']}>
                <div className={styles['raw-left']}>绑定字段(模块内)</div>
                <div className={styles['raw-right']}>
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
                </div>
              </div>
            ) : null}
            {/* <div className={styles['custom-raw']}>
            <div className={styles['raw-left']}>字段结构</div>
            <div className={styles['raw-right']}>代码高亮</div>
          </div> */}
          </div>
        )}
      </div>
    </aside>
  )
}

export default RightPanel
