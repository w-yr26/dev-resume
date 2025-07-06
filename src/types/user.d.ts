export type infoType = {
  token: string
  refreshToken: string
  userName: string
  email: string
  id: string
}

export type userStoreType = {
  info: infoType
  lastRoute: string
  updateInfo: (key: keyof infoType, value: string) => void
  setLastRoute: (route: string) => void
}

export type loginInfoType = {
  email: string
  password: string
}

export type LoginResponse = {
  id: number
  email: string
  username: string
  token: string
  refreshToken: string
}

export type ResetPasswordValues = {
  email: string
  verificationCode: string
  newPassword: string
}

export type refreshLoginResp = {
  token: string
  refreshToken: string
}
