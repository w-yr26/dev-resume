import { createSlice } from '@reduxjs/toolkit'
import type { GlobalInitType } from '@/types/global'

import BaseInfoTem from '@/templates/BaseInfoTem'

const initialState: GlobalInitType = {
  keyToComponentMap: {
    BASE_INFO: BaseInfoTem,
    // EDU_BG: EduBg,
    // WORK_EXP: WorkExperience,
    // PROJECT_EXP: ProjectExperience,
    // AWARD_LIST: Award,
    // SKILL_LIST: Skill,
    // HEART_LIST: Heart,
  },
}

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {},
})

export default globalSlice.reducer
