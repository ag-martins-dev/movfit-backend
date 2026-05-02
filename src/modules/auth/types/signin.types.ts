export type SigninInput = {
  email: string
  password: string
  confirmPassword: string
}

export type SigninOutput = {
  accessToken: string
}
