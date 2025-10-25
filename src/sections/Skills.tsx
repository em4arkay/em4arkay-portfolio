import styled from 'styled-components';
import { Highlight } from './Hero';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { client, urlFor } from '../sanityClient';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

const SkillsContainer = styled.section``;

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

const SkillsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-top: 3rem;
`;

const CategoryBox = styled.div`
    border: 1px solid ${(props) => props.theme.borderColor};
    border-radius: 8px;
`;

const CategoryTitle = styled.h3`
    font-size: 1.1rem;
    font-weight: 600;
    padding: 1rem;
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
    text-align: center;
`;

const SkillsList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    padding: 1.5rem;
    justify-content: center;
`;

const SkillItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    width: 60px;
`;

const SkillLogo = styled.img`
    width: 40px;
    height: 40px;
    object-fit: contain;
`;

const SkillName = styled.span`
    color: ${(props) => props.theme.textSecondary};
    font-size: 0.8rem;
    text-align: center;
`;
interface Skill {
    name: string;
    logo: string; 
}

interface SkillCategory {
    title: string;
    skills: Skill[]; 
}

interface FetchedSkill {
    _key: string;
    name: string;
    logo: SanityImageSource;
}
interface FetchedSkillCategory {
    title: string;
    skills?: FetchedSkill[];
}

const Skills = () => {
    const { t } = useTranslation();
    const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);

    useEffect(() => {
        const query = `*[_type == "skillCategory"]{
            title,
            skills[]{
            _key,
            name,
            logo
        }
    }`;

        client.fetch(query)
            .then((data: FetchedSkillCategory[]) => {
                const formattedSkillCategories: SkillCategory[] = data.map(category => ({
                    title: category?.title,
                    skills: category?.skills ? category.skills.map(skill => ({
                        name: skill?.name,
                        logo: urlFor(skill?.logo).width(80).url(), // Build the logo URL
                    })) : [],
                }));
                setSkillCategories(formattedSkillCategories);
            })
            .catch(err => console.error("Failed to fetch skill categories:", err));
    }, []);

    return (
        <SkillsContainer id="skills">
            <TitleBar>
                <Title>
                    #<Highlight>{t('nav.skills')}</Highlight>
                </Title>
                <PurpleLines />
            </TitleBar>
            <SkillsGrid>
                {skillCategories.map((category) => (
                    <CategoryBox key={category.title}>
                        <CategoryTitle>{category.title}</CategoryTitle>
                        <SkillsList>
                            {category.skills.map((skill) => (
                                <SkillItem key={skill.name}>
                                    <SkillLogo src={skill.logo} alt={`${skill.name} logo`} />
                                    <SkillName>{skill.name}</SkillName>
                                </SkillItem>
                            ))}
                        </SkillsList>
                    </CategoryBox>
                ))}
            </SkillsGrid>
        </SkillsContainer>
    );
};

export default Skills;