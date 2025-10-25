// src/themes.ts

export const darkTheme = {
    bgPrimary: '#0D1117',
    bgCard: '#161B22',
    textPrimary: '#E6EDF3',
    textSecondary: '#8D96A0',
    borderColor: '#30363D',
    accent: '#A78BFA',
    logo: '#D4C76A' // D4C76A
};

export const lightTheme = {
    bgPrimary: '#FFFFFF',
    bgCard: '#F6F8FA',
    textPrimary: '#24292F',
    textSecondary: '#57606A',
    borderColor: '#D0D7DE',
    accent: '#8A63D2', 
    logo: '#AAA124'
};

export type Theme = typeof darkTheme;