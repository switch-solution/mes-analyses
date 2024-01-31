import '@mantine/core/styles.css';
import React from 'react';
import { MantineProvider } from '@mantine/core';
import { theme } from '@/src/theme/mantineTheme';


export default function MantineLayout({ children }: { children: any }) {
    return (

        <div>
            <MantineProvider theme={theme}>{children}</MantineProvider>
        </div>
    );
}