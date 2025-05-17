import { Command } from './command'
import { singleNode } from '@/types/ui'

type CommandConstructor = (...args: any[]) => Command

export class CommandRegistry {
  registry = new Map<string, CommandConstructor>()

  register(name: string, constructor: CommandConstructor) {
    this.registry.set(name, constructor)
  }

  create(name: string, ...args: any[]): Command {
    const ctor = this.registry.get(name)
    if (!ctor) throw new Error(`Command "${name}" not found`)
    return ctor(...args)
  }
}

// 删除命令
export class deleteCommand extends Command {
  private prevKey: string = ''
  private nodeKey: string = ''
  private prevSchema: singleNode | null
  private currentUISchema: singleNode | null
  private delNode: (prevKey: string, nodeKey: string) => void
  private setCurrentUISchema: (schema: singleNode) => void

  constructor(
    prevKey: string,
    nodeKey: string,
    currentUISchema: singleNode,
    delNode: (prevKey: string, nodeKey: string) => void,
    setCurrentUISchema: (schema: singleNode) => void
  ) {
    super()
    this.prevKey = prevKey
    this.nodeKey = nodeKey
    this.prevSchema = null
    this.currentUISchema = currentUISchema
    this.delNode = delNode
    this.setCurrentUISchema = setCurrentUISchema
  }

  execute(): void {
    if (this.currentUISchema) this.prevSchema = { ...this.currentUISchema }
    this.delNode(this.prevKey, this.nodeKey)
  }

  undo(): void {
    if (this.prevSchema) this.setCurrentUISchema(this.prevSchema)
  }
}