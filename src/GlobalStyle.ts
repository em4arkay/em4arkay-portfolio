import { createGlobalStyle } from 'styled-components';
import FiraCodeFont from './assets/fonts/FiraCodeNerdFontMono-Regular.ttf';

export const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'FiraCode Nerd Font Mono'; 
        src: url(${FiraCodeFont}) format('trueType'); 
        font-weight: normal;
        font-style: normal;
    }
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    #root {
        // display: flex;
        // flex-direction: column;
        flex-grow: 1; 
    }

    html {
        height: 100%;
        scroll-behavior: smooth;
    }

    body {
        font-family: 'FiraCode Nerd Font Mono', monospace;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        
        background-color: ${(props) => props.theme.bgPrimary};
        color: ${(props) => props.theme.textPrimary};
        transition: background-color 0.3s ease, color 0.3s ease;
        min-height: 100%;

        display: flex;
        flex-direction: column;
    }

    input,
    button,
    textarea,
    select {
        font-family: inherit;
    }

    section {
        padding: 4rem 0;
        margin-top: 2rem;
    }

    h1, h2, h3, h4, h5, h6 {
        color: ${(props) => props.theme.textPrimary};
        margin-bottom: 1rem;
    }

    h2 {
        font-size: 2rem;
        margin-bottom: 2rem;
    }

    p {
        color: ${(props) => props.theme.textSecondary};
        line-height: 1.6;
        margin-bottom: 1rem;
    }

    a {
        text-decoration: none;
        color: ${(props) => props.theme.accent};
        transition: color 0.3s ease;
    }

    a:hover {
        color: ${(props) => props.theme.textPrimary};
    }
`;