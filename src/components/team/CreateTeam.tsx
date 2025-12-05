"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUserStore } from "@/store/useUserStore";

type Props = { onSuccess?: () => void };

const CreateTeam: React.FC<Props> = ({ onSuccess }) => {
    const user = useUserStore((state) => state.user);
    const [team, setTeam] = useState({
        name: "",
        description: "",
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    if (!user) {
        return (
            <div className="text-gray-600">Please log in to create a team.</div>
        );
    }

    const handleCreateTeam = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        try {
            const teamPayload = {
                name: team.name,
                description: team.description,
                createdBy: user.id,
            };

            console.log("Creating team with payload:", teamPayload);

            const response = await axios.post("/api/teams/new", teamPayload, {
                withCredentials: true,
            });

            setMessage("✅ Team created successfully!");
            setTeam({ name: "", description: "" });

            if (onSuccess) onSuccess();
        } catch (error) {
            console.error("Team creation error:", error);
            setMessage("❌ Failed to create team.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleCreateTeam}
            className="space-y-4 mt-4">
            <input
                type="text"
                placeholder="Team Name"
                value={team.name}
                onChange={(e) => setTeam({ ...team, name: e.target.value })}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />
            <textarea
                placeholder="Description"
                value={team.description}
                onChange={(e) =>
                    setTeam({ ...team, description: e.target.value })
                }
                rows={3}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                required
            />
            <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 rounded-lg text-white font-medium transition ${
                    loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                }`}>
                {loading ? "Creating..." : "Create Team"}
            </button>

            {message && (
                <p
                    className={`text-sm text-center ${
                        message.startsWith("✅")
                            ? "text-green-600"
                            : "text-red-600"
                    }`}>
                    {message}
                </p>
            )}
        </form>
    );
};

export default CreateTeam;
