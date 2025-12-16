"use client";

import React, { useState, useEffect } from "react";
import { User, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useUserStore } from "@/store/useUserStore";

const Header: React.FC = () => {
    const [loading, setLoading] = useState(true);

    const router = useRouter();
    const setUser = useUserStore((state) => state.setUser);
    const user = useUserStore((state) => state.user);
    const clearUser = useUserStore((state) => state.clearUser);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const response = await axios.get("/api/auth/user", {
                    withCredentials: true,
                });
                setUser(response.data.user);
            } catch (err) {
                console.log("No logged in user", err);
                clearUser();
            } finally {
                setLoading(false);
            }
        };
        checkUser();
    }, []);
    return (
        <header className="py-4 px-60  bg-gray-50 shadow-sm w-full flex justify-between items-center text-2xl">
            <div className="flex items-center space-x-4">
                <span className="bg-primary inline-block p-1 rounded-lg">
                    <Users className="w-5 h-5 text-white" />
                </span>
                <span
                    className="font-bold cursor-pointer"
                    onClick={() => router.push("/")}>
                    Grex
                </span>
            </div>
            <div className="flex space-x-2 items-center text-base font-bold">
                {loading ? null : !user ? (
                    <button
                        onClick={() => {
                            router.push("/login");
                        }}
                        className="bg-blue-600 text-amber-50 py-2 px-4 rounded-md cursor-pointer hover:bg-blue-700 transition-all duration-200">
                        Login
                    </button>
                ) : (
                    <span
                        className="text-primary font-medium flex items-center
                        bg-secondary/20 rounded-full p-2
                        cursor-pointer hover:bg-secondary/40 transition-all duration-200">
                        <User className="inline-block " />
                        <span className="ml-2">Welcome {user.name}!</span>
                    </span>
                )}
            </div>
        </header>
    );
};

export default Header;
