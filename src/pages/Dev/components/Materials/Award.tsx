import CustomLayout from '@/components/CustomLayout'
import Header from '@/components/Header'
import { BulbOutlined } from '@ant-design/icons'
import { useModalForm } from '@/hooks/useModalForm'
import type { AwardItemType } from '@/types/dev'
import List from './components/List'
import AddBtn from './components/AddBtn'
import { Button, DatePicker, Form, Input, Modal } from 'antd'
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

  return (
    <CustomLayout>
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
        <Form
          name="layout-multiple-horizontal"
          layout="vertical"
          requiredMark={false}
          form={formRef}
        >
          <div className="flex justify-between items-center gap-[10px]">
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
