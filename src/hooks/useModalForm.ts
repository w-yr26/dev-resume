import { useState } from 'react'
import { Form } from 'antd'

export function useModalForm<T>(defaultValues: T[]) {
  const [list, setList] = useState<T[]>(defaultValues)
  const [opened, setOpend] = useState(false)
  const [formRef] = Form.useForm()

  const handleAdd = () => {
    setOpend(true)
  }
  const handleOk = async () => {
    try {
      const values = await formRef.validateFields()
      console.log('values', values)
      setList([
        ...list,
        {
          ...values,
          output: 'new output',
          id: new Date().getTime(),
        },
      ])
      // const addItem =
      setOpend(false)
    } catch (err) {
      console.log('校验失败', err)
    }
  }

  const handleCancel = () => {
    setOpend(false)
  }

  const resetForm = () => {
    formRef.resetFields()
  }

  return {
    list,
    opened,
    formRef,
    handleAdd,
    handleCancel,
    handleOk,
    resetForm,
  }
}
