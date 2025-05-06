import { Token } from '../tokens/index'

// ASTNode 类
export class ASTNode {
  type: string = ''
  children: ASTNode[] = []
  value?: string = ''

  constructor(type: string, value?: string) {
    this.type = type
    this.value = value
    this.children = []
  }

  addChild(node: ASTNode) {
    this.children.push(node)
  }

  // 递归打印 AST
  print(depth: number = 0): void {
    console.log('  '.repeat(depth) + `${this.type}: ${this.value}`)
    this.children.forEach((child) => child.print(depth + 1))
  }
}

// MarkDownNode 类 -> 此处看似与ASTNode无差，但可用于后续扩展(比如标题锚点ID、文本缩进等)
class MarkdownNode extends ASTNode {
  constructor(type: string, value?: string) {
    super(type, value)
  }
}

// ASTNode工厂类
class ASTNodeFactory {
  static createNode(type: string, value?: string) {
    return new MarkdownNode(type, value)
  }
}

interface NodeHandler {
  handle(token: Token): ASTNode
}

class HeaderNodeHandler implements NodeHandler {
  handle(token: Token): MarkdownNode {
    return new MarkdownNode(token.type, token.value)
  }
}

class ParagraphNodeHandler implements NodeHandler {
  handle(token: Token): MarkdownNode {
    return new MarkdownNode(token.type, token.value)
  }
}

// 创建处理器注册表
class NodeHandlerRegistry {
  handlers: Map<string, NodeHandler> = new Map()

  registerHandler(type: string, handler: NodeHandler): void {
    this.handlers.set(type, handler)
  }

  getHandler(type: string): NodeHandler | undefined {
    return this.handlers.get(type)
  }
}

// 注册对应的事件
const nodeHandlerRegistry = new NodeHandlerRegistry()
nodeHandlerRegistry.registerHandler('header1', new HeaderNodeHandler())
nodeHandlerRegistry.registerHandler('header2', new HeaderNodeHandler())
nodeHandlerRegistry.registerHandler('header3', new HeaderNodeHandler())
nodeHandlerRegistry.registerHandler('header4', new HeaderNodeHandler())
nodeHandlerRegistry.registerHandler('paragraph', new ParagraphNodeHandler())

// 构建 AST
export const buildAST = (tokens: Token[]): ASTNode => {
  const root = ASTNodeFactory.createNode('root')
  const currentNode = root

  tokens.forEach((token) => {
    const handler = nodeHandlerRegistry.getHandler(token.type)
    if (handler) {
      const newNode = handler.handle(token)
      currentNode.addChild(newNode)
    } else {
      const textHandler = nodeHandlerRegistry.getHandler('paragraph')!
      const textNode = textHandler.handle(token)
      if (textNode) currentNode.addChild(textNode)
    }
  })

  return root
}
