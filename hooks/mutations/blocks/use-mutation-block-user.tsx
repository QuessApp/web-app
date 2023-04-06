import { useMutationHideQuestion } from "@/hooks"
import { mainAppAdapter } from "@/infra"
import { customAPIError } from "@/utils"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useMutationBlockUser = (userId: string, questionId: string) => {
  const queryClient = useQueryClient()
  const { handleHideQuestion } = useMutationHideQuestion(questionId)

  const { mutateAsync, ...rest } = useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user", userId],
        exact: true,
      })
    },
    mutationFn: async () => {
      return Promise.all([
        handleHideQuestion(),
        mainAppAdapter.post(`/users/block/${userId}`),
      ])
    },
  })

  const handleBlock = async () => {
    toast.promise(mutateAsync(), {
      loading: "Bloqueando...",
      success: (data) => {
        if (data?.ok === false) {
          throw new Error(data?.message)
        }

        return "Usuário bloqueado"
      },
      error(error) {
        return customAPIError(error)?.message ?? "Erro ao bloquear usuário"
      },
    })
  }

  return { handleBlock, ...rest }
}
