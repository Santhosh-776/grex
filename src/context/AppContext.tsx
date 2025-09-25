"use client";

import { createContext, useEffect, useState, useContext } from "react";
import { useAppTheme } from "@/hooks/useAppTheme";

interface AppContextProps {
    theme: string;
    setTheme: (theme: string) => void;
    isMounted: boolean;
    isDark: boolean;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return <AppContextWrapper>{children}</AppContextWrapper>;
};

const AppContextWrapper = ({ children }: { children: React.ReactNode }) => {
    const { theme, setTheme, isDark } = useAppTheme();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <AppContext.Provider value={{ theme, setTheme, isMounted, isDark }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
};
