"use client";

import React, { useState } from "react";
import CreateTeamModal from "./CreateTeamModal";
import TeamListSidebar from "./TeamList";
import { useTeamStore } from "@/store/useTeamStore";

const TeamsUI = () => {
    const teams = useTeamStore((state) => state.teams);
    const [selectedTeam, setSelectedTeam] = useState(teams[0] || null);

    return (
        <div className="mx-auto ml-64 pt-16 p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Teams
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Manage your teams and collaborate effectively
                    </p>
                </div>

                <CreateTeamModal />
            </div>

            <div className="">
                <TeamListSidebar
                    teams={teams}
                    selectedTeam={selectedTeam}
                    onSelectTeam={setSelectedTeam}
                />
            </div>
        </div>
    );
};

export default TeamsUI;
