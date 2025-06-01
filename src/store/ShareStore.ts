import { shareStoreType } from '@/types/resume'
import { create } from 'zustand'

const useShareStore = create<shareStoreType>((set) => {
  return {
    permissions: [],
    targetUsers: [],
    updateTarget: (val) => {
      return set(() => {
        return {
          targetUsers: val,
        }
      })
    },
    updatePermissions: (val) =>
      set(() => {
        return {
          permissions: val,
        }
      }),
  }
})

export default useShareStore
