import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

interface Project {
    title: string;
    description: string;
    tech: string[];
    image: string;
    liveUrl: string;
    githubUrl: string;
}

interface Props {
    project: Project;
}

const Card = styled.div`
    background-color: ${(props) => props.theme.bgCard};
    border: 1px solid ${(props) => props.theme.borderColor};
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
`;

const CardImage = styled.img`
    width: 100%;
    display: block;
`;

const Content = styled.div`
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`;

const TechList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
`;

const Tech = styled.span`
    font-size: 0.8rem;
    color: ${(props) => props.theme.textSecondary};
`;

const Title = styled.h3`
    font-size: 1.5rem;
    color: ${(props) => props.theme.textPrimary};
    margin-bottom: 0.5rem;
`;

const Description = styled.p`
    color: ${(props) => props.theme.textSecondary};
    margin-bottom: 1.5rem;
    flex-grow: 1; 
`;

const Links = styled.div`
    display: flex;
    gap: 1.5rem;
`;

const Link = styled.a`
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

const ProjectCard = ({ project }: Props) => {
    const { t } = useTranslation();
    const { title, description, tech, image, liveUrl, githubUrl } = project;

    return (
        <Card>
            <CardImage src={image} alt={`${title} preview`} />
            <Content>
                <TechList>
                    {tech.map((techItem) => (
                        <Tech key={techItem}>{techItem}</Tech>
                    ))}
                </TechList>
                <Title>{title}</Title>
                <Description>{t(description)}</Description>
                <Links>
                    <Link href={liveUrl} target="_blank" rel="noopener noreferrer">
                        Live <span>&#8640;</span>
                    </Link>
                    {githubUrl &&
                        <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
                            Cached <span>&#8640;</span>
                        </Link>}
                </Links>
            </Content>
        </Card>
    );
};

export default ProjectCard;