import React from "react"

import { BsArrowDownShort, Spinner } from "@/components"
import { usePullToRefresh } from "@/hooks"
import ReactSimplePullToRefresh from "react-simple-pull-to-refresh"

interface PullToRefreshProps {
  children: React.ReactNode
  onRefresh: () => Promise<any>
}

export const PullToRefresh = ({ children, onRefresh }: PullToRefreshProps) => {
  const { handlePullToRefresh } = usePullToRefresh(onRefresh)

  return (
    <ReactSimplePullToRefresh
      refreshingContent={
        <div className="mt-6 flex items-center justify-center">
          <Spinner />
        </div>
      }
      pullDownThreshold={50}
      maxPullDownDistance={70}
      pullingContent={
        <div className="mt-6 flex animate-bounce items-center justify-center">
          <BsArrowDownShort size={30} />
        </div>
      }
      onRefresh={handlePullToRefresh}
    >
      <>{children}</>
    </ReactSimplePullToRefresh>
  )
}
