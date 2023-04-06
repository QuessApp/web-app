import { create } from "zustand"

export type Filters = "all" | "sent" | "replied"

interface Slice {
  filter: Filters
  sort: "desc" | "asc"
  handleChangeFilter: (filter: Filters) => void
}

const initialStates: Omit<Slice, "setQuestions" | "handleChangeFilter"> = {
  sort: "desc",
  filter: "all",
}

export const feedStore = create<Slice>((set, get) => ({
  ...initialStates,
  handleChangeFilter: (filter) => {
    set({ filter })
  },
}))
