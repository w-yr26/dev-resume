/**
 * MarkdownNode: {
 *  type: xxx,
 *  value: xxx,
 *  children: [MarkdownNode, MarkdownNode]
 * }
 */
import { v4 as uuidv4 } from 'uuid'
import { ASTNode } from '../ast'

interface ASTVisitor {
  visit(node: ASTNode): string | null
}

class HTMLRender implements ASTVisitor {
  visit(node: ASTNode): string | null {
    // 在执行转换的时候，为每一个元素生成一个随机id，主要是为了后续的评论、修改模版等功能
    switch (node.type) {
      case 'header1':
        return `<h1 data-node-key=${uuidv4()}>${node.value}</h1>`
      case 'header2':
        return `<h2 data-node-key=${uuidv4()}>${node.value}</h2>`
      case 'header3':
        return `<h3 data-node-key=${uuidv4()}>${node.value}</h3>`
      case 'header4':
        return `<h4 data-node-key=${uuidv4()}>${node.value}</h4>`
      case 'paragraph':
        // TODO: 返回的htmlStr过滤掉空行，后续渲染简历内容是才不会有空标签
        // if (!node.value) return null
        return `<span data-node-key=${uuidv4()}>${node.value}</span>`
      case 'unordered-list':
        return `<ul data-node-key=${uuidv4()}>${node.children
          .map((child) => this.visit(child))
          .join('')}</ul>`
      case 'ordered-list':
        return `<ol data-node-key=${uuidv4()}>${node.children
          .map((child) => this.visit(child))
          .join('')}</ol>`
      case 'unordered-list-item':
      case 'ordered-list-item':
        return `<li data-node-key=${uuidv4()}>${node.value}</li>`
      // 对 ast 树进行递归转换
      default:
        return node.children.map((child) => this.visit(child)).join('')
    }
  }
}

export const renderAST = (astNode: ASTNode) => {
  const renderer = new HTMLRender()
  const toHtmlDOM = () => {
    return renderer.visit(astNode)
  }

  const htmlStr = toHtmlDOM()

  return htmlStr
}
