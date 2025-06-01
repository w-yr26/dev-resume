import { request } from '@/utils'
import type {
  addModuleType,
  chatRespType,
  createLinkType,
  linkItem,
  resumeDetailType,
  resumeListResp,
  SendChatType,
  shareLinkInfoType,
  shareRespType,
  updateNameType,
} from '@/types/resume'
import { keyType } from '@/types/dev'

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
 * 更新简历名称
 */
export const putUpdateNameAPI = (data: updateNameType) => {
  return request<null>('/resume/resume/updateName', 'PUT', data)
}

/**
 * 获取简历评论
 */
export const getAllCommentAPI = (resumeId: string) => {
  return request<chatRespType[]>(
    `/resume/comment/getAllComment?randomId=${resumeId}`
  )
}

/**
 * 发送新评论
 */
export const postNewCommentAPI = (data: SendChatType) => {
  return request<null>('/resume/comment/sendNewComment', 'POST', data)
}

/**
 * 删除评论
 * @param commentMapId 节点id
 * @param isMain 是否为主评论
 * @param mainCommentId 主评论id
 * @param resumeId 简历id
 * @param subCommentId 副评论id(非必选)
 */
export const delCommentAPI = (
  commentMapId: string,
  isMain: 0 | 1,
  mainCommentId: string,
  resumeId: string,
  subCommentId: string = ''
) => {
  return request<null>(
    `/resume/comment/deleteComment?commentMapId=${commentMapId}&isMain=${isMain}&mainCommentId=${mainCommentId}&resumeId=${resumeId}&subCommentId=${subCommentId}`,
    'DELETE'
  )
}

/**
 * 生成分享链接
 */
export const postShareLinkAPI = (data: createLinkType) => {
  return request<shareRespType>('/resume/shareLink/createLink', 'POST', data)
}

/**
 * 获取分享链接列表
 */
export const getLinkListsAPI = (userId: string) => {
  return request<linkItem[]>(`/resume/shareLink/listMyLinks/${userId}`)
}

/**
 * 获取分享链接的权限信息
 */
export const getLinkInfoAPI = (shareToken: string) => {
  return request<shareLinkInfoType>(`/resume/shareLink/getLink/${shareToken}`)
}

/**
 * 启用/关闭分享链接
 */
export const postLinkStatusAPI = (data: {
  isActive: 0 | 1
  shareToken: string
}) => {
  return request('/resume/shareLink/setStatus', 'PUT', data)
}

/**
 * 删除分享链接
 */
export const delShareLink = (shareToken: string) => {
  return request<null>(`/resume/shareLink/deleteLink/${shareToken}`, 'DELETE')
}
