import { create } from 'zustand'
import type { GlobalInitType } from '@/types/global'
import BaseInfoTem from '@/templates/BaseInfoTem'
import ProjectTem from '@/templates/ProjectTem'
import WorkTem from '@/templates/WorkTem/index'
import SkillTem from '@/templates/SkillTem'

const useGlobalStore = create<GlobalInitType>(() => {
  return {
    keyToComponentMap: {
      BASE_INFO: BaseInfoTem,
      EDU_BG: ProjectTem,
      WORK_EXP: WorkTem,
      // PROJECT_EXP: ProjectExperience,
      // AWARD_LIST: Award,
      SKILL_LIST: SkillTem,
      // HEART_LIST: Heart,
    },
  }
})

export default useGlobalStore
