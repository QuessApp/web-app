import { User } from "@/@types";
import { create } from "zustand";

interface Slice {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  setIsLoggedIn: (value: boolean) => void;
  setUser: (user: User | null) => void;
}

const initialStates: Omit<Slice, "setUser" | "setIsLoading" | "setIsLoggedIn"> =
  {
    isLoggedIn: false,
    user: null,
    isLoading: false,
  };

export const userStore = create<Slice>((set, get) => ({
  ...initialStates,
  setIsLoggedIn: value => {
    set({ isLoggedIn: value });
  },
  setUser: user => {
    set({ user });
  },
  setIsLoading: value => {
    set({ isLoading: value });
  },
}));
