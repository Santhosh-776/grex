"use client";

import { use, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";
import { toast } from "sonner";

const AcceptPage = ({
    params,
}: {
    params: Promise<{ teamId: string; token: string }>;
}) => {
    const { token, teamId } = use(params);
    const router = useRouter();
    const user = useUserStore((state) => state.user);

    const userId = user?.id;

    const handleShareClick = async () => {
        try {
            const response = await axios.post(
                `/api/teams/${teamId}/invite/accept`,
                { token, userId }
            );
            const data = response.data;
            console.log(data);
            if (data.data.success) {
                toast.success(
                    response.data.data.message || "Successfully joined the team"
                );
                router.replace(`${process.env.NEXT_PUBLIC_BASE_URL}/teams`);
            }
        } catch (error) {
            console.error("Error joining the team:", error);
        }
    };
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 max-w-md w-full text-center">
                <h1 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                    Join Team
                </h1>
                <p className="text-secondary dark:text-gray-300 mb-6">
                    Click the button below to accept the invitation and join the
                    team.
                </p>
                <button
                    onClick={handleShareClick}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                    Accept Invitation
                </button>
            </div>
        </div>
    );
};

export default AcceptPage;
