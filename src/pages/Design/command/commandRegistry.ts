import { findNode } from '@/store/DesignStore'
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
  private deletedNode: singleNode | null
  private currentUISchema: singleNode | null
  private delNode: (prevKey: string, nodeKey: string) => void
  private insertNode: (
    nodeKey: string,
    targetKey: string,
    schema: singleNode
  ) => void

  constructor(
    prevKey: string,
    nodeKey: string,
    currentUISchema: singleNode,
    delNode: (prevKey: string, nodeKey: string) => void,
    insertNode: (nodeKey: string, targetKey: string, schema: singleNode) => void
  ) {
    super()
    this.prevKey = prevKey
    this.nodeKey = nodeKey
    // this.prevSchema = null
    this.deletedNode = null
    this.currentUISchema = currentUISchema
    this.delNode = delNode
    this.insertNode = insertNode
  }

  execute(): void {
    if (this.currentUISchema) {
      const parent = findNode(this.prevKey, this.currentUISchema)
      if (parent && parent.children) {
        this.deletedNode =
          parent.children.find((item) => item.nodeKey === this.nodeKey) ?? null
      }
      this.delNode(this.prevKey, this.nodeKey)
    }
  }

  undo(): void {
    if (this.deletedNode) {
      this.insertNode(this.nodeKey, this.prevKey, this.deletedNode)
    }
  }
}

// 新增命令
export class dropCommand extends Command {
  private nodeKey: string
  private targetKey: string
  private desUISchema: singleNode | null
  // private currentUISchema: singleNode | null
  private delNode: (prevKey: string, nodeKey: string) => void
  private insertNode: (
    nodeKey: string,
    targetKey: string,
    desUISchema: any
  ) => void
  constructor(
    nodeKey: string,
    targetKey: string,
    desUISchema: singleNode,
    // currentUISchema: singleNode,
    delNode: (prevKey: string, nodeKey: string) => void,
    insertNode: (nodeKey: string, targetKey: string, desUISchema: any) => void
  ) {
    super()
    this.nodeKey = nodeKey
    this.targetKey = targetKey
    this.desUISchema = desUISchema
    // this.currentUISchema = currentUISchema
    this.delNode = delNode
    this.insertNode = insertNode
  }

  execute(): void {
    // if (this.currentUISchema)
    this.insertNode(this.nodeKey, this.targetKey, this.desUISchema)
  }

  undo(): void {
    this.delNode(this.targetKey, this.nodeKey)
  }
}
