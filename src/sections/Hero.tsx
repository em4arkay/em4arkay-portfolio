import styled from 'styled-components';
import heroImg from '../assets/me.png';
import { useState, useEffect } from 'react';
import { client } from '../sanityClient';
import { useTranslation } from 'react-i18next';
import { Trans } from 'react-i18next';

interface HeroContent {
    heroTitle_en: string;
    heroTitle_th: string;
    heroDescription_en: string;
    heroDescription_th: string;
}

export const Highlight = styled.span`
    color: ${(props) => props.theme.accent}; 
`;

const HeroContainer = styled.section`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    padding-top: 2rem;

    @media (max-width: 768px) {
        flex-direction: column-reverse;
    }
`;

const Content = styled.div`
    flex: 1;
`;

const Title = styled.span`
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--text-primary);
`;

const Heading = styled.h1`
    font-size: 2.5rem;
    margin-top: 0.5rem;

    @media (max-width: 768px) {
        font-size: 2rem;
    }
`;

const Description = styled.p`
    font-size: 1.1rem;
    margin: 1.5rem 0;
`;

const ContactBtn = styled.a`
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary);
    border: 1px solid ${(props) => props.theme.accent};
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    transition: all 0.3s ease;

    &:hover {
        background-color: var(--text-primary);
        color: var(--bg-primary);
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
    min-height: 300px; /* Ensure space for image and decorators */
    padding: 2rem 0;
    z-index: 1; /* Image below text, above static background */

    @media (min-width: 1024px) {
        padding: 0;
    }
`;

const HeroImg = styled.img`
    display: block;
    width: 100%;
    max-width: 400px; /* Adjust image size as needed */
    height: auto;
    object-fit: contain;
    filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.4)); 
    z-index: 3; /* Keep image above decor elements */

    @media (max-width: 768px) {
        max-width: 280px;
    }
`;

const PurpleLines = styled.div`
    position: absolute;
    top: 10%;
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
    bottom: 5%;
    left: 0; 
    width: 120px;
    height: 120px;
    border-radius: 50%; 
    background-image: radial-gradient(circle at center, ${(props) => props.theme.borderColor} 2px, transparent 0);
    background-size: 15px 15px; /* Adjust spacing of dots */
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

const ImgCaption = styled.p`
    font-size: 0.9rem;
    color: var(--text-secondary);
    border: 1px solid ${(props) => props.theme.borderColor};
    padding: 0.5rem 1rem;
    border-radius: 8px;
`;

const Hero = () => {
    const { t, i18n } = useTranslation();
    const [content, setContent] = useState<HeroContent | null>(null);

    useEffect(() => {
        const query = `*[_type == "home" && _id == "home"][0]{
            heroTitle_en,
            heroTitle_th,
            heroDescription_en,
            heroDescription_th
        }`;

        client.fetch(query)
            .then((data) => setContent(data))
            .catch(console.error);
    }, []);

    if (content) {
        return <HeroContainer id="about-me"><p>Loading...</p></HeroContainer>;
    }

    // const title = i18n.language === 'th' ? content.heroTitle_th : content.heroTitle_en;
    // const description = i18n.language === 'th' ? content.heroDescription_th : content.heroDescription_en;

    return (
        <HeroContainer>
            <Content>
                <Title>eM4aRKay</Title>
                <Heading>
                    <Trans i18nKey="hero.title">
                        eM4aRKay is a <Highlight>front-end developer</Highlight>
                    </Trans>
                </Heading>
                <Description>
                    {t('hero.desc')}
                </Description>
                <ContactBtn href="#contacts">
                    {t('hero.button')}
                </ContactBtn>
            </Content>
            <ImageContainer>
                <ImageWrapper>
                    <HeroImg src={heroImg} alt="eM4aRKay" />
                    <PurpleLines />
                    <WhiteDots />
                </ImageWrapper>
                <ImgCaption>
                    <Trans i18nKey="hero.caption">
                        // Currently working on <Highlight>Portfolio</Highlight>
                    </Trans>
                </ImgCaption>
            </ImageContainer>
        </HeroContainer>
    );
};

export default Hero;