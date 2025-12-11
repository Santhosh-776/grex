import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Team } from "@/types";

interface TeamsStore {
    teams: Team[];
    setTeams: (teams: Team[]) => void;
    addTeam: (team: Team) => void;
}

export const useTeamStore = create<TeamsStore>()(
    persist(
        (set) => ({
            teams: [],
            setTeams: (teams) => set({ teams }),
            addTeam: (team) =>
                set((state) => ({ teams: [...state.teams, team] })),
        }),
        {
            name: "grex-teams",
        }
    )
);
