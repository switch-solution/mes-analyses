import * as React from 'react';

interface EmailTemplateProps {
    civility: string;
    firstname: string;
    lastname: string;
    clientLabel: string;
    projectLabel?: string;
    domain: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    firstname,
    civility,
    lastname,
    clientLabel,
    projectLabel,
    domain,
}) => (
    <div className='flex min-h-screen w-full flex-col bg-slate-950'>
        <h1>Bonjour, {civility} {lastname} {firstname}!</h1>
        <span>Vous avez été invité à rejoindre {clientLabel}.</span>
        <span><a href={domain}>Lien de connexion</a></span>
    </div>
);
