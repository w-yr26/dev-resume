import { createSlice } from '@reduxjs/toolkit'
import type { GlobalInitType } from '@/types/global'

import BaseInfo from '@/pages/Dev/components/Materials/BaseInfo'
import EduBg from '@/pages/Dev/components/Materials/EduBg'
import WorkExperience from '@/pages/Dev/components/Materials/WorkExperience'
import ProjectExperience from '@/pages/Dev/components/Materials/ProjectExperience'
import Award from '@/pages/Dev/components/Materials/Award'
import Skill from '@/pages/Dev/components/Materials/Skill'
import Heart from '@/pages/Dev/components/Materials/Heart'

const initialState: GlobalInitType = {
  keyToComponentMap: {
    BASE_INFO: BaseInfo,
    EDU_BG: EduBg,
    WORK_EXP: WorkExperience,
    PROJECT_EXP: ProjectExperience,
    AWARD_LIST: Award,
    SKILL_LIST: Skill,
    HEART_LIST: Heart,
  },
}

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {},
})

export default globalSlice
