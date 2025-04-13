import { useDevStore } from '@/store'
import type { allKeyType } from '@/types/dev'
import { useState } from 'react'

export function useChangeLabel(key: allKeyType) {
  const changeLabel = useDevStore((state) => state.changeLabel)

  const [isEdit, setIsEdit] = useState(false)
  const handleChange = (val: string) => {
    changeLabel(key, val)
  }

  return {
    isEdit,
    setIsEdit,
    handleChange,
  }
}
