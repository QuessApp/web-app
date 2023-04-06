import {
  FeedEmpty,
  FeedError,
  FeedSkeleton,
  PullToRefresh,
  Question,
} from "@/components"
import { useFeed, useIsomorphicLayoutEffect } from "@/hooks"
import { cn } from "@/lib"

export const Feed = () => {
  const {
    questions,
    parentRef,
    hasFeedItemsToList,
    virtualizer,
    allRows,
    isLoading,
    refetch,
    error,
  } = useFeed()

  useIsomorphicLayoutEffect(() => {
    document.body.style.overflow = "hidden"
  }, [])

  if (isLoading) {
    return <FeedSkeleton rows={8} />
  }

  return (
    <PullToRefresh onRefresh={refetch}>
      <div
        ref={parentRef}
        className={cn("hidden-scroll mt-1.5 w-[650px] overflow-auto pt-4")}
        style={{
          // 100% screen      - tabs - gap     - bottom navigation
          height: "calc(100vh - 34px - 0.75rem - 43px)",
          contain: "strict",
        }}
      >
        <div
          className={cn("relative w-full", `h-[${virtualizer.getTotalSize()}]`)}
        >
          <div
            style={{
              transform: `translateY(${questions?.[0]?.start}px)`,
            }}
            className={cn(
              "absolute left-0 top-0 flex w-[650px] flex-col items-center gap-4"
            )}
          >
            {hasFeedItemsToList &&
              questions.map((virtualRow, index) => {
                const question = allRows[virtualRow.index]
                const isLastItem = index === allRows.length - 1

                if (!question) {
                  return null
                }

                return (
                  <div
                    className={cn("w-full max-w-2xl", isLastItem ? "mb-4" : "")}
                    key={virtualRow.key}
                    data-index={virtualRow.index}
                    ref={virtualizer.measureElement}
                  >
                    <Question {...question} key={virtualRow.key} />
                  </div>
                )
              })}

            {!error && !hasFeedItemsToList && <FeedEmpty />}
            {!!error && !hasFeedItemsToList && <FeedError />}
          </div>
        </div>
      </div>
    </PullToRefresh>
  )
}
