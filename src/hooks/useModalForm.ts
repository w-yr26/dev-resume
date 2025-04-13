import { useDevStore } from '@/store'
import type { keyType } from '@/types/dev'
import { Form } from 'antd'
import { useEffect, useMemo, useState } from 'react'

export function useModalForm<
  T extends {
    id: string
  }
>(data: T[], key: keyType) {
  const setVisible = useDevStore((state) => state.immerVisible)
  const handleDel = useDevStore((state) => state.immerDel)
  const addInfoList = useDevStore((state) => state.addInfoList)
  const updateInfo = useDevStore((state) => state.updateInfo)
  const [opened, setOpened] = useState(false)
  const [infoId, setInfoId] = useState('')
  const [formRef] = Form.useForm()

  const handleVisible = (id: string) => {
    // data
    setVisible(id, key)
  }

  const handleDelItem = (id: string) => {
    handleDel(id, key)
  }

  const handleEdit = (id: string) => {
    setOpened(true)
    // TODO: id未必永远不一致
    setInfoId(id)
  }

  const currentInfo = useMemo(() => {
    return data.find((item) => item.id === infoId)
  }, [infoId, data])

  useEffect(() => {
    if (currentInfo) {
      formRef.setFieldsValue(currentInfo)
    }
  }, [currentInfo, formRef])

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
          key
        )
      } else {
        // 创建
        addInfoList(
          {
            ...values,
            id: new Date().getTime(),
            visible: true,
            // output: '<p>内容测试</p>',
          },
          key
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

  const handleOpen = () => {
    setOpened(true)
  }

  return {
    opened,
    infoId,
    formRef,
    handleVisible,
    handleDelItem,
    handleEdit,
    handleOk,
    resetState,
    handleOpen,
  }
}
