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
    sidebarProportions: [],
    setPagePadding: (val) =>
      set(() => ({
        pagePadding: val,
      })),
    setModulePadding: (val) =>
      set(() => ({
        modulePadding: val,
      })),
    setLineHeight: (val) =>
      set(() => ({
        lineHeight: val,
      })),
    setFontSize: (val) =>
      set(() => ({
        fontSize: val,
      })),
    setFontColor: (val) =>
      set(() => ({
        fontColor: val,
      })),
    setMainColor: (val) =>
      set(() => ({
        mainColor: val,
      })),
    setBgColor: (val) =>
      set(() => ({
        bgColor: val,
      })),
    setBorderStyle: (val) =>
      set(() => ({
        borderStyle: val,
      })),
    setSidebarProportions: (val) =>
      set(() => ({
        sidebarProportions: val,
      })),
  }
})

export default useStyleStore
