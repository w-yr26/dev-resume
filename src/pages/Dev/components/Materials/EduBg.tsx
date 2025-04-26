import Icon from '@ant-design/icons'
import EduSVG from '@/assets/svg/dev/edu.svg?react'
import Header from '@/components/Header/index'
import CustomLayout from '@/components/CustomLayout/index'
import { useDevStore, useGlobalStore } from '@/store'
import CtxMenu from './components/CtxMenu'
import { useChangeLabel } from '@/hooks/useChangeLabel'
import React, { useEffect, useRef } from 'react'
import CustomInput from './components/CustomInput'
import styles from './index.module.scss'
import { DatePicker } from 'antd'
const { RangePicker } = DatePicker

const EduBg = () => {
  const edubgRef = useRef<HTMLDivElement>(null)
  const setPosition = useGlobalStore((state) => state.setPosition)
  const { info: eduInfo } = useDevStore(
    (state) => state.devSchema.dataSource.EDU_BG
  )
  // const updateInfo = useDevStore((state) => state.updateInfo)

  useEffect(() => {
    if (edubgRef.current) {
      const { y } = edubgRef.current.getBoundingClientRect()
      setPosition('EDU_BG', y)
    }
  }, [])

  const { label } = useDevStore((state) => state.devSchema.dataSource.EDU_BG)
  // const immerRichInfo = useDevStore((state) => state.immerRichInfo)
  const { handleChange, isEdit, setIsEdit } = useChangeLabel('EDU_BG')

  return (
    <CustomLayout ref={edubgRef}>
      <Header
        label={label || '教育背景'}
        svg={<Icon component={EduSVG} />}
        isEdit={isEdit}
        handleChange={handleChange}
        handleBlur={() => setIsEdit(false)}
      >
        <CtxMenu currentKey="EDU_BG" renameLabel={() => setIsEdit(true)} />
      </Header>
      {eduInfo.map((eduItem) => (
        <React.Fragment key={eduItem.id}>
          <div className={styles['row-form-item']}>
            <div
              style={{
                flex: 1,
              }}
            >
              <CustomInput
                label="学历"
                placeholder="请输入您的学历"
                value={eduItem.bg}
              />
            </div>
            <div
              style={{
                flex: 1,
              }}
            >
              <CustomInput
                label="院校"
                placeholder="请输入毕业院校"
                value={eduItem.school}
              />
              {/* <CustomInput
                label="时间"
                placeholder="请输入您的就读时间"
              ></CustomInput> */}
            </div>
          </div>
          <div className={styles['custom-date-box']}>
            <p className={styles['label']}>时间</p>
            <RangePicker value={eduItem.date} />
          </div>
        </React.Fragment>
      ))}
    </CustomLayout>
  )
}

export default EduBg
