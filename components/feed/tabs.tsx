import { Tabs, TabsList, TabsTrigger } from "@/components"
import { useFeedStore } from "@/hooks"
import { Filters } from "@/stores"

const options = [
  {
    value: "all",
    label: "Todas",
  },
  {
    value: "sent",
    label: "Enviadas",
  },
  {
    value: "replied",
    label: "Respondidas",
  },
]

export const FeedTabs = () => {
  const { handleChangeFilter } = useFeedStore()

  return (
    <Tabs defaultValue="all" className="mx-auto w-full max-w-[650px]">
      <TabsList className="w-full justify-between">
        {options.map((option) => (
          <TabsTrigger
            key={option.value}
            value={option.value}
            onClick={() => handleChangeFilter(option.value as Filters)}
          >
            {option.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
