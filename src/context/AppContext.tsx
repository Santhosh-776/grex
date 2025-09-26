"use client";

import { useContext, createContext, useState, useEffect } from "react";
import { LoginData, UserData } from "@/types/auth";
import axios from "axios";

interface AppContextProps {
    user: UserData | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    error: string | null;
    login: (credentials: LoginData) => Promise<boolean>;
    logout: () => Promise<void>;
    checkUser: () => Promise<void>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const checkUser = async () => {
        setIsLoading(true);
        setError(null);
        try {
            console.log("Checking user");
            const response = await axios.get("/api/auth/user");
            if (response) console.log("User check response:", response);
            setUser(response.data.user || null);
        } catch (err: any) {
            console.error("Auth check failed:", err);
            setUser(null);
            setError(err.message);
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

    // Optional: auto-check user on mount
    useEffect(() => {
        checkUser();
    }, []);

    const value: AppContextProps = {
        user,
        isLoading,
        isAuthenticated: !!user,
        error,
        login,
        logout,
        checkUser,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextProps => {
    const context = useContext(AppContext);
    if (!context)
        throw new Error("useAppContext must be used within an AppProvider");
    return context;
};
