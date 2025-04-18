import { create } from 'zustand'
import type { styleInitType } from '@/types/style'

const useStyleStore = create<styleInitType>((set) => {
  return {
    pagPadding: 14,
    modulePadding: 8,
    setPagePadding: (val) =>
      set(() => ({
        pagPadding: val,
      })),
    setModulePadding: (val) =>
      set(() => ({
        modulePadding: val,
      })),
  }
})

export default useStyleStore
