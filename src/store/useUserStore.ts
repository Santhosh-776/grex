import { create } from "zustand";
import { UserData } from "@/types/auth";

interface UserStore {
    user: UserData | null;
    setUser: (user: UserData | null) => void;
    clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
}));
