"use client";

import TeamChat from "@/components/team/TeamChat";
import TeamDetails from "@/components/team/TeamDetails";
import { useTeamStore } from "@/store/useTeamStore";
import { use, useState } from "react";

const TeamDetailsPage = ({
    params,
}: {
    params: Promise<{ teamId: string }>;
}) => {
    const { teamId } = use(params);
    const teams = useTeamStore((state) => state.teams);
    const team = teams.find((t) => t.id === teamId);
    const [startChat, setStartChat] = useState(false);

    if (!team) {
        return <div>Team not found</div>;
    }

    return (
        <div className="ml-64 pt-16 p-6 flex gap-6">
            <div className="flex-1">
                <TeamDetails
                    team={team}
                    viewChat={startChat}
                    OnViewChat={setStartChat}
                />
            </div>
            <div
                className={`
          relative overflow-hidden
          transition-all duration-600 ease-in-out
          ${
              startChat
                  ? "flex-[0.75] opacity-100 translate-x-0 "
                  : "flex-[0] opacity-0 -translate-x-4 pointer-events-none"
          }
        `}>
                <div className="h-full">
                    <TeamChat team={team} />
                </div>
            </div>
        </div>
    );
};

export default TeamDetailsPage;
