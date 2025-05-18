import { Command } from './command'
import { commandHistory } from './commandHistory'

class CommandManager {
  private history = new commandHistory()

  // 执行某个命令
  executeCommand(command: Command) {
    this.history.execute(command)
  }

  // 撤销
  undo() {
    this.history.undo()
  }

  // 重做
  redo() {
    this.history.redo()
  }
}

export const commandManager = new CommandManager()
