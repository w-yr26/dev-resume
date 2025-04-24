import { create } from 'zustand'
import type { styleInitType } from '@/types/style'

const useStyleStore = create<styleInitType>((set) => {
  return {
    pagPadding: 14,
    modulePadding: 8,
    lineHeight: 1.5,
    fontSize: 14,
    fontColor: 'rgb(24, 24, 27)',
    bgColor: 'rgb(255, 255, 255)',
    borderStyle: 'solid',
    sidebarProportions: [40, 60],
    setPagePadding: (val) =>
      set(() => ({
        pagPadding: val,
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
