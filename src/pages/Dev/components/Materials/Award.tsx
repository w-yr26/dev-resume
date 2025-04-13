import CustomLayout from '@/components/CustomLayout/index'
import Header from '@/components/Header/index'
import { BulbOutlined } from '@ant-design/icons'
import { useModalForm } from '@/hooks/useModalForm'
import type { AwardItemType } from '@/types/dev'
import List from './components/List'
import AddBtn from './components/AddBtn'
import styles from './index.module.scss'
import { Button, DatePicker, Form, Input, Modal } from 'antd'
import { useEffect, useRef } from 'react'
import { useGlobalStore } from '@/store'
const { RangePicker } = DatePicker

const Award = () => {
  const {
    list: awardList,
    opened,
    formRef,
    handleAdd,
    handleCancel,
    handleOk,
  } = useModalForm<AwardItemType>([])

  const setPosition = useGlobalStore((state) => state.setPosition)
  const awardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (awardRef.current) {
      const { y } = awardRef.current.getBoundingClientRect()
      setPosition('AWARD_LIST', y)
    }
  }, [])

  return (
    <CustomLayout ref={awardRef}>
      <Header label="荣誉奖项" icon={BulbOutlined}></Header>

      {awardList.length === 0 ? (
        <AddBtn handleAdd={handleAdd} />
      ) : (
        <List
          data={awardList}
          handleAdd={handleAdd}
          fieldMap={{
            id: 'id',
            title: 'award',
            subTitle: 'describe',
          }}
        ></List>
      )}

      <Modal
        title="创建新条目"
        width="50%"
        mask={true}
        footer={[
          <Button key="submit" onClick={handleOk}>
            创建
          </Button>,
        ]}
        centered={true}
        open={opened}
        onCancel={handleCancel}
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
          <Form.Item label="概述" name="overview" layout="vertical">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </CustomLayout>
  )
}

export default Award
