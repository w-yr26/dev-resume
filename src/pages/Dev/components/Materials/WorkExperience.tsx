import {
  CalculatorOutlined,
  HolderOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import Header from '@/components/Header'
import CustomLayout from '../../../../components/CustomLayout'
import { useState } from 'react'
import { WorkExpItemType } from '@/types/dev'
import { Form, Input, Modal, DatePicker, Button } from 'antd'
import RichInput from './components/RichInput'
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
          <div
            className="flex justify-center items-center mt-4 w-full h-[48px] box-border border-1 border-dashed border-[#e4e4e7] bg-[#f8f8f9] hover:bg-[#f4f4f5] hover:cursor-help"
            onClick={handleAdd}
          >
            <PlusOutlined />
            <span className="ml-4  text-sm">添加一项</span>
          </div>
        ) : (
          <>
            <div className="border-1 border-b-0 border-[#e4e4e7]">
              {workList.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="p-2 flex items-center box-border border-b-1 border-[#e4e4e7] hover:bg-[#f6f6f7] hover:cursor-help "
                  >
                    <HolderOutlined />
                    <div className="ml-4">
                      <p className="text-[#3f3f46] text-sm">{item.company}</p>
                      <p className="text-[#71717a] text-[12px]">
                        {item.position}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="flex justify-end mt-6">
              <Button icon={<PlusOutlined />} onClick={handleAdd}>
                添加一项
              </Button>
            </div>
          </>
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
