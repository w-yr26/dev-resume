import { create } from 'zustand'
import type { userStoreType } from '@/types/user'

const useUserStore = create<userStoreType>((set) => {
  return {
    info: {
      token: localStorage.getItem('token') || '',
      refreshToken: localStorage.getItem('refreshToken') || '',
      email: localStorage.getItem('email') || '',
      userName: localStorage.getItem('userName') || '',
      id: localStorage.getItem('user_id') || '',
    },
    lastRoute: '',
    setLastRoute: (route) => {
      return set(() => {
        return {
          lastRoute: route,
        }
      })
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
