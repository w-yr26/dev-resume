import CustomLayout from '@/components/CustomLayout/index'
import Header from '@/components/Header/index'
import { BulbOutlined } from '@ant-design/icons'
import List from './components/List'
import AddBtn from './components/AddBtn'
import styles from './index.module.scss'
import { Button, DatePicker, Form, Input, Modal } from 'antd'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useDevStore, useGlobalStore } from '@/store'
const { RangePicker } = DatePicker

const Award = () => {
  const storeAwardList = useDevStore(
    (state) => state.devSchema.dataSource.AWARD_LIST.info
  )
  const setVisible = useDevStore((state) => state.immerVisible)
  const handleDel = useDevStore((state) => state.immerDel)
  const label = useDevStore(
    (state) => state.devSchema.dataSource.AWARD_LIST.label
  )
  const updateInfo = useDevStore((state) => state.updateInfo)
  const addInfoList = useDevStore((state) => state.addInfoList)
  const [opened, setOpened] = useState(false)
  const [infoId, setInfoId] = useState('')
  const [formRef] = Form.useForm()

  const currentInfo = useMemo(() => {
    return storeAwardList.find((item) => item.id === infoId)
  }, [infoId, storeAwardList])

  useEffect(() => {
    if (currentInfo) {
      console.log('currentInfo', currentInfo)

      formRef.setFieldsValue(currentInfo)
    }
  }, [currentInfo, formRef])

  const handleVisible = (id: string) => {
    setVisible(id, 'AWARD_LIST')
  }

  const handleDelItem = (id: string) => {
    handleDel(id, 'AWARD_LIST')
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
          'AWARD_LIST'
        )
      } else {
        // 创建
        addInfoList(
          {
            ...values,
            id: new Date().getTime(),
            visible: true,
          },
          'AWARD_LIST'
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
  const awardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (awardRef.current) {
      const { y } = awardRef.current.getBoundingClientRect()
      setPosition('AWARD_LIST', y)
    }
  }, [])

  return (
    <CustomLayout ref={awardRef}>
      <Header label={label || '荣誉奖项'} icon={BulbOutlined}></Header>

      {storeAwardList.length === 0 ? (
        <AddBtn handleAdd={() => setOpened(true)} />
      ) : (
        <List
          data={storeAwardList}
          handleAdd={() => setOpened(true)}
          handleVisible={handleVisible}
          handleEdit={handleEdit}
          handleDel={handleDelItem}
          fieldMap={{
            id: 'id',
            title: 'award',
            subTitle: 'describe',
            visible: 'visible',
          }}
        ></List>
      )}

      <Modal
        title={infoId ? '编辑条目' : '创建新条目'}
        width="50%"
        mask={true}
        footer={[
          <Button key="submit" onClick={handleOk}>
            {infoId ? '编辑' : '创建'}
          </Button>,
        ]}
        centered={true}
        open={opened}
        onCancel={resetState}
      >
        <Form layout="vertical" requiredMark={false} form={formRef}>
          <div className={styles['row-form-item']}>
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
          <Form.Item label="概述" name="describe" layout="vertical">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </CustomLayout>
  )
}

export default Award
