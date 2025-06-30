import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext({
  dark: false,
  toggleDark: () => {},
});

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem('theme-dark');
    return stored ? stored === 'true' : false;
  });

  useEffect(() => {
    localStorage.setItem('theme-dark', dark);
    // Add/remove a class to <body> for global theming
    if (dark) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
    document.body.style.background = dark ? '#181818' : '#fff';
    document.body.style.color = dark ? '#fff' : '#222';
  }, [dark]);

  const toggleDark = () => setDark((d) => !d);

  return (
    <ThemeContext.Provider value={{ dark, toggleDark }}>
      {children}
    </ThemeContext.Provider>
  );
}
export default ThemeProvider;
