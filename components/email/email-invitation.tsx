import * as React from 'react';

interface EmailTemplateProps {
    civility: string;
    firstname: string;
    lastname: string;
    clientLabel: string;
    projectLabel?: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    firstname,
    civility,
    lastname,
    clientLabel,
    projectLabel,
}) => (
    <div>
        <h1>Bonjour, {civility} {lastname} {firstname}!</h1>
        <p>Vous avez été invité à rejoindre {clientLabel}.</p>
    </div>
);
