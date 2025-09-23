"use client";

import React from "react";
import { Users, Sun, Moon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppTheme } from "@/hooks/useAppTheme";
const Header: React.FC = () => {
    const router = useRouter();
    const { isDark, isLight, toggleTheme } = useAppTheme();
    return (
        <header className="py-3 px-60  bg-gray-50 shadow-sm w-full flex justify-between items-center text-base">
            <div className="flex items-center space-x-4">
                <span className="bg-primary inline-block p-1 rounded-lg">
                    <Users className="w-5 h-5 text-white" />
                </span>
                <span className="font-bold ">Grex</span>
            </div>
            <div className="flex space-x-2 items-center">
                <span className="text-secondary cursor-pointer">
                    {isLight ? (
                        <Moon
                            className="w-10 h-4"
                            onClick={toggleTheme}
                        />
                    ) : (
                        <Sun
                            className="w-10 h-4"
                            onClick={toggleTheme}
                        />
                    )}
                </span>
                <span className="bg-blue-600 text-amber-50 p-2 rounded-md text-sm ">
                    <button
                        onClick={() => {
                            router.push("/signup");
                        }}>
                        Get Started
                    </button>
                </span>
            </div>
        </header>
    );
};

export default Header;
