import CustomLayout from '@/components/CustomLayout/index'
import Header from '@/components/Header/index'
import type { PeojectExpItemType } from '@/types/dev'
import { BranchesOutlined } from '@ant-design/icons'
import AddBtn from './components/AddBtn'
import { Button, Modal, Form, Input, DatePicker } from 'antd'
import RichInput from './components/RichInput'
import List from './components/List'
import styles from './index.module.scss'
import { useModalForm } from '@/hooks/useModalForm'
const { RangePicker } = DatePicker

const ProjectExperience = () => {
  const {
    list: experienceList,
    formRef,
    opened,
    handleAdd,
    handleCancel,
    handleOk,
  } = useModalForm<PeojectExpItemType>([])

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
        open={opened}
        onCancel={handleCancel}
      >
        <Form layout="vertical" requiredMark={false} form={formRef}>
          <div className="flex justify-between items-center gap-[10px]">
            <Form.Item
              label="项目名称"
              name="name"
              layout="vertical"
              rules={[{ required: true }]}
              style={{
                flex: 1,
              }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="项目角色"
              name="position"
              layout="vertical"
              rules={[{ required: true }]}
              style={{
                flex: 1,
              }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="时间"
              name="date"
              layout="vertical"
              rules={[{ required: true }]}
              style={{
                flex: 1,
              }}
            >
              <RangePicker />
            </Form.Item>
          </div>
          <Form.Item label="项目概述" name="overview" layout="vertical">
            <Input.TextArea />
          </Form.Item>
          <div>
            <div className={styles['rich-text-field']}>项目产出</div>
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
