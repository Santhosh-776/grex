"use client";

import { createContext, useEffect, useState, useContext } from "react";
import { ThemeProvider, useTheme } from "next-themes";

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
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem={true}
            disableTransitionOnChange={false}>
            <AppContextWrapper>{children}</AppContextWrapper>
        </ThemeProvider>
    );
};

const AppContextWrapper = ({ children }: { children: React.ReactNode }) => {
    const { theme, setTheme } = useTheme();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const value: AppContextProps = {
        theme: isMounted ? theme ?? "system" : "system",
        setTheme,
        isMounted,
        isDark: isMounted ? theme === "dark" : false,
    };
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
};
