import styled from 'styled-components';
import { FaGithub, FaDiscord, FaLinkedin } from 'react-icons/fa';

const FooterContainer = styled.footer`
    padding: 2rem 0;
    display: flex;
    flex-direction: column; 
    gap: 2rem;
`;

const FooterTop = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap; 
    gap: 2rem;
    border-top: 2px solid ${(props) => props.theme.borderColor};
    padding-top: 2rem;
`;

const Left = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
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

const Subtitle = styled.p`
    color: var(--text-primary);
    margin: 0;
`;

const Right = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    @media (max-width: 768px) {
        align-items: center;
    }
`;

const MediaTitle = styled.h4`
    font-size: 1.2rem;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
`;

const SocialIcons = styled.div`
    display: flex;
    gap: 1.5rem;

    a {
        color: var(--text-secondary);
        font-size: 1.5rem;
        transition: color 0.3s ease;
    }

    a:hover {
        color: var(--accent);
    }
`;

const FooterBottom = styled.div`
    text-align: center;
    color: var(--text-secondary);
    font-size: 0.9rem;
`;


const Footer = () => {
    return (
        <FooterContainer>
            <FooterTop>
                <Left>
                    <Logo href="/"><span>#</span>AAA124</Logo>
                    <Subtitle>Software Engineer - natchanondanual@gmail.com</Subtitle>
                </Left>
                <Right>
                    <MediaTitle>Media</MediaTitle>
                    <SocialIcons>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                            <FaGithub />
                        </a>
                        <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
                            <FaDiscord />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin />
                        </a>
                    </SocialIcons>
                </Right>
            </FooterTop>
            <FooterBottom>
                <p>© Copyright 2022. Made by eM4aRKay</p>
            </FooterBottom>
        </FooterContainer>
    );
};

export default Footer;