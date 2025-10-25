import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './GlobalStyle';
import { useTheme } from './hooks/useTheme';
import { lightTheme, darkTheme } from './themes';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import AllProjects from './pages/AllProjects';
import AboutMe from './pages/AboutMe';

const AppContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 2rem;
  padding-top: 6rem;

  display: flex;
  flex-direction: column;
  flex-grow: 1; 

  @media (max-width: 768px) {
    padding: 0 1rem;
    padding-top: 6rem;
  }
`;

const MainContent = styled.main`
  flex-grow: 1; 
`;

function App() {
  const { theme, toggleTheme } = useTheme();
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyle />
      <Navbar toggleTheme={toggleTheme} currentTheme={theme} />

      <AppContainer>
        <MainContent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<AllProjects />} />
            <Route path="/about-me" element={<AboutMe />} />
          </Routes>
        </MainContent>

        <Footer />
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;