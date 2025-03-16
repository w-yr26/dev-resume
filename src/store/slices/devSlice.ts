import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { devInitType } from '@/types/dev'

const initialState: devInitType = {
  num: 10,
}

const devSlice = createSlice({
  name: 'dev',
  initialState,
  reducers: {
    addNum(state, action: PayloadAction<number>) {
      state.num += action.payload
    },
  },
})

export const { addNum } = devSlice.actions

export default devSlice.reducer
