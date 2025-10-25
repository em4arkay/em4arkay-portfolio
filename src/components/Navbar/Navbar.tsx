import { useState } from 'react';
import styled from 'styled-components';
import TH from '../../assets/th.svg';
import EN from '../../assets/us.svg';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

const Nav = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    
    background-color: ${(props) => props.theme.bgPrimary};
    padding: 1rem 2rem;
    
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;


const NavContainer = styled.div`
    width: 100%;
    max-width: 1100px; 
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Logo = styled.a`
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--text-primary);
    text-decoration: none;

    span {
        color: ${(props) => props.theme.logo}; 
    }
`;

const Menu = styled.div``;

const MenuItems = styled.ul<{ open: boolean }>` 
    display: flex;
    list-style: none;
    gap: 2rem;
    align-items: center;

    span {
        color: ${(props) => props.theme.accent}; 
    }

    a {
        font-size: 1.1rem;
        color: ${(props) => props.theme.textPrimary};
        text-decoration: none;
        transition: color 0.3s ease;
    }

    a:hover {
        font-weight: 700;
    }

    @media (max-width: 768px) {
        display: ${(props) => (props.open ? 'flex' : 'none')};
        position: absolute;
        top: 80px;
        right: 1rem;
        flex-direction: column;
        align-items: center;
        gap: 1.5rem;
        background-color: ${(props) => props.theme.bgCard};
        border: 1px solid ${(props) => props.theme.borderColor};
        border-radius: 8px;
        padding: 2rem;
        width: 90%;
        z-index: 10;
    }
`;

const MenuButton = styled.button`
    display: none;
    background: none;
    border: none;
    color: ${(props) => props.theme.textPrimary};
    font-size: 1.5rem;
    cursor: pointer;

    @media (max-width: 768px) {
        display: block;
    }
    `;

const ToggleContainer = styled.li`
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-left: 1rem; 
    color: ${(props) => props.theme.textSecondary}; 

    @media (max-width: 768px) {
        margin-left: 0;
        margin-top: 1rem; 
    }
`;

const LanguageToggle = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 5px;

    img {
        width: 24px;
        height: 16px; 
        border-radius: 3px;
        object-fit: cover;
    }
`;

const ThemeToggle = styled.button`
    background: none;
    border: none;
    color: ${(props) => props.theme.textPrimary};
    font-size: 1.25rem;
    cursor: pointer;
    padding: 5px;
    display: flex;
    align-items: center;
`;

interface NavbarProps {
    toggleTheme: () => void;
    currentTheme: 'dark' | 'light';
}

const Navbar = ({ toggleTheme, currentTheme }: NavbarProps) => {
    const { t, i18n } = useTranslation();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleMenuClick = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).closest('a, a *')) {
            if (window.innerWidth < 768) {
                setMenuOpen(false);
            }
        }
    };

    const handleLanguageToggle = () => {
        const newLang = i18n.language === 'en' ? 'th' : 'en';
        i18n.changeLanguage(newLang);

        if (window.innerWidth < 768) {
            setMenuOpen(false);
        }
    };

    return (
        <Nav>
            <NavContainer>
                <Logo href="/"><span>#</span>AAA124</Logo>
                <Menu>
                    <MenuButton onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <CloseRoundedIcon /> : <MenuRoundedIcon />}
                    </MenuButton>
                    <MenuItems open={menuOpen} onClick={handleMenuClick}>
                        <li>
                            <Link to="/projects">
                                <span>#</span>{t('nav.projects')}
                            </Link>
                        </li>
                        <li>
                            <Link to="/about-me">
                                <span>#</span>{t('nav.about')}
                            </Link>
                        </li>
                        <li>
                            <HashLink smooth to="/#skills">
                                <span>#</span>{t('nav.skills')}
                            </HashLink>
                        </li>
                        <li>
                            <HashLink smooth to="/#contacts">
                                <span>#</span>{t('nav.contacts')}
                            </HashLink>
                        </li>

                        <ToggleContainer>
                            <ThemeToggle onClick={toggleTheme}>
                                {currentTheme === 'light' ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />}
                            </ThemeToggle>
                            |
                            <LanguageToggle onClick={handleLanguageToggle}>
                                {i18n.language === 'th'
                                    ? <img src={TH} alt="Switch to Thai" />
                                    : <img src={EN} alt="Switch to English" />
                                }
                            </LanguageToggle>
                        </ToggleContainer>

                    </MenuItems>
                </Menu>
            </NavContainer>
        </Nav>
    );
};

export default Navbar;