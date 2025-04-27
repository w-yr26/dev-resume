import type { uiStoreType } from '@/types/ui'
import { create } from 'zustand'

const useUIStore = create<uiStoreType>((set) => {
  return {
    uiSchema: null,
    isHorizontal: false,
    setUiSchema: (newUISchema) =>
      set(() => {
        return {
          uiSchema: newUISchema,
        }
      }),
    setIsHorizontal: (isHorizontal) =>
      set(() => {
        return {
          isHorizontal: isHorizontal,
        }
      }),
  }
})

export default useUIStore
