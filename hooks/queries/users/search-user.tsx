import { User } from "@/@types"
import { mainAppAdapter } from "@/infra"
import { customAPIError } from "@/utils"
import {
  InfiniteData,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query"
import { toast } from "sonner"

const handler = async (value: string, page: number = 1): Promise<Response> => {
  return (await mainAppAdapter.get(`/users?search=${value}&page=${page}`))?.data
    ?.data
}

interface Response {
  users: User[]
  totalCount: number
}

export const useSearchUser = (value: string) => {
  const cachedData: InfiniteData<Response> | undefined =
    useQueryClient().getQueryData([`users-${value}`])

  const { data, ...rest } = useInfiniteQuery(
    [`user-${value}`],
    async ({ pageParam }) => handler(value, pageParam),
    {
      onError: (error) => {
        const { message } = customAPIError(error)
        toast.error(message)
      },
      enabled: !!value,
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
