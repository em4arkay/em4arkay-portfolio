// src/hooks/useTheme.ts
import { useState, useEffect } from 'react';

export const useTheme = () => {
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');

    useEffect(() => {
        const localTheme = window.localStorage.getItem('theme') as 'dark' | 'light';
        if (localTheme) {
            setTheme(localTheme);
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        window.localStorage.setItem('theme', newTheme);
    };

    return { theme, toggleTheme };
};