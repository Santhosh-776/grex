"use client";

import React from "react";
import { Calendar, FileText, Users, CheckSquare, X } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

interface NotificationDropdownProps {
    onClose: () => void;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
    onClose,
}) => {
    const { notifications } = useAppContext();

    const getIcon = (type: string) => {
        switch (type) {
            case "meeting":
                return Calendar;
            case "file":
                return FileText;
            case "role":
                return Users;
            case "task":
                return CheckSquare;
            default:
                return Calendar;
        }
    };

    const formatTime = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="absolute right-0 top-12 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Notifications</h3>
                <button
                    onClick={onClose}
                    className="p-1 rounded-lg transition-colors hover:bg-gray-100">
                    <X className="w-4 h-4 text-gray-500" />
                </button>
            </div>

            {/* Notification List */}
            <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                        No notifications
                    </div>
                ) : (
                    notifications.map((notification) => {
                        const Icon = getIcon(notification.type);
                        return (
                            <div
                                key={notification.id}
                                className={`p-4 border-b border-gray-200 last:border-b-0 ${
                                    !notification.read ? "bg-blue-50" : ""
                                } hover:bg-gray-50 transition-colors cursor-pointer`}>
                                <div className="flex items-start gap-3">
                                    <div
                                        className={`p-2 rounded-lg ${
                                            notification.type === "meeting"
                                                ? "bg-blue-100 text-blue-600"
                                                : notification.type === "file"
                                                ? "bg-green-100 text-green-600"
                                                : notification.type === "role"
                                                ? "bg-purple-100 text-purple-600"
                                                : "bg-orange-100 text-orange-600"
                                        }`}>
                                        <Icon className="w-4 h-4" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-medium text-gray-900">
                                            {notification.title}
                                        </h4>
                                        <p className="text-sm text-gray-600 mt-1">
                                            {notification.message}
                                        </p>
                                        <span className="text-xs text-gray-500 mt-2 block">
                                            {formatTime(notification.timestamp)}
                                        </span>
                                    </div>
                                    {!notification.read && (
                                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200">
                <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 transition-colors">
                    View All Notifications
                </button>
            </div>
        </div>
    );
};

export default NotificationDropdown;
