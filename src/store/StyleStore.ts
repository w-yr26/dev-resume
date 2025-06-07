import { create } from 'zustand'
import type { styleInitType } from '@/types/style'

const useStyleStore = create<styleInitType>((set) => {
  return {
    pagePadding: 0,
    modulePadding: 0,
    lineHeight: 0,
    fontSize: 0,
    mainColor: '',
    fontColor: '',
    bgColor: '',
    borderStyle: '',
    setPageKeyToStyle: (key, val) =>
      set(() => ({
        [key]: val,
      })),
  }
})

export default useStyleStore
