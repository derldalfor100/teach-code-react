import React, { useState, useEffect } from "react";
import themes from './themes';

/**
 * @typedef { { themeName: string, toggleTheme: () => void } } IThemeContextOptions
 * @type {IThemeContextOptions} ThemeContextOptions
 */
const ThemeContextOptions = {
    themeName: "dark",
    toggleTheme: () => { },
};
/**
 * @type {React.Context<IThemeContextOptions>} ThemeSelectorContext
 */
export const ThemeSelectorContext = React.createContext(ThemeContextOptions);

export const Theme = ({ children }) => {

    const [themeName, setThemeName] = useState("light");

    const [theme, setTheme] = useState(themes[themeName]);

    const domRef = React.createRef();

    const toggleTheme = () => {

        if (theme === themes.dark) {

            setTheme(themes.light);

            setThemeName("light");
        } else {

            setTheme(themes.dark);

            setThemeName("dark");
        }
    };

    const setCSSVariables = (themeObject) => {

        for (const key in themeObject) {

            domRef.current.style.setProperty(key, themeObject[key]);
        }
    };

    const setClass = () => {

        // remove old theme
        for (const themesKey in themes) {

            domRef.current.classList.remove(`${themesKey}-theme`);
        }

        // alias element with theme name
        domRef.current.classList.add(`${themeName}-theme`);
    }

    useEffect(() => {

        setCSSVariables(theme);

        setClass();
    });

    return (
        <ThemeSelectorContext.Provider value={{ toggleTheme, themeName }}>
            <div className="theme" ref={domRef}>
                {children}
            </div>
        </ThemeSelectorContext.Provider>
    );
};