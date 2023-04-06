import { useCallback, useEffect, useState } from "react"

import { prettyDate } from "@/utils"

export const useTimeAgo = (compareDate: string) => {
  const getLocale = useCallback(() => {
    if (window?.localStorage) {
      return localStorage?.getItem("i18nextLng") ?? "en-US"
    }

    return "en-US"
  }, [])

  const getTimeAgoFromNow = useCallback(
    (date: string) => {
      return prettyDate(date, getLocale())
    },
    [getLocale]
  )

  const [timeAgo, setTimeAgo] = useState(() => {
    return getTimeAgoFromNow(compareDate)
  })

  useEffect(() => {
    function refreshTimeAgo() {
      setTimeAgo(getTimeAgoFromNow(compareDate))
    }

    window.addEventListener("focus", refreshTimeAgo)

    return () => {
      window.removeEventListener("focus", refreshTimeAgo)
    }
  }, [compareDate, getTimeAgoFromNow])

  return timeAgo
}
