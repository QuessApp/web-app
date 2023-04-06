import { Question } from "@/@types"
import { mainAppAdapter } from "@/infra"
import { Filters } from "@/stores"
import { customAPIError } from "@/utils"
import {
  InfiniteData,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query"
import { toast } from "sonner"

interface Response {
  questions: Question[]
  totalCount: number
}

const handler = async (
  filter: Filters,
  sort: string,
  page: number = 1
): Promise<Response> =>
  (
    await mainAppAdapter.get(
      `/questions?page=${page}&filter=${filter}&sort=${sort}`
    )
  )?.data?.data

export const useFeedQuestions = (filter: Filters = "all", sort = "desc") => {
  const cachedData: InfiniteData<Response> | undefined =
    useQueryClient().getQueryData([`feedQuestions-${filter}`])

  const { data, ...rest } = useInfiniteQuery(
    [`feedQuestions-${filter}`],
    async ({ pageParam }) => {
      return handler(filter, sort, pageParam)
    },
    {
      onError: (error) => {
        const { message } = customAPIError(error)
        toast.error(message)
      },
      enabled: !!filter,
      getNextPageParam: (lastPage, allPages) => {
        if ((lastPage?.totalCount || 0) < 30) {
          return
        }
        const nextPage = allPages.length + 1
        return nextPage
      },
    }
  )

  return { data: data || cachedData, ...rest }
}
