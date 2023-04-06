import { useEffect, useRef } from "react"

import { useFeedQuestions, useFeedStore } from "@/hooks"
import { useVirtualizer } from "@tanstack/react-virtual"

export const useFeed = () => {
  const { filter, handleChangeFilter, sort } = useFeedStore()

  const {
    data,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isLoading,
    error,
    ...rest
  } = useFeedQuestions(filter, sort)

  const allRows = data ? data.pages.flatMap((d) => d?.questions || []) : []

  const parentRef = useRef(null)

  const virtualizer = useVirtualizer({
    count: hasNextPage ? allRows.length + 1 : allRows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 30,
    overscan: 5,
  })

  const items = virtualizer.getVirtualItems()

  useEffect(() => {
    const [lastItem] = [...items].reverse()

    if (!lastItem) {
      return
    }

    if (
      lastItem.index >= allRows.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage()
    }
  }, [
    hasNextPage,
    fetchNextPage,
    allRows.length,
    isFetchingNextPage,
    JSON.stringify(items),
  ])

  const hasFeedItemsToList = !isLoading && allRows.filter(Boolean).length > 0

  return {
    filter,
    virtualizer,
    handleChangeFilter,
    questions: items,
    allRows,
    parentRef,
    hasFeedItemsToList,
    isLoading,
    error,
    ...rest,
  }
}
