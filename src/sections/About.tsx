import styled from 'styled-components';
import aboutImg from '../assets/me2.png';
import { Highlight } from './Hero';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AboutContainer = styled.section`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const Content = styled.div`
    flex: 1;
`;

const TitleBar = styled.div`
    display: grid;
    grid-template-columns: auto 1fr; 
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;

    @media (max-width: 768px) {
        display: flex;
        align-items: flex-start;
    }
`;

const Title = styled.h2`
    font-size: 2rem;
    margin: 0; 
    white-space: nowrap; 

    @media (max-width: 768px) {
        font-size: 1.75rem; 
        text-align: left;
        &::after {
            content: '';
            display: block;
            width: 150px;
            height: 2px;
            background-color: ${(props) => props.theme.accent};
            margin-top: 0.5rem;
        }
    }
`;

const Text = styled.p`
    max-width: 600px;
`;

const ReadMore = styled(Link)`
    color: ${(props) => props.theme.textPrimary};
    font-weight: 500;
    text-decoration: none;

    span {
        color: ${(props) => props.theme.accent};
        margin-left: 0.25rem;
        transition: margin 0.3s ease;
    }

    &:hover span {
        margin-left: 0.5rem;
    }
`;

const ImageContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ImageWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    min-height: 300px; 
    padding: 2rem 0;
    z-index: 1; 

    @media (min-width: 1024px) {
        padding: 0;
    }
`;

const AboutImg = styled.img`
    display: block;
    width: 100%;
    max-width: 400px; 
    height: auto;
    object-fit: contain;
    filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.4)); 
    z-index: 3; 

    @media (max-width: 768px) {
        max-width: 280px;
    }
`;

const PurpleLines = styled.div`
    &::after {
        content: '';
        display: block;
        width: 500px;
        height: 2px;
        background-color: ${(props) => props.theme.accent};
        margin-top: 0.5rem;
    }

    @media (max-width: 768px) {
        &::after {
            display: none;
        }
    }
`;

const WhiteLines = styled.div`
    position: absolute;
    bottom: 30%;
    left: 0; 
    width: 150px;
    height: 150px;
    z-index: 1;
    border: 2px solid ${(props) => props.theme.borderColor};
    border-radius: 8px;

    @media (max-width: 768px) {
        top: 5%;
        right: 5%;
        width: 100px;
        height: 100px;
    }
`;

const PurpleBoxes = styled.div`
    position: absolute;
    bottom: 10%;
    right: 0; 
    width: 150px;
    height: 150px;
    z-index: 1;
    border: 2px solid ${(props) => props.theme.accent};
    border-radius: 8px;

    @media (max-width: 768px) {
        top: 5%;
        right: 5%;
        width: 100px;
        height: 100px;
    }
`;

const WhiteDots = styled.div`
    position: absolute;
    top: 5%;
    left: 0; 
    width: 120px;
    height: 120px;
    border-radius: 50%; 
    background-image: radial-gradient(circle at center, ${(props) => props.theme.borderColor} 2px, transparent 0);
    background-size: 15px 15px; 
    background-position: 0 0;
    z-index: 10;

    @media (max-width: 768px) {
        bottom: 2%;
        left: 2%;
        width: 80px;
        height: 80px;
        background-size: 10px 10px;
    }
`;

const About = () => {
    const { t } = useTranslation();

    return (
        <AboutContainer id="about-me">
            <Content>
                <TitleBar>
                    <Title>
                        #<Highlight>{t('about.title')}</Highlight>
                    </Title>
                    <PurpleLines />
                </TitleBar>
                <Text>Hello, I'm Mark!</Text>
                <Text>
                    a Software Engineer passionate about crafting clean, efficient, and user-focused web applications.
                </Text>
                <Text>
                    With over 3 years of experience in frontend development, I specialize in turning ideas into interactive and scalable digital experiences.
                    I enjoy bridging the gap between design and technology — ensuring that every interface not only looks great but performs flawlessly.
                </Text>
                <ReadMore to="/about-me">
                    Read more <span>&#8640;</span>
                </ReadMore>
            </Content>
            <ImageContainer>
                <ImageWrapper>
                    <AboutImg src={aboutImg} alt="eM4aRKay" />
                    <WhiteLines />
                    <PurpleBoxes />
                    <WhiteDots />
                </ImageWrapper>
            </ImageContainer>
        </AboutContainer>
    );
};

export default About;