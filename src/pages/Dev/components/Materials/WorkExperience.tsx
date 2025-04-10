import { CalculatorOutlined } from '@ant-design/icons'
import Header from '@/components/Header/index'
import CustomLayout from '@/components/CustomLayout/index'
import { Form, Input, Modal, DatePicker, Button } from 'antd'
import RichInput from './components/RichInput'
import AddBtn from './components/AddBtn'
import List from './components/List'
import CtxMenu from '@/pages/Dev/components/Materials/components/CtxMenu'
import styles from './index.module.scss'
import { useDevStore } from '@/store'
import { useEffect, useMemo, useState } from 'react'
const { RangePicker } = DatePicker

const WorkExperience = () => {
  const storeWorkList = useDevStore(
    (state) => state.devSchema.dataSource.WORK_EXP.info
  )
  const label = useDevStore(
    (state) => state.devSchema.dataSource.WORK_EXP.label
  )
  const setVisible = useDevStore((state) => state.immerVisible)
  const handleDel = useDevStore((state) => state.immerDel)
  const addInfoList = useDevStore((state) => state.addInfoList)
  const updateInfo = useDevStore((state) => state.updateInfo)
  const changeLabel = useDevStore((state) => state.changeLabel)
  const [opened, setOpend] = useState(false)
  const [infoId, setInfoId] = useState('')
  const [formRef] = Form.useForm()

  const handleVisible = (id: string) => {
    // storeWorkList
    setVisible(id, 'WORK_EXP')
  }

  const handleDelItem = (id: string) => {
    handleDel(id, 'WORK_EXP')
  }

  const handleEdit = (id: string) => {
    setOpend(true)
    // TODO: id未必永远不一致
    setInfoId(id)
  }

  const currentInfo = useMemo(() => {
    return storeWorkList.find((item) => item.id === infoId)
  }, [infoId, storeWorkList])

  useEffect(() => {
    if (currentInfo) {
      formRef.setFieldsValue(currentInfo)
    }
  }, [currentInfo, formRef])

  const handleOk = async () => {
    try {
      const values = await formRef.validateFields()
      console.log('values', values)
      // 更新
      if (infoId) {
        updateInfo(
          {
            ...currentInfo,
            ...values,
          },
          infoId,
          'WORK_EXP'
        )
        setInfoId('')
      } else {
        // 创建
        addInfoList(
          {
            ...values,
            id: new Date().getTime(),
            visible: true,
            // output: '<p>内容测试</p>',
          },
          'WORK_EXP'
        )
      }
      setOpend(false)
    } catch (err) {
      console.log('校验失败', err)
    }
  }

  const [isEdit, setIsEdit] = useState(false)
  const handleChange = (val: string) => {
    changeLabel('WORK_EXP', val)
  }

  return (
    <>
      <CustomLayout>
        <Header
          label={label || '工作/实习经历'}
          icon={CalculatorOutlined}
          isEdit={isEdit}
          handleChange={handleChange}
          handleBlur={() => setIsEdit(false)}
        >
          <CtxMenu
            currentKey="WORK_EXP"
            renameLabel={() => setIsEdit(true)}
          ></CtxMenu>
        </Header>
        {storeWorkList.length === 0 ? (
          <AddBtn handleAdd={() => setOpend(true)} />
        ) : (
          <List
            data={storeWorkList}
            handleAdd={() => setOpend(true)}
            handleVisible={handleVisible}
            handleDel={handleDelItem}
            handleEdit={handleEdit}
            fieldMap={{
              id: 'id',
              title: 'company',
              subTitle: 'position',
              visible: 'visible',
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
            {infoId ? '更新' : '创建'}
          </Button>,
        ]}
        centered={true}
        open={opened}
        onCancel={() => {
          setOpend(false)
          formRef.resetFields()
          setInfoId('')
        }}
      >
        <Form layout="vertical" requiredMark={false} form={formRef}>
          <div className={styles['row-form-item']}>
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
          <div className={styles['row-form-item']}>
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
          {/* <div>
            <div className={styles['rich-text-field']}>实习产出</div>
          </div> */}
        </Form>
      </Modal>
    </>
  )
}

export default WorkExperience
