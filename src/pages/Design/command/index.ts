import { singleNode } from '@/types/ui'
import { CommandRegistry, deleteCommand } from './commandRegistry'

// 注册命令
export const register = new CommandRegistry()

register.register(
  'delete',
  (
    prevKey: string,
    nodeKey: string,
    currentUISchema: singleNode,
    delNode: (prevKey: string, nodeKey: string) => void,
    setCurrentUISchema: (schema: singleNode) => void
  ) => {
    return new deleteCommand(
      prevKey,
      nodeKey,
      currentUISchema,
      delNode,
      setCurrentUISchema
    )
  }
)