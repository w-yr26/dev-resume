import { singleNode } from '@/types/ui'
import { CommandRegistry, deleteCommand, dropCommand } from './commandRegistry'

// 注册命令
export const register = new CommandRegistry()

// 删除
register.register(
  'delete',
  (
    prevKey: string,
    nodeKey: string,
    currentUISchema: singleNode,
    delNode: (prevKey: string, nodeKey: string) => void,
    insertNode: (nodeKey: string, targetKey: string, schema: singleNode) => void
  ) => {
    return new deleteCommand(
      prevKey,
      nodeKey,
      currentUISchema,
      delNode,
      insertNode
    )
  }
)

// 新增
register.register(
  'drop',
  (
    nodeKey: string,
    targetKey: string,
    desUISchema: singleNode,
    // currentUISchema: singleNode,
    delNode: (prevKey: string, nodeKey: string) => void,
    insertNode: (nodeKey: string, targetKey: string, desUISchema: any) => void
  ) => {
    return new dropCommand(nodeKey, targetKey, desUISchema, delNode, insertNode)
  }
)
