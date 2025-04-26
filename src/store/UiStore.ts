import { uiStoreType } from '@/types/ui'
import { create } from 'zustand'

const useUIStore = create<uiStoreType>((set) => {
  return {
    uiSchema: null,
    setUiSchema: (newUISchema) =>
      set(() => {
        return {
          uiSchema: newUISchema,
        }
      }),
  }
})

export default useUIStore
