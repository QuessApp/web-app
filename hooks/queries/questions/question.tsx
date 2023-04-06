import { Question } from "@/@types"
import { mainAppAdapter } from "@/infra"
import { useQuery } from "@tanstack/react-query"

interface Response {
  question: Question
}

const handler = async (id: string): Promise<Response> =>
  (await mainAppAdapter.get(`/question/${id}`))?.data?.data

export const useQuestion = (id: string) => {
  return useQuery([id], async () => await handler(id), { enabled: !!id })
}
