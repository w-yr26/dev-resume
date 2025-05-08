import { request } from '@/utils'
import type { resumeListResp } from '@/types/resume'

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
