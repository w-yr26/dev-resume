import type { addTemplateType } from '@/types/template'
import { temDataType } from '@/types/ui'
import { request } from '@/utils'

/**
 * 获取所有模板列表
 */
export const getTemplatesAPI = (userId: string) => {
  return request<temDataType>(`/resume/templates/getAll/${userId}`)
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
  return request<null>('/resume/templates/saveTemplate', 'POST', data)
}

/**
 * 简历模板上传
 */
export const postTemplatesAPI = (data: FormData) => {
  return request<string>('/user/common/uploadTemplates', 'POST', data)
}
