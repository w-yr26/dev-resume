import Icon, { CalculatorOutlined } from '@ant-design/icons'
import WorkSVG from '@/assets/svg/dev/work.svg?react'
import Header from '@/components/Header/index'
import CustomLayout from '@/components/CustomLayout/index'
import RichInput from './components/RichInput'
import AddBtn from './components/AddBtn'
import List from './components/List'
import CtxMenu from '@/pages/Dev/components/Materials/components/CtxMenu'
import { Form, Input, Modal, DatePicker, Button } from 'antd'
const { RangePicker } = DatePicker
import { useEffect, useRef } from 'react'
import { useDevStore, useGlobalStore } from '@/store'
import { useChangeLabel } from '@/hooks/useChangeLabel'
import { useModalForm } from '@/hooks/useModalForm'
import type { WorkExpItemType } from '@/types/dev'
import styles from './index.module.scss'

const WorkExperience = () => {
  const storeWorkList = useDevStore(
    (state) => state.devSchema.dataSource.WORK_EXP.info
  )
  const label = useDevStore(
    (state) => state.devSchema.dataSource.WORK_EXP.label
  )
  const setPosition = useGlobalStore((state) => state.setPosition)

  const workRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (workRef.current) {
      const { y } = workRef.current.getBoundingClientRect()
      setPosition('WORK_EXP', y)
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
  } = useModalForm<WorkExpItemType>(storeWorkList, 'WORK_EXP')
  const { handleChange, isEdit, setIsEdit } = useChangeLabel('EDU_BG')

  return (
    <>
      <CustomLayout ref={workRef}>
        <Header
          label={label || '工作/实习经历'}
          icon={CalculatorOutlined}
          svg={<Icon component={WorkSVG} />}
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
          <AddBtn handleAdd={handleOpen} />
        ) : (
          <List
            data={storeWorkList}
            handleAdd={handleOpen}
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
        onCancel={resetState}
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
