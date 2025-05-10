import Icon from '@ant-design/icons'
import dataSVG from '@/assets/svg/design/database.svg?react'
import themeSVG from '@/assets/svg/dev/theme.svg?react'
import SettingSVG from '@/assets/svg/setting.svg?react'
import { Input, Radio, Select, Skeleton, Tag } from 'antd'
import type { CheckboxGroupProps } from 'antd/es/checkbox'
import styles from './index.module.scss'

const RightPanel = () => {
  const options: CheckboxGroupProps<string>['options'] = [
    { label: '水平', value: 'horizontal' },
    { label: '垂直', value: 'vertical' },
  ]

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
              <Tag>normal-container</Tag>
            </div>
          </div>
          <div className={styles['custom-raw']}>
            <div className={styles['raw-left']}>ID</div>
            <div className={styles['raw-right']}>
              <Input disabled value={Math.random()} />
            </div>
          </div>
          <div className={styles['custom-raw']}>
            <div className={styles['raw-left']}>名称</div>
            <div className={styles['raw-right']}>
              <Input placeholder="请输入文本信息(可选)" />
            </div>
          </div>
        </div>
        <div
          className={`${styles['data-bind-container']} ${styles['custom-setting-box']}`}
        >
          <div className={styles['custom-raw']}>
            <div className={styles['raw-left']}>布局结构</div>
            <div className={styles['raw-right']}>
              <Radio.Group
                block
                options={options}
                defaultValue="Pear"
                optionType="button"
              />
            </div>
          </div>
          <div className={styles['custom-raw']}>
            <div className={styles['raw-left']}>匹配字段</div>
            <div className={styles['raw-right']}>
              <Select
                defaultValue="基础信息"
                style={{
                  width: '100%',
                }}
                options={[
                  { value: 'BASE_INFO', label: '基础信息' },
                  { value: 'EDU_BG', label: '教育背景' },
                  { value: 'WORK_EXP', label: '工作经历' },
                  { value: 'PROJECT_EXP', label: '项目经历' },
                  { value: 'AWARD_LIST', label: '荣誉奖项' },
                  { value: 'SKILL_LIST', label: '技能特长' },
                  { value: 'HEART_LIST', label: '兴趣爱好' },
                ]}
              />
            </div>
          </div>
          <div className={styles['custom-raw']}>
            <div className={styles['raw-left']}>字段结构</div>
            <div className={styles['raw-right']}>代码高亮</div>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default RightPanel
