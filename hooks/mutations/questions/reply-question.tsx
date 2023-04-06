import { Question } from "@/@types"
import { useQuestionStore, useUserStore } from "@/hooks"
import { mainAppAdapter } from "@/infra"
import { customAPIError } from "@/utils"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"

export const useMutationReplyQuestion = (
  question: Question | null,
  replyContent: string
) => {
  const { user } = useUserStore()
  const { setQuestion, setIsReplyModalOpen } = useQuestionStore()
  const queryClient = useQueryClient()

  const { t } = useTranslation()

  const { mutateAsync, ...rest } = useMutation({
    onError: (error) => {
      const { message } = customAPIError(error)
      toast.error(message)
    },
    onSuccess: () => {
      toast.success(t("modals.reply.toast"))

      queryClient.invalidateQueries({
        queryKey: ["feedQuestions-all"],
        exact: true,
      })

      queryClient.invalidateQueries({
        queryKey: ["feedQuestions-replied"],
        exact: true,
      })

      // setQuestion({
      //   content: replyContent,
      //   isReplied: true,
      //   reply: replyContent,
      //   sentBy: user!,
      //   repliedAt: new Date().toString(),
      // })
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
