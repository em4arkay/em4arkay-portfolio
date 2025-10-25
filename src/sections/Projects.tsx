import styled from 'styled-components';
import ProjectCard from '../components/ProjectCard/ProjectCard';
import { Highlight } from './Hero';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { type Project } from '../data';
import { client, urlFor } from '../sanityClient';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { Link } from 'react-router-dom';

const ProjectsContainer = styled.section``;

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

const ViewAll = styled(Link)`
    color: ${(props) => props.theme.textPrimary};
    font-size: 1rem;
    text-decoration: none;
    white-space: nowrap; 

    &:hover {
        text-decoration: underline;
    }

    @media (max-width: 768px) {
        font-size: 0.75rem;
    }
`;

const ProjectsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;

    @media (max-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

interface FetchedProject {
    title: string;
    descriptionKey: string;
    image: SanityImageSource;
    tech: string[];
    liveUrl: string;
    githubUrl: string;
}

const Projects = () => {
    const { t } = useTranslation();
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        const query = `*[_type == "project"] | order(_createdAt desc) [0...3]`;

        client.fetch(query)
            .then((data: FetchedProject[]) => {
                const formattedProjects: Project[] = data.map(project => ({
                    title: project?.title,
                    description: project?.descriptionKey,
                    image: urlFor(project?.image).width(400).url(),
                    tech: project?.tech,
                    liveUrl: project?.liveUrl,
                    githubUrl: project?.githubUrl,
                }));
                setProjects(formattedProjects);
            })
            .catch(err => console.error("Failed to fetch projects:", err));
    }, []);

    return (
        <ProjectsContainer id="projects">
            <TitleBar>
                <Title>
                    #<Highlight>{t('nav.projects')}</Highlight>
                </Title>
                <PurpleLines />
                <ViewAll to="/projects"> 
                    View all ---&gt;
                </ViewAll>
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

export default Projects;