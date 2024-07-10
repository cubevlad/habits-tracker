export type AccountMeta = {
  id: string
  email: string
  created_at: string
  name: string
}

export type SignInRequestBody = {
  email: string
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
