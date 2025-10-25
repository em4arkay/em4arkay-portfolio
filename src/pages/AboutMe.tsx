import styled from 'styled-components';
import CertificateCard from '../components/CertificateCard/CertificateCard';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Highlight } from '../sections/Hero';
import aboutImg from '../assets/me2.png';
import { FaDownload } from 'react-icons/fa';
import { client, urlFor } from '../sanityClient';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

interface FetchedExperience {
    jobTitle: string;
    company: string;
    startDate: string;
    endDate?: string;
    description: string;
}

interface ExperienceItem extends FetchedExperience {
    startDate: string;
    endDate?: string;
}

interface FetchedCertificate {
    title: string;
    issuer: string;
    date: string;
    credentialUrl: string;
    image: SanityImageSource;
}

interface CertificateItem extends FetchedCertificate {
    title: string;
    issuer: string;
    date: string;
    credentialUrl: string;
    image: string;
}

const AboutContainer = styled.section`
    padding-top: 2rem; 
    display: flex;
    flex-wrap: wrap; 
    justify-content: space-between;
    align-items: center;
    gap: 3rem;
`;

const TextContent = styled.div`
    flex: 1;
    min-width: 300px;
    max-width: 600px;
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

const PurpleLines = styled.span`
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

const Text = styled.p`
    color: ${(props) => props.theme.textSecondary};
    font-size: 1rem;
    line-height: 1.7;
    margin-top: 2rem;
`;

const ImageContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    min-width: 300px;
`;

const AboutImg = styled.img`
    width: 100%;
    max-width: 350px;
    border-radius: 8px;
`;

const DownloadContainer = styled.div`
    display: flex;
    gap: 1rem;
`;

const DownloadButton = styled.a`
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    margin-top: 2rem;
    color: #FFFFFF;
    font-weight: 500;
    text-decoration: none;
    background-color: ${(props) => props.theme.accent};
    border: 1px solid ${(props) => props.theme.accent};
    border-radius: 4px;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-family: 'FiraCode Nerd Font', 'monospace';
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background-color: transparent;
        color: ${(props) => props.theme.accent};
    }
`;

const ExperienceContainer = styled.section``;

const Timeline = styled.div`
    position: relative;
    max-width: 750px;
    margin: 0 auto;

    &::after {
        content: '';
        position: absolute;
        width: 3px;
        background-color: ${(props) => props.theme.borderColor};
        top: 0;
        bottom: 0;
        left: 20px;
        
        @media (max-width: 768px) {
        left: 10px;
        }
    }
`;

const TimelineItem = styled.div`
    position: relative;
    padding: 1rem 0 2rem 60px; 

    @media (max-width: 768px) {
        padding-left: 40px;
    }

    &::after {
        content: '';
        position: absolute;
        width: 16px;
        height: 16px;
        background-color: ${(props) => props.theme.bgPrimary};
        border: 3px solid ${(props) => props.theme.accent};
        border-radius: 50%;
        top: 15px;
        left: 20px;
        transform: translateX(-50%); 
        z-index: 1;

        @media (max-width: 768px) {
        left: 10px;
        width: 12px;
        height: 12px;
        }
    }
`;

const TimelineContent = styled.div`
    background-color: ${(props) => props.theme.bgCard};
    border: 1px solid ${(props) => props.theme.borderColor};
    border-radius: 8px;
    padding: 1.5rem;
`;

const DateRange = styled.span`
    font-size: 0.9rem;
    color: ${(props) => props.theme.accent};
    font-weight: 600;
`;

const JobTitle = styled.h3`
    font-size: 1.25rem;
    color: ${(props) => props.theme.textPrimary};
    margin: 0.5rem 0;
`;

const Company = styled.h4`
    font-size: 1rem;
    color: ${(props) => props.theme.textSecondary};
    font-weight: 500;
    margin: 0 0 1rem 0;
`;

const Description = styled.p`
    font-size: 0.9rem;
    color: ${(props) => props.theme.textSecondary};
    line-height: 1.6;
    white-space: pre-line;
    margin: 0;
`;

const CertificatesContainer = styled.section`
    width: 100%;
`;

const CertificateGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2rem;
    width: 100%;
`;

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
    });
};

const AboutMe = () => {
    const { t } = useTranslation();
    const [experience, setExperience] = useState<ExperienceItem[]>([]);
    const [certificates, setCertificates] = useState<CertificateItem[]>([]);

    useEffect(() => {
        const query = `*[_type == "experience"] | order(startDate desc)`;

        client.fetch(query)
            .then((data: FetchedExperience[]) => {
                setExperience(data);
            })
            .catch(err => console.error("Failed to fetch experiences:", err));
    }, []);

    useEffect(() => {
        const query = `*[_type == "certificate"] | order(date desc)`;

        client.fetch(query)
            .then((data: FetchedCertificate[]) => {
                const formattedCertificates: CertificateItem[] = data.map(cert => ({
                    title: cert?.title,
                    issuer: cert?.issuer,
                    date: cert?.date,
                    credentialUrl: cert?.credentialUrl,
                    image: urlFor(cert?.image).width(600).url(),
                }));
                setCertificates(formattedCertificates);
            })
            .catch(err => console.error("Failed to fetch certificates:", err));
    }, []);

    return (
        <AboutContainer>
            <TextContent>
                <TitleBar>
                    <Title>
                        #<Highlight>{t('nav.about')}</Highlight>
                    </Title>
                    <PurpleLines />
                </TitleBar>
                <Text>
                    Hi, I’m Mark, a Software Engineer passionate about crafting clean, efficient, and user-focused web applications.
                </Text>
                <Text>
                    With over 3 years of experience in frontend development, I specialize in turning ideas into interactive and scalable digital experiences.
                    I enjoy bridging the gap between design and technology — ensuring that every interface not only looks great but performs flawlessly.
                </Text>
                <Text>
                    I’m constantly exploring new technologies, improving my problem-solving skills, and collaborating with teams that value innovation and growth.
                    Whether it’s developing with various tools, or diving into full-stack workflows, I bring a mix of creativity, curiosity,
                    and precision to every project.
                </Text>
                <DownloadContainer>
                    <DownloadButton
                        href="/Natchanon_D_SE.pdf"
                        download
                    >
                        <FaDownload />
                        {t('about.downloadResume', 'Resume')}
                    </DownloadButton>
                    <DownloadButton
                        href="/transcript.pdf"
                        download
                    >
                        <FaDownload />
                        {t('about.downloadResume', 'Transcript')}
                    </DownloadButton>
                </DownloadContainer>
            </TextContent>

            <ImageContainer>
                <AboutImg src={aboutImg} alt="About me" />
            </ImageContainer>

            <ExperienceContainer id="experience">
                <TitleBar>
                    <Title>
                        #<Highlight>{t('about.experience')}</Highlight>
                    </Title>
                    <PurpleLines />
                </TitleBar>

                <Timeline>
                    {experience.map((item, index) => (
                        <TimelineItem key={index}>
                            <TimelineContent>
                                <DateRange>
                                    {formatDate(item.startDate)} –{' '}
                                    {item.endDate ? formatDate(item.endDate) : t('about.present')}
                                </DateRange>
                                <JobTitle>{item.jobTitle}</JobTitle>
                                <Company>{item.company}</Company>
                                <Description>{item.description}</Description>
                            </TimelineContent>
                        </TimelineItem>
                    ))}
                </Timeline>
            </ExperienceContainer>

            <CertificatesContainer id="certificates">
                <TitleBar>
                    <Title>
                        #<Highlight>{t('about.certificate')}</Highlight>
                    </Title>
                    <PurpleLines />
                </TitleBar>

                <CertificateGrid>
                    {certificates.length > 0 ? (
                        certificates.map((cert) => (
                            <CertificateCard key={cert.title} certificate={cert} />
                        ))
                    ) : (
                        <p>Loading certificates...</p>
                    )}
                </CertificateGrid>
            </CertificatesContainer>
        </AboutContainer>
    );
};

export default AboutMe;