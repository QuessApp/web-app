import { Question } from "@/@types";
import { create } from "zustand";

interface Slice {
  question: Question | null;
  isReplyModalOpen: boolean;
  setQuestion: (questions: Question) => void;
  setIsReplyModalOpen: (value: boolean) => void;
}

const initialStates: Omit<Slice, "setQuestion" | "setIsReplyModalOpen"> = {
  question: null,
  isReplyModalOpen: false,
};

export const questionStore = create<Slice>((set, get) => ({
  ...initialStates,
  setQuestion: question => {
    set({ question });
  },
  setIsReplyModalOpen: value => [set({ isReplyModalOpen: value })],
}));
