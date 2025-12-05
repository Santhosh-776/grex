import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserData } from "@/types/auth";

interface UserStore {
    user: UserData | null;
    setUser: (user: UserData | null) => void;
    clearUser: () => void;
}

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            user: null,
            setUser: (user) => set({ user }),
            clearUser: () => set({ user: null }),
        }),
        {
            name: "grex-user",
        }
    )
);
