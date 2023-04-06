import { mainAppAdapter } from "@/infra"
import { customAPIError } from "@/utils"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useMutationDeleteQuestion = (questionId: string) => {
  const queryClient = useQueryClient()

  const { mutateAsync, ...rest } = useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["feedQuestions-sent"],
        exact: true,
      })
    },
    mutationFn: async () => {
      return mainAppAdapter.delete(`/questions/delete/${questionId}`)
    },
  })

  const handleDelete = async () => {
    toast.promise(mutateAsync(), {
      loading: "Excluindo...",
      success: (data) => {
        if (data?.ok === false) {
          throw new Error(data?.message)
        }

        return "Pergunta excluída"
      },
      error(error) {
        return customAPIError(error)?.message ?? "Erro ao excluir pergunta "
      },
    })
  }

  return { handleDelete, ...rest }
}
