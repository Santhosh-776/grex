"use client";

import { useContext, createContext, useState, useEffect } from "react";
import { User } from "@/types/index";
import { LoginData, UserData } from "@/types/auth";
import axios from "axios";
import { AppContextType, Notification } from "@/types";

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const checkUser = async () => {
        setIsLoading(true);
        setError(null);
        try {
            console.log("Checking user");
            const response = await axios.get("/api/auth/user", {
                withCredentials: true,
            });
            setUser(response.data.user || null);
        } catch (err: any) {
            if (err.response?.status === 401) {
                setUser(null);
                setError(null);
            } else {
                console.error("Auth check failed:", err);
                setError(err.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (credentials: LoginData) => {
        setIsLoading(true);
        setError(null);
        try {
            console.log("Attempting login with credentials:");
            const response = await axios.post("/api/auth/login", credentials, {
                withCredentials: true,
            });
            if (response) {
                console.log("Login successful:", response);
                setUser(response.data.user);
                return true;
            }
            console.log("Login response:", response);
            return false;
        } catch (err: any) {
            console.error("Login failed:", err);
            setError(err.message);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);
        setError(null);
        try {
            await axios.post("/api/auth/logout", {}, { withCredentials: true });
            setUser(null);
        } catch (err: any) {
            console.error("Logout failed:", err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };
    const notifications: Notification[] = [
        {
            id: "1",
            type: "MEETING_REMINDER",
            content: "Weekly Standup in 10 minutes",
            createdAt: "2024-12-20T09:50:00Z",
            isRead: false,
            teamId: "team-1",
        },
    ];
    useEffect(() => {
        checkUser();
    }, []);

    const value: AppContextType = {
        user,
        isLoading,
        isAuthenticated: !!user,
        error,
        notifications,
        login,
        logout,
        checkUser,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
    const context = useContext(AppContext);
    if (!context)
        throw new Error("useAppContext must be used within an AppProvider");
    return context;
};
