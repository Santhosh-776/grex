"use client";

import { Users } from "lucide-react";
import { useTeamStore } from "@/store/useTeamStore";
import { useUserStore } from "@/store/useUserStore";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

const TeamList: React.FC = () => {
    const setTeams = useTeamStore((state) => state.setTeams);
    const user = useUserStore((state) => state.user);
    const teams = useTeamStore((state) => state.teams);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        if (!user?.id) return;
        const loadTeams = async () => {
            const teamsData = await axios.get("/api/teams", {
                params: { userId: user.id },
                withCredentials: true,
            });
            console.log("Fetched teams:", teamsData.data.data);
            setTeams(teamsData.data.data);
        };
        loadTeams();
    }, [user?.id, setTeams]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (teams.length === 0) return;

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setSelectedIndex((prev) =>
                    prev < teams.length - 1 ? prev + 1 : prev
                );
                break;
            case "ArrowUp":
                e.preventDefault();
                setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
                break;
            case "Enter":
                e.preventDefault();
                const selectedTeam = teams[selectedIndex];
                if (selectedTeam) {
                    router.push(`/teams/${selectedTeam.id}`);
                }
                break;
        }
    };

    return (
        <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
            tabIndex={0}
            onKeyDown={handleKeyDown}>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Your Teams
            </h2>
            <div className="space-y-3">
                {teams.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 text-sm text-center py-4">
                        No teams yet
                    </p>
                ) : (
                    teams.map((team, index) => {
                        const isActive = pathname === `/teams/${team?.id}`;
                        const isSelected = selectedIndex === index;

                        return (
                            <Link
                                key={team?.id}
                                href={`/teams/${team?.id}`}
                                onClick={() => setSelectedIndex(index)}
                                className={`block w-full p-3 rounded-lg transition-colors ${
                                    isActive || isSelected
                                        ? "bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300"
                                        : "hover:bg-gray-100 dark:hover:bg-secondary text-secondary dark:text-gray-300"
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
                            </Link>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default TeamList;
