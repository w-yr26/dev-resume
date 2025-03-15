import CustomLayout from '@/components/CustomLayout'
import Header from '@/components/Header'
import type { ExperienceItemType } from '@/types/dev'
import { BranchesOutlined } from '@ant-design/icons'
import { useState } from 'react'
import AddBtn from './components/AddBtn'
import { Button, Modal, Form, Input, DatePicker } from 'antd'
import RichInput from './components/RichInput'
import List from './components/List'
const { RangePicker } = DatePicker

const ProjectExperience = () => {
  const [experienceList, setExperienceList] = useState<ExperienceItemType[]>([])
  const [opend, setOpend] = useState(false)
  const [formRef] = Form.useForm()

  const handleAdd = () => {
    setOpend(true)
  }

  const handleOk = async () => {
    const values = await formRef.validateFields()
    console.log(values, 'values')
    setExperienceList([
      ...experienceList,
      {
        ...values,
        id: new Date().getTime(),
        output: '富文本内容(待换成状态)',
      },
    ])
    setOpend(false)
  }

  const handleCancel = () => {
    setOpend(false)
  }

  return (
    <CustomLayout>
      <Header label="项目经历" icon={BranchesOutlined}></Header>
      {experienceList.length === 0 ? (
        <AddBtn handleAdd={handleAdd} />
      ) : (
        <List
          data={experienceList}
          handleAdd={handleAdd}
          fieldMap={{
            id: 'id',
            title: 'name',
            subTitle: 'position',
          }}
        ></List>
      )}
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
              label="项目名称"
              name="name"
              layout="vertical"
              rules={[{ required: true }]}
              className="flex-1"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="项目角色"
              name="position"
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
          <Form.Item label="项目概述" name="overview" layout="vertical">
            <Input.TextArea />
          </Form.Item>
          <div>
            <div className="h-[22px] mb-[8px]">项目产出</div>
            <RichInput
              value="<p>请输入项目产出</p>"
              onChange={(value) => {
                console.log('form value', value)
              }}
            ></RichInput>
          </div>
        </Form>
      </Modal>
    </CustomLayout>
  )
}

export default ProjectExperience
