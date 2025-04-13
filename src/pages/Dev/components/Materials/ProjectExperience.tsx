import CustomLayout from '@/components/CustomLayout/index'
import Header from '@/components/Header/index'
import { BranchesOutlined } from '@ant-design/icons'
import AddBtn from './components/AddBtn'
import { Button, Modal, Form, Input, DatePicker } from 'antd'
import RichInput from './components/RichInput'
import List from './components/List'
import { useEffect, useRef } from 'react'
import { useDevStore, useGlobalStore } from '@/store'
import { useModalForm } from '@/hooks/useModalForm'
import { useChangeLabel } from '@/hooks/useChangeLabel'
import CtxMenu from './components/CtxMenu'
const { RangePicker } = DatePicker

const ProjectExperience = () => {
  const storeProjectList = useDevStore(
    (state) => state.devSchema.dataSource.PROJECT_EXP.info
  )
  const label = useDevStore(
    (state) => state.devSchema.dataSource.PROJECT_EXP.label
  )

  const setPosition = useGlobalStore((state) => state.setPosition)
  const proRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (proRef.current) {
      const { y } = proRef.current.getBoundingClientRect()
      setPosition('PROJECT_EXP', y)
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
  } = useModalForm(storeProjectList, 'PROJECT_EXP')
  const { handleChange, isEdit, setIsEdit } = useChangeLabel('PROJECT_EXP')

  return (
    <CustomLayout ref={proRef}>
      <Header
        label={label || '项目经历'}
        icon={BranchesOutlined}
        isEdit={isEdit}
        handleChange={handleChange}
        handleBlur={() => setIsEdit(false)}
      >
        <CtxMenu currentKey="PROJECT_EXP" renameLabel={() => setIsEdit(true)} />
      </Header>
      {storeProjectList.length === 0 ? (
        <AddBtn handleAdd={handleOpen} />
      ) : (
        <List
          data={storeProjectList}
          handleAdd={handleOpen}
          handleVisible={handleVisible}
          handleDel={handleDelItem}
          handleEdit={handleEdit}
          fieldMap={{
            id: 'id',
            title: 'name',
            subTitle: 'position',
            visible: 'visible',
          }}
        ></List>
      )}
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
          <Form.Item
            label="实习产出"
            name="output"
            valuePropName="value"
            trigger="onChange"
            validateTrigger="onChange"
            rules={[{ required: true, message: '请输入产出内容' }]}
            layout="vertical"
          >
            <RichInput />
          </Form.Item>
        </Form>
      </Modal>
    </CustomLayout>
  )
}

export default ProjectExperience
