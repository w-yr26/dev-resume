import { create } from 'zustand'
import type { GlobalInitType } from '@/types/global'
import { produce } from 'immer'

const useGlobalStore = create<GlobalInitType>((set) => {
  return {
    keyToPosition: {
      // BASE_INFO: 0,
    },
    setPosition: (key, val) =>
      set(
        produce((state: GlobalInitType) => {
          state.keyToPosition[key] = val
        })
      ),
  }
})

export default useGlobalStore
