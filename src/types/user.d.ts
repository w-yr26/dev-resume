export type infoType = {
  token: string
  user_name: string
  email: string
  id: string
}

export type userStoreType = {
  info: infoType
  updateInfo: (key: keyof infoType, value: string) => void
}

export type loginInfoType = {
  email: string
  password: string
}

export type LoginResponse = {
  id: number
  email: string
  username: string
}

export type ResetPasswordValues = {
  email: string
  verificationCode: string
  newPassword: string
}
