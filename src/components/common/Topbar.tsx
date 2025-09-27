"use client";

import React, { useState } from "react";
import { Search, Bell, User, ChevronDown } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import NotificationDropdown from "./NotificationDropdown";
import { useRouter } from "next/navigation";

const TopBar: React.FC = () => {
    const { user, notifications, logout } = useAppContext();
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const unreadCount = notifications.filter((n) => !n.read).length;
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.replace("/"); // redirect to home
    };

    return (
        <div className="fixed top-0 right-0 left-64 h-16 bg-white border-b border-gray-200 z-10">
            <div className="flex items-center justify-between h-full px-6">
                {/* Search */}
                <div className="flex items-center gap-4 flex-1 max-w-md relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search teams, meetings, files..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200"
                    />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    {/* Notifications */}
                    <div className="relative">
                        <button
                            onClick={() =>
                                setShowNotifications(!showNotifications)
                            }
                            className="relative p-2 rounded-lg transition-all duration-200 hover:scale-105 hover:bg-gray-100">
                            <Bell className="w-5 h-5 text-gray-600" />
                            {unreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                                    {unreadCount}
                                </span>
                            )}
                        </button>

                        {showNotifications && (
                            <NotificationDropdown
                                onClose={() => setShowNotifications(false)}
                            />
                        )}
                    </div>

                    {/* Profile */}
                    <div className="relative">
                        <button
                            onClick={() => setShowProfile(!showProfile)}
                            className="flex items-center gap-2 p-2 rounded-lg transition-all duration-200 hover:scale-105 hover:bg-gray-100">
                            {user?.avatar ? (
                                <img
                                    src={user.avatar}
                                    alt={user.name}
                                    className="w-8 h-8 rounded-full"
                                />
                            ) : (
                                <User className="w-8 h-8 p-1 rounded-full bg-gray-200 text-gray-600" />
                            )}
                            <ChevronDown className="w-4 h-4 text-gray-600" />
                        </button>

                        {showProfile && (
                            <div className="absolute right-0 top-12 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                                <div className="px-4 py-2 border-b border-gray-200">
                                    <div className="font-medium">
                                        {user?.name}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {user?.email}
                                    </div>
                                </div>
                                <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
                                    Profile Settings
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
