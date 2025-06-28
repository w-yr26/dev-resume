export type drawerMethods = {
  handleOpen: () => void
}

export type ButtonPanelPosition = {
  top: number
  left: number
}

export type sideBarType = {
  resumeId: string
  currentText: string
  selectedNodeKey: string
  setCurrentText: (text: string) => void
}

export type chatItem = {
  id: string | number
  userName: string
  date: string
  avatar: string
  chat_content: string
}
