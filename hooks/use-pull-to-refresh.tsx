import { differenceInSeconds } from "date-fns"
import { useState } from "react"

export const usePullToRefresh = (callback: CallableFunction) => {
  const [lastPulledToRefresh, setLastPulledToRefresh] = useState<null | Date>(
    null
  )

  const handlePullToRefresh = async () => {
    let canRefresh = true

    if (!lastPulledToRefresh) {
      setLastPulledToRefresh(new Date())
      return
    }

    const lastPulledPassedTheTime =
      differenceInSeconds(new Date(), lastPulledToRefresh) < 5

    if (lastPulledPassedTheTime) {
      canRefresh = false
      return
    }

    setLastPulledToRefresh(null)

    if (canRefresh) {
      await callback()
    }
  }

  return { handlePullToRefresh }
}
