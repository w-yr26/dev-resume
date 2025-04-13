import { create } from 'zustand'
import type { GlobalInitType } from '@/types/global'
import BaseInfoTem from '@/templates/BaseInfoTem'
import ProjectTem from '@/templates/ProjectTem'
import WorkTem from '@/templates/WorkTem/index'
import SkillTem from '@/templates/SkillTem'
import EduBgTem from '@/templates/EduBgTem'
import HeartTem from '@/templates/HeartTem'
import AwardTem from '@/templates/AwardTem'
import { produce } from 'immer'

const useGlobalStore = create<GlobalInitType>((set) => {
  return {
    keyToComponentMap: {
      BASE_INFO: BaseInfoTem,
      EDU_BG: EduBgTem,
      WORK_EXP: WorkTem,
      PROJECT_EXP: ProjectTem,
      AWARD_LIST: AwardTem,
      SKILL_LIST: SkillTem,
      HEART_LIST: HeartTem,
    },
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
