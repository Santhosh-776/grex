import { useAppContext } from "@/context/AppContext";

export const useAppTheme = () => {
    const { theme, setTheme, isMounted, isDark } = useAppContext();

    const toggleTheme = () => {
        setTheme(isDark ? "light" : "dark");
    };

    return {
        theme,
        isMounted,
        isDark,
        isLight: !isDark,
        toggleTheme,
        setTheme,
    };
};
