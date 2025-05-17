import CustomLayout from '@/components/CustomLayout/index'
import Header from '@/components/Header/index'
import Icon from '@ant-design/icons'
import AwardSVG from '@/assets/svg/dev/award.svg?react'
import List from './components/List'
import AddBtn from './components/AddBtn'
import styles from './index.module.scss'
import { Button, DatePicker, Form, Input, Modal } from 'antd'
import { useEffect, useRef } from 'react'
import { useDevStore, useGlobalStore } from '@/store'
import { useModalForm } from '@/hooks/useModalForm'
import { useChangeLabel } from '@/hooks/useChangeLabel'
import CtxMenu from './components/CtxMenu'
const { RangePicker } = DatePicker

const Award = () => {
  const storeAwardList = useDevStore(
    (state) => state.devSchema.dataSource.AWARD_LIST.info
  )
  const label = useDevStore(
    (state) => state.devSchema.dataSource.AWARD_LIST.label
  )

  const setPosition = useGlobalStore((state) => state.setPosition)
  const awardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (awardRef.current) {
      const { y } = awardRef.current.getBoundingClientRect()
      setPosition('AWARD_LIST', y)
    }
  }, [])

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
  } = useModalForm(storeAwardList, 'AWARD_LIST')
  const { handleChange, isEdit, setIsEdit } = useChangeLabel('AWARD_LIST')

  return (
    <CustomLayout ref={awardRef}>
      <Header
        label={label || '荣誉奖项'}
        svg={<Icon component={AwardSVG} />}
        isEdit={isEdit}
        handleChange={handleChange}
        handleBlur={() => setIsEdit(false)}
      >
        <CtxMenu currentKey="AWARD_LIST" renameLabel={() => setIsEdit(true)} />
      </Header>

      {storeAwardList.length === 0 ? (
        <AddBtn handleAdd={handleOpen} />
      ) : (
        <List
          type="AWARD_LIST"
          data={storeAwardList}
          handleAdd={handleOpen}
          handleVisible={handleVisible}
          handleEdit={handleEdit}
          handleDel={handleDelItem}
          fieldMap={{
            id: 'id',
            title: 'award',
            subTitle: 'describe',
            visible: 'visible',
          }}
        />
      )}

      <Modal
        title={infoId ? '编辑条目' : '创建新条目'}
        width="50%"
        mask={true}
        footer={[
          <Button key="submit" onClick={handleOk}>
            {infoId ? '编辑' : '创建'}
          </Button>,
        ]}
        centered={true}
        open={opened}
        onCancel={resetState}
      >
        <Form layout="vertical" requiredMark={false} form={formRef}>
          <div className={styles['row-form-item']}>
            <Form.Item
              label="荣誉名称"
              name="award"
              layout="vertical"
              rules={[{ required: true }]}
              className="flex-1"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="时间"
              name="date"
              layout="vertical"
              rules={[{ required: true }]}
              className="flex-1"
            >
              <RangePicker />
            </Form.Item>
          </div>
          <Form.Item label="概述" name="describe" layout="vertical">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </CustomLayout>
  )
}

export default Award
