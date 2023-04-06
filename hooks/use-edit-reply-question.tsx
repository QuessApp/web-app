import { Question } from "@/@types"
import { useQuestionStore } from "@/hooks"
import { mainAppAdapter } from "@/infra"
import { queryClient } from "@/lib"
import { customAPIError } from "@/utils"
import { toast } from "sonner"

import { useMutation } from "@tanstack/react-query"

export const useEditReplyQuestion = (
  question: Question | null,
  replyContent: string
) => {
  const { setQuestion, setIsReplyModalOpen } = useQuestionStore()

  const { mutateAsync, ...rest } = useMutation({
    onError: (error) => {
      const { message } = customAPIError(error)
      toast.error(message)
    },
    onSuccess: () => {
      toast.success("Sua resposta foi enviada!")
      queryClient.invalidateQueries({
        queryKey: [`feedQuestions-all`],
      })

      setQuestion({
        ...question!,
        content: replyContent,

        reply: replyContent,
        repliedAt: new Date().toString(),
      })
    },
    onSettled: () => {
      setIsReplyModalOpen(false)
    },
    mutationFn: async () => {
      return mainAppAdapter.post(`/questions/reply/${question?.id}`, {
        content: replyContent,
      })
    },
  })

  const handleReply = async () => {
    await mutateAsync()
  }

  return { handleReply, ...rest }
}
