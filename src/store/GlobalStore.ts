import { create } from 'zustand'
import type { GlobalInitType } from '@/types/global'
import BaseInfoTem from '@/templates/BaseInfoTem'
import ProjectTem from '@/templates/ProjectTem'
import WorkTem from '@/templates/WorkTem/index'
import SkillTem from '@/templates/SkillTem'
import EduBgTem from '@/templates/EduBgTem'
import HeartTem from '@/templates/HeartTem'
const useGlobalStore = create<GlobalInitType>(() => {
  return {
    keyToComponentMap: {
      BASE_INFO: BaseInfoTem,
      EDU_BG: EduBgTem,
      WORK_EXP: WorkTem,
      PROJECT_EXP: ProjectTem,
      // AWARD_LIST: Award,
      SKILL_LIST: SkillTem,
      HEART_LIST: HeartTem,
    },
  }
})

export default useGlobalStore
