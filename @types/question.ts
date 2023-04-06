import { User } from "./user"

export interface Question {
  id: string
  content: string
  isAnonymous: boolean
  sentBy: User
  repliedAt: string
  createdAt: string
  isReplied: boolean
  reply: string | null
}
