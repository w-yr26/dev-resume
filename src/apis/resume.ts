import { request } from '@/utils'
import type {
  addModuleType,
  addTemplateType,
  resumeDetailType,
  resumeListResp,
} from '@/types/resume'
import { keyType } from '@/types/dev'
import { temDataType } from '@/types/ui'

/**
 * 获取简历分页数据
 * @param page 页数
 * @param pageSize 每页数量
 * @param userId 用户id
 */
export const getResumePageAPI = (
  page: number,
  pageSize: number,
  userId: string
) => {
  return request<resumeListResp>(
    `/resume/resume/page?page=${page}&pageSize=${pageSize}&userId=${userId}`
  )
}

/**
 * 创建简历
 * @param randomId 前端随机id
 * @param userId 用户id
 * @param title 简历标题
 * @param slug 简历备注信息
 * @param template_id 模板id，默认为1
 *
 */
export const postResumeCreateAPI = (data: {
  randomId: string
  userId: string
  title: string
  slug: string
  template_id: string
}) => {
  return request<null>('/resume/resume/create', 'POST', data)
}

/**
 * 删除简历
 * @param randomId 简历的随机id
 */
export const delResumeAPI = (randomId: string) => {
  return request<null>(`/resume/resume/delete/${randomId}`, 'DELETE')
}

/**
 * 获取简历详情
 * @param randomId 简历随机id
 */
export const getResumeDetailsAPI = (randomId: string) => {
  return request<resumeDetailType>(`/resume/resume/details/${randomId}`)
}

/**
 * 新增/更新某个模块的信息
 * @param data
 * @returns
 */
export const postModuleInfoAPI = (data: addModuleType) => {
  return request<any>('/resume/resume/module', 'POST', data)
}

/**
 * 删除某个模块(WORK_EXP、PROJECT_EXP、AWARD_LIST、EDU_BG)单条消息记录
 * @param id 单条消息的ID
 * @param resumeId 简历id
 * @param type 模块类型
 */
export const delModuleSingleInfoAPI = (
  id: string,
  resumeId: string,
  type: keyType
) => {
  return request<null>(
    `/resume/resume/delete/module?id=${id}&resumeId=${resumeId}&type=${type}`,
    'DELETE'
  )
}

/**
 * 保存用户自定义模板
 * @param fastPhoto 快照链接
 * @param name 模板名称
 * @param styleConfig uiJsonSchema
 * @param userId 用户ID
 * @returns
 */
export const postSaveTemplateAPI = (data: addTemplateType) => {
  return request<any>('/resume/templates/saveTemplate', 'POST', data)
}

/**
 * 获取所有模板列表
 */
export const getTemplatesAPI = (userId: string) => {
  return request<temDataType>(`/resume/templates/getAll/${userId}`)
}
