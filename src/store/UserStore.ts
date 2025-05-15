import { create } from 'zustand'
import type { userStoreType } from '@/types/user'

const useUserStore = create<userStoreType>((set) => {
  return {
    info: {
      token: localStorage.getItem('token') || '',
      email: localStorage.getItem('email') || '',
      userName: localStorage.getItem('userName') || '',
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
