import { mainAppAdapter } from "@/infra"
import { customAPIError } from "@/utils"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"

export const useMutationSendQuestion = (
  sendTo: string,
  content: string,
  isAnonymous: boolean
) => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  const { mutateAsync, ...rest } = useMutation({
    onError: (error) => {
      const { message } = customAPIError(error)
      toast.error(message)
    },
    onSuccess: () => {
      toast.success(t("screens.newQuestion.toast"))

      queryClient.invalidateQueries({
        queryKey: ["feedQuestions-sent"],
        exact: true,
      })
    },
    mutationFn: async () => {
      return mainAppAdapter.post("/questions/send", {
        content,
        sendTo,
        isAnonymous,
      })
    },
  })

  const handleSend = async () => {
    await mutateAsync()
  }

  return { handleSend, ...rest }
}
