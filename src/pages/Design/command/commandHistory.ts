import { message } from 'antd'
import { Command } from './command'

export class commandHistory {
  private undoStack: Command[] = []
  private redoStack: Command[] = []

  // 执行某个命令，清空 redoStack[]
  execute(command: Command) {
    command.execute()
    this.undoStack.push(command)
    this.redoStack = []
  }

  undo() {
    const command = this.undoStack.pop()
    if (command) {
      command.undo()
      this.redoStack.push(command)
    } else {
      message.warning('当前不可撤销')
    }
  }

  redo() {
    const command = this.redoStack.pop()
    if (command) {
      command.execute()
      this.undoStack.push(command)
    } else {
      message.warning('当前不可重做')
    }
  }
}
