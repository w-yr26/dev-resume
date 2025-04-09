import { create } from 'zustand'
import type { userStoreType } from '@/types/user'

const useUserStore = create<userStoreType>((set) => {
  return {
    info: {
      token: localStorage.getItem('token') || '',
      email: localStorage.getItem('email') || '',
      user_name: localStorage.getItem('user_name') || '',
      id: localStorage.getItem('user_id') || '',
    },
    updateInfo: (key, value) => {
      return set((state) => {
        return {
          info: {
            ...state.info,
            [key]: value,
          },
        }
      })
    },
  }
})

export default useUserStore
