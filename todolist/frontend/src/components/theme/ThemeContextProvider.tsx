import { createTheme, Theme } from "@mui/material";
import React, { createContext, FC, PropsWithChildren, useContext } from "react";
import { useColorTheme } from "./use-color-theme";


interface ThemeContentType {
    mode: string,
    toggleColorMode: () => void;
    theme: Theme,
}

export const ThemeContext = createContext<ThemeContentType>({
    mode: "light",
    toggleColorMode: () => {},
    theme: createTheme(),
})

export const ThemeContextProvider: FC<PropsWithChildren> = ({children}) => {
    const value = useColorTheme();
    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useThemeContext = () => {
    return useContext(ThemeContext);
}