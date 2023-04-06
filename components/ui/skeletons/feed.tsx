interface SkeletonProps {
  rows?: number
}

export const FeedSkeleton = ({ rows = 1 }: SkeletonProps) => {
  return (
    <>
      {Array.from(Array(rows).keys()).map((_, i) => (
        <div
          key={i}
          role="status"
          className="mx-auto my-4 w-full max-w-[650px] animate-pulse"
        >
          <div className="h-36 w-full rounded-md bg-slate-200 dark:bg-gray-700"></div>
          <span className="sr-only">Loading...</span>
        </div>
      ))}
    </>
  )
}
