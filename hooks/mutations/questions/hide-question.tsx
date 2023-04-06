import { mainAppAdapter } from "@/infra"
import { customAPIError } from "@/utils"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useMutationHideQuestion = (questionId: string) => {
  const queryClient = useQueryClient()

  const { mutateAsync, ...rest } = useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["feedQuestions-all"],
        exact: true,
      })
    },
    mutationFn: async () => {
      return mainAppAdapter.patch(`/questions/hide/${questionId}`)
    },
  })

  const handleHideQuestion = async () => {
    toast.promise(mutateAsync(), {
      loading: "Ocultando...",
      success: (data) => {
        if (data?.ok === false) {
          throw new Error(data?.message)
        }

        return "Pergunta ocultada"
      },
      error(error) {
        return customAPIError(error)?.message ?? "Erro ao ocultar pergunta"
      },
    })
  }

  return { handleHideQuestion, ...rest }
}
