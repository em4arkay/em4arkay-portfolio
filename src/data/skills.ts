
import kahootImg from '../assets/react.svg';

export interface SkillCategory {
    title: string;
    skills: string[];
    logo: string; 
}

export const skillCategories: SkillCategory[] = [
    {
        title: "Languages",
        skills: ["Lua", "Python", "JavaScript"],
        logo: kahootImg
    },
    {
        title: "Databases",
        skills: ["MySQL", "PostgreSQL", "Mongo"],
        logo: kahootImg
    },
    {
        title: "Tools",
        skills: ["VSCode", "Neovim", "Linux", "Figma", "XFCE", "Arch"],
        logo: kahootImg
    },
    {
        title: "Other",
        skills: ["HTML", "CSS", "SCSS", "REST", "Jinja"],
        logo: kahootImg
    },
    {
        title: "Frameworks",
        skills: ["React", "Flask", "Express.js", "Discord.js", "Next.js"],
        logo: kahootImg
    },
];