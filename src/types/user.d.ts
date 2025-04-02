export type infoType = {
  token: string
  user_name: string
  email: string
}

export type userStoreType = {
  info: infoType
  updateInfo: (key: keyof infoType, value: string) => void
}

export type loginInfoType = {
  email: string
  password: string
}
