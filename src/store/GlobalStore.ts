import { create } from 'zustand'
import type { GlobalInitType } from '@/types/global'
import BaseInfoTem from '@/templates/BaseInfoTem'
const useGlobalStore = create<GlobalInitType>(() => {
  return {
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
})

export default useGlobalStore
