import { User } from "@/@types"

export interface SignIn {
  data: {
    user: User
    accessToken: string
    refreshToken: string
  }
}

export interface RefreshToken {
  data: {
    accessToken: string
    refreshToken: string
    expiresAt: string
  }
}
export interface AuthenticatedUser extends SignIn {}

export interface SignInPayload {
  nick: string
  password: string
}
