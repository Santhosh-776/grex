"use client";

import { Users } from "lucide-react";
import { Team } from "@/types";
import { useTeamStore } from "@/store/useTeamStore";
import { useUserStore } from "@/store/useUserStore";
import axios from "axios";
import { useEffect } from "react";
import Link from "next/link";

interface TeamListSidebarProps {
    teams: Team[];
    selectedTeam: Team | null;
    onSelectTeam: (team: Team) => void;
}

const TeamListSidebar: React.FC<TeamListSidebarProps> = ({
    teams,
    selectedTeam,
    onSelectTeam,
}) => {
    const setTeams = useTeamStore((state) => state.setTeams);
    const user = useUserStore((state) => state.user);

    useEffect(() => {
        if (!user?.id) return;
        const loadTeams = async () => {
            const teamsData = await axios.get("/api/teams", {
                params: { userId: user.id },
                withCredentials: true,
            });

            setTeams(teamsData.data.data);
        };
        loadTeams();
    }, []);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Your Teams
            </h2>
            <div className="space-y-3">
                {teams.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 text-sm text-center py-4">
                        No teams yet
                    </p>
                ) : (
                    teams.map((team) => (
                        <Link
                            key={team?.id}
                            href={`/teams/${team?.id}`}>
                            <div
                                key={team?.id}
                                onClick={() => onSelectTeam(team)}
                                className={`w-full text-left p-3 rounded-lg transition-colors ${
                                    selectedTeam?.id === team?.id
                                        ? "bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300"
                                        : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                                }`}>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Users className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h3 className="font-medium truncate">
                                            {team?.name}
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {team?.members?.length || 0} members
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default TeamListSidebar;
