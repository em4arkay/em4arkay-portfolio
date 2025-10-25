import styled from 'styled-components';
import ProjectCard from '../components/ProjectCard/ProjectCard';
import { Highlight } from '../sections/Hero'; // Re-use from Hero
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { client, urlFor } from '../sanityClient';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

interface Project {
    title: string;
    description: string;
    image: string;
    tech: string[];
    liveUrl: string;
    githubUrl: string;
}

interface FetchedProject {
    title: string;
    descriptionKey: string;
    image: SanityImageSource;
    tech: string[];
    liveUrl: string;
    githubUrl: string;
}

const ProjectsContainer = styled.section`
    padding-top: 2rem; 
`;

const TitleBar = styled.div`
    display: grid;
    grid-template-columns: auto 2fr auto;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap; 
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

    @media (max-width: 768px) {
        font-size: 1rem;
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

const ProjectsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2rem;
`;

const AllProjects = () => {
    const { t } = useTranslation();
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        const query = `*[_type == "project"]`; 

        client.fetch(query)
            .then((data: FetchedProject[]) => {
                const formattedProjects: Project[] = data.map(project => ({
                    title: project?.title,
                    description: project?.descriptionKey,
                    image: urlFor(project?.image).width(600).url(),
                    tech: project?.tech ?? [],
                    liveUrl: project?.liveUrl,
                    githubUrl: project?.githubUrl,
                }));
                setProjects(formattedProjects);
            })
            .catch(err => console.error("Failed to fetch projects:", err));
    }, []);

    return (
        <ProjectsContainer>
            <TitleBar>
                <Title>
                    #<Highlight>{t('nav.projects')}</Highlight>
                </Title>
                <PurpleLines />
            </TitleBar>
            <ProjectsGrid>
                {projects.length > 0 ? (
                    projects.map((project) => (
                        <ProjectCard key={project.title} project={project} />
                    ))
                ) : (
                    <p>Loading projects...</p>
                )}
            </ProjectsGrid>
        </ProjectsContainer>
    );
};

export default AllProjects;