import { create } from "zustand"

interface IUserStore {
  isAdmin: boolean
  setIsAdmin: (value: boolean) => void
}

export const useUserStore = create<IUserStore>((set) => ({
  isAdmin: false,
  setIsAdmin: (value) => set({ isAdmin: value })
}))
