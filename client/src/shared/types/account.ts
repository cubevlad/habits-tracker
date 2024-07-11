export type AccountMeta = {
  id: string
  createdAt: string
  email: string
  name: string
  role: 'Admin' | 'User'
}

export type SignInRequestBody = {
  name: string
  password: string
}

export type SignUpRequestBody = {
  name: string
  email: string
  password: string
}

export type Token = {
  accessToken: string
  refreshToken: string
}
