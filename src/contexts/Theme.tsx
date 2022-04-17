import React, { 
    useState, 
    useEffect, 
    createContext 
} from "react";

export type ThemeType = "light" | "dark";

export interface ThemeValue {
    theme: ThemeType,
    setTheme(theme: ThemeType): void
};

export const ThemeContext = createContext<Partial<ThemeValue>>({});

export function ThemeProvider(props: { children: React.ReactNode }) {
	const [theme, setTheme] = useState<ThemeType>("light");
    
	useEffect(() => {
        document.body.setAttribute("theme", theme);
    }, [theme]);
    
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {props.children}
        </ThemeContext.Provider>
    );
};