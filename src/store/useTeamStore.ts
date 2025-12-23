import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Team } from "@/types";

interface TeamsStore {
    teams: Team[];
    setTeams: (teams: Team[]) => void;
    addTeam: (team: Team) => void;
    removeMember: (teamId: string, memberId: string) => void;
}

export const useTeamStore = create<TeamsStore>()(
    persist(
        (set) => ({
            teams: [],
            setTeams: (teams) => set({ teams }),
            addTeam: (team) =>
                set((state) => ({ teams: [...state.teams, team] })),
            removeMember: (teamId: string, memberId: string) =>
                set((state) => ({
                    teams: state.teams.map((team) =>
                        team.id === teamId
                            ? {
                                  ...team,
                                  members: team.members.filter(
                                      (m) => m.id !== memberId
                                  ),
                              }
                            : team
                    ),
                })),
        }),
        {
            name: "grex-teams",
        }
    )
);
