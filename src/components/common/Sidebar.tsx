"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

import {
    Home,
    Users,
    Calendar,
    FileText,
    Sticker as Sticky,
    CheckSquare,
    LogOut,
} from "lucide-react";

import { logout } from "@/services/authServices";
import { useUserStore } from "@/store/useUserStore";

const Sidebar: React.FC = () => {
    const pathname = usePathname();
    const router = useRouter();
    const clearUser = useUserStore((state) => state.clearUser);

    const menuItems = [
        { icon: Home, label: "Dashboard", path: "/dashboard" },
        { icon: Users, label: "Teams", path: "/teams" },
        { icon: Calendar, label: "Meetings", path: "/meetings" },
        { icon: FileText, label: "Files", path: "/files" },
        { icon: Sticky, label: "Notes", path: "/notes" },
        { icon: CheckSquare, label: "Tasks", path: "/tasks" },
    ];

    const handleLogout = async () => {
        await logout();
        clearUser();
        router.replace("/");
    };

    return (
        <div
            className="fixed left-0 top-0 h-full w-64 bg-white
             z-10">
            <div className="p-6">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                    </div>
                    <span
                        className={`font-bold text-xl cursor-pointer`}
                        onClick={() => router.push("/")}>
                        Grex
                    </span>
                </div>

                <nav className="space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.path;

                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                                    isActive
                                        ? "bg-blue-600 text-white shadow-lg"
                                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                }`}>
                                <Icon className="w-5 h-5" />
                                <span className="font-medium">
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="absolute bottom-6 left-6 right-6">
                <button
                    className={`flex items-center gap-3 px-3 py-2 w-full rounded-lg transition-all duration-200 hover:scale-105 
                           text-gray-700 hover:bg-gray-100

                    `}
                    onClick={() => handleLogout()}>
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Sign Out</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
