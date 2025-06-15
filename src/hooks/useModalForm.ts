import { postModuleInfoAPI } from '@/apis/resume'
import { useDevStore, useUserStore } from '@/store'
import type { keyType } from '@/types/dev'
import { Form } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import { useEffect, useMemo, useState } from 'react'

export function useModalForm<T extends { id: string; date: string }>(
  data: T[],
  key: keyType
) {
  const resumeId = useDevStore((state) => state.resumeId)
  const { id: userId } = useUserStore((state) => state.info)
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
    return data ? data.find((item) => item.id === infoId) : null
  }, [infoId, data])

  useEffect(() => {
    if (currentInfo) {
      formRef.setFieldsValue({
        ...currentInfo,
        date: currentInfo.date.split('~').map((item) => dayjs(item)),
      })
    }
  }, [currentInfo, formRef])

  const handleOk = async () => {
    try {
      let content = await formRef.validateFields()
      content = {
        ...content,
        date: content.date
          ?.map((item: Dayjs) => item.format('YYYY-MM-DD'))
          .join('~'),
        id: infoId ?? undefined, // 编辑时才需要传入每一项的id，反之即为新增
      }
      // 先调用接口，执行创建/更新，再写入store，因为存在接口调用失败的情况下，避免store多次写入
      const { code } = await postModuleInfoAPI({
        resumeId,
        content,
        type: key,
        userId,
      })

      if (code === 0) return
      // 更新
      if (infoId) {
        updateInfo(
          {
            ...currentInfo,
            ...content,
          },
          infoId,
          key
        )
      } else {
        // 创建
        addInfoList(
          {
            ...content,
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
