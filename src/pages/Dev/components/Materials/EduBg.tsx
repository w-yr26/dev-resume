import { useEffect, useRef } from 'react'
import { useChangeLabel } from '@/hooks/useChangeLabel'
import { useDevStore, useGlobalStore } from '@/store'
import { useModalForm } from '@/hooks/useModalForm'
import { Button, DatePicker, Form, Input, Modal } from 'antd'
import Icon from '@ant-design/icons'
import EduSVG from '@/assets/svg/dev/edu.svg?react'
import Header from '@/components/Header/index'
import CustomLayout from '@/components/CustomLayout/index'
import CtxMenu from './components/CtxMenu'
import List from './components/List'
import AddBtn from './components/AddBtn'
import styles from './index.module.scss'
import type { EduBgType } from '@/types/dev'
const { RangePicker } = DatePicker

const EduBg = () => {
  const edubgRef = useRef<HTMLDivElement>(null)
  const setPosition = useGlobalStore((state) => state.setPosition)
  const { info: eduInfo } = useDevStore(
    (state) => state.devSchema.dataSource.EDU_BG
  )
  const {
    opened,
    formRef,
    infoId,
    handleDelItem,
    handleEdit,
    handleOk,
    handleVisible,
    resetState,
    handleOpen,
  } = useModalForm<EduBgType>(eduInfo, 'EDU_BG')

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
    <>
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
        {eduInfo.length === 0 ? (
          <AddBtn handleAdd={handleOpen} />
        ) : (
          // eduInfo.map((eduItem) => (
          //   <div key={eduItem.id} className={styles['edu-item']}>
          //     {eduInfo.length ? (

          //     ) : (
          //       <AddBtn handleAdd={() => {}} />
          //     )}
          //   </div>
          // ))
          <List
            type="EDU_BG"
            data={eduInfo}
            fieldMap={{
              id: 'id',
              title: 'school',
              subTitle: 'bg',
              visible: 'visible',
            }}
            handleAdd={handleOpen}
            handleDel={handleDelItem}
            handleEdit={handleEdit}
            handleVisible={handleVisible}
          />
        )}
      </CustomLayout>
      <Modal
        title={infoId ? '编辑条目' : '创建新条目'}
        okText="创建"
        cancelText="取消"
        width="50%"
        mask={true}
        footer={[
          <Button key="submit" onClick={handleOk}>
            {infoId ? '更新' : '创建'}
          </Button>,
        ]}
        centered={true}
        open={opened}
        onCancel={resetState}
      >
        <Form layout="vertical" requiredMark={false} form={formRef}>
          <div className={styles['row-form-item']}>
            <Form.Item
              label="学历"
              name="bg"
              layout="vertical"
              rules={[{ required: true }]}
              style={{
                flex: 1,
              }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="院校"
              name="school"
              layout="vertical"
              rules={[{ required: true }]}
              style={{
                flex: 1,
              }}
            >
              <Input />
            </Form.Item>
          </div>
          <Form.Item label="时间" name="date" layout="vertical">
            <RangePicker />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default EduBg
