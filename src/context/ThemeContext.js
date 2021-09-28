import React, { useState } from "react";

const ThemeContext = React.createContext({});

export function ThemeContextProvider({ children }) {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );

}

export default ThemeContext;
