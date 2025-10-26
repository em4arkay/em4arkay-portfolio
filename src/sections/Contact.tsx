import styled from 'styled-components';
import { Highlight } from './Hero';
import { FaDiscord, FaLinkedin } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const ContactContainer = styled.section`
    display: flex;
    flex-wrap: wrap; 
    align-items: flex-start;
    gap: 3rem; 
    padding-bottom: 4rem;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        text-align: center;
    }
`;

const TextContent = styled.div`
    flex: 1;
    min-width: 300px;
    max-width: 500px;

    @media (max-width: 768px) {
        max-width: 100%;
        width: 100%;
    }
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
        width: 100%; 
        height: 2px;
        background-color: ${(props) => props.theme.accent};
    }

    @media (max-width: 768px) {
        &::after {
            display: none;
        }
    }
`;

const Description = styled.p`
    color: ${(props) => props.theme.textSecondary};
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 2rem; 
`;

const ContactBoxes = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const ContactBox = styled.div`
    background-color: ${(props) => props.theme.bgCard};
    border: 1px solid ${(props) => props.theme.borderColor};
    border-radius: 8px;
    padding: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    min-width: 250px;

    svg {
        font-size: 1.5rem;
        color: ${(props) => props.theme.textSecondary};
    }

    div {
        display: flex;
        flex-direction: column;
    }

    span {
        font-size: 0.9rem;
        color: ${(props) => props.theme.textSecondary};
    }

    a,
    span.contact-text {
        font-size: 1rem;
        color: ${(props) => props.theme.textPrimary};
        text-decoration: none;
        font-weight: 500;
        word-break: break-all; 
    }
`;

const FormContainer = styled.form`
    flex: 1;
    min-width: 300px;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

const FormInput = styled.input`
    width: 100%;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    font-family: 'FiraCode Nerd Font', monospace;
    color: ${(props) => props.theme.textPrimary};
    background-color: ${(props) => props.theme.bgCard};
    border: 1px solid ${(props) => props.theme.borderColor};
    border-radius: 4px;
    
    &:focus {
        outline: none;
        border-color: ${(props) => props.theme.accent};
    }
`;

const FormTextarea = styled.textarea`
    width: 100%;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    font-family: 'FiraCode Nerd Font', monospace;
    color: ${(props) => props.theme.textPrimary};
    background-color: ${(props) => props.theme.bgCard};
    border: 1px solid ${(props) => props.theme.borderColor};
    border-radius: 4px;
    min-height: 150px;
    resize: vertical;

    &:focus {
        outline: none;
        border-color: ${(props) => props.theme.accent};
    }
`;

const SubmitButton = styled.button`
    color: #FFFFFF;
    font-weight: 500;
    text-decoration: none;
    background-color: ${(props) => props.theme.accent};
    border: 1px solid ${(props) => props.theme.accent};
    border-radius: 4px;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-family: 'FiraCode Nerd Font', monospace;
    cursor: pointer;
    transition: all 0.2s ease;
    align-self: flex-start;

    &:hover {
        background-color: transparent;
        color: ${(props) => props.theme.accent};
    }
    
    &:disabled {
        background-color: ${(props) => props.theme.textSecondary};
        border-color: ${(props) => props.theme.textSecondary};
        color: ${(props) => props.theme.bgCard};
        cursor: not-allowed;
    }
`;

const StatusMessage = styled.p<{ $success: boolean }>`
    color: ${(props) => (props.$success ? '#28a745' : '#dc3545')};
    font-size: 1rem;
    margin-top: 1rem;
`;

type SubmissionStatus = 'idle' | 'sending' | 'success' | 'error';

const Contact = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<SubmissionStatus>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('sending');
        const json = JSON.stringify({
            access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY, ...formData
        });

        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: json
            });

            const result = await res.json();

            if (result.success) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    return (
        <ContactContainer id="contacts">
            <TextContent>
                <TitleBar>
                    <Title>
                        #<Highlight>{t('contact.title')}</Highlight>
                    </Title>
                    <PurpleLines />
                </TitleBar>
                <Description>
                    {t('contact.desc')}
                </Description>
                <ContactBoxes>
                    <ContactBox>
                        <FaLinkedin />
                        <div>
                            <span>Message me here</span>
                            <a
                                href="https://www.linkedin.com/in/natchanon-danual/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Natchanon D.
                            </a>
                        </div>
                    </ContactBox>
                    <ContactBox>
                        <FaDiscord />
                        <div> 
                            <span>Message me here</span>
                            <a
                                href="https://discord.com/users/696748830045110272"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                neaviskwangya#9390
                            </a>
                        </div>
                    </ContactBox>
                </ContactBoxes>
            </TextContent>

            <FormContainer onSubmit={handleSubmit}>
                <FormInput
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t('contact.form.name')}
                    required
                />
                <FormInput
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t('contact.form.email')}
                    required
                />
                <FormTextarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t('contact.form.message')}
                    required
                />
                <SubmitButton type="submit" disabled={status === 'sending'}>
                    {status === 'sending' ? t('contact.form.sending') : t('contact.form.send')}
                </SubmitButton>

                {status === 'success' && (
                    <StatusMessage $success={true}>{t('contact.form.success')}</StatusMessage>
                )}
                {status === 'error' && (
                    <StatusMessage $success={false}>{t('contact.form.error')}</StatusMessage>
                )}
            </FormContainer>
        </ContactContainer>
    );
};

export default Contact;