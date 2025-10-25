import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

interface Certificate {
    title: string;
    issuer: string;
    date: string;
    credentialUrl: string;
    image: string;
}

interface Props {
    certificate: Certificate;
}

const Card = styled.div`
    background-color: ${(props) => props.theme.bgCard};
    border: 1px solid ${(props) => props.theme.borderColor};
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const CardImage = styled.img`
    width: 100%;
    height: auto; 
    object-fit: cover;
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
`;

const Content = styled.div`
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`;

const CertTitle = styled.h3`
    font-size: 1.25rem;
    color: ${(props) => props.theme.textPrimary};
    margin-bottom: 0.5rem;
    font-weight: 600;
`;

const Issuer = styled.p`
    color: ${(props) => props.theme.textSecondary};
    margin: 0;
    font-size: 0.9rem;
`;

const DateText = styled.p`
    color: ${(props) => props.theme.textSecondary};
    margin-top: 0.25rem;
    font-size: 0.9rem;
    flex-grow: 1; 
`;

const ViewButton = styled.a`
    margin-top: 1.5rem;
    color: ${(props) => props.theme.textPrimary};
    border: 1px solid ${(props) => props.theme.borderColor};
    font-weight: 500;
    text-decoration: none;
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    transition: all 0.2s ease;
    white-space: nowrap;
    align-self: flex-start;

    &:hover {
        background-color: ${(props) => props.theme.accent};
        border-color: ${(props) => props.theme.accent};
        color: #fff;
    }
`;

const CertificateCard = ({ certificate }: Props) => {
    const { t } = useTranslation();
    const { title, issuer, date, credentialUrl, image } = certificate;

    return (
        <Card>
            <CardImage src={image} alt={`${title} preview`} />
            <Content>
                <CertTitle>{title}</CertTitle>
                <Issuer>{issuer}</Issuer>
                <DateText>{date}</DateText>
                <ViewButton href={credentialUrl} target="_blank" rel="noopener noreferrer">
                    {t('about.button')} &gt;
                </ViewButton>
            </Content>
        </Card>
    );
};

export default CertificateCard;