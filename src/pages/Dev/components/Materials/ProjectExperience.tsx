import CustomLayout from '@/components/CustomLayout/index'
import Header from '@/components/Header/index'
import Icon from '@ant-design/icons'
import ProjectSVG from '@/assets/svg/dev/project.svg?react'
import AddBtn from './components/AddBtn'
import { Button, Modal, Form, Input, DatePicker } from 'antd'
import List from './components/List'
import { useRef } from 'react'
import { useDevStore } from '@/store'
import { useModalForm } from '@/hooks/useModalForm'
import { useChangeLabel } from '@/hooks/useChangeLabel'
import CtxMenu from './components/CtxMenu'
import MdEditor from '@/components/MdEditor'
import AIBrush from '@/components/AIBrush'
import styles from './index.module.scss'
import { useElementPosition } from '@/hooks/useElementPosition'
const { RangePicker } = DatePicker

const ProjectExperience = () => {
  const storeProjectList = useDevStore(
    (state) => state.devSchema.dataSource.PROJECT_EXP.info
  )
  const label = useDevStore(
    (state) => state.devSchema.dataSource.PROJECT_EXP.label
  )
  const visible = useDevStore(
    (state) => state.devSchema.dataSource.PROJECT_EXP.visible
  )

  const proRef = useRef<HTMLDivElement>(null)

  useElementPosition(proRef, 'PROJECT_EXP')

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
  } = useModalForm(storeProjectList, 'PROJECT_EXP')
  const { handleChange, isEdit, setIsEdit } = useChangeLabel('PROJECT_EXP')

  return (
    <CustomLayout ref={proRef}>
      <Header
        label={label || '项目经历'}
        svg={<Icon component={ProjectSVG} />}
        isEdit={isEdit}
        handleChange={handleChange}
        handleBlur={() => setIsEdit(false)}
      >
        <CtxMenu
          currentKey="PROJECT_EXP"
          visible={visible}
          renameLabel={() => setIsEdit(true)}
        />
      </Header>
      {storeProjectList.length === 0 ? (
        <AddBtn handleAdd={handleOpen} />
      ) : (
        <List
          type="PROJECT_EXP"
          data={storeProjectList}
          handleAdd={handleOpen}
          handleVisible={handleVisible}
          handleDel={handleDelItem}
          handleEdit={handleEdit}
          fieldMap={{
            id: 'id',
            title: 'title',
            subTitle: 'role',
            visible: 'visible',
          }}
        />
      )}
      <Modal
        title={infoId ? '编辑条目' : '创建新条目'}
        okText="创建"
        cancelText="取消"
        width="50%"
        styles={{
          content: {
            border: '1px solid #e4e4e7',
          },
        }}
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
          <Form.Item
            label="项目名称"
            name="title"
            layout="vertical"
            rules={[{ required: true }]}
            style={{
              flex: 1,
            }}
          >
            <Input />
          </Form.Item>
          <div className={styles['row-form-item']}>
            <Form.Item
              label="项目角色"
              name="role"
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
          <Form.Item label="项目概述" name="description" layout="vertical">
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label={
              <div className={styles['form-item-header']}>
                <span className={styles['item-label']}>实习产出</span>
                <AIBrush
                  formRef={formRef}
                  fieldType="output"
                  infoId={infoId}
                  infoList={storeProjectList}
                  moduleType="PROJECT_EXP"
                />
              </div>
            }
            name="output"
            valuePropName="value"
            trigger="onChange"
            validateTrigger="onChange"
            rules={[{ required: true, message: '请输入产出内容' }]}
            layout="vertical"
          >
            <MdEditor />
          </Form.Item>
        </Form>
      </Modal>
    </CustomLayout>
  )
}

export default ProjectExperience
