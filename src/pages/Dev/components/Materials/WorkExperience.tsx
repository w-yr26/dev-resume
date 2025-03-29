import { CalculatorOutlined } from '@ant-design/icons'
import Header from '@/components/Header/index'
import CustomLayout from '../../../../components/CustomLayout/index'
import type { WorkExpItemType } from '@/types/dev'
import { Form, Input, Modal, DatePicker, Button } from 'antd'
import RichInput from './components/RichInput'
import AddBtn from './components/AddBtn'
import List from './components/List'
import { useModalForm } from '@/hooks/useModalForm'
import styles from './index.module.scss'
import { useDevStore } from '@/store'
const { RangePicker } = DatePicker

const WorkExperience = () => {
  const storeWorkList = useDevStore(
    (state) => state.devSchema.dataSource.WORK_EXP.info
  )
  const {
    list: workList,
    opened,
    formRef,
    handleAdd,
    handleCancel,
    handleOk,
  } = useModalForm<WorkExpItemType>(storeWorkList)

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
        open={opened}
        onCancel={handleCancel}
      >
        <Form
          name="layout-multiple-horizontal"
          layout="vertical"
          requiredMark={false}
          form={formRef}
        >
          <div className={styles['row-form-item ']}>
            <Form.Item
              label="公司"
              name="company"
              layout="vertical"
              rules={[{ required: true }]}
              style={{
                flex: 1,
              }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="职位"
              name="position"
              layout="vertical"
              rules={[{ required: true }]}
              style={{
                flex: 1,
              }}
            >
              <Input />
            </Form.Item>
          </div>
          <div className={styles['row-form-item ']}>
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
            <Form.Item
              label="技术栈"
              name="tecStack"
              layout="vertical"
              style={{
                flex: 1,
              }}
            >
              <Input />
            </Form.Item>
          </div>
          <Form.Item label="项目概述" name="overview" layout="vertical">
            <Input.TextArea />
          </Form.Item>
          <div>
            <div className={styles['rich-text-field']}>实习产出</div>
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
