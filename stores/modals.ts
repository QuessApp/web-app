import { create } from "zustand"

interface ModalBlockOwnerQuestionData {
  questionOwnerId: string
  questionId: string
  isLoading: boolean
}

interface ModalHideQuestionData {
  questionId: string
}

type ModalDeleteQuestionData = ModalHideQuestionData

interface Slice {
  isModalBlockOwnerQuestionOpen: boolean
  isModalHideQuestionOpen: boolean
  isModalDeleteQuestionOpen: boolean
  modalBlockOwnerQuestionData: ModalBlockOwnerQuestionData | null
  modalHideQuestionData: ModalHideQuestionData | null
  modalDeleteQuestionData: ModalDeleteQuestionData | null
  setModalHideQuestionData: (data: ModalHideQuestionData) => void
  setIsModalHideQuestionOpen: (isOpen: boolean) => void
  setIsModalBlockOwnerQuestionOpen: (isOpen: boolean) => void
  setIsModalDeleteQuestionOpen: (isOpen: boolean) => void
  setModalDeleteQuestionData: (data: ModalDeleteQuestionData) => void
  setModalBlockOwnerQuestionData: (data: ModalBlockOwnerQuestionData) => void
}

const initialStates: Omit<
  Slice,
  | "setIsModalHideQuestionOpen"
  | "setIsModalBlockOwnerQuestionOpen"
  | "setIsModalDeleteQuestionOpen"
  | "setModalBlockOwnerQuestionData"
  | "setModalHideQuestionData"
  | "setModalDeleteQuestionData"
> = {
  isModalDeleteQuestionOpen: false,
  isModalHideQuestionOpen: false,
  isModalBlockOwnerQuestionOpen: false,
  modalBlockOwnerQuestionData: null,
  modalHideQuestionData: null,
  modalDeleteQuestionData: null,
}

export const modalsStore = create<Slice>((set, get) => ({
  ...initialStates,
  setIsModalHideQuestionOpen(isOpen) {
    set({ isModalHideQuestionOpen: isOpen })
  },
  setIsModalBlockOwnerQuestionOpen(isOpen) {
    set({ isModalBlockOwnerQuestionOpen: isOpen })
  },
  setIsModalDeleteQuestionOpen(isOpen) {
    set({ isModalDeleteQuestionOpen: isOpen })
  },
  setModalBlockOwnerQuestionData(data) {
    set({ modalBlockOwnerQuestionData: data })
  },
  setModalHideQuestionData(data) {
    set({ modalHideQuestionData: data })
  },
  setModalDeleteQuestionData(data) {
    set({ modalDeleteQuestionData: data })
  },
}))
