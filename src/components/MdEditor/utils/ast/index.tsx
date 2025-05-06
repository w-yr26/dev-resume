import { Token } from '../tokens/index'

// 替换行内的md格式
const replaceInlineMd = (lineStr: string | undefined) => {
  if (!lineStr) return lineStr
  const regex = {
    blod: /\*\*([^*]+)\*\*/g, // 粗体
    italic: /\*([^*]+)\*/g, // 斜体
    inlineCode: /`([^`]+)`/g, // 行内代码
  }

  lineStr = lineStr.replace(regex.inlineCode, `<code>$1</code>`)
  lineStr = lineStr.replace(regex.blod, `<strong>$1</strong>`)
  lineStr = lineStr.replace(regex.italic, `<em>$1</em>`)
  return lineStr
}

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
// 在此处做行内md语法格式的替换
class MarkdownNode extends ASTNode {
  constructor(type: string, value?: string) {
    super(type, replaceInlineMd(value))
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
// 1～4级标题处理器
class HeaderNodeHandler implements NodeHandler {
  handle(token: Token): MarkdownNode {
    return new MarkdownNode(token.type, token.value)
  }
}
// 文本处理器
class ParagraphNodeHandler implements NodeHandler {
  handle(token: Token): MarkdownNode {
    return new MarkdownNode(token.type, token.value)
  }
}
// li 列表处理器
class ListNodeHandler implements NodeHandler {
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
nodeHandlerRegistry.registerHandler(
  'unordered-list-item',
  new ListNodeHandler()
)
nodeHandlerRegistry.registerHandler('ordered-list-item', new ListNodeHandler())

// 构建 AST
export const buildAST = (tokens: Token[]): ASTNode => {
  const root = ASTNodeFactory.createNode('root')
  const currentNode = root
  // 包裹 li 列表
  let currentList: ASTNode | null = null

  tokens.forEach((token) => {
    const handler = nodeHandlerRegistry.getHandler(token.type)
    // TODO: 这里需要处理 token.type = '' 的情况，此时是换行，应该是重置所有的列表样式，否则会走 paragraph 的逻辑，最终生成一个空的 span
    // 没有匹配到，统一按文本处理
    if (!handler) {
      const textHandler = nodeHandlerRegistry.getHandler('paragraph')!
      const textNode = textHandler.handle(token)
      if (textNode) currentNode.addChild(textNode)
      return
    }

    const newNode = handler.handle(token)

    if (
      token.type === 'unordered-list-item' ||
      token.type === 'ordered-list-item'
    ) {
      // 此处兼容两种情况：
      // 1. 首次创建列表
      // 2. 无序列表和有序列表交替着使用，如无序列表之后下一行换成有序，此时也需要重新创建列表容器
      if (
        !currentList ||
        currentList.type !== `${token.type.split('-')[0]}-list`
      ) {
        // 如果当前没有列表，创建一个新的 list 节点，可能是无序列表，也可能是有序列表
        currentList =
          token.type === 'unordered-list-item'
            ? ASTNodeFactory.createNode('unordered-list')
            : ASTNodeFactory.createNode('ordered-list')
        currentNode.addChild(currentList)
      }
      currentList.addChild(newNode)
    } else {
      currentList = null
      currentNode.addChild(newNode)
    }
  })

  return root
}
