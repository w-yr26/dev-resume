import { CalculatorOutlined } from '@ant-design/icons'
import Header from '@/components/Header'
import CustomLayout from '../../../../components/CustomLayout'
import { useState } from 'react'
import { WorkExpItemType } from '@/types/dev'
import { Form, Input, Modal, DatePicker, Button } from 'antd'
import RichInput from './components/RichInput'
import AddBtn from './components/AddBtn'
import List from './components/List'
const { RangePicker } = DatePicker

const WorkExperience = () => {
  const [workList, setWorkList] = useState<WorkExpItemType[]>([])
  const [opend, setOpend] = useState(false)
  const [formRef] = Form.useForm()

  const handleAdd = () => {
    setOpend(true)
  }
  const handleOk = async () => {
    try {
      const values = await formRef.validateFields()
      console.log('values', values)
      setWorkList([
        ...workList,
        {
          ...values,
          output: 'new output',
          id: new Date().getTime(),
        },
      ])
      // const addItem =
      setOpend(false)
    } catch (err) {
      console.log('校验失败', err)
    }
  }

  const handleCancel = () => {
    setOpend(false)
  }

  return (
    <>
      <CustomLayout>
        <Header label="工作/实习经历" icon={CalculatorOutlined}></Header>
        {workList.length === 0 ? (
          <AddBtn handleAdd={handleAdd} />
        ) : (
          <List
            data={workList}
            handleAdd={handleAdd}
            fieldMap={{
              id: 'id',
              title: 'company',
              subTitle: 'position',
            }}
          ></List>
        )}
      </CustomLayout>
      <Modal
        title="创建新条目"
        okText="创建"
        cancelText="取消"
        width="50%"
        mask={true}
        footer={[
          <Button key="submit" onClick={handleOk}>
            创建
          </Button>,
        ]}
        centered={true}
        open={opend}
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
              label="公司"
              name="company"
              layout="vertical"
              rules={[{ required: true }]}
              className="flex-1"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="职位"
              name="position"
              layout="vertical"
              rules={[{ required: true }]}
              className="flex-1"
            >
              <Input />
            </Form.Item>
          </div>
          <div className="flex justify-between items-center gap-[10px]">
            <Form.Item
              label="时间"
              name="date"
              layout="vertical"
              rules={[{ required: true }]}
              className="flex-1"
            >
              <RangePicker />
            </Form.Item>
            <Form.Item
              label="技术栈"
              name="tecStack"
              layout="vertical"
              className="flex-1"
            >
              <Input />
            </Form.Item>
          </div>
          <Form.Item label="项目概述" name="overview" layout="vertical">
            <Input.TextArea />
          </Form.Item>
          <div>
            <div className="h-[22px] mb-[8px]">实习产出</div>
            <RichInput
              value="<p>form test msg</p>"
              onChange={(value) => {
                console.log('form value', value)
              }}
            ></RichInput>
          </div>
        </Form>
      </Modal>
    </>
  )
}

export default WorkExperience
