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

/**
 * 删除模板
 */
export const delTemAPI = (temId: string) => {
  return request<null>(
    `/resume/templates/deleteDiyTemplates?templatesId=${temId}`,
    'DELETE'
  )
}

/**
 * 获取某一份模板的Schema信息
 */
export const getTemplateSchemaAPI = (template_id: string) => {
  return request(`/resume/templates/${template_id}`)
}

/**
 * 更新自定义模板的重命名
 */
export const putDiyTemplatesNameAPI = (data: {
  id: string
  newName: string
}) => {
  return request('/resume/templates/updateDiyTemplatesName', 'PUT', data)
}
