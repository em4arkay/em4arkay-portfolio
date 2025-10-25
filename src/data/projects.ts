// 1. Import your project images
import chertnodesImg from '../assets/react.svg';
import protectxImg from '../assets/react.svg';
import kahootImg from '../assets/react.svg';

export interface Project {
    title: string;
    description: string;
    tech: string[];
    image: string;
    liveUrl: string;
    githubUrl: string;
}

export const projects: Project[] = [
    {
        title: 'ChertNodes',
        description: 'Minecraft servers hosting',
        tech: ['HTML', 'SCSS', 'Python', 'Flask'],
        image: chertnodesImg,
        liveUrl: '#',
        githubUrl: '#', 
    },
    {
        title: 'ChertNodes',
        description: 'projects.chertnodes.desc', 
        tech: ['HTML', 'SCSS', 'Python', 'Flask'],
        image: chertnodesImg,
        liveUrl: '#',
        githubUrl: '#',
    },
    {
        title: 'ProtectX',
        description: 'Discord bot antinuke',
        tech: ['HTML', 'SCSS', 'Python', 'Flask'],
        image: protectxImg,
        liveUrl: '#',
        githubUrl: '#',
    },
    {
        title: 'Kahoot Answers Viewer',
        description: 'Get answers to your kahoot quiz',
        tech: ['CSS', 'Express', 'Node.js'],
        image: kahootImg,
        liveUrl: '#',
        githubUrl: '#',
    },
];