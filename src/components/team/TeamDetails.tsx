"use client";

import React, { useState } from "react";
import {
    Settings,
    Upload,
    Calendar,
    MessageCircle,
    PlusSquare,
    Share2,
} from "lucide-react";
import { Team } from "@/types";
import ShareLinkModal from "./ShareLinkModal";
import axios from "axios";

interface TeamDetailsProps {
    team: Team;
    viewChat: boolean;
    OnViewChat: (chat: boolean) => void;
}

const TeamDetails: React.FC<TeamDetailsProps> = ({
    team,
    viewChat,
    OnViewChat,
}) => {
    const [showRoleModal, setShowRoleModal] = useState(false);
    const [inviteUrl, setInviteUrl] = useState<string | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const teamId = team.id;

    const generateInviteLink = async () => {
        try {
            const response = await axios.post(
                `/api/teams/${teamId}/invite/create`
            );

            if (response.data.success) {
                console.log("Invite Link:", response.data);
                setInviteUrl(response.data.data);
            } else {
                console.error(response.data.data);
            }
        } catch (error) {
            console.error("Error generating link:", error);
        }
    };
    const handleShareClick = () => {
        generateInviteLink();
        setDialogOpen(!dialogOpen);
    };
    return (
        <>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {team.name}
                        </h2>
                        {team.description && (
                            <p className="text-gray-600 dark:text-gray-400">
                                {team.description}
                            </p>
                        )}
                    </div>
                    <div className="flex space-x-4">
                        <button
                            onClick={handleShareClick}
                            className="px-4 py-2 text-secondary rounded-lg hover:bg-secondary-dark flex items-center space-x-2 cursor-pointer">
                            <Share2 />
                            <span>Share Invite Link</span>
                        </button>

                        <button className="text-secondary flex gap-2 items-center border border-secondary/50 px-3 py-1 rounded-lg hover:bg-secondary/20 transition-colors cursor-pointer">
                            <PlusSquare />
                            Add Members
                        </button>
                        <button
                            onClick={() => setShowRoleModal(true)}
                            className="p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                            <Settings className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        </button>
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                        Team Members ({team.members?.length || 0})
                    </h3>
                    <div className="space-y-2">
                        {team.members && team.members.length > 0 ? (
                            team.members.map((member) => (
                                <div
                                    key={member.id}
                                    className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        {member.user?.profileImage ? (
                                            <img
                                                src={member.user?.profileImage}
                                                alt={member.user.name}
                                                className="w-10 h-10 rounded-full"
                                            />
                                        ) : (
                                            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                                                {member.user?.name
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </div>
                                        )}
                                        <div>
                                            <h4 className="font-medium text-gray-900 dark:text-white">
                                                {member.user.name}
                                            </h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {member.user.email}
                                            </p>
                                        </div>
                                    </div>
                                    <span
                                        className={`text-xs px-2 py-1 rounded-full ${
                                            member.user.role === "admin"
                                                ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                                                : member.user.role === "member"
                                                ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                                                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                                        }`}>
                                        {member.role}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 dark:text-gray-400 text-sm text-center py-4">
                                No members yet
                            </p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                        className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 
                    rounded-lg hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors cursor-pointer">
                        <Upload className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        <span className="text-blue-600 dark:text-blue-400 font-medium">
                            Upload File
                        </span>
                    </button>

                    <button
                        className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg 
                    hover:border-green-400 dark:hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors cursor-pointer">
                        <Calendar className="w-5 h-5 text-green-600 dark:text-green-400" />
                        <span className="text-green-600 dark:text-green-400 font-medium">
                            Schedule Meeting
                        </span>
                    </button>

                    <button
                        className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg
                         hover:border-purple-400 dark:hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors cursor-pointer"
                        onClick={() => OnViewChat(!viewChat)}>
                        <MessageCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        <span className="text-purple-600 dark:text-purple-400 font-medium">
                            {!viewChat ? <p>Start Chat</p> : <p>Close Chat</p>}
                        </span>
                    </button>
                </div>
            </div>

            {/* Role Management Modal */}
            {showRoleModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Manage Team Roles
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            Update member roles and permissions for {team.name}.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowRoleModal(false)}
                                className="px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                Cancel
                            </button>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {dialogOpen && (
                <ShareLinkModal
                    content={inviteUrl}
                    dialogOpen={dialogOpen}
                    setDialogOpen={setDialogOpen}
                />
            )}
        </>
    );
};

export default TeamDetails;
