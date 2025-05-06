/**
 * md 编辑器思路：
 * 1. string -> token
 * 2. token -> ast
 * 3. ast -> render
 */

class Token {
  constructor(public type: string, public value: string) {}
}

interface TokenizationStrategy {
  matches(line: string): boolean
  tokenize(line: string): Token
}

// 1～4级标题
class HeaderStrategy implements TokenizationStrategy {
  private regex = /^(#{1,4})\s+(.*)$/

  matches(line: string): boolean {
    return this.regex.test(line)
  }

  tokenize(line: string): Token {
    const match = line.match(this.regex)!
    return new Token(`header${match[1].length}`, match[2])
  }
}
// 无序列表
class ListStrategy implements TokenizationStrategy {
  private regex = /^([*\-+])\s+(.*)$/

  matches(line: string): boolean {
    return this.regex.test(line)
  }

  tokenize(line: string): Token {
    const match = line.match(this.regex)!
    return new Token('unordered-list-item', match[2])
  }
}
// 有序列表
class OrderedListStrategy implements TokenizationStrategy {
  private regex = /^(\s*)(\d+)\.\s+(.*)$/ // 匹配 "1. item" 格式

  matches(line: string): boolean {
    return this.regex.test(line)
  }

  tokenize(line: string): Token {
    const match = line.match(this.regex)!
    return new Token('ordered-list-item', match[3]) // 返回 ordered-list-item 类型
  }
}

class Tokenizer {
  strategies: TokenizationStrategy[] = []

  addStrategy(strategy: TokenizationStrategy) {
    this.strategies.push(strategy)
  }

  tokenize(markdown: string): Token[] {
    const tokens: Token[] = []
    const lines = markdown.split('\n')
    lines.forEach((line) => {
      let matched = false
      for (const val of this.strategies) {
        if (val.matches(line)) {
          tokens.push(val.tokenize(line))
          matched = true
          break
        }
      }

      if (!matched) {
        tokens.push(new Token('paragraph', line))
      }
    })
    return tokens
  }
}

const tokenizer = new Tokenizer()

// 为md语法添加解析策略
tokenizer.addStrategy(new HeaderStrategy())
tokenizer.addStrategy(new ListStrategy())
tokenizer.addStrategy(new OrderedListStrategy())

export { tokenizer, Token }
