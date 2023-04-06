import { Locale, formatDistanceToNow } from "date-fns"
import { enUS, es, ptBR } from "date-fns/locale"

type Locales = "pt-BR" | "en-US" | "es-ES"

const locales: Record<Locales, Locale> = {
  "pt-BR": ptBR,
  "en-US": enUS,
  "es-ES": es,
}

export const formatRelativeDate = (date: Date, locale: string) => {
  return formatDistanceToNow(date, {
    addSuffix: true,
    locale: locales[locale as Locales] ?? ptBR,
  })
}

type Translation = {
  hourAgo: string
  justNow: string
  minutesAgo: string
  minuteAgo: string
  yesterday: string
  daysAgo: string
  hoursAgo: string
  weeksAgo: string
}

const translations: Record<Locales, Translation> = {
  "en-US": {
    justNow: "just now",
    daysAgo: "days",
    hoursAgo: "h",
    hourAgo: "1h",
    minutesAgo: "mins",
    minuteAgo: "1min",
    yesterday: "Yesterday",
    weeksAgo: "weeks",
  },
  "pt-BR": {
    justNow: "agora",
    daysAgo: "dias",
    hoursAgo: "h",
    hourAgo: "1h",
    minutesAgo: "mins",
    minuteAgo: "1min",
    yesterday: "Ontem",
    weeksAgo: "semanas",
  },
  "es-ES": {
    justNow: "ahora mismo",
    daysAgo: "días",
    hoursAgo: "h",
    hourAgo: "1h",
    minutesAgo: "mins",
    minuteAgo: "1min",
    yesterday: "Ayer",
    weeksAgo: "semanas",
  },
}

// special thanks to https://johnresig.com/blog/javascript-pretty-date/
export const prettyDate = (time: string, locale: string) => {
  var date = new Date((time || "").replace(/-/g, "/").replace(/[TZ]/g, " ")),
    diff = (new Date().getTime() - date.getTime()) / 1000,
    day_diff = Math.floor(diff / 86400)

  if (isNaN(day_diff) || day_diff < 0 || day_diff >= 31) {
    return
  }

  const {
    justNow,
    minuteAgo,
    minutesAgo,
    hourAgo,
    hoursAgo,
    yesterday,
    daysAgo,
    weeksAgo,
  } = translations[locale] || translations["en-US"]

  return (
    (day_diff == 0 &&
      ((diff < 60 && justNow) ||
        (diff < 120 && minuteAgo) ||
        (diff < 3600 && Math.floor(diff / 60) + minutesAgo) ||
        (diff < 7200 && hourAgo) ||
        (diff < 86400 && Math.floor(diff / 3600) + hoursAgo))) ||
    (day_diff == 1 && yesterday) ||
    (day_diff < 7 && day_diff + ` ${daysAgo}`) ||
    (day_diff < 31 && Math.ceil(day_diff / 7) + ` ${weeksAgo}`)
  )
}
