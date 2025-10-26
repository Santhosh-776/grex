"use client";

import React from "react";
import { Plus } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import CreateTeamModal from "./CreateTeamModal"; // your CreateTeam component can be used here

const TeamsUI = () => {
    return (
        <div>
            <section className="flex justify-between items-center">
                <div>
                    <p className="text-3xl font-bold">Teams</p>
                    <p className="text-sm text-gray-600">
                        Manage your teams and collaborate effectively.
                    </p>
                </div>
                <div>
                    <CreateTeamModal />
                </div>
            </section>

            <section className="mt-8 flex gap-6">
                {/* Team List Component */}
                <div className="border border-dashed border-gray-300 rounded-lg h-64 flex items-center justify-center text-gray-400 w-2/5 bg-white">
                    Team List Component Placeholder
                </div>
                <div className="w-3/5 space-y-6">
                    <div className="border border-dashed border-gray-300  h-64 flex items-center justify-center text-gray-400 bg-white p-4 rounded-lg shadow">
                        Team List Component Placeholder
                    </div>
                    <div>
                        {/* Team Details Component */}
                        <div className="border border-dashed border-gray-300  h-64 flex items-center justify-center text-gray-400 bg-white p-4 rounded-lg shadow">
                            Team Details Component Placeholder
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TeamsUI;
