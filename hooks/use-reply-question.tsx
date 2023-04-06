import { Question } from "@/@types"
import { useMutationReplyQuestion } from "@/hooks"

export const useReplyQuestion = (
  question: Question | null,
  replyContent: string
) => useMutationReplyQuestion(question, replyContent)
