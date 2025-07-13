import { create } from 'zustand'
import type {
  devInitType,
  devState,
  InfoArrTypeMap,
  keyType,
} from '@/types/dev'
import { produce } from 'immer'
import { devtools } from 'zustand/middleware'

export const defaultInfoMap: Record<string, any> = {
  BASE_INFO: {
    info: [],
    visible: true,
    label: '基础信息',
  },
  EDU_BG: {
    info: [],
    visible: true,
    label: '教育背景',
  },
  WORK_EXP: {
    info: [],
    visible: true,
    label: '工作/实习经历',
  },
  PROJECT_EXP: {
    info: [],
    visible: true,
    label: '项目经历',
  },
  AWARD_LIST: {
    info: [],
    visible: true,
    label: '荣誉奖项',
  },
  SKILL_LIST: {
    info: [],
    visible: true,
    label: '技能特长',
  },
  HEART_LIST: {
    info: [],
    visible: true,
    label: '兴趣爱好',
  },
}

const initialData: devInitType = {
  dataSource: {
    BASE_INFO: {
      info: [],
      visible: true,
    },
    EDU_BG: {
      info: [],
      visible: true,
      label: '教育背景',
    },
    WORK_EXP: {
      info: [],
      visible: true,
      label: '工作/实习经历',
    },
    PROJECT_EXP: {
      info: [],
      visible: true,
      label: '项目经历',
    },
    AWARD_LIST: {
      info: [],
      visible: true,
      label: '荣誉奖项',
    },
    SKILL_LIST: {
      info: [],
      visible: true,
      label: '技能特长',
    },
    HEART_LIST: {
      info: [],
      visible: true,
      label: '兴趣爱好',
    },
  },
}

const useDevStore = create<devState>()(
  devtools(
    (set) => {
      return {
        devSchema: initialData,
        resumeId: '',
        templateId: '',
        setDataSource: (dataSource) => {
          return set((state) => {
            return {
              devSchema: {
                ...state.devSchema,
                dataSource,
              },
            }
          })
        },
        setResumeId: (id) => {
          return set(() => {
            return {
              resumeId: id,
            }
          })
        },
        setTemplateId: (id) => {
          return set(() => {
            return {
              templateId: id,
            }
          })
        },
        immerBaseInfo: (newVal: string, key: string) =>
          set(
            produce((state: devState) => {
              state.devSchema.dataSource.BASE_INFO.info = [
                {
                  ...state.devSchema.dataSource.BASE_INFO.info[0],
                  [key]: newVal,
                },
              ]
              // {
              //   ...state.devSchema.dataSource.BASE_INFO.info,
              //   [key]: newVal,
              // }
            })
          ),
        // 此处就包含了md编辑器部分的修改(“技能特长”、“兴趣爱好”的info字段)
        immerRichInfo: (newVal, primaryKey) =>
          set(
            produce((state: devState) => {
              if (primaryKey === 'HEART_LIST') {
                if (state.devSchema.dataSource.HEART_LIST.info.length === 0) {
                  state.devSchema.dataSource.HEART_LIST.info.push({
                    id: '-1',
                    interest: newVal,
                    visible: true,
                  })
                  // console.log(
                  //   'wyr==',
                  //   state.devSchema.dataSource.HEART_LIST.info
                  // )
                } else {
                  state.devSchema.dataSource.HEART_LIST.info[0].interest =
                    newVal
                }
              } else if (primaryKey === 'SKILL_LIST') {
                if (state.devSchema.dataSource.SKILL_LIST.info.length === 0) {
                  state.devSchema.dataSource.SKILL_LIST.info.push({
                    content: newVal,
                    id: '-1',
                    visible: true,
                    aiContent: '',
                    aiDescription: '',
                  })
                } else {
                  state.devSchema.dataSource.SKILL_LIST.info[0].content = newVal
                }
              }
            })
          ),
        immerVisible: <T extends keyof InfoArrTypeMap>(id: string, key: T) =>
          set(
            produce((state: devState) => {
              const infoList = state.devSchema.dataSource[key]
                .info as InfoArrTypeMap[T][]
              const newInfoList = infoList.map((item) => {
                if (item.id !== id) return item
                return {
                  ...item,
                  visible: !item.visible,
                }
              })

              ;(state.devSchema.dataSource[key].info as InfoArrTypeMap[T][]) =
                newInfoList
            })
          ),
        immerDel: <T extends keyof InfoArrTypeMap>(id: string, key: T) =>
          set(
            produce((state: devState) => {
              const infoList = state.devSchema.dataSource[key]
                .info as InfoArrTypeMap[T][]
              const newInfoList = infoList.filter((item) => item.id !== id)
              ;(state.devSchema.dataSource[key].info as InfoArrTypeMap[T][]) =
                newInfoList
            })
          ),
        addInfoList: (data: any, key: keyType) =>
          set(
            produce((state: devState) => {
              state.devSchema.dataSource[key].info = [
                ...state.devSchema.dataSource[key].info,
                data,
              ]
            })
          ),
        updateInfo: (data: any, id: string, key: keyType) =>
          set(
            produce((state: devState) => {
              state.devSchema.dataSource[key].info = state.devSchema.dataSource[
                key
              ].info.map((item) => {
                if (item.id === id) {
                  return { ...data }
                } else return item
              })
            })
          ),
        changeItemVisible: (key) =>
          set(
            produce((state: devState) => {
              state.devSchema.dataSource[key].visible =
                !state.devSchema.dataSource[key].visible
            })
          ),
        resetInfo: (key) =>
          set(
            produce((state: devState) => {
              state.devSchema.dataSource[key] = {
                ...state.devSchema.dataSource[key],
                info: defaultInfoMap[key].info,
                visible: true,
              }
            })
          ),
        resetGlobalInfo: () =>
          set(
            produce((state: devState) => {
              state.devSchema.dataSource = { ...(defaultInfoMap as any) }
            })
          ),
        changeLabel: (key, value) =>
          set(
            produce((state: devState) => {
              state.devSchema.dataSource[key].label = value
            })
          ),
      }
    },
    {
      name: 'devStore',
    }
  )
)

export default useDevStore
