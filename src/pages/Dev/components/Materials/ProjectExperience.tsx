import CustomLayout from '@/components/CustomLayout/index'
import Header from '@/components/Header/index'
import { BranchesOutlined } from '@ant-design/icons'
import AddBtn from './components/AddBtn'
import { Button, Modal, Form, Input, DatePicker } from 'antd'
import RichInput from './components/RichInput'
import List from './components/List'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useDevStore, useGlobalStore } from '@/store'
const { RangePicker } = DatePicker

const ProjectExperience = () => {
  const storeProjectList = useDevStore(
    (state) => state.devSchema.dataSource.PROJECT_EXP.info
  )
  const setVisible = useDevStore((state) => state.immerVisible)
  const handleDel = useDevStore((state) => state.immerDel)
  const label = useDevStore(
    (state) => state.devSchema.dataSource.PROJECT_EXP.label
  )
  const updateInfo = useDevStore((state) => state.updateInfo)
  const addInfoList = useDevStore((state) => state.addInfoList)
  const [opened, setOpened] = useState(false)
  const [infoId, setInfoId] = useState('')
  const [formRef] = Form.useForm()

  const currentInfo = useMemo(() => {
    return storeProjectList.find((item) => item.id === infoId)
  }, [infoId, storeProjectList])

  useEffect(() => {
    if (currentInfo) {
      formRef.setFieldsValue(currentInfo)
    }
  }, [currentInfo, formRef])

  const handleVisible = (id: string) => {
    setVisible(id, 'PROJECT_EXP')
  }

  const handleDelItem = (id: string) => {
    handleDel(id, 'PROJECT_EXP')
  }

  const handleEdit = (id: string) => {
    setOpened(true)
    // TODO: id未必永远不一致
    setInfoId(id)
  }

  const handleOk = async () => {
    try {
      const values = await formRef.validateFields()
      // 更新
      if (infoId) {
        updateInfo(
          {
            ...currentInfo,
            ...values,
          },
          infoId,
          'PROJECT_EXP'
        )
      } else {
        // 创建
        addInfoList(
          {
            ...values,
            id: new Date().getTime(),
            visible: true,
          },
          'PROJECT_EXP'
        )
      }
      resetState()
    } catch (err) {
      console.log('校验失败', err)
    }
  }

  const resetState = () => {
    setOpened(false)
    formRef.resetFields()
    setInfoId('')
  }

  const setPosition = useGlobalStore((state) => state.setPosition)
  const proRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (proRef.current) {
      const { y } = proRef.current.getBoundingClientRect()
      setPosition('PROJECT_EXP', y)
    }
  }, [])

  return (
    <CustomLayout ref={proRef}>
      <Header label={label || '项目经历'} icon={BranchesOutlined}></Header>
      {storeProjectList.length === 0 ? (
        <AddBtn handleAdd={() => setOpened(true)} />
      ) : (
        <List
          data={storeProjectList}
          handleAdd={() => setOpened(true)}
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
