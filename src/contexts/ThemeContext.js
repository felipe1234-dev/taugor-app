import { useState, useEffect, createContext } from "react";

const ThemeContext = createContext(["light"]);

function ThemeProvider({ children }) {
	const [theme, setTheme] = useState("light");
    
	useEffect(() => document.body.setAttribute("theme", theme), [theme]);
    
    return (
        <ThemeContext.Provider value={[theme, setTheme]}>
            {children}
        </ThemeContext.Provider>
    );
}

export { ThemeContext, ThemeProvider };